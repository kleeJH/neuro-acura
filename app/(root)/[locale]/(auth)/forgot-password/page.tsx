// import { forgotPasswordAction } from "@/app/actions";
// import { FormMessage, Message } from "@/components/auth/form-message";
// import { SubmitButton } from "@/components/auth/submit-button";
// import Link from "next/link";

// export default async function ForgotPassword(props: {
//   searchParams: Promise<Message>;
// }) {
//   const searchParams = await props.searchParams;
//   return (
//     <>
//       <form className="flex-1 flex flex-col w-full gap-2 text-foreground [&>input]:mb-6 min-w-64 max-w-64 mx-auto">
//         <div>
//           <h1 className="text-2xl font-medium">Reset Password</h1>
//           <p className="text-sm text-secondary-foreground">
//             Already have an account?{" "}
//             <Link className="text-primary underline" href="/sign-in">
//               Sign in
//             </Link>
//           </p>
//         </div>
//         <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
//           <Label htmlFor="email">Email</Label>
//           <Input name="email" placeholder="you@example.com" required />
//           <SubmitButton formAction={forgotPasswordAction}>
//             Reset Password
//           </SubmitButton>
//           <FormMessage message={searchParams} />
//         </div>
//       </form>
//     </>
//   );
// }

import { signInAction } from "@/app/actions";
import SectionWrapper from "@components/basic/SectionWrapper";
import {
  Card,
  Text,
  Box,
  Button,
  Flex,
  Heading,
  TextField,
} from "@radix-ui/themes";
import Link from "next/link";
import Image from "next/image";
import CustomLink from "@components/basic/ui/link";
import LowDefLogo from "@public/assets/images/logos/icon1.png";

const ForgotPassword = () => {
  return (
    <Box width="100%" mx="auto" maxWidth="600px">
      <Card asChild variant="classic" size="4">
        <Box px="7">
          <Flex direction="column" align="center" gap="4">
            <Image
              src={LowDefLogo}
              alt="NeuroAcura's Logo"
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
          <form action="/">
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
                  type="email"
                  variant="classic"
                  placeholder="Enter your email"
                  size="3"
                />
              </Flex>
            </Box>

            <Box mb="5" position="relative">
              <Box position="absolute" top="0" right="0">
                <CustomLink href={""} text="Forgot password?" />
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
                  variant="classic"
                  type="password"
                  placeholder="Enter your password"
                  size="3"
                />
              </Flex>
            </Box>

            <Box mb="5" position="relative">
              <Button
                variant="solid"
                type="submit"
                size="3"
                style={{ width: "100%", backgroundColor: "var(--primary)" }}
              >
                Sign in
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
              >
                <Image
                  src="https://developers.google.com/identity/images/g-logo.png"
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
                  Don't have an account?
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

export default SectionWrapper(ForgotPassword, "forgot-password");
