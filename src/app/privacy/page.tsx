import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/layout/PagePlaceholder";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How 8X Ventures collects, uses, and protects your information.",
};

export default function Page() {
  return (
    <PagePlaceholder
      eyebrow="Legal"
      title="Privacy Policy"
      body="How 8X Ventures collects, uses, and protects your information."
    />
  );
}
