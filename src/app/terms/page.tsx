import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/layout/PagePlaceholder";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "The terms that govern your use of the 8X Ventures website.",
};

export default function Page() {
  return (
    <PagePlaceholder
      eyebrow="Legal"
      title="Terms of Use"
      body="The terms that govern your use of the 8X Ventures website."
    />
  );
}
