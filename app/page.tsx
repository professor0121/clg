import { notFound, redirect } from "next/navigation";
import { getHomePage } from "@/modules/page";

export default async function HomePage() {
  const homePage = await getHomePage();
  if (!homePage) {
    notFound();
  }

  return (
    <main>
      <h1>{homePage.title}</h1>
      <article
        dangerouslySetInnerHTML={{
          __html: homePage.content ?? "",
        }}
      />
    </main>
  );
}
