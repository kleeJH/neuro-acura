import SloretaSession from "@common/models/sloreta-session-model";
import BrainwaveData from "@common/models/sloreta-brainwave-data-model";
import { useToast } from "@providers/toast-provider/toastProvider";
import { useUserStore } from "@stores/useUserStore";
import { extractResponse } from "@utils/response";
import { get } from "@utils/supabase/helper";
import React, { useEffect, useState, useMemo } from "react";
import {
  Box,
  Flex,
  Heading,
  Spinner,
  Text,
  Tabs,
  Card,
  Badge,
  Table,
  ScrollArea,
  Select,
  TextField,
  Grid,
  Button,
} from "@radix-ui/themes";
import { RadixColorOptions } from "@common/enum";
import { Search } from "lucide-react";

// Add some utility CSS classes for responsive design
const responsiveStyles = `
  /* Responsive text cell sizes */
  .text-cell-sm { max-width: 100px; }
  .md\\:text-cell-md { max-width: 150px; }
  .lg\\:text-cell-lg { max-width: 200px; }

  /* Custom line clamping */
  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  /* Tabs container for horizontal scrolling */
  .tabs-container {
    display: flex;
    min-width: fit-content;
  }
`;

// Helper function to determine badge color based on z-score
type BadgeColor = "red" | "orange" | "green" | "blue" | "purple";
const getBadgeColorForZScore = (zScore: number): BadgeColor => {
  if (zScore < -2) return "red";
  if (zScore < -1) return "orange";
  if (zScore < 1) return "green";
  if (zScore < 2) return "blue";
  return "purple";
};

// Component to display z-score with appropriate coloring
const ZScoreBadge = ({ zScore }: { zScore: number }) => {
  const color = getBadgeColorForZScore(zScore);
  return (
    <Badge color={color} variant="soft">
      {zScore.toFixed(2)}
    </Badge>
  );
};

// Enhanced single brainwave data entry display as a card
const BrainwaveDataCard = ({ data }: { data: BrainwaveData }) => {
  return (
    <Card size={{ initial: "1", sm: "2" }} style={{ height: "100%" }}>
      <Flex direction="column" gap="2">
        <Flex justify="between" align="center" wrap="wrap" gap="1">
          <Heading
            as="h3"
            size={{ initial: "2", sm: "3" }}
            style={{ wordBreak: "break-word", maxWidth: "calc(100% - 60px)" }}
          >
            {data.brainwave_band}
          </Heading>
          <ZScoreBadge zScore={data.z_score} />
        </Flex>

        <Flex gap="1" wrap="wrap">
          <Badge variant="outline">{data.frequency} Hz</Badge>
          {data.lobe && <Badge variant="outline">{data.lobe}</Badge>}
          {data.region && <Badge variant="outline">{data.region}</Badge>}
        </Flex>

        <Box>
          <Text as="div" weight="bold" size="2">
            Brodmann Area:
          </Text>
          <Text as="div" size="2">
            {data.brodmann_area}
          </Text>
        </Box>

        {data.functions && (
          <Box>
            <Text as="div" weight="bold" size="2">
              Functions:
            </Text>
            <Text
              as="div"
              size="1"
              style={{ maxHeight: "80px", overflow: "auto" }}
            >
              {data.functions}
            </Text>
          </Box>
        )}

        {data.possible_symptoms_of_defect && (
          <Box>
            <Text as="div" weight="bold" size="2">
              Possible Symptoms:
            </Text>
            <Text
              as="div"
              size="1"
              style={{ maxHeight: "80px", overflow: "auto" }}
            >
              {data.possible_symptoms_of_defect}
            </Text>
          </Box>
        )}
      </Flex>
    </Card>
  );
};

// Mobile-friendly session selector using Select dropdown
const SessionDropdown = ({
  sessions,
  selectedSessionId,
  onSelectSession,
}: {
  sessions: SloretaSession[];
  selectedSessionId: number;
  onSelectSession: (sessionId: number) => void;
}) => {
  return (
    <Box className="mb-4">
      <Select.Root
        value={String(selectedSessionId)}
        onValueChange={(value) => onSelectSession(Number(value))}
      >
        <Select.Trigger className="w-full" aria-label="Select session">
          Session{" "}
          {sessions.find((s) => s.id === selectedSessionId)?.session_number ||
            ""}
        </Select.Trigger>
        <Select.Content>
          {sessions.map((session) => (
            <Select.Item key={session.id} value={String(session.id)}>
              Session {session.session_number}
            </Select.Item>
          ))}
        </Select.Content>
      </Select.Root>
    </Box>
  );
};

// Component for the traditional table view (can be toggled)
const BrainwaveDataTable = ({
  brainwaveData,
}: {
  brainwaveData: BrainwaveData[];
}) => {
  return (
    <ScrollArea
      className="max-w-[85vw] sm:max-w-[85vw] md:max-w-[100vw]"
      scrollbars="horizontal"
    >
      <Table.Root
        size={{ initial: "1", md: "2" }}
        variant="surface"
        style={{ minWidth: "800px" }}
      >
        <Table.Header
          style={{
            position: "sticky",
            top: 0,
            backgroundColor: "var(--color-background)",
            zIndex: 1,
          }}
        >
          <Table.Row>
            <Table.ColumnHeaderCell>Brainwave Band</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Z-Score</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Frequency (Hz)</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Lobe</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Region</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Brodmann Area</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Functions</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Symptoms</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {brainwaveData.map((data) => (
            <Table.Row key={data.id}>
              <Table.Cell>
                <Text size={{ initial: "1", md: "2" }}>
                  {data.brainwave_band}
                </Text>
              </Table.Cell>
              <Table.Cell>
                <ZScoreBadge zScore={data.z_score} />
              </Table.Cell>
              <Table.Cell>
                <Text size={{ initial: "1", md: "2" }}>{data.frequency}</Text>
              </Table.Cell>
              <Table.Cell>
                <Text size={{ initial: "1", md: "2" }}>{data.lobe || "-"}</Text>
              </Table.Cell>
              <Table.Cell>
                <Text size={{ initial: "1", md: "2" }}>
                  {data.region || "-"}
                </Text>
              </Table.Cell>
              <Table.Cell>
                <Text size={{ initial: "1", md: "2" }}>
                  {data.brodmann_area}
                </Text>
              </Table.Cell>
              <Table.Cell
                style={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  maxWidth: "150px",
                }}
                className="text-cell-sm md:text-cell-md lg:text-cell-lg"
              >
                <Text size={{ initial: "1", md: "2" }} className="line-clamp-2">
                  {data.functions || "-"}
                </Text>
              </Table.Cell>
              <Table.Cell
                style={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  maxWidth: "150px",
                }}
                className="text-cell-sm md:text-cell-md lg:text-cell-lg"
              >
                <Text size={{ initial: "1", md: "2" }} className="line-clamp-2">
                  {data.possible_symptoms_of_defect || "-"}
                </Text>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </ScrollArea>
  );
};

// Grid view for brainwave data
const BrainwaveDataGrid = ({
  brainwaveData,
}: {
  brainwaveData: BrainwaveData[];
}) => {
  return (
    <Grid
      columns={{ initial: "1", xs: "1", sm: "2", md: "3", lg: "4", xl: "5" }}
      gap={{ initial: "2", sm: "3" }}
    >
      {brainwaveData.map((data) => (
        <BrainwaveDataCard key={data.id} data={data} />
      ))}
    </Grid>
  );
};

const DashboardDatabase = () => {
  const user = useUserStore((state) => state.user);
  const { showToast } = useToast();
  const [data, setData] = useState<SloretaSession[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewType, setViewType] = useState<"grid" | "table">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState<{
    field: keyof BrainwaveData;
    order: "asc" | "desc";
  }>({
    field: "z_score",
    order: "desc",
  });

  // Track the active session
  const [activeSessionId, setActiveSessionId] = useState<number | null>(null);

  // Add responsive styles to the document
  useEffect(() => {
    const styleElement = document.createElement("style");
    styleElement.innerHTML = responsiveStyles;
    document.head.appendChild(styleElement);

    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);

  const [filterBand, setFilterBand] = useState<string>("all");

  useEffect(() => {
    const fetchData = async () => {
      if (!user?.id) return;

      setLoading(true);
      const nextResponse = await get(
        `/api/sloreta-session-data/get-all-data?user_id=${user?.id}`
      );
      const response = await extractResponse(nextResponse);

      if (response.ok) {
        setData(response.data ?? []);
        // Set the initial active session
        if (response.data?.length) {
          setActiveSessionId(response.data[0].id);
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
  }, [showToast, user]);

  // Get unique brainwave bands from all sessions
  const uniqueBrainwaveBands = useMemo(() => {
    const bands = new Set<string>();
    bands.add("all");

    data.forEach((session) => {
      session.sloreta_brainwave_data.forEach((bwData) => {
        bands.add(bwData.brainwave_band);
      });
    });

    return Array.from(bands);
  }, [data]);

  // Filter and sort the data for the current session
  const filterAndSortBrainwaveData = (brainwaveData: BrainwaveData[]) => {
    return brainwaveData
      .filter((item) => {
        // Filter by search query across all text fields
        if (
          searchQuery &&
          !(
            item.brainwave_band
              ?.toLowerCase()
              .includes(searchQuery.toLowerCase()) ||
            item.lobe?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.region?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.functions?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.possible_symptoms_of_defect
              ?.toLowerCase()
              .includes(searchQuery.toLowerCase())
          )
        ) {
          return false;
        }

        // Filter by brainwave band
        if (filterBand !== "all" && item.brainwave_band !== filterBand) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        // Use type-safe access for specific fields we know exist
        let fieldA, fieldB;

        switch (sortOption.field) {
          case "brainwave_band":
            fieldA = a.brainwave_band;
            fieldB = b.brainwave_band;
            break;
          case "z_score":
            fieldA = a.z_score;
            fieldB = b.z_score;
            break;
          case "frequency":
            fieldA = a.frequency;
            fieldB = b.frequency;
            break;
          case "lobe":
            fieldA = a.lobe || "";
            fieldB = b.lobe || "";
            break;
          case "region":
            fieldA = a.region || "";
            fieldB = b.region || "";
            break;
          case "brodmann_area":
            fieldA = a.brodmann_area;
            fieldB = b.brodmann_area;
            break;
          default:
            // Default to z_score if field is not recognized
            fieldA = a.z_score;
            fieldB = b.z_score;
        }

        if (fieldA === undefined || fieldA === null) return 1;
        if (fieldB === undefined || fieldB === null) return -1;

        if (typeof fieldA === "string" && typeof fieldB === "string") {
          return sortOption.order === "asc"
            ? fieldA.localeCompare(fieldB)
            : fieldB.localeCompare(fieldA);
        }

        return sortOption.order === "asc"
          ? Number(fieldA) - Number(fieldB)
          : Number(fieldB) - Number(fieldA);
      });
  };

  // Find the active session data
  const activeSession = useMemo(() => {
    return data.find((session) => session.id === activeSessionId) || null;
  }, [data, activeSessionId]);

  // Handle session change from tabs or dropdown
  const handleSessionChange = (sessionId: number) => {
    setActiveSessionId(sessionId);
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

  if (!data.length) {
    return (
      <Box className="text-center p-4 sm:p-8 mt-2 sm:mt-4">
        <Card className="p-4 sm:p-8 mx-auto max-w-md">
          <Flex direction="column" align="center" gap="3">
            <Text
              size={{ initial: "4", sm: "5" }}
              weight="bold"
              color={RadixColorOptions.AMBER}
            >
              No Data Available
            </Text>
            <Text
              className="mt-1"
              size={{ initial: "2", sm: "3" }}
              align="center"
            >
              Please add session data to view brainwave data.
            </Text>
          </Flex>
        </Card>
      </Box>
    );
  }

  return (
    <Box className="">
      <Heading
        size={{ initial: "5", sm: "6" }}
        color={RadixColorOptions.CYAN}
        className="mb-4 sm:mb-6"
        style={{ wordBreak: "break-word" }}
      >
        Brainwave Data
      </Heading>

      {/* Controls Panel */}
      <Card className="mb-4">
        <Flex
          direction="row"
          align="center"
          gap="3"
          wrap="wrap"
          justify={{ initial: "between", sm: "between" }}
        >
          <Flex gap="3" wrap="wrap" align="center" direction="row">
            <TextField.Root
              placeholder="Search data..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            >
              <TextField.Slot side="left">
                <Search height="16" width="16" />
              </TextField.Slot>
            </TextField.Root>

            <Select.Root
              value={filterBand}
              onValueChange={(value) => setFilterBand(value)}
            >
              <Select.Trigger placeholder="Filter by band" />
              <Select.Content>
                {uniqueBrainwaveBands.map((band) => (
                  <Select.Item key={band} value={band}>
                    {band === "all" ? "All Bands" : band}
                  </Select.Item>
                ))}
              </Select.Content>
            </Select.Root>

            <Select.Root
              value={sortOption.field + "-" + sortOption.order}
              onValueChange={(value) => {
                // Using a different separator to avoid confusion with potential field names
                const [fieldPart, orderPart] = value.split("-");

                // Type safety check for valid field names
                let field: keyof BrainwaveData = "z_score"; // Default
                if (
                  fieldPart === "brainwave_band" ||
                  fieldPart === "z_score" ||
                  fieldPart === "frequency" ||
                  fieldPart === "lobe" ||
                  fieldPart === "region" ||
                  fieldPart === "brodmann_area"
                ) {
                  field = fieldPart as keyof BrainwaveData;
                }

                const order = orderPart === "asc" ? "asc" : "desc";
                setSortOption({ field, order });
              }}
            >
              <Select.Trigger placeholder="Sort by" />
              <Select.Content>
                <Select.Item value="z_score-desc">
                  Z-Score (High to Low)
                </Select.Item>
                <Select.Item value="z_score-asc">
                  Z-Score (Low to High)
                </Select.Item>
                <Select.Item value="frequency-desc">
                  Frequency (High to Low)
                </Select.Item>
                <Select.Item value="frequency-asc">
                  Frequency (Low to High)
                </Select.Item>
                <Select.Item value="brainwave_band-asc">Band (A-Z)</Select.Item>
                <Select.Item value="brainwave_band-desc">
                  Band (Z-A)
                </Select.Item>
              </Select.Content>
            </Select.Root>
          </Flex>

          <Flex gap="2" align="center" className="mt-2 md:mt-0">
            <Button
              variant={viewType === "grid" ? "solid" : "outline"}
              onClick={() => setViewType("grid")}
              className="flex-1 sm:flex-none max-w-[50%] sm:max-w-none"
            >
              Grid
            </Button>
            <Button
              variant={viewType === "table" ? "solid" : "outline"}
              onClick={() => setViewType("table")}
              className="flex-1 sm:flex-none max-w-[50%] sm:max-w-none"
            >
              Table
            </Button>
          </Flex>
        </Flex>
      </Card>

      {/* Session Selection */}
      <SessionDropdown
        sessions={data}
        selectedSessionId={activeSessionId || data[0]?.id}
        onSelectSession={handleSessionChange}
      />

      {/* Active Session Content */}
      {activeSession && (
        <Box className="mt-2 sm:mt-4">
          <Card className="mb-4 p-2 sm:p-3">
            <Flex direction="column" gap="1">
              <Flex justify="between" wrap="wrap" gap="2" className="w-full">
                <Box>
                  <Flex align="center" gap="2">
                    <Text weight="bold" size={{ initial: "2", sm: "3" }}>
                      Session Date:
                    </Text>
                    <Text size={{ initial: "2", sm: "3" }}>
                      {new Date(activeSession.created_at).toLocaleString()}
                    </Text>
                  </Flex>
                  <Text size="2" color="gray" className="mt-1">
                    Session ID: {activeSession.id}
                  </Text>
                </Box>

                <Box className="hidden md:block">
                  <Badge color="blue" size="2">
                    {activeSession.sloreta_brainwave_data.length} Data Points
                  </Badge>
                </Box>
              </Flex>
            </Flex>
          </Card>

          {/* Session Data Display */}
          {(() => {
            const filteredData = filterAndSortBrainwaveData(
              activeSession.sloreta_brainwave_data
            );

            if (filteredData.length === 0) {
              return (
                <Box className="text-center p-4 sm:p-8">
                  <Text size={{ initial: "3", sm: "4" }} color="gray">
                    No matching data for your search criteria
                  </Text>
                </Box>
              );
            }

            return viewType === "grid" ? (
              <BrainwaveDataGrid brainwaveData={filteredData} />
            ) : (
              <BrainwaveDataTable brainwaveData={filteredData} />
            );
          })()}
        </Box>
      )}
    </Box>
  );
};

export default DashboardDatabase;
