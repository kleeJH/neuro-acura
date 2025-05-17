"use client";

import { useState } from "react";
import { signUpAction } from "@utils/supabase/actions";
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
import LowDefLogo from "@public/assets/images/logos/icon1.png";
import Google from "@public/assets/icons/google.png";
import { useRouter, useSearchParams } from "next/navigation";
import { CalloutQueryParameterType } from "@common/enum";
import CustomCallout from "@components/basic/ui/callout";
import { Eye, EyeOff } from "lucide-react";
import { useUserStore } from "@stores/useUserStore";

const SignUp = () => {
  const searchParams = useSearchParams();
  const errorMessage = searchParams.get(CalloutQueryParameterType.ERROR);
  const successMessage = searchParams.get(CalloutQueryParameterType.SUCCESS);

  const [password, setPassword] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const user = useUserStore((state) => state.user);
  const router = useRouter();

  if (user) {
    router.push("/dashboard");
  }

  const requirements: { label: string; test: (pwd: string) => boolean }[] = [
    {
      label: "Contain 8 to 30 characters",
      test: (pw) => pw.length >= 8 && pw.length <= 30,
    },
    {
      label: "Contain both lower and uppercase letters",
      test: (pw) => /(?=.*[a-z])(?=.*[A-Z])/.test(pw),
    },
    {
      label: "Contain 1 number",
      test: (pw) => /[0-9]/.test(pw),
    },
  ];

  const handlePasswordChange = (pw: string) => {
    setPassword(pw);
    setIsFormValid(requirements.every((req) => req.test(pw)));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const formData = new FormData(e.currentTarget);
      await signUpAction(formData);
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
              Sign Up
            </Heading>
            <Text size="2" color="gray" align="center" mb="6">
              Create an account
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
                  required
                />
              </Flex>
            </Box>

            <Box mb="5" position="relative">
              <Flex direction="column" gap="2">
                <Text
                  as="label"
                  size="3"
                  weight="medium"
                  mb="2"
                  htmlFor="password"
                >
                  Password
                </Text>
                <ul style={{ listStyle: "none", paddingLeft: 0, marginTop: 0 }}>
                  {requirements.map((req, idx) => {
                    const ok = req.test(password);
                    return (
                      <li
                        key={idx}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          color: ok ? "green" : "red",
                          marginBottom: 4,
                          fontSize: "0.9rem",
                        }}
                        className="font-satoshi"
                      >
                        <span style={{ marginRight: 8 }}>
                          {ok ? "✅" : "❌"}
                        </span>
                        {req.label}
                      </li>
                    );
                  })}
                </ul>
                <TextField.Root
                  tabIndex={2}
                  id="password"
                  name="password"
                  variant="classic"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  size="3"
                  required
                  onChange={(e) => handlePasswordChange(e.target.value)}
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

            <Box mb="5" position="relative">
              <Flex direction="column">
                <Text
                  as="label"
                  size="3"
                  weight="medium"
                  mb="2"
                  htmlFor="password"
                >
                  Confirm Password
                </Text>
                <TextField.Root
                  tabIndex={3}
                  id="confirm_password"
                  name="confirm_password"
                  variant="classic"
                  type={showPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  size="3"
                  required
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
                tabIndex={4}
                variant="surface"
                type="submit"
                highContrast
                color="gray"
                size="3"
                style={{ width: "100%" }}
                disabled={!isFormValid || !!successMessage || isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Spinner size="2" /> Creating account...
                  </>
                ) : (
                  "Create account"
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
                tabIndex={5}
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
                  Already have an account?
                </Text>
                <Link href="/sign-in">
                  <Button
                    tabIndex={6}
                    variant="solid"
                    size="3"
                    style={{
                      width: "100%",
                      backgroundColor: "var(--primary)",
                      color: "var(--text-default)",
                    }}
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

export default SectionWrapper(SignUp, "sign-up");
