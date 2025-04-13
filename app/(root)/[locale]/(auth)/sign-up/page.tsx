// import { signUpAction } from "@/app/actions";
// import { FormMessage, Message } from "@/components/auth/form-message";
// import { SubmitButton } from "@/components/auth/submit-button";
// import { Input } from "@components/basic/ui/input";
// import { Label } from "@components/basic/ui/label";
// import Link from "next/link";

// export default async function Signup(props: {
//   searchParams: Promise<Message>;
// }) {
//   const searchParams = await props.searchParams;
//   if ("message" in searchParams) {
//     return (
//       <div className="w-full flex-1 flex items-center h-screen sm:max-w-md justify-center gap-2 p-4">
//         <FormMessage message={searchParams} />
//       </div>
//     );
//   }

//   return (
//     <>
//       <form className="flex flex-col min-w-64 max-w-64 mx-auto">
//         <h1 className="text-2xl font-medium">Sign up</h1>
//         <p className="text-sm text text-foreground">
//           Already have an account?{" "}
//           <Link className="text-primary font-medium underline" href="/sign-in">
//             Sign in
//           </Link>
//         </p>
//         <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
//           <Label htmlFor="email">Email</Label>
//           <Input name="email" placeholder="you@example.com" required />
//           <Label htmlFor="password">Password</Label>
//           <Input
//             type="password"
//             name="password"
//             placeholder="Your password"
//             minLength={6}
//             required
//           />
//           <SubmitButton formAction={signUpAction} pendingText="Signing up...">
//             Sign up
//           </SubmitButton>
//           <FormMessage message={searchParams} />
//         </div>
//       </form>
//     </>
//   );
// }

import { signUpAction } from "@/app/actions";
import { Message } from "@/components/auth/form-message";
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

const SignUp = async (props: { searchParams: Promise<Message> }) => {
  const searchParams = await props.searchParams;
  return (
    <Box width="100%" mx="auto" maxWidth="600px">
      <Card asChild variant="classic" size="4">
        <Box px="7">
          <Flex direction="column" align="center" gap="4">
            <img
              src="../assets/images/logos/icon1.png"
              alt="NeuroAcura's Logo"
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
                variant="surface"
                highContrast
                color="gray"
                size="3"
                style={{ width: "100%" }}
              >
                Create account
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
                <img
                  src="https://developers.google.com/identity/images/g-logo.png"
                  alt="Google Logo"
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
                    variant="solid"
                    type="submit"
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

export default SectionWrapper(SignUp, "sign-up");
