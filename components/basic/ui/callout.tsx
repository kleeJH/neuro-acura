import { Callout } from "@radix-ui/themes";
import {
  CheckCircle,
  AlertCircle,
  AlertTriangle,
  InfoIcon,
} from "lucide-react";

interface CalloutProps {
  type: "success" | "error" | "warning" | "info";
  text: string;
  variant: "soft" | "surface" | "outline";
  size: "1" | "2" | "3";
}

const CustomCallout = ({
  type,
  text,
  variant = "surface",
  size = "2",
}: CalloutProps) => {
  if (type === "success") {
    return (
      <Callout.Root color="green" variant={variant} size={size}>
        <Callout.Icon>
          <CheckCircle />
        </Callout.Icon>
        <Callout.Text>{text}</Callout.Text>
      </Callout.Root>
    );
  } else if (type === "error") {
    return (
      <Callout.Root color="red" variant={variant} size={size}>
        <Callout.Icon>
          <AlertCircle />
        </Callout.Icon>
        <Callout.Text>{text}</Callout.Text>
      </Callout.Root>
    );
  } else if (type === "warning") {
    return (
      <Callout.Root color="amber" variant={variant} size={size}>
        <Callout.Icon>
          <AlertTriangle />
        </Callout.Icon>
        <Callout.Text>{text}</Callout.Text>
      </Callout.Root>
    );
  } else if (type === "info") {
    return (
      <Callout.Root color="blue" variant={variant} size={size}>
        <Callout.Icon>
          <InfoIcon />
        </Callout.Icon>
        <Callout.Text>{text}</Callout.Text>
      </Callout.Root>
    );
  }
};

export default CustomCallout;
