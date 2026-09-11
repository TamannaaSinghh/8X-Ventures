import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/layout/PagePlaceholder";

export const metadata: Metadata = {
  title: "Disclaimer",
  description:
    "Important notices about the information published on the 8X Ventures website.",
};

export default function Page() {
  return (
    <PagePlaceholder
      eyebrow="Legal"
      title="Disclaimer"
      body="Important notices about the information published on the 8X Ventures website. Nothing here is an offer to sell or a solicitation to buy any security, or investment advice."
    />
  );
}
