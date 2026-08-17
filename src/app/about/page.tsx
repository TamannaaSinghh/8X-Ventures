import type { Metadata } from "next";
import { AboutPage } from "@/components/about/AboutPage";

export const metadata: Metadata = {
  title: "A Venture Firm Built for Deep-Tech",
  description:
    "8X Ventures backs founders building technologies with the power to transform industries, economies, and national capability.",
};

export default function Page() {
  return <AboutPage />;
}
