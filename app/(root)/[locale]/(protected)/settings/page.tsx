"use client";

import SectionWrapper from "@components/basic/SectionWrapper";
import { Card, Text, Box, Button, Flex, Heading } from "@radix-ui/themes";
import { useSearchParams, useRouter } from "next/navigation";
import { CalloutQueryParameterType, RadixColorOptions } from "@common/enum";
import CustomCallout from "@components/basic/ui/callout";
import Divider from "@components/basic/ui/divider";

const Settings = () => {
  const router = useRouter();

  const searchParams = useSearchParams();
  const errorMessage = searchParams.get(CalloutQueryParameterType.ERROR);
  const successMessage = searchParams.get(CalloutQueryParameterType.SUCCESS);

  return (
    <Box width="100%" mx="auto" maxWidth="1200px">
      {errorMessage && (
        <Box mb="5" position="relative">
          <CustomCallout
            type="error"
            text={errorMessage}
            variant="surface"
            size="1"
          />
        </Box>
      )}

      {successMessage && (
        <Box mb="5" position="relative">
          <CustomCallout
            type="success"
            text={successMessage}
            variant="surface"
            size="1"
          />
        </Box>
      )}
      <Card
        asChild
        variant="classic"
        size="4"
        style={{ boxShadow: "var(--shadow-3)" }}
      >
        <Box px="7">
          <Box position="relative" mb="7">
            <Flex direction="column" gap="2">
              <Heading as="h1" size="8" weight="medium">
                Settings
              </Heading>
              <Text size="2" color={RadixColorOptions.GRAY} weight="light">
                Manage your account settings.
              </Text>
            </Flex>
          </Box>

          <Divider />

          <Box position="relative" mb="7">
            <Flex
              direction="row"
              align="center"
              justify="between"
              wrap="wrap"
              gap="5"
            >
              <Flex direction="column" gap="2">
                <Heading as="h1" size="5" weight="medium">
                  Change Password
                </Heading>
                <Text size="2" color={RadixColorOptions.GRAY} weight="light">
                  Reset your user password.
                </Text>
              </Flex>
              <Button
                variant="surface"
                size="3"
                highContrast
                color={RadixColorOptions.GRAY}
                onClick={() => router.push("/settings/reset-password")}
              >
                Change Password
              </Button>
            </Flex>
          </Box>

          <Divider />
        </Box>
      </Card>
    </Box>
  );
};

export default SectionWrapper(Settings, "settings");
