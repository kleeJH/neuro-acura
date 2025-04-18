"use client";

import { useState } from "react";
import { forgotPasswordAction } from "@utils/supabase/actions";
import SectionWrapper from "@components/basic/SectionWrapper";
import {
  Card,
  Text,
  Box,
  Button,
  Flex,
  Heading,
  TextField,
  Spinner,
} from "@radix-ui/themes";
import Link from "next/link";
import Image from "next/image";
import LowDefLogo from "@public/assets/images/logos/icon1.png";
import { useSearchParams } from "next/navigation";
import { CalloutQueryParameterType } from "@common/enum";
import CustomCallout from "@components/basic/ui/callout";

const ForgotPassword = async () => {
  const searchParams = useSearchParams();
  const errorMessage = searchParams.get(CalloutQueryParameterType.ERROR);
  const successMessage = searchParams.get(CalloutQueryParameterType.SUCCESS);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const formData = new FormData(e.currentTarget);
      await forgotPasswordAction(formData);
    } catch (error) {
      // console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box width="100%" mx="auto" maxWidth="600px">
      <Card asChild variant="classic" size="4">
        <Box px="7">
          <Flex direction="column" align="center" gap="4">
            <Image
              src={LowDefLogo}
              alt="NeuroAcura Logo"
              width={64}
              height={64}
              style={{
                width: "64px",
                height: "64px",
                objectFit: "contain",
                marginBottom: "16px",
              }}
            />
            <Heading as="h3" size="6" align="center">
              Reset Password
            </Heading>
            <Text size="2" color="gray" align="center" mb="6">
              Did you forget?
            </Text>
          </Flex>
          <form onSubmit={handleSubmit}>
            <Box mb="5">
              <Flex direction="column">
                <Text
                  as="label"
                  size="3"
                  weight="medium"
                  mb="2"
                  htmlFor="email"
                >
                  Email address
                </Text>
                <TextField.Root
                  tabIndex={1}
                  id="email"
                  name="email"
                  type="email"
                  variant="classic"
                  placeholder="you@example.com"
                  size="3"
                />
              </Flex>
            </Box>

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

            <Box mb="5" position="relative">
              <Button
                tabIndex={2}
                variant="solid"
                type="submit"
                size="3"
                color="red"
                style={{ width: "100%" }}
                disabled={!!successMessage || isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Spinner size="2" /> Preparing reset email...
                  </>
                ) : (
                  "Reset Password"
                )}
              </Button>
            </Box>

            <Box position="relative">
              <Flex direction="column" gap="2">
                <Text size="2" mt="4">
                  Already have an account?
                </Text>
                <Link href="/sign-in">
                  <Button
                    tabIndex={3}
                    variant="solid"
                    size="3"
                    style={{ width: "100%", backgroundColor: "var(--primary)" }}
                  >
                    Sign in
                  </Button>
                </Link>
              </Flex>
            </Box>
          </form>
        </Box>
      </Card>
    </Box>
  );
};

export default SectionWrapper(ForgotPassword, "forgot-password");
