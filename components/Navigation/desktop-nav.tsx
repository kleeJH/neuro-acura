// import LocaleSwitch from "./locale-button";
import ThemeSwitch from "./theme-button";

const  DesktopNavigation = ({
  hasNavLinks = true,
}: {
  hasNavLinks: boolean;
}) => {
  return (
    <div className={`flex gap-10 items-center ${hasNavLinks ? "max-nav:hidden" : "" }`}>
      <div className="flex gap-3 md:gap-5">
        {/* <LocaleSwitch /> */}
        <ThemeSwitch />
      </div>
    </div>
  );
};

export default DesktopNavigation;
