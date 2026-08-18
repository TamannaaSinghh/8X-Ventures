import type { Metadata } from "next";
import { MediaPage } from "@/components/media/MediaPage";

export const metadata: Metadata = {
  title: "Signals From The Deep-Tech Frontier",
  description:
    "Our perspective on the technologies, markets, and policies shaping the next generation of companies.",
};

export default function Page() {
  return <MediaPage />;
}
