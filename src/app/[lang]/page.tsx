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

  // console.log(page.data);

  const {
    shortName,
    slug,
    heading,
    description,
    locale,
    seo,
    articles,
    contentSections,
    contactFormDisplay,
    articleDisplay,
  } = page.data[0].attributes;

  const articlesRefined = articles.data;
  // console.log(articles.data.attributes)
  return (
    <>
      {contentSections.map((section: any, index: number) =>
        sectionRenderer(section, index)
      )}
{/* Not currently implemented due to bug in the backend. Replace this in future */}
      {/* {articleDisplay && <ArticleList data={articlesRefined} />} */}

      {/* {contactFormDisplay && <Contact />} */}
      {articlesRefined.length>0 && <ArticleList data={articlesRefined}/> }

      <Contact/>

    </>
  );
}
