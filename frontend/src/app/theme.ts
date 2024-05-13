"use client";
import { createTheme } from "@mui/material/styles";
import { Roboto } from "next/font/google";
const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const theme = createTheme({
  palette: {
    primary: {
      main: "rgb(34 197 94)",
    },
    secondary: {
      main: "rgb(241 149 100)",
    },
  },
});

export default theme;
