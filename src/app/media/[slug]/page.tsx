import { PagePlaceholder } from "@/components/layout/PagePlaceholder";

export default async function MediaDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const title = slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return (
    <PagePlaceholder
      eyebrow="Perspectives"
      title={title}
      body="This gallery is being prepared. In the meantime, explore the rest of the 8X Ventures ecosystem."
    />
  );
}
