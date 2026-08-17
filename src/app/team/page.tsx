import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/layout/PagePlaceholder";

export const metadata: Metadata = {
  title: "A Team Built for Complexity",
  description: "Deep-tech needs investors who understand technology, markets, capital, and time.",
};

export default function Page() {
  return (
    <PagePlaceholder
      eyebrow="Our Team"
      title="A Team Built for Complexity"
      body="Deep-tech needs investors who understand technology, markets, capital, and time."
    />
  );
}
