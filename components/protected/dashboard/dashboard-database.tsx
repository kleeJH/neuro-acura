import SloretaSession from "@common/models/sloreta-session-model";
import { useToast } from "@providers/toast-provider/toastProvider";
import { useUserStore } from "@stores/useUserStore";
import { extractResponse } from "@utils/response";
import { get } from "@utils/supabase/helper";
import React, { useEffect, useState } from "react";
import BrainwaveDataTable from "./brainwave-data-table";
import { Box, Flex, Heading, Spinner, Text } from "@radix-ui/themes";
import { RadixColorOptions } from "@common/enum";

const DashboardDatabase = () => {
  const user = useUserStore((state) => state.user);
  const { showToast } = useToast();
  const [data, setData] = useState<SloretaSession[]>([]);
  const [loading, setLoading] = useState(true);

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
      <Box className="text-center p-8 mt-4">
        No data available. Please add session data to view data.
      </Box>
    );
  }

  return (
    <>
      {data.map((session) => (
        <div key={session.id} className="mt-4">
          <Heading
            size={{ initial: "5", sm: "6" }}
            color={RadixColorOptions.CYAN}
            className="mb-4"
          >{`Session ${session.session_number}`}</Heading>
          <BrainwaveDataTable brainwaveData={session.sloreta_brainwave_data} />
        </div>
      ))}
    </>
  );
};

export default DashboardDatabase;
