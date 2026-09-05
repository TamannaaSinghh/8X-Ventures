import Image from "next/image";
import { ArticleCard } from "@/components/media/ArticleCard";
import { Reveal } from "@/components/ui/Reveal";
import {
  articleIndex,
  perspectiveLabels,
  type Article,
} from "@/content/perspectives";

/**
 * A perspective article, traced from the Figma prototype's frame (node
 * 317-759).
 *
 * Two bands: the article itself on white — meta line, two-line title, hero
 * plate, then the body — and the pale "Related articles" shelf beneath it.
 * The frame carries nothing else before the footer.
 */
export function PerspectivePage({ article }: { article: Article }) {
  /* Everything but the piece being read. */
  const related = articleIndex.filter((a) => a.title !== article.titlePlain);

  return (
    <>
      <article className="pv">
        {/* The frame's one meta line: kicker in blue, then date and reading
            time in grey, separated by middots. The dots are decorative — the
            comma in the visually-hidden text is what a screen reader hears. */}
        <Reveal as="p" className="pv-meta">
          <span className="pv-meta-kicker">{article.kicker}</span>
          <span aria-hidden="true" className="pv-meta-dot">
            ·
          </span>
          <span className="sr-only-8x">, </span>
          <span>{article.date}</span>
          <span aria-hidden="true" className="pv-meta-dot">
            ·
          </span>
          <span className="sr-only-8x">, </span>
          <span>{article.readingTime}</span>
        </Reveal>

        <Reveal as="h1" className="pv-title">
          <span className="pv-title-1">{article.title.line1}</span>{" "}
          <span className="pv-title-2">{article.title.line2}</span>
        </Reveal>

        <Reveal variant="scale" className="pv-hero">
          <Image
            src={article.image}
            alt={article.imageAlt}
            fill
            sizes="(max-width: 1024px) 92vw, 88vw"
            className="pv-hero-img"
            priority
          />
        </Reveal>

        <div className="pv-body">
          {article.body.map((block, i) =>
            block.kind === "h" ? (
              <Reveal as="h2" key={i} className="pv-h">
                {block.text}
              </Reveal>
            ) : (
              <Reveal as="p" key={i} className="pv-p">
                {block.text}
              </Reveal>
            ),
          )}
        </div>
      </article>

      <section aria-labelledby="related-heading" className="pv-related">
        <Reveal as="h2" id="related-heading" className="pv-related-head">
          <span>{perspectiveLabels.related.lead}</span>{" "}
          <span className="pv-related-accent">{perspectiveLabels.related.accent}</span>
        </Reveal>

        <ul role="list" className="pv-related-grid">
          {related.map((item, i) => (
            <Reveal as="li" variant="card" key={item.title} delay={Math.min(i, 3) * 90}>
              <ArticleCard article={item} />
            </Reveal>
          ))}
        </ul>
      </section>
    </>
  );
}
