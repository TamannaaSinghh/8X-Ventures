import type { Metadata } from "next";
import { TeamPage } from "@/components/team/TeamPage";

export const metadata: Metadata = {
  title: "A Team Built for Complexity",
  description:
    "Deep-tech needs investors who understand technology, markets, capital, and time.",
};

export default function Page() {
  return <TeamPage />;
}
