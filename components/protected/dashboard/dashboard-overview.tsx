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
import { Box, Flex, Heading, Spinner, Text } from "@radix-ui/themes";
import SloretaSession from "@common/models/sloreta-session-model";
import BrainwaveData from "@common/models/sloreta-brainwave-data-model";
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

const DashboardOverview = () => {
  const user = useUserStore((state) => state.user);
  const { showToast } = useToast();
  const [sessions, setSessions] = useState<SloretaSession[]>([]);
  const [loading, setLoading] = useState(true);
  const [brainwaveBands, setBrainwaveBands] = useState<string[]>([]);

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
    return sessions
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
    return sessions
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
    const totalFrequencies: Record<string, number> = {};
    let allFrequenciesSum = 0;

    // Sum up frequencies by brainwave band across all sessions
    sessions.forEach((session) => {
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
    // First, organize data by session
    const sessionData: Record<number, Record<string, number>> = {};

    sessions.forEach((session) => {
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

      <Flex direction="column" gap="6" className="full-width-chart">
        {/* Grouped Bar Chart */}
        <Box className="w-full p-4 border rounded-lg shadow-sm chart-card bg-white dark:bg-gray-800">
          <Heading
            size={{ initial: "4", sm: "5" }}
            className="chart-title pb-6"
          >
            Z-Scores by Brainwave Across Sessions
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
              {brainwaveBands.map((band, index) => (
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
              {brainwaveBands.map((band, index) => (
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
              {brainwaveBands.map((band, index) => (
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
      </Flex>
    </Box>
  );
};

export default DashboardOverview;
