"use client";

import { useState } from "react";
import { signInAction } from "@utils/supabase/actions";
import SectionWrapper from "@components/basic/SectionWrapper";
import {
  Card,
  Text,
  Box,
  Button,
  Flex,
  Heading,
  TextField,
  IconButton,
  Spinner,
} from "@radix-ui/themes";
import Link from "next/link";
import Image from "next/image";
import CustomLink from "@components/basic/ui/link";
import LowDefLogo from "@public/assets/images/logos/icon1.png";
import Google from "@public/assets/icons/google.png";
import { useSearchParams } from "next/navigation";
import { AuthResponseStatusType } from "@common/enum";
import CustomCallout from "@components/basic/ui/callout";
import { Eye, EyeOff } from "lucide-react";

const SignIn = () => {
  const searchParams = useSearchParams();
  const errorMessage = searchParams.get(AuthResponseStatusType.ERROR);
  const successMessage = searchParams.get(AuthResponseStatusType.SUCCESS);

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
              Sign In
            </Heading>
            <Text size="2" color="gray" align="center" mb="6">
              Sign in to your account
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
                variant="solid"
                type="submit"
                size="3"
                style={{ width: "100%", backgroundColor: "var(--primary)" }}
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
