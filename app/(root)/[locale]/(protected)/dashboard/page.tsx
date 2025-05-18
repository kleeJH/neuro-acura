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
import DashboardDatabase from "@components/protected/dashboard/dashboard-database";

const Dashboard = () => {
  const [view, setView] = useState("overview");

  return (
    <Box className="px-4 sm:px-6 md:px-8 lg:px-10">
      <Card>
        <Flex
          direction="column"
          className="p-2 sm:p-4 md:p-4"
          wrap="wrap"
          gap="4"
        >
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
          <Flex>
            <SegmentedControl.Root
              value={view}
              onValueChange={setView}
              size={{ initial: "1", xs: "1", sm: "2", md: "2" }}
            >
              <SegmentedControl.Item value="overview">
                Overview
              </SegmentedControl.Item>
              <SegmentedControl.Item value="individual-session">
                Session
              </SegmentedControl.Item>
              <SegmentedControl.Item value="database">
                Database
              </SegmentedControl.Item>
            </SegmentedControl.Root>
          </Flex>
          <Box>
            {view === "overview" && <Text>Overview Content</Text>}
            {view === "individual-session" && (
              <Text>Individual Session Content</Text>
            )}
            {view === "database" && <DashboardDatabase />}
          </Box>
        </Flex>
      </Card>
    </Box>
  );
};

export default Dashboard;
