"use client";

import {
  Box,
  Card,
  Flex,
  Heading,
  SegmentedControl,
  Text,
} from "@radix-ui/themes";
import { useState } from "react";
import AddSessionDataDialog from "@components/protected/dashboard/add-session-data-dialog";
import DeleteDataDialog from "@components/protected/dashboard/delete-data-dialog";

const Dashboard = () => {
  const [view, setView] = useState("overview");

  return (
    <Box className="p-8">
      <Card className="p-8">
        <Flex direction="column" className="p-6" wrap="wrap" gap="4">
          <Flex
            direction="row"
            justify="between"
            wrap="wrap"
            align="center"
            gap="3"
            className="mb-4"
          >
            <Heading size={{ initial: "7", sm: "8" }} className="font-bold">
              Dashboard
            </Heading>
            <Flex direction="row" gap="3" wrap="wrap">
              <AddSessionDataDialog />
              <DeleteDataDialog />
            </Flex>
          </Flex>
          <Flex
            direction="row"
            gap="3"
            className="max-w-[200px]"
            justify="start"
          >
            <SegmentedControl.Root
              value={view}
              onValueChange={setView}
              radius="large"
              size={{ initial: "1", xs: "1", sm: "2", md: "2" }}
            >
              <SegmentedControl.Item value="overview">
                Overview
              </SegmentedControl.Item>
              <SegmentedControl.Item value="individual-session">
                Individual Session
              </SegmentedControl.Item>
            </SegmentedControl.Root>
          </Flex>
          <Box className="mt-6">
            {view === "overview" && <Text>Overview Content</Text>}
            {view === "individual-session" && (
              <Text>Individual Session Content</Text>
            )}
          </Box>
        </Flex>
      </Card>
    </Box>
  );
};

export default Dashboard;
