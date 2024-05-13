"use client";
import { ProjectHeader } from "@/components/headers/ProjectHeader";

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
