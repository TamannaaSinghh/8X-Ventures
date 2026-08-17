import { Eyebrow } from "@/components/ui/Eyebrow";
import { UnderlineLink } from "@/components/ui/UnderlineLink";

/**
 * Shared shell for the routes that exist so the navigation resolves, but
 * whose designs are not in scope yet. Keeps the header, footer, heading
 * order and landmarks consistent with the rest of the site.
 */
export function PagePlaceholder({
  eyebrow,
  title,
  body,
}: {
  eyebrow: string;
  title: string;
  body: string;
}) {
  return (
    <section aria-labelledby="page-heading" className="bg-white">
      <div className="container-8x flex min-h-[70vh] flex-col justify-center py-32 lg:py-44">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1
          id="page-heading"
          className="mt-4 max-w-[18ch] text-[length:var(--text-display)] leading-[1.08] font-bold tracking-normal text-balance text-ink-900"
        >
          {title}
        </h1>
        <p className="mt-8 max-w-[52ch] text-[length:var(--text-body-lg)] leading-[1.4] font-light text-pretty text-ink-500">
          {body}
        </p>
        <div className="mt-12">
          <UnderlineLink href="/">Back to home</UnderlineLink>
        </div>
      </div>
    </section>
  );
}
