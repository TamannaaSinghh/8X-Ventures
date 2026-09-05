import { Metadata } from "next";
import { PortfolioDetail } from "@/components/portfolio/PortfolioDetail";

export function generateStaticParams() {
  const { portfolioCards } = require("@/content/portfolio");
  return portfolioCards.map((company: { id: string }) => ({
    slug: company.id,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { portfolioCards } = require("@/content/portfolio");
  const { slug } = await params;
  const company = portfolioCards.find((c: { id: string; name: string; sector: string }) => c.id === slug);

  if (!company) {
    return {
      title: "Company Not Found | 8X Ventures",
    };
  }

  return {
    title: `${company.name} | 8X Ventures`,
    description: `${company.sector} — ${company.description}`,
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <PortfolioDetail id={slug} />;
}
