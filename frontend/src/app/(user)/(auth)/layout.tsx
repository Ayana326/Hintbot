"use client";
import { PublicHeader } from "@/components/headers/PublicHeader";

export default function ProjectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <PublicHeader />
      {children}
    </div>
  );
}
