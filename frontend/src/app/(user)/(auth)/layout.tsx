"use client";
import { PublicHeader } from "@/components/headers/PublicHeader";

export default function ProjectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <PublicHeader />
      {children}
    </div>
  );
}
