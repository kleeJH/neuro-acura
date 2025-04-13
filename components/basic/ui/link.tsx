import Link from "next/link";
import { Text } from "@radix-ui/themes";
import { Url } from "next/dist/shared/lib/router/router";

interface LinkProps {
  href: Url;
  text: string;
}

const CustomLink = ({ href, text }: LinkProps) => {
  return (
    <Link href={href}>
      <Text
        size="2"
        className="text-textLink hover:text-accent hover:underline"
      >
        {text}
      </Text>
    </Link>
  );
};

export default CustomLink;
