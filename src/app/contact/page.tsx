import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/layout/PagePlaceholder";

export const metadata: Metadata = {
  title: "Share Your Vision",
  description: "Building in deep-tech? We would like to understand what you see before others do.",
};

export default function Page() {
  return (
    <PagePlaceholder
      eyebrow="Reach Out"
      title="Share Your Vision"
      body="Building in deep-tech? We would like to understand what you see before others do."
    />
  );
}
