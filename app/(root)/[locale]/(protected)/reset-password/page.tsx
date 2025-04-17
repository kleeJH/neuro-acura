"use client";

import { useState } from "react";
import { resetPasswordAction } from "@utils/supabase/actions";
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
} from "@radix-ui/themes";
import Image from "next/image";
import LowDefLogo from "@public/assets/images/logos/icon1.png";
import { useSearchParams } from "next/navigation";
import { AuthResponseStatusType } from "@common/enum";
import CustomCallout from "@components/basic/ui/callout";
import { Eye, EyeOff } from "lucide-react";

const ResetPassword = () => {
  const searchParams = useSearchParams();
  const errorMessage = searchParams.get(AuthResponseStatusType.ERROR);
  const successMessage = searchParams.get(AuthResponseStatusType.SUCCESS);

  const [password, setPassword] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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
      await resetPasswordAction(formData);
    } catch (error) {
      console.error(error);
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
              Please enter your new password below
            </Text>
          </Flex>
          <form onSubmit={handleSubmit}>
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
                  htmlFor="confirm_password"
                >
                  Confirm Password
                </Text>
                <TextField.Root
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
                variant="surface"
                type="submit"
                highContrast
                color="gray"
                size="3"
                style={{ width: "100%" }}
                disabled={!isFormValid || !!successMessage || isSubmitting}
              >
                {isSubmitting ? "Resetting password..." : "Reset Password"}
              </Button>
            </Box>
          </form>
        </Box>
      </Card>
    </Box>
  );
};

export default SectionWrapper(ResetPassword, "reset-password");
