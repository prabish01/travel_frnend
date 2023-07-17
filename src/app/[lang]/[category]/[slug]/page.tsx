import { fetchAPI } from '@/app/[lang]/utils/fetch-api';
import Post from '@/app/[lang]/views/post';
import type { Metadata } from 'next';
import { ArticleJsonLd } from "next-seo";


async function getPostBySlug(slug: string) {
    const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
    const path = `/articles`;
    const urlParamsObject = {
        filters: { slug },
        populate: {
            cover: { fields: ['url'] },
            authorsBio: { populate: '*' },
            category: { fields: ['name'] },
            blocks: { populate: '*' },
        },
    };
    const options = { headers: { Authorization: `Bearer ${token}` } };
    const response = await fetchAPI(path, urlParamsObject, options);
    return response;
}

async function getMetaData(slug: string) {
    const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
    const path = `/articles`;
    const urlParamsObject = {
        filters: { slug },
        populate: { seo: { populate: '*' } },
    };
    const options = { headers: { Authorization: `Bearer ${token}` } };
    const response = await fetchAPI(path, urlParamsObject, options);
    return response.data;
}

export async function generateMetadata({ params }: { params: { slug: string ,category:string,lang:string} }): Promise<Metadata> {
    const meta = await getMetaData(params.slug);
    

    const metadata = meta[0].attributes.seo;
    const imgUrl=meta[0].attributes.seo.shareImage.data.attributes.url;
    

    return {
        title: metadata.metaTitle,
        description: metadata.metaDescription,
        alternates: {
            canonical: `/${params.lang}/${params.category}/${params.slug}`,
            types: {
              'application/rss+xml': '/rss',
            },
        },
        openGraph: {
          title: metadata.metaTitle,
          description: metadata.metaDescription,
          url: `/${params.lang}/${params.category}/${params.slug}`,
          images: [
    
            {
              url: imgUrl,
              width: 1800,
              height: 1600,
              alt: "Speed Wings Human Resource",
            },
          ],
          type: "article",
        },
        
    };
}


export default async function PostRoute({ params }: { params: { slug: string,lang:string,category:string } }) {
    const { lang,slug,category } = params;
    // console.log("My dta1111111",lang,slug,category)

    const data = await getPostBySlug(slug);
    const { title, description, publishedAt, cover,updatedAt} = data.data[0].attributes;
    const imageUrl = cover.data?.attributes.url;
    if (data.data.length === 0) return <h2>no post found</h2>;

    return (
        <>
        <ArticleJsonLd
        useAppDir={true}
        type="BlogPosting"
        url={`${process.env.NEXT_PUBLIC_DOMAIN}/${params.category}/${params.slug}`}
        title={title}
        images={[imageUrl]}
        datePublished={publishedAt}
        dateModified={updatedAt}
        authorName="Aaraj Bhattarai"
        description={description}
      />
    
    <Post data={data.data[0]} />
    </>
    );

}

export async function generateStaticParams() {
    const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
    const path = `/articles`;
    const options = { headers: { Authorization: `Bearer ${token}` } };
    const articleResponse = await fetchAPI(
        path,
        {
            populate: ['category'],
        },
        options
    );

    return articleResponse.data.map(
        (article: {
            attributes: {
                slug: string;
                category: {
                    slug: string;
                };
            };
        }) => ({ slug: article.attributes.slug, category: article.attributes.slug })
    );
}
