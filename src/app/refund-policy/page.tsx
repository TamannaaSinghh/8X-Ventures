import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/layout/PagePlaceholder";

export const metadata: Metadata = {
  title: "Refund Policy",
  description: "8X Ventures' policy on payments, cancellations and refunds.",
};

export default function Page() {
  return (
    <PagePlaceholder
      eyebrow="Legal"
      title="Refund Policy"
      body="8X Ventures' policy on payments, cancellations and refunds."
    />
  );
}
