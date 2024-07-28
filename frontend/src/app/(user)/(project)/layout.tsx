"use client";
import { ChatBotSettingContextProvider } from "@/components/chatbot/Setting";
import { ProjectHeader } from "@/components/headers/ProjectHeader";
import { Compose } from "@/components/providers/compose";

export default function ProjectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <ProjectHeader />
      <div className="mt-6 mx-6">{children}</div>
    </div>
  );
}
