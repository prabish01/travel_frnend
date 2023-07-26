import { sectionRenderer } from "@/app/[lang]/utils/section-renderer";
import { Metadata } from "next";
import { getPageBySlug } from "@/app/[lang]/utils/get-page-by-slug";
import { FALLBACK_SEO } from "@/app/[lang]/utils/constants";
import ArticleList from "../components/ArticleList";
import Contact from "../components/Contact";

type Props = {
  params: {
    lang: string;
    category: string;
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const page = await getPageBySlug(params.category, params.lang);

  if (!page.data[0].attributes?.seo) return FALLBACK_SEO;
  const metadata = page.data[0].attributes.seo;

  return {
    title: metadata.metaTitle,
    description: metadata.metaDescription,
    alternates: {
      canonical: `/${params.lang}/${params.category}`,
    },
    openGraph: {
      title: metadata.metaTitle,
      description: metadata.metaDescription,
      url: `/${params.lang}/${params.category}`,
      siteName: metadata.metaTitle,
      images: [
        {
          url: "/og.png",
          width: 1800,
          height: 1600,
          alt: "Speed Wings Human Resource",
        },
      ],
      locale: "en_US",
      type: "website",
    },
  };
}

export default async function PageRoute({ params }: Props) {
  const page = await getPageBySlug(params.category, params.lang);
  console.log(params)
  
  if (page.data.length === 0) return null;
  const { articles, contentSections, contactFormDisplay, articleDisplay } =
    page.data[0].attributes;

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
