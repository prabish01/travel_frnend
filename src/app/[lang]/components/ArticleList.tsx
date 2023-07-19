import Link from "next/link";
import Image from "next/image";

interface Article {
  id: number;
  attributes: {
    title: string;
    description: string;
    slug: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    category: {
      data: {
        attributes: {
          name: string;
          slug:string;
        };
      };
    };
    cover: {
      data: {
        attributes: {
          url: string;
          alternativeText: string;
        };
      };
    };
  };
}

export default function ArticleList({
  data: articlesRefined,
}: // children,
{
  data: Article[];
  // children?: React.ReactNode;
}) {

  const jsonLD = {};

  return (
    <>
      <div className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-bold tracking-tight  sm:text-4xl">
              From the blog
            </h2>
            <p className="mt-2 text-lg leading-8 text-gray-600">
              Learn how to grow your business with our expert advice.
            </p>
          </div>
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {articlesRefined.map((article) => (
              <article
                key={article.id}
                className="flex flex-col items-start justify-between"
              >
                <Link
                  href={`/${article.attributes?.category?.data.attributes.slug}/${article.attributes.slug}`}
                  className="relative z-10 r.ounded-full dark:bg-gray-900 px-3 py-1.5 font-medium dark:text-gray-400 "
                >
                  <div className="relative w-full">

                    <Image
                      src={article.attributes.cover.data.attributes.url}
                      alt={
                        article.attributes.cover.data.attributes
                          .alternativeText ?? "Speed Wings Human Resource"
                      }
                      height={100}
                      width={100}
                      className="aspect-[16/9] w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
                    />
                    <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
                  </div>
                  <div className="max-w-xl">
                    <div className="mt-8 flex items-center gap-x-4 text-xs">
                      <li
                        
                        className="relative z-10 r.ounded-full px-3 py-1.5 font-medium hover:bg-gray-100"
                      >
                        {article.attributes?.category?.data.attributes.name}
                      </li>
                    </div>
                    <div className="group relative">
                      <h3 className="mt-3 text-lg font-semibold leading-6  group-hover:text-sky-600">
                        <span className="absolute inset-0" />
                        {article.attributes.title}
                      </h3>
                      <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
                        {article.attributes.description}
                      </p>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
