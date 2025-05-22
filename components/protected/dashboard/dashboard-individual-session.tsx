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

    selectedSession.sloreta_brainwave_data.forEach((data) => {
      const band = data.brainwave_band;
      if (!zScoresByBand[band]) {
        zScoresByBand[band] = { count: 0, sum: 0 };
      }
      zScoresByBand[band].count += 1;
      zScoresByBand[band].sum += data.z_score;
    });

    return Object.entries(zScoresByBand).map(([band, stats]) => ({
      name: band,
      Value: stats.sum / stats.count,
    }));
  };

  // Prepare data for Radar Chart (Frequency by Brainwave)
  const prepareFrequencyData = () => {
    if (!selectedSession) return [];

    // Group by brainwave band and sum frequencies
    const frequenciesByBand: Record<string, number> = {};

    selectedSession.sloreta_brainwave_data.forEach((data) => {
      const band = data.brainwave_band;
      if (!frequenciesByBand[band]) {
        frequenciesByBand[band] = 0;
      }
      frequenciesByBand[band] += data.frequency;
    });

    return Object.entries(frequenciesByBand).map(([band, frequency]) => ({
      subject: band,
      A: frequency,
      fullMark: Math.max(...Object.values(frequenciesByBand)) * 1.2,
    }));
  };

  // Prepare data for Donut Chart (Brain Area Distribution)
  const prepareBrainLobeData = () => {
    if (!selectedSession) return [];

    // Count brainwaves per brain region
    const countByRegion: Record<string, number> = {};

    selectedSession.sloreta_brainwave_data.forEach((data) => {
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

      {selectedSession ? (
        <Box className="chart-grid full-width-chart">
          {/* Bar Chart */}
          <Box className="w-full p-4 border rounded-lg shadow-sm chart-card bg-white dark:bg-gray-800">
            <Heading size={{ initial: "4", sm: "5" }} className="chart-title">
              Z-scores per Brainwave Band
            </Heading>
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
                  }}
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
            <Heading size={{ initial: "4", sm: "5" }} className="chart-title">
              Frequency by Brainwave Band
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
                  }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </Box>

          {/* Donut Chart */}
          <Box className="w-full p-4 border rounded-lg shadow-sm chart-card bg-white dark:bg-gray-800">
            <Heading size={{ initial: "4", sm: "5" }} className="chart-title">
              Brain Lobe Distribution
            </Heading>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
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
                  }}
                  itemStyle={{
                    color: "var(--text-default)",
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
            <Flex direction="column" align="center" gap="2" className="py-5">
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
