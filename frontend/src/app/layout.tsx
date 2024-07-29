"use client";
import { theme } from "@/app/theme";
import { AuthProvider } from "@/context/AuthContext";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import { Inter } from "next/font/google";
import "./globals.css";
import { Compose } from "@/components/providers/compose";
import { ChatBotSettingContextProvider } from "@/components/chatbot/Setting";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={inter.className}>
        <Compose
          components={[
            AppRouterCacheProvider,
            AuthProvider,
            [ThemeProvider, { theme: theme }],
            ChatBotSettingContextProvider,
          ]}
        >
          {children}
        </Compose>
      </body>
    </html>
  );
}
