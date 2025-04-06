import type { ThemeConfig } from "antd";

export const AntdTheme: ThemeConfig = {
  token: {
    colorBgElevated: "var(--background)",
    colorFillContent: "var(--primary)",
    colorPrimary: "var(--primary)",
    colorIcon: "var(--text-default)",
    colorIconHover: "var(--accent)",
    colorText: "var(--text-default)",
    colorSplit: "var(--text-default)",
    boxShadowSecondary:
      "0 4px 4px var(--drop-shadow-color), 0 2px 3px var(--drop-shadow-color)",
  },
  components: {
    Button: {
      defaultBorderColor: "var(--antd-button-hover)",
      colorPrimaryHover: "var(--text-default)",
    },
    Carousel: {
      colorBgContainer: "var(--accent)",
    },
    Collapse: {
      contentBg: "var(--background)",
    },
    FloatButton: {
      colorBgElevated: "var(--tertiary)",
      colorFillContent: "var(--scroll-to-top-color)",
    },
    Layout: {
      footerBg: "var(--background)",
    },
    Modal: {
      colorText: "var(--text-default)",
    },
  },
};
