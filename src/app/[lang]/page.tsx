import ArticleList from "./components/ArticleList";
import Contact from "./components/Contact";
import LangRedirect from "./components/LangRedirect";
import { sectionRenderer } from "./utils/section-renderer";
import { getPageBySlug } from "@/app/[lang]/utils/get-page-by-slug";

export default async function RootRoute({
  params,
}: {
  params: { lang: string };
}) {
  const page = await getPageBySlug("home", params.lang);

  if (page.data.length == 0 && params.lang !== "en") return <LangRedirect />;
  if (page.data.length === 0) return null;



  const {
    articles,
    contentSections,
    contactFormDisplay,
    articleDisplay,
  } = page.data[0].attributes;

  const articlesRefined = articles.data;

  return (
    <>
      {contentSections.map((section: any, index: number) =>
        sectionRenderer(section, index)
      )}

      {articleDisplay && <ArticleList data={articlesRefined} />} 

       {contactFormDisplay && <Contact />}

    </>
  );
}
