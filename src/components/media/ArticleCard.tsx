import Image from "next/image";
import Link from "next/link";
import { type ArticleCardData } from "@/content/perspectives";

/**
 * An article card: the plate, then the kicker, the title and the date.
 *
 * Traced from the perspective frame's "Related articles" shelf (node 317-759)
 * and used in both places that list articles — that shelf, and the `/media`
 * listing — so the two cannot drift apart.
 *
 * An article that has a page of its own gets a `Link`; one that is still only
 * a title on 8X's blog gets a plain anchor that says it opens elsewhere.
 */
export function ArticleCard({ article }: { article: ArticleCardData }) {
  const inner = (
    <>
      <span className="ar-plate">
        <Image
          src={article.image}
          alt={article.imageAlt}
          fill
          sizes="(max-width: 1024px) 92vw, 28vw"
          className="ar-img"
        />
      </span>

      <span className="ar-kicker">{article.kicker}</span>
      <span className="ar-title">{article.title}</span>
      <span className="ar-date">{article.date}</span>
    </>
  );

  if (article.external) {
    return (
      <a href={article.href} target="_blank" rel="noreferrer noopener" className="ar">
        {inner}
        <span className="sr-only-8x"> (opens in a new tab)</span>
      </a>
    );
  }

  return (
    <Link href={article.href} className="ar">
      {inner}
    </Link>
  );
}
