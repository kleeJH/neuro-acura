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
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";
import "./dashboard-charts.css";
import { Box, Flex, Heading, Select, Text, Spinner } from "@radix-ui/themes";
import SloretaSession from "@common/models/sloreta-session-model";
import { RadixColorOptions } from "@common/enum";
import { useUserStore } from "@stores/useUserStore";
import { useToast } from "@providers/toast-provider/toastProvider";
import { extractResponse } from "@utils/response";
import { get } from "@utils/supabase/helper";

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

const DashboardIndividualSession = () => {
  const user = useUserStore((state) => state.user);
  const { showToast } = useToast();
  const [sessions, setSessions] = useState<SloretaSession[]>([]);
  const [selectedSessionId, setSelectedSessionId] = useState<number | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [availableBrainwaveBands, setAvailableBrainwaveBands] = useState<
    string[]
  >([]);
  const [selectedBrainwaveBands, setSelectedBrainwaveBands] = useState<
    string[]
  >([]);
  const [filterActive, setFilterActive] = useState(false);
  const [sortOrder, setSortOrder] = useState<
    "alphabetical" | "value-asc" | "value-desc"
  >("alphabetical");
  const [availableLobes, setAvailableLobes] = useState<string[]>([]);
  const [selectedLobes, setSelectedLobes] = useState<string[]>([]);
  const [lobeFilterActive, setLobeFilterActive] = useState(false);

  // Filter toggle handler for brainwave bands
  const handleFilterToggle = () => {
    if (filterActive) {
      // If turning off filters, reset to show all bands
      setSelectedBrainwaveBands([...availableBrainwaveBands]);
    }
    setFilterActive(!filterActive);
  };

  // Filter toggle handler for brain lobes
  const handleLobeFilterToggle = () => {
    if (lobeFilterActive) {
      // If turning off filters, reset to show all lobes
      setSelectedLobes([...availableLobes]);
    }
    setLobeFilterActive(!lobeFilterActive);
  };

  // Handle brainwave band selection changes
  const handleBandSelectionChange = (band: string) => {
    setSelectedBrainwaveBands((prev) => {
      if (prev.includes(band)) {
        return prev.filter((b) => b !== band);
      } else {
        return [...prev, band];
      }
    });
  };

  // Handle brain lobe selection changes
  const handleLobeSelectionChange = (lobe: string) => {
    setSelectedLobes((prev) => {
      if (prev.includes(lobe)) {
        return prev.filter((l) => l !== lobe);
      } else {
        return [...prev, lobe];
      }
    });
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

        // Set the first session as default selected
        if (sessionsData.length > 0 && !selectedSessionId) {
          setSelectedSessionId(sessionsData[0].id);
        }

        // Extract unique brainwave bands
        const uniqueBands = new Set<string>();
        const uniqueLobes = new Set<string>();

        sessionsData.forEach((session: SloretaSession) => {
          session.sloreta_brainwave_data.forEach((data) => {
            uniqueBands.add(data.brainwave_band);
            if (data.lobe) uniqueLobes.add(data.lobe);
          });
        });

        const bandArray = Array.from(uniqueBands);
        const lobeArray = Array.from(uniqueLobes);

        setAvailableBrainwaveBands(bandArray);
        setSelectedBrainwaveBands(bandArray); // Initially select all bands

        setAvailableLobes(lobeArray);
        setSelectedLobes(lobeArray); // Initially select all lobes
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
  }, [user, showToast, selectedSessionId]);

  // Get the currently selected session
  const selectedSession = sessions.find((s) => s.id === selectedSessionId);

  // Prepare data for Bar Chart (Z-scores per Brainwave)
  const prepareZScoreData = () => {
    if (!selectedSession) return [];

    // Group by brainwave band and average z-scores
    const zScoresByBand: Record<string, { count: number; sum: number }> = {};

    selectedSession.sloreta_brainwave_data
      // Apply both brainwave band and lobe filters
      .filter((data) => {
        const passesBandFilter =
          !filterActive || selectedBrainwaveBands.includes(data.brainwave_band);
        const passesLobeFilter =
          !lobeFilterActive || (data.lobe && selectedLobes.includes(data.lobe));
        return passesBandFilter && passesLobeFilter;
      })
      .forEach((data) => {
        const band = data.brainwave_band;
        if (!zScoresByBand[band]) {
          zScoresByBand[band] = { count: 0, sum: 0 };
        }
        zScoresByBand[band].count += 1;
        zScoresByBand[band].sum += data.z_score;
      });

    // Convert to array of objects
    let result = Object.entries(zScoresByBand).map(([band, stats]) => ({
      name: band,
      Value: stats.sum / stats.count,
    }));

    // Apply sorting
    // switch (sortOrder) {
    //   case "alphabetical":
    //     result = result.sort((a, b) => a.name.localeCompare(b.name));
    //     break;
    //   case "value-asc":
    //     result = result.sort((a, b) => a.Value - b.Value);
    //     break;
    //   case "value-desc":
    //     result = result.sort((a, b) => b.Value - a.Value);
    //     break;
    // }

    return result;
  };

  // Prepare data for Radar Chart (Frequency by Brainwave)
  const prepareFrequencyData = () => {
    if (!selectedSession) return [];

    // Group by brainwave band and sum frequencies
    const frequenciesByBand: Record<string, number> = {};

    selectedSession.sloreta_brainwave_data
      // Apply both brainwave band and lobe filters
      .filter((data) => {
        const passesBandFilter =
          !filterActive || selectedBrainwaveBands.includes(data.brainwave_band);
        const passesLobeFilter =
          !lobeFilterActive || (data.lobe && selectedLobes.includes(data.lobe));
        return passesBandFilter && passesLobeFilter;
      })
      .forEach((data) => {
        const band = data.brainwave_band;
        if (!frequenciesByBand[band]) {
          frequenciesByBand[band] = 0;
        }
        frequenciesByBand[band] += data.frequency;
      });

    return Object.entries(frequenciesByBand).map(([band, frequency]) => ({
      subject: band,
      A: frequency,
      fullMark: Math.max(...Object.values(frequenciesByBand)) * 1.2 || 1, // Add fallback when array is empty
    }));
  };

  // Prepare data for Donut Chart (Brain Area Distribution)
  const prepareBrainLobeData = () => {
    if (!selectedSession) return [];

    // Count brainwaves per brain region
    const countByRegion: Record<string, number> = {};

    selectedSession.sloreta_brainwave_data
      // Apply both brainwave band and lobe filters
      .filter((data) => {
        const passesBandFilter =
          !filterActive || selectedBrainwaveBands.includes(data.brainwave_band);
        const passesLobeFilter =
          !lobeFilterActive || (data.lobe && selectedLobes.includes(data.lobe));
        return passesBandFilter && passesLobeFilter;
      })
      .forEach((data) => {
        const lobe = data.lobe || "Unknown";
        if (!countByRegion[lobe]) {
          countByRegion[lobe] = 0;
        }
        countByRegion[lobe] += 1;
      });

    return Object.entries(countByRegion)
      .map(([name, value]) => ({
        name,
        value,
      }))
      .filter((item) => item.name !== "Unknown" || item.value > 0); // Filter out 'Unknown' if it has no data
  };

  // Sort data based on the selected order
  // const sortData = (
  //   data: any[],
  //   dataType: "z-score" | "frequency" | "brain-lobe" = "z-score"
  // ) => {
  //   if (!data || data.length === 0) {
  //     return [];
  //   }

  //   const safeCopy = [...data];

  //   switch (sortOrder) {
  //     case "alphabetical":
  //       if (dataType === "frequency") {
  //         return safeCopy.sort((a, b) =>
  //           a.subject && b.subject ? a.subject.localeCompare(b.subject) : 0
  //         );
  //       } else {
  //         return safeCopy.sort((a, b) =>
  //           a.name && b.name ? a.name.localeCompare(b.name) : 0
  //         );
  //       }
  //     case "value-asc":
  //       if (dataType === "frequency") {
  //         return safeCopy.sort((a, b) => (a.A || 0) - (b.A || 0));
  //       } else if (dataType === "brain-lobe") {
  //         return safeCopy.sort((a, b) => (a.value || 0) - (b.value || 0));
  //       } else {
  //         return safeCopy.sort((a, b) => (a.Value || 0) - (b.Value || 0));
  //       }
  //     case "value-desc":
  //       if (dataType === "frequency") {
  //         return safeCopy.sort((a, b) => (b.A || 0) - (a.A || 0));
  //       } else if (dataType === "brain-lobe") {
  //         return safeCopy.sort((a, b) => (b.value || 0) - (a.value || 0));
  //       } else {
  //         return safeCopy.sort((a, b) => (b.Value || 0) - (a.Value || 0));
  //       }
  //     default:
  //       return safeCopy;
  //   }
  // };

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

  // Sort sessions by session number
  const sortedSessions = [...sessions].sort(
    (a, b) => a.session_number - b.session_number
  );

  // const zScoreData = sortData(prepareZScoreData(), "z-score");
  // const frequencyData = sortData(prepareFrequencyData(), "frequency");
  // const brainAreaData = sortData(prepareBrainLobeData(), "brain-lobe");

  const zScoreData = prepareZScoreData();
  const frequencyData = prepareFrequencyData();
  const brainAreaData = prepareBrainLobeData();

  return (
    <Box className="mt-4">
      <Flex justify="between" align="center" wrap="wrap" className="mb-6">
        <Heading
          size={{ initial: "5", sm: "6" }}
          color={RadixColorOptions.CYAN}
          className="mb-2 sm:mb-0"
        >
          Individual Session Summary
        </Heading>

        <Select.Root
          value={selectedSessionId?.toString()}
          onValueChange={(value) => setSelectedSessionId(Number(value))}
        >
          <Select.Trigger
            placeholder="Select a session"
            className="min-w-[180px]"
          />
          <Select.Content>
            {sortedSessions.map((session) => (
              <Select.Item key={session.id} value={session.id.toString()}>
                Session {session.session_number}
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Root>
      </Flex>

      {/* Filter controls section */}
      {selectedSession &&
        (availableBrainwaveBands.length > 0 || availableLobes.length > 0) && (
          <Box className="mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Brainwave Band Filter */}
              {availableBrainwaveBands.length > 0 && (
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
                              setSelectedBrainwaveBands([
                                ...availableBrainwaveBands,
                              ])
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
                          {availableBrainwaveBands.map((band) => (
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

              {/* Brain Lobe Filter */}
              {availableLobes.length > 0 && (
                <Box className="p-4 border rounded-lg shadow-sm bg-white dark:bg-gray-800">
                  <Flex direction="column" gap="3">
                    <Flex justify="between" align="center">
                      <Heading size="4">Filter by Brain Lobe</Heading>
                      <Flex align="center" gap="2">
                        {lobeFilterActive && (
                          <span className="inline-flex items-center justify-center w-6 h-6 bg-blue-100 text-blue-800 text-xs font-medium rounded-full dark:bg-blue-900 dark:text-blue-300">
                            {selectedLobes.length}
                          </span>
                        )}
                        <Text size="2">Filter</Text>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={lobeFilterActive}
                            onChange={handleLobeFilterToggle}
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
                          Filter brain regions
                        </div>
                      </Flex>
                    </Flex>

                    {lobeFilterActive && (
                      <>
                        <Flex gap="2" mb="2">
                          <button
                            className="px-3 py-1 text-xs font-medium rounded bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
                            onClick={() =>
                              setSelectedLobes([...availableLobes])
                            }
                          >
                            Select All
                          </button>
                          <button
                            className="px-3 py-1 text-xs font-medium rounded bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
                            onClick={() => setSelectedLobes([])}
                          >
                            Deselect All
                          </button>
                        </Flex>
                        <Flex wrap="wrap" gap="2">
                          {availableLobes.map((lobe) => (
                            <button
                              key={lobe}
                              onClick={() => handleLobeSelectionChange(lobe)}
                              className={`px-3 py-1 text-sm font-medium rounded-full transition-colors ${
                                selectedLobes.includes(lobe)
                                  ? "bg-blue-500 text-white"
                                  : "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                              }`}
                            >
                              {lobe}
                            </button>
                          ))}
                        </Flex>
                      </>
                    )}
                  </Flex>
                </Box>
              )}
            </div>
          </Box>
        )}

      {selectedSession ? (
        <Box className="chart-grid full-width-chart">
          {/* Show message when no data matches filters */}
          {((filterActive && selectedBrainwaveBands.length === 0) ||
            (lobeFilterActive && selectedLobes.length === 0)) && (
            <Box className="w-full col-span-full p-4 border rounded-lg shadow-sm chart-card bg-white dark:bg-gray-800 text-center">
              <Heading size="4" className="text-gray-500">
                No data to display
              </Heading>
              <Text size="2" className="text-gray-400">
                {filterActive && selectedBrainwaveBands.length === 0 && (
                  <>
                    Please select at least one brainwave band to display data.
                  </>
                )}
                {lobeFilterActive && selectedLobes.length === 0 && (
                  <>Please select at least one brain lobe to display data.</>
                )}
                {filterActive &&
                  lobeFilterActive &&
                  selectedBrainwaveBands.length === 0 &&
                  selectedLobes.length === 0 && (
                    <>
                      Please select at least one brainwave band and one brain
                      lobe to display data.
                    </>
                  )}
              </Text>
            </Box>
          )}

          {/* Only render charts if filters are satisfied or inactive */}
          {(!filterActive || selectedBrainwaveBands.length > 0) &&
            (!lobeFilterActive || selectedLobes.length > 0) && (
              <>
                {/* Bar Chart */}
                <Box className="w-full p-4 border rounded-lg shadow-sm chart-card bg-white dark:bg-gray-800">
                  <Flex justify="between" align="center" mb="3">
                    <Heading
                      size={{ initial: "4", sm: "5" }}
                      className="chart-title"
                    >
                      Z-scores per Brainwave Band
                      {((filterActive &&
                        selectedBrainwaveBands.length > 0 &&
                        selectedBrainwaveBands.length <
                          availableBrainwaveBands.length) ||
                        (lobeFilterActive &&
                          selectedLobes.length > 0 &&
                          selectedLobes.length < availableLobes.length)) && (
                        <Text
                          as="span"
                          size="2"
                          style={{ fontWeight: "normal", marginLeft: "8px" }}
                        >
                          (Filtered)
                        </Text>
                      )}
                    </Heading>

                    {/* <Select.Root
                      value={sortOrder}
                      onValueChange={(value) =>
                        setSortOrder(
                          value as "alphabetical" | "value-asc" | "value-desc"
                        )
                      }
                    >
                      <Select.Trigger className="min-w-[130px]">
                        <Flex align="center" gap="2">
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 15 15"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M3.5 5.5L7.5 1.5M7.5 1.5L11.5 5.5M7.5 1.5V13.5"
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <Text size="2">Sort by</Text>
                        </Flex>
                      </Select.Trigger>
                      <Select.Content>
                        <Select.Item value="alphabetical">
                          Alphabetical
                        </Select.Item>
                        <Select.Item value="value-asc">
                          Z-Score (Low to High)
                        </Select.Item>
                        <Select.Item value="value-desc">
                          Z-Score (High to Low)
                        </Select.Item>
                      </Select.Content>
                    </Select.Root> */}
                  </Flex>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart
                      data={zScoreData}
                      // margin={{ top: 5, right: 20, left: 10, bottom: 40 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" opacity={0.6} />
                      <XAxis
                        dataKey="name"
                        angle={-45}
                        textAnchor="end"
                        height={50}
                        tick={{ fill: "#555", fontSize: 11 }}
                      />
                      <YAxis
                        label={{
                          value: "Z-Score",
                          angle: -90,
                          position: "insideLeft",
                          fill: "#555",
                        }}
                        tick={{ fill: "#555", fontSize: 11 }}
                      />
                      <Tooltip
                        cursor={{ fill: "rgba(0, 0, 0, 0.05)" }}
                        contentStyle={{
                          borderRadius: "8px",
                          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                          backgroundColor: "rgba(255, 255, 255, 0.95)",
                          border: "none",
                        }}
                        formatter={(value: number) => [
                          `Z-Score: ${value.toFixed(2)}`,
                          "Z-Score",
                        ]}
                        labelFormatter={(label) => `Band: ${label}`}
                      />
                      <Bar
                        dataKey="Value"
                        fill="#8884d8"
                        animationDuration={1500}
                        animationEasing="ease-out"
                        radius={[4, 4, 0, 0]}
                      >
                        {zScoreData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </Box>

                {/* Radar Chart */}
                <Box className="w-full p-4 border rounded-lg shadow-sm chart-card bg-white dark:bg-gray-800">
                  <Heading
                    size={{ initial: "4", sm: "5" }}
                    className="chart-title"
                  >
                    Frequency by Brainwave Band
                    {((filterActive &&
                      selectedBrainwaveBands.length > 0 &&
                      selectedBrainwaveBands.length <
                        availableBrainwaveBands.length) ||
                      (lobeFilterActive &&
                        selectedLobes.length > 0 &&
                        selectedLobes.length < availableLobes.length)) && (
                      <Text
                        as="span"
                        size="2"
                        style={{ fontWeight: "normal", marginLeft: "8px" }}
                      >
                        (Filtered)
                      </Text>
                    )}
                  </Heading>
                  <ResponsiveContainer width="100%" height={300}>
                    <RadarChart
                      outerRadius={100}
                      data={frequencyData}
                      margin={{ top: 10, right: 20, bottom: 10, left: 20 }}
                    >
                      <PolarGrid stroke="#e5e7eb" />
                      <PolarAngleAxis
                        dataKey="subject"
                        tick={{ fill: "#555", fontSize: 11 }}
                      />
                      <PolarRadiusAxis
                        angle={30}
                        domain={[0, "auto"]}
                        tick={{ fill: "#555", fontSize: 11 }}
                      />
                      <Radar
                        name="Frequency (Hz)"
                        dataKey="A"
                        stroke="#8884d8"
                        fill="#8884d8"
                        fillOpacity={0.6}
                        animationDuration={1500}
                        animationEasing="ease-out"
                        strokeWidth={2}
                      />
                      <Legend
                        wrapperStyle={{ paddingTop: 5 }}
                        iconSize={8}
                        iconType="circle"
                        verticalAlign="bottom"
                      />
                      <Tooltip
                        contentStyle={{
                          borderRadius: "8px",
                          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                          backgroundColor: "rgba(255, 255, 255, 0.95)",
                          border: "none",
                        }}
                        formatter={(value: number) => [
                          `${value.toFixed(2)} Hz`,
                          "Frequency",
                        ]}
                        labelFormatter={(label) => `Band: ${label}`}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </Box>

                {/* Donut Chart */}
                <Box className="w-full p-4 border rounded-lg shadow-sm chart-card bg-white dark:bg-gray-800">
                  <Heading
                    size={{ initial: "4", sm: "5" }}
                    className="chart-title"
                  >
                    Brain Lobe Distribution
                    {((filterActive &&
                      selectedBrainwaveBands.length > 0 &&
                      selectedBrainwaveBands.length <
                        availableBrainwaveBands.length) ||
                      (lobeFilterActive &&
                        selectedLobes.length > 0 &&
                        selectedLobes.length < availableLobes.length)) && (
                      <Text
                        as="span"
                        size="2"
                        style={{ fontWeight: "normal", marginLeft: "8px" }}
                      >
                        (Filtered)
                      </Text>
                    )}
                  </Heading>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart
                      margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
                    >
                      <Pie
                        data={brainAreaData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={90}
                        fill="#8884d8"
                        paddingAngle={5}
                        dataKey="value"
                        nameKey="name"
                        label={({ name, value }) => `${name}: ${value}`}
                        animationDuration={1500}
                        animationEasing="ease-out"
                      >
                        {brainAreaData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                            stroke="#fff"
                            strokeWidth={2}
                          />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          borderRadius: "8px",
                          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                          backgroundColor: "rgba(255, 255, 255, 0.95)",
                          border: "none",
                        }}
                        itemStyle={{
                          color: "var(--text-default)",
                        }}
                        formatter={(value: number, name: string) => {
                          const total = brainAreaData.reduce(
                            (sum, entry) => sum + entry.value,
                            0
                          );
                          const percentage = ((value / total) * 100).toFixed(1);
                          return [`${value} (${percentage}%)`, name];
                        }}
                      />
                      <Legend
                        layout="horizontal"
                        verticalAlign="bottom"
                        align="center"
                        wrapperStyle={{ paddingTop: 5 }}
                        iconSize={8}
                        iconType="circle"
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </Box>

                {/* Placeholder for Heatmap (optional advanced) - Keep this for future implementation */}
                <Box className="w-full p-4 border rounded-lg shadow-sm chart-card bg-white dark:bg-gray-800 flex items-center justify-center text-center">
                  <Flex
                    direction="column"
                    align="center"
                    gap="2"
                    className="py-5"
                  >
                    <svg
                      width="40"
                      height="40"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M3 3H10V10H3V3Z"
                        fill="#e5e7eb"
                        stroke="#9ca3af"
                        strokeWidth="1"
                      />
                      <path
                        d="M14 3H21V10H14V3Z"
                        fill="#d1d5db"
                        stroke="#9ca3af"
                        strokeWidth="1"
                      />
                      <path
                        d="M14 14H21V21H14V14Z"
                        fill="#e5e7eb"
                        stroke="#9ca3af"
                        strokeWidth="1"
                      />
                      <path
                        d="M3 14H10V21H3V14Z"
                        fill="#d1d5db"
                        stroke="#9ca3af"
                        strokeWidth="1"
                      />
                    </svg>
                    <Heading
                      size={{ initial: "4", sm: "5" }}
                      className="text-gray-400"
                    >
                      Advanced Heatmap
                    </Heading>
                    <Text size="2" className="text-gray-400 text-center">
                      Coming soon: Z-scores mapped by brain area and brainwave
                      category.
                    </Text>
                  </Flex>
                </Box>
              </>
            )}
        </Box>
      ) : (
        <Box className="text-center p-8 border rounded-lg shadow-sm bg-white dark:bg-gray-800 mt-4">
          <Text size="4" weight="medium">
            Please select a session to view detailed charts.
          </Text>
        </Box>
      )}
    </Box>
  );
};

export default DashboardIndividualSession;
