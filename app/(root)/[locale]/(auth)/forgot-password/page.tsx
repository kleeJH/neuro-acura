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
} from "@radix-ui/themes";
import Link from "next/link";
import Image from "next/image";
import CustomLink from "@components/basic/ui/link";
import LowDefLogo from "@public/assets/images/logos/icon1.png";
import Google from "@public/assets/icons/google.png";

const ForgotPassword = () => {
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
                  placeholder="you@example.com"
                  size="3"
                />
              </Flex>
            </Box>

            <Box mb="5" position="relative">
              <Button
                variant="solid"
                type="submit"
                size="3"
                color="red"
                style={{ width: "100%" }}
              >
                Reset Password
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
