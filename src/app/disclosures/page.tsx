import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/layout/PagePlaceholder";

export const metadata: Metadata = {
  title: "Disclosures",
  description: "Regulatory disclosures and fund documentation for 8X Ventures.",
};

export default function Page() {
  return (
    <PagePlaceholder
      eyebrow="Legal"
      title="Disclosures"
      body="Regulatory disclosures and fund documentation for 8X Ventures."
    />
  );
}
