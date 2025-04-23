import { Flex, Box } from "@radix-ui/themes";

interface DividerProps {
  color?: string;
}

const Divider = ({ color = "var(--divider)" }: DividerProps) => {
  return (
    <Flex align="center" my="4" mb="5">
      <Box flexGrow="1" height="1px" style={{ backgroundColor: color }} />
    </Flex>
  );
};

export default Divider;
