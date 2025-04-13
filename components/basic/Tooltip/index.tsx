import { Tooltip } from "radix-ui";

interface TooltipProps {
  children: React.ReactNode;
  content: string;
  side?: "top" | "right" | "bottom" | "left";
  sideOffset?: number;
}

const CustomTooltip = ({
  children,
  content,
  side = "right",
  sideOffset = 10,
}: TooltipProps) => {
  return (
    <Tooltip.Provider delayDuration={0}>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>{children}</Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            className="z-50 border-solid border-[1px] border-accent select-none rounded-lg bg-foreground p-1 shadow-sm text-textDefault font-semibold text-sm"
            side={side}
            sideOffset={sideOffset}
            arrowPadding={40}
          >
            {content}
            <Tooltip.Arrow className="fill-accent" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
};

export default CustomTooltip;
