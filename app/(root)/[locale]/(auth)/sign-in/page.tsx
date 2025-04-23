"use client";

import { CalloutQueryParameterType } from "@common/enum";
import SectionWrapper from "@components/basic/SectionWrapper";
import CustomCallout from "@components/basic/ui/callout";
import CustomLink from "@components/basic/ui/link";
import Google from "@public/assets/icons/google.png";
import LowDefLogo from "@public/assets/images/logos/icon1.png";
import {
  Box,
  Button,
  Card,
  Flex,
  Heading,
  IconButton,
  Spinner,
  Text,
  TextField,
} from "@radix-ui/themes";
import { signInAction } from "@utils/supabase/actions";
import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

const SignIn = () => {
  const searchParams = useSearchParams();
  const infoMessage = searchParams.get(CalloutQueryParameterType.INFO);
  const errorMessage = searchParams.get(CalloutQueryParameterType.ERROR);
  const successMessage = searchParams.get(CalloutQueryParameterType.SUCCESS);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const formData = new FormData(e.currentTarget);
      await signInAction(formData);
    } catch (error) {
      // console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box width="100%" mx="auto" maxWidth="600px">
      <Card
        asChild
        variant="classic"
        size="4"
        style={{ boxShadow: "var(--shadow-3)" }}
      >
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
              Sign In
            </Heading>
            <Text size="2" color="gray" align="center" mb="6">
              Sign in to your account
            </Text>
          </Flex>

          {infoMessage && (
            <Box mb="5" position="relative">
              <CustomCallout
                type="info"
                text={infoMessage}
                variant="surface"
                size="1"
              />
            </Box>
          )}

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
                  required
                  size="3"
                />
              </Flex>
            </Box>

            <Box mb="5" position="relative">
              <Box position="absolute" top="0" right="0">
                <CustomLink href="/forgot-password" text="Forgot password?" />
              </Box>

              <Flex direction="column">
                <Text
                  as="label"
                  size="3"
                  weight="medium"
                  mb="2"
                  htmlFor="password"
                >
                  Password
                </Text>
                <TextField.Root
                  tabIndex={2}
                  id="password"
                  name="password"
                  variant="classic"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  required
                  size="3"
                >
                  <TextField.Slot side="right">
                    <IconButton
                      size="1"
                      variant="ghost"
                      onClick={(e) => {
                        e.preventDefault();
                        setShowPassword(!showPassword);
                      }}
                    >
                      {showPassword ? (
                        <Eye height="16" width="16" />
                      ) : (
                        <EyeOff height="16" width="16" />
                      )}
                    </IconButton>
                  </TextField.Slot>
                </TextField.Root>
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
                tabIndex={3}
                variant="solid"
                type="submit"
                size="3"
                style={{
                  width: "100%",
                  backgroundColor: "var(--primary)",
                  color: "var(--text-default)",
                }}
                disabled={!!successMessage || isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Spinner size="2" /> Signing in...
                  </>
                ) : (
                  "Sign in"
                )}
              </Button>
            </Box>

            {/* Divider */}
            <Flex align="center" my="4" mb="5">
              <Box flexGrow="1" height="1px" className="bg-textDefault" />
              <Text size="2" mx="3" className="text-textDefault">
                or
              </Text>
              <Box flexGrow="1" height="1px" className="bg-textDefault" />
            </Flex>

            <Box position="relative" mb="6">
              <Button
                tabIndex={4}
                variant="surface"
                size="3"
                style={{ width: "100%" }}
                className=""
                disabled
              >
                <Image
                  src={Google}
                  alt="Google Logo"
                  width={24}
                  height={24}
                  style={{
                    width: "24px",
                    height: "24px",
                    borderRadius: "50%",
                    objectFit: "cover",
                    backgroundColor: "white",
                    padding: "2px", // optional: gives it breathing room
                  }}
                />
                Continue with Google
              </Button>
            </Box>

            <Box position="relative">
              <Flex direction="column" gap="2">
                <Text size="2" mt="4">
                  Don&apos;t have an account?
                </Text>
                <Link href="/sign-up">
                  <Button
                    tabIndex={5}
                    variant="surface"
                    highContrast
                    color="gray"
                    size="3"
                    style={{ width: "100%" }}
                  >
                    Create account
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

export default SectionWrapper(SignIn, "sign-in");
