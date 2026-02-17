import { notFound } from "next/navigation";
import { getPageBySlug } from "@/modules/page";

interface PageProps {
  params: Promise<{
    slug?: string[];
  }>;
}

export default async function DynamicPage({ params }: PageProps) {
  const resolvedParams = await params; 
  const slugArray = resolvedParams.slug ?? [];
  const fullSlug = slugArray.join("/");

  console.log("FULL SLUG:", fullSlug);

  const page = await getPageBySlug(fullSlug);

  if (!page) notFound();

  const publishedVersion = page.versions.find(v => v.isPublished);
  if (!publishedVersion) notFound();

  return (
    <main>
      <h1>{publishedVersion.title}</h1>
      <article
        dangerouslySetInnerHTML={{
          __html: publishedVersion.content ?? "",
        }}
      />
    </main>
  );
}
