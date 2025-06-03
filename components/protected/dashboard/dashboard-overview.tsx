"use client";

import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";
import "./dashboard-charts.css";
import {
  Box,
  Flex,
  Heading,
  Spinner,
  Text,
  Button,
  Select,
  TextField,
} from "@radix-ui/themes";
import SloretaSession from "@common/models/sloreta-session-model";
import BrainwaveData from "@common/models/sloreta-brainwave-data-model";
import { RadixColorOptions } from "@common/enum";
import { useUserStore } from "@stores/useUserStore";
import { useToast } from "@providers/toast-provider/toastProvider";
import { extractResponse } from "@utils/response";
import { get } from "@utils/supabase/helper";
import { Filter, X, RefreshCw } from "lucide-react";

// Colors for the charts
const COLORS = [
  "#4E79A7", // Soft Blue
  "#F28E2B", // Warm Orange
  "#E15759", // Coral Red
  "#76B7B2", // Teal
  "#59A14F", // Leaf Green
  "#EDC948", // Mustard Yellow
  "#B07AA1", // Lavender Purple
  "#FF9DA7", // Light Pink
  "#9C755F", // Earthy Brown
];

const DashboardOverview = () => {
  const user = useUserStore((state) => state.user);
  const { showToast } = useToast();
  const [sessions, setSessions] = useState<SloretaSession[]>([]);
  const [loading, setLoading] = useState(true);
  const [brainwaveBands, setBrainwaveBands] = useState<string[]>([]);

  // Filter states
  const [selectedBrainwaveBands, setSelectedBrainwaveBands] = useState<
    string[]
  >([]);
  const [sessionRangeStart, setSessionRangeStart] = useState<number | null>(
    null
  );
  const [sessionRangeEnd, setSessionRangeEnd] = useState<number | null>(null);
  const [filterActive, setFilterActive] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  // Handle filter toggle
  const handleFilterToggle = () => {
    setFilterActive(!filterActive);
  };

  // Handle brainwave band selection
  const handleBandSelectionChange = (band: string) => {
    setSelectedBrainwaveBands((prev) => {
      if (prev.includes(band)) {
        return prev.filter((b) => b !== band);
      } else {
        return [...prev, band];
      }
    });
  };

  // Filter sessions based on current filter settings
  const getFilteredSessions = () => {
    return sessions.filter((session) => {
      // Session range filter
      if (
        sessionRangeStart !== null &&
        session.session_number < sessionRangeStart
      ) {
        return false;
      }
      if (
        sessionRangeEnd !== null &&
        session.session_number > sessionRangeEnd
      ) {
        return false;
      }
      return true;
    });
  };

  // Filter brainwave data based on selected bands
  const getFilteredBrainwaveData = (sessionData: SloretaSession[]) => {
    return sessionData.map((session) => ({
      ...session,
      sloreta_brainwave_data: session.sloreta_brainwave_data.filter((data) => {
        // Brainwave band filter
        if (
          filterActive &&
          selectedBrainwaveBands.length > 0 &&
          !selectedBrainwaveBands.includes(data.brainwave_band)
        ) {
          return false;
        }
        return true;
      }),
    }));
  };

  // Reset filters
  const resetFilters = () => {
    setSelectedBrainwaveBands(brainwaveBands);
    setSessionRangeStart(null);
    setSessionRangeEnd(null);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!user?.id) return;

      setLoading(true);
      const nextResponse = await get(
        `/api/sloreta-session-data/get-all-data?user_id=${user.id}`
      );
      const response = await extractResponse(nextResponse);

      if (response.ok) {
        const sessionsData = response.data || [];
        setSessions(sessionsData);

        // Extract unique brainwave bands
        const uniqueBands = new Set<string>();
        sessionsData.forEach((session: SloretaSession) => {
          session.sloreta_brainwave_data.forEach((data: BrainwaveData) => {
            uniqueBands.add(data.brainwave_band);
          });
        });

        setBrainwaveBands(Array.from(uniqueBands));
        setSelectedBrainwaveBands(Array.from(uniqueBands)); // Default to all bands selected
      } else {
        showToast({
          title: response.status,
          description: response.message,
          color: "error",
        });
      }
      setLoading(false);
    };

    fetchData();
  }, [user, showToast]);

  // Prepare data for Grouped Bar Chart (Z-scores by brainwave across sessions)
  const prepareZScoreBarData = () => {
    const filtered = getFilteredBrainwaveData(getFilteredSessions());
    return filtered
      .sort((a, b) => a.session_number - b.session_number)
      .map((session) => {
        const dataObj: any = {
          session: `Session ${session.session_number}`,
        };

        // Group z-scores by brainwave band
        session.sloreta_brainwave_data.forEach((bwData) => {
          const band = bwData.brainwave_band;
          // If multiple entries for same band, take average
          if (dataObj[band]) {
            dataObj[band] = (dataObj[band] + bwData.z_score) / 2;
          } else {
            dataObj[band] = bwData.z_score;
          }
        });

        return dataObj;
      });
  };

  // Prepare data for Stacked Bar Chart (Frequency distribution per session)
  const prepareFrequencyStackData = () => {
    const filtered = getFilteredBrainwaveData(getFilteredSessions());
    return filtered
      .sort((a, b) => a.session_number - b.session_number)
      .map((session) => {
        const dataObj: any = {
          session: `Session ${session.session_number}`,
        };

        // Sum frequencies by brainwave band
        session.sloreta_brainwave_data.forEach((bwData) => {
          const band = bwData.brainwave_band;
          if (dataObj[band]) {
            dataObj[band] += bwData.frequency;
          } else {
            dataObj[band] = bwData.frequency;
          }
        });

        return dataObj;
      });
  };

  // Prepare data for Pie Chart (Average brainwave proportion)
  const preparePieData = () => {
    const filtered = getFilteredBrainwaveData(getFilteredSessions());
    const totalFrequencies: Record<string, number> = {};
    let allFrequenciesSum = 0;

    // Sum up frequencies by brainwave band across all sessions
    filtered.forEach((session) => {
      session.sloreta_brainwave_data.forEach((bwData) => {
        const band = bwData.brainwave_band;
        if (totalFrequencies[band]) {
          totalFrequencies[band] += bwData.frequency;
        } else {
          totalFrequencies[band] = bwData.frequency;
        }
        allFrequenciesSum += bwData.frequency;
      });
    });

    // Convert to percentage and format for pie chart
    return Object.entries(totalFrequencies).map(([name, value]) => ({
      name,
      value: Number(((value / allFrequenciesSum) * 100).toFixed(2)),
    }));
  };

  // Prepare data for Line Chart (Z-score trends for each brainwave)
  const prepareZScoreLineTrendData = () => {
    const filtered = getFilteredBrainwaveData(getFilteredSessions());
    // First, organize data by session
    const sessionData: Record<number, Record<string, number>> = {};

    filtered.forEach((session) => {
      if (!sessionData[session.session_number]) {
        sessionData[session.session_number] = {};
      }

      session.sloreta_brainwave_data.forEach((bwData) => {
        const band = bwData.brainwave_band;
        if (sessionData[session.session_number][band]) {
          // If multiple entries, take average
          sessionData[session.session_number][band] =
            (sessionData[session.session_number][band] + bwData.z_score) / 2;
        } else {
          sessionData[session.session_number][band] = bwData.z_score;
        }
      });
    });

    // Convert to format needed for LineChart
    return Object.entries(sessionData)
      .sort(([aKey], [bKey]) => parseInt(aKey) - parseInt(bKey))
      .map(([sessionNum, data]) => {
        return {
          session: `Session ${sessionNum}`,
          ...data,
        };
      });
  };

  if (loading) {
    return (
      <Box className="p-8 mt-4">
        <Flex
          direction="row"
          align="center"
          justify="center"
          gap="3"
          className="w-full"
        >
          <Spinner size="3" />
          <Text size="3">Loading data...</Text>
        </Flex>
      </Box>
    );
  }

  if (!sessions.length) {
    return (
      <Box className="text-center p-8 mt-4">
        No session data available. Please add session data to view charts.
      </Box>
    );
  }

  // Get filtered data for charts
  const zScoreBarData = prepareZScoreBarData();
  const frequencyStackData = prepareFrequencyStackData();
  const pieData = preparePieData();
  const lineData = prepareZScoreLineTrendData();

  return (
    <Box className="mt-4">
      <Heading
        size={{ initial: "5", sm: "6" }}
        color={RadixColorOptions.CYAN}
        className="mb-6"
      >
        Overview Across All Sessions
      </Heading>

      {/* Filter controls */}
      <Box className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Brainwave Band Filter */}
          {brainwaveBands.length > 0 && (
            <Box className="p-4 border rounded-lg shadow-sm bg-white dark:bg-gray-800">
              <Flex direction="column" gap="3">
                <Flex justify="between" align="center">
                  <Heading size="4">Filter by Brainwave Band</Heading>
                  <Flex align="center" gap="2">
                    {filterActive && (
                      <span className="inline-flex items-center justify-center w-6 h-6 bg-blue-100 text-blue-800 text-xs font-medium rounded-full dark:bg-blue-900 dark:text-blue-300">
                        {selectedBrainwaveBands.length}
                      </span>
                    )}
                    <Text size="2">Filter</Text>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={filterActive}
                        onChange={handleFilterToggle}
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    </label>
                    <div className="ml-2 text-gray-500 text-xs hidden md:inline-block">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="inline-block mr-1"
                      >
                        <circle cx="12" cy="12" r="10"></circle>
                        <path d="M12 16v-4"></path>
                        <path d="M12 8h.01"></path>
                      </svg>
                      Filter brainwaves
                    </div>
                  </Flex>
                </Flex>

                {filterActive && (
                  <>
                    <Flex gap="2" mb="2">
                      <button
                        className="px-3 py-1 text-xs font-medium rounded bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
                        onClick={() =>
                          setSelectedBrainwaveBands([...brainwaveBands])
                        }
                      >
                        Select All
                      </button>
                      <button
                        className="px-3 py-1 text-xs font-medium rounded bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
                        onClick={() => setSelectedBrainwaveBands([])}
                      >
                        Deselect All
                      </button>
                    </Flex>
                    <Flex wrap="wrap" gap="2">
                      {brainwaveBands.map((band) => (
                        <button
                          key={band}
                          onClick={() => handleBandSelectionChange(band)}
                          className={`px-3 py-1 text-sm font-medium rounded-full transition-colors ${
                            selectedBrainwaveBands.includes(band)
                              ? "bg-blue-500 text-white"
                              : "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                          }`}
                        >
                          {band}
                        </button>
                      ))}
                    </Flex>
                  </>
                )}
              </Flex>
            </Box>
          )}

          {/* Session Range Filter */}
          <Box className="p-4 border rounded-lg shadow-sm bg-white dark:bg-gray-800">
            <Flex direction="column" gap="3">
              <Flex justify="between" align="center">
                <Heading size="4">Filter by Session Range</Heading>
                <Button
                  variant="soft"
                  size="1"
                  onClick={resetFilters}
                  className="flex items-center gap-1"
                  disabled={!sessionRangeStart && !sessionRangeEnd}
                >
                  <RefreshCw size="12" />
                  Reset
                </Button>
              </Flex>

              <Flex gap="4" align="center" className="mt-2">
                <TextField.Root
                  size="2"
                  type="number"
                  placeholder="Start"
                  value={sessionRangeStart?.toString() ?? ""}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setSessionRangeStart(
                      e.target.value ? parseInt(e.target.value) : null
                    )
                  }
                >
                  <TextField.Slot side="left">
                    <Text size="1" weight="medium" color="gray">
                      From
                    </Text>
                  </TextField.Slot>
                </TextField.Root>

                <TextField.Root
                  size="2"
                  type="number"
                  placeholder="End"
                  value={sessionRangeEnd?.toString() ?? ""}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setSessionRangeEnd(
                      e.target.value ? parseInt(e.target.value) : null
                    )
                  }
                >
                  <TextField.Slot side="left">
                    <Text size="1" weight="medium" color="gray">
                      To
                    </Text>
                  </TextField.Slot>
                </TextField.Root>
              </Flex>
            </Flex>
          </Box>
        </div>
      </Box>

      <Flex direction="column" gap="6" className="full-width-chart">
        {/* Show message when no data matches filters */}
        {filterActive && selectedBrainwaveBands.length === 0 && (
          <Box className="w-full col-span-full p-4 border rounded-lg shadow-sm chart-card bg-white dark:bg-gray-800 text-center">
            <Heading size="4" className="text-gray-500">
              No data to display
            </Heading>
            <Text size="2" className="text-gray-400">
              Please select at least one brainwave band to display data.
            </Text>
          </Box>
        )}

        {/* Only render charts if filters allow data to be shown */}
        {(!filterActive || selectedBrainwaveBands.length > 0) && (
          <>
            {/* Grouped Bar Chart */}
            <Box className="w-full p-4 border rounded-lg shadow-sm chart-card bg-white dark:bg-gray-800">
              <Heading
                size={{ initial: "4", sm: "5" }}
                className="chart-title pb-6"
              >
                Z-Scores by Brainwave Across Sessions
                {filterActive &&
                  selectedBrainwaveBands.length > 0 &&
                  selectedBrainwaveBands.length < brainwaveBands.length && (
                    <Text
                      as="span"
                      size="2"
                      style={{ fontWeight: "normal", marginLeft: "8px" }}
                    >
                      (Filtered)
                    </Text>
                  )}
              </Heading>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart
                  data={zScoreBarData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 20 }}
                  barSize={25} /* Make bars slimmer */
                >
                  <CartesianGrid strokeDasharray="3 3" opacity={0.6} />
                  <XAxis
                    dataKey="session"
                    angle={-45}
                    textAnchor="end"
                    height={70}
                    tick={{ fontSize: 12 }}
                    className="text-textDefault"
                  />
                  <YAxis
                    label={{
                      value: "Z-Score",
                      angle: -90,
                      position: "insideLeft",
                      className: "text-textDefault",
                    }}
                    tick={{ fontSize: 12 }}
                    className="text-textDefault"
                  />
                  <Tooltip
                    cursor={{ fill: "rgba(0, 0, 0, 0.05)" }}
                    contentStyle={{
                      borderRadius: "8px",
                      boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                    }}
                  />
                  <Legend
                    wrapperStyle={{ paddingTop: 10 }}
                    iconSize={12}
                    iconType="circle"
                  />
                  {selectedBrainwaveBands.map((band, index) => (
                    <Bar
                      key={band}
                      dataKey={band}
                      fill={COLORS[index % COLORS.length]}
                      name={band}
                      //   animationDuration={1500}
                      //   animationEasing="ease-out"
                      radius={[4, 4, 0, 0]}
                    />
                  ))}
                </BarChart>
              </ResponsiveContainer>
            </Box>

            {/* Stacked Bar Chart */}
            <Box className="w-full p-4 border rounded-lg shadow-sm chart-card bg-white dark:bg-gray-800">
              <Heading
                size={{ initial: "4", sm: "5" }}
                className="chart-title pb-6"
              >
                Frequency Distribution per Session
                {filterActive &&
                  selectedBrainwaveBands.length > 0 &&
                  selectedBrainwaveBands.length < brainwaveBands.length && (
                    <Text
                      as="span"
                      size="2"
                      style={{ fontWeight: "normal", marginLeft: "8px" }}
                    >
                      (Filtered)
                    </Text>
                  )}
              </Heading>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart
                  data={frequencyStackData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 20 }}
                  barSize={25} /* Make bars slimmer */
                >
                  <CartesianGrid strokeDasharray="3 3" opacity={0.6} />
                  <XAxis
                    dataKey="session"
                    angle={-45}
                    textAnchor="end"
                    height={70}
                    tick={{ fontSize: 12 }}
                    className="text-textDefault"
                  />
                  <YAxis
                    label={{
                      value: "Frequency (Hz)",
                      angle: -90,
                      position: "insideLeft",
                      className: "text-textDefault",
                    }}
                    tick={{ fontSize: 12 }}
                    className="text-textDefault"
                  />
                  <Tooltip
                    cursor={{ fill: "rgba(0, 0, 0, 0.05)" }}
                    contentStyle={{
                      borderRadius: "8px",
                      boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                    }}
                  />
                  <Legend
                    wrapperStyle={{ paddingTop: 10 }}
                    iconSize={12}
                    iconType="circle"
                  />
                  {selectedBrainwaveBands.map((band, index) => (
                    <Bar
                      key={band}
                      dataKey={band}
                      stackId="a"
                      fill={COLORS[index % COLORS.length]}
                      name={band}
                      animationDuration={1500}
                      animationEasing="ease-out"
                      radius={[4, 4, 0, 0]}
                    />
                  ))}
                </BarChart>
              </ResponsiveContainer>
            </Box>

            {/* Line Chart */}
            <Box className="w-full p-4 border rounded-lg shadow-sm chart-card bg-white dark:bg-gray-800">
              <Heading
                size={{ initial: "4", sm: "5" }}
                className="chart-title pb-6"
              >
                Z-score Trends for Each Brainwave
                {filterActive &&
                  selectedBrainwaveBands.length > 0 &&
                  selectedBrainwaveBands.length < brainwaveBands.length && (
                    <Text
                      as="span"
                      size="2"
                      style={{ fontWeight: "normal", marginLeft: "8px" }}
                    >
                      (Filtered)
                    </Text>
                  )}
              </Heading>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart
                  data={lineData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" opacity={0.6} />
                  <XAxis
                    dataKey="session"
                    angle={-45}
                    textAnchor="end"
                    height={70}
                    tick={{ fontSize: 12 }}
                    className="text-textDefault"
                  />
                  <YAxis
                    label={{
                      value: "Z-Score",
                      angle: -90,
                      position: "insideLeft",
                      className: "text-textDefault",
                    }}
                    tick={{ fontSize: 12 }}
                    className="text-textDefault"
                  />
                  <Tooltip
                    cursor={{ stroke: "#ccc", strokeWidth: 1 }}
                    contentStyle={{
                      borderRadius: "8px",
                      boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                    }}
                  />
                  <Legend
                    wrapperStyle={{ paddingTop: 10 }}
                    iconSize={12}
                    iconType="circle"
                  />
                  {selectedBrainwaveBands.map((band, index) => (
                    <Line
                      key={band}
                      type="monotone"
                      dataKey={band}
                      stroke={COLORS[index % COLORS.length]}
                      name={band}
                      strokeWidth={2}
                      activeDot={{ r: 8, strokeWidth: 0 }}
                      animationDuration={1500}
                      animationEasing="ease-out"
                    />
                  ))}
                </LineChart>
              </ResponsiveContainer>
            </Box>

            {/* Pie Chart */}
            <Box className="w-full p-4 border rounded-lg shadow-sm chart-card bg-white dark:bg-gray-800">
              <Heading size={{ initial: "4", sm: "5" }} className="chart-title">
                Average Brainwave Proportion
                {filterActive &&
                  selectedBrainwaveBands.length > 0 &&
                  selectedBrainwaveBands.length < brainwaveBands.length && (
                    <Text
                      as="span"
                      size="2"
                      style={{ fontWeight: "normal", marginLeft: "8px" }}
                    >
                      (Filtered)
                    </Text>
                  )}
              </Heading>
              <ResponsiveContainer width="100%" height={400}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={{ stroke: "var(--border-color)" }}
                    outerRadius={130}
                    fill="#8884d8"
                    dataKey="value"
                    nameKey="name"
                    label={({ name, value }) => `${name}: ${value}%`}
                    animationDuration={1500}
                    animationEasing="ease-out"
                  >
                    {pieData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                        stroke="#fff"
                        strokeWidth={2}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value) => `${value}%`}
                    contentStyle={{
                      borderRadius: "8px",
                      boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                    }}
                    itemStyle={{
                      color: "var(--text-default)",
                    }}
                  />
                  <Legend
                    wrapperStyle={{ paddingTop: 10 }}
                    iconSize={12}
                    iconType="circle"
                    layout="horizontal"
                    verticalAlign="bottom"
                    align="center"
                  />
                </PieChart>
              </ResponsiveContainer>
            </Box>
          </>
        )}
      </Flex>
    </Box>
  );
};

export default DashboardOverview;
