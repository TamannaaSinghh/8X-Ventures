import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { TiltRoot } from "@/components/ui/TiltRoot";
import { siteConfig } from "@/content/site";
import "./globals.css";

/**
 * Proxima Nova — the artboard's own typeface, from the client's font folder.
 * Subset to Latin + punctuation + currency (the ₹ in the stats figure) and
 * converted to woff2, which takes each face from ~135 KB to ~34 KB.
 *
 * Only Regular (400) and Bold (700) were supplied. The design also calls for
 * Light 300, Semibold 600 and Extrabold 800; with no face for those, CSS font
 * matching resolves 300 → Regular and 600/800 → Bold, so nothing is
 * synthesised — but body copy sits a step heavier than the artboard until the
 * Light face is available. Matching italics are in `fonts/` and can be added
 * to `src` below when a page needs them.
 */
const sans = localFont({
  src: [
    { path: "./fonts/ProximaNova-Regular.woff2", weight: "400", style: "normal" },
    { path: "./fonts/ProximaNova-Bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-sans",
  display: "swap",
  fallback: ["Nunito Sans", "Segoe UI", "Helvetica Neue", "Arial", "sans-serif"],
  adjustFontFallback: "Arial",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    /* The official lock-up from the client's Drive, set on a 1200 x 630
       plate so link previews get the real mark rather than a crop. */
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} logo`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  /* No maximum-scale / user-scalable lock — pinch zoom must stay available
     (WCAG 1.4.4 Resize Text). */
  width: "device-width",
  initialScale: 1,
};

/**
 * Marks the document as script-capable before first paint so the scroll-reveal
 * and image-arrival start states only apply when we can actually clear them
 * again — without scripting the page renders plainly and completely.
 *
 * The image half tags each picture the moment the browser has its pixels, so
 * CSS can bring it in rather than letting it snap into a reserved box. `load`
 * does not bubble, hence the capture listeners; `error` marks a broken picture
 * too, so a missing file leaves a gap rather than an invisible one. The sweeps
 * catch anything already decoded from cache before the listeners were attached.
 */
const BOOTSTRAP = `try{
var d=document,r=d.documentElement;
if('IntersectionObserver' in window)r.classList.add('js-reveal');
r.classList.add('js-img');
var mark=function(t){if(t&&t.tagName==='IMG')t.setAttribute('data-loaded','')};
var sweep=function(){for(var l=d.images,i=0;i<l.length;i++)if(l[i].complete)mark(l[i])};
d.addEventListener('load',function(v){mark(v.target)},true);
d.addEventListener('error',function(v){mark(v.target)},true);
d.addEventListener('DOMContentLoaded',sweep);
window.addEventListener('load',sweep);
}catch(x){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // suppressHydrationWarning: the bootstrap script below adds `js-reveal`
    // and `js-img` to <html> before React hydrates, an expected mismatch.
    <html lang="en-IN" className={sans.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: BOOTSTRAP }} />
      </head>
      <body className="min-h-dvh bg-white antialiased">
        <a
          href="#main"
          className="sr-only-8x focus-visible:not-sr-only focus-visible:fixed focus-visible:top-4 focus-visible:left-4 focus-visible:z-100 focus-visible:m-0 focus-visible:h-auto focus-visible:w-auto focus-visible:overflow-visible focus-visible:rounded-full focus-visible:bg-[#0077c2] focus-visible:px-6 focus-visible:py-3 focus-visible:text-base focus-visible:font-semibold focus-visible:text-white focus-visible:[clip-path:none]"
        >
          Skip to main content
        </a>

        <SiteHeader />

        <main id="main" tabIndex={-1} className="focus:outline-none">
          {children}
        </main>

        <SiteFooter />

        {/* Delegated pointer depth for every `data-tilt` surface on the page.
            Renders nothing; it only listens. */}
        <TiltRoot />
      </body>
    </html>
  );
}
