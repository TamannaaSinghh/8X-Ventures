import type { Metadata } from "next";
import { ContactPage } from "@/components/contact/ContactPage";

export const metadata: Metadata = {
  title: "Reach Out",
  description:
    "For founders, capital partners, media and ecosystem collaborators working around Indian deep-tech.",
};

export default function Page() {
  return <ContactPage />;
}
