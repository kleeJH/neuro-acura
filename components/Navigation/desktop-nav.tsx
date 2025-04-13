import Link from "next/link";
import { Button } from "@radix-ui/themes";
import { useRouter, usePathname } from "next/navigation";

const DesktopNavigation = ({
  hasNavLinks = true,
}: {
  hasNavLinks: boolean;
}) => {
  const router = useRouter();
  const pathname = usePathname();

  const isAuthPage =
    pathname.includes("sign-in") || pathname.includes("sign-up");

  return (
    <div
      className={`flex gap-10 items-center ${
        hasNavLinks ? "max-nav:hidden" : ""
      }`}
    >
      <div className="flex gap-3 md:gap-5">
        {!isAuthPage && (
          <>
            <Link href="/sign-in">
              <Button
                variant="solid"
                style={{
                  backgroundColor: "var(--foreground)",
                  borderColor: "var(--accent)",
                  border: "1px solid var(--accent)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "var(--accent)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "var(--foreground)";
                }}
              >
                Sign in
              </Button>
            </Link>
            <Link href="/sign-up">
              <Button variant="surface" color="gray" highContrast>
                Create account
              </Button>
            </Link>
          </>
        )}
        {/* <LocaleSwitch /> */}
        {/* <ThemeSwitch /> */}
      </div>
    </div>
  );
};

export default DesktopNavigation;
