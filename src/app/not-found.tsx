import { PagePlaceholder } from "@/components/layout/PagePlaceholder";

export default function NotFound() {
  return (
    <PagePlaceholder
      eyebrow="404"
      title="This page could not be found"
      body="The link may be out of date, or the page may have moved. Head back to the homepage to continue exploring."
    />
  );
}
