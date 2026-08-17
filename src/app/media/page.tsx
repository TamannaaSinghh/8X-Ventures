import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/layout/PagePlaceholder";

export const metadata: Metadata = {
  title: "Signals From The Deep-Tech Frontier",
  description: "Our perspective on the technologies, markets, and policies shaping the next generation of companies.",
};

export default function Page() {
  return (
    <PagePlaceholder
      eyebrow="Perspectives"
      title="Signals From The Deep-Tech Frontier"
      body="Our perspective on the technologies, markets, and policies shaping the next generation of companies."
    />
  );
}
