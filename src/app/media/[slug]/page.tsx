import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/layout/PagePlaceholder";
import { LpDayPage } from "@/components/media/LpDayPage";
import { PerspectivePage } from "@/components/media/PerspectivePage";
import { articles, findArticle } from "@/content/perspectives";

/** Every route the LP Day frame answers to. The home page and `/media` have
 *  always linked at the per-year slugs; the frame is one page covering both
 *  editions, so they all resolve to it rather than to a placeholder. */
const LP_DAY_SLUGS = ["lp-day", "lp-day-2025", "lp-day-2026"];

export function generateStaticParams() {
  return [
    ...articles.map((a) => ({ slug: a.slug })),
    ...LP_DAY_SLUGS.map((slug) => ({ slug })),
  ];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  if (LP_DAY_SLUGS.includes(slug)) {
    return {
      title: "LP Day | 8X Ventures",
      description:
        "LP Day is 8X Ventures' annual gathering for India's deep-tech builders, investors, founders, mentors and ecosystem leaders.",
    };
  }
  const article = findArticle(slug);
  if (!article) return { title: "Perspectives | 8X Ventures" };

  const lead = article.body.find((b) => b.kind === "p");
  return {
    title: `${article.titlePlain} | 8X Ventures`,
    description: lead?.text.slice(0, 155),
  };
}

export default async function MediaDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (LP_DAY_SLUGS.includes(slug)) return <LpDayPage />;

  const article = findArticle(slug);

  /* The frame is written for a perspective. Everything else under /media —
     the LP Day galleries and the video features — still has no page of its
     own, so those keep the placeholder rather than being dressed as an
     article that was never written. */
  if (!article) {
    return (
      <PagePlaceholder
        eyebrow="Perspectives"
        title={slug
          .split("-")
          .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
          .join(" ")}
        body="This piece is being prepared. In the meantime, explore the rest of the 8X Ventures ecosystem."
      />
    );
  }

  return <PerspectivePage article={article} />;
}
