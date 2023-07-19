import { formatDate } from "@/app/[lang]/utils/api-helpers";
import { postRenderer } from "@/app/[lang]/utils/post-renderer";

import Image from "next/image";
import PageScrollProgressBar from "../components/PageScrollProgessBar";


interface Article {
  id: number;
  attributes: {
    title: string;
    description: string;
    slug: string;
    cover: {
      data: {
        attributes: {
          url: string;
        };
      };
    };
    authorsBio: {
      data: {
        attributes: {
          name: string;
          avatar: {
            data: {
              attributes: {
                url: string;
              };
            };
          };
        };
      };
    };
    blocks: any[];
    publishedAt: string;
    updatedAt: string;
  };
}
interface Params{
    slug:string;
    lang:string;
    category:string;
}
export default function Post({ data }: { data: Article}) {
  const { title, description, publishedAt, cover, authorsBio} = data.attributes;
  const author = authorsBio.data?.attributes;
  const imageUrl = cover.data?.attributes.url;
  const authorImgUrl = authorsBio.data?.attributes.avatar.data.attributes.url;

 

  return (
    <>
      <PageScrollProgressBar/>
      <article className="space-y-8 dark:bg-gray-900 dark:text-gray-50">
        {imageUrl && (
          <Image
            src={imageUrl}
            alt="Speed Wings Human Resource: Your Solution for Manpower needs"
            width={400}
            height={400}
            className="w-full h-96 object-cover rounded-lg"
          />
        )}
        <div className="space-y-6">
          <h1 className="leading-tight text-5xl font-bold ">{title}</h1>
          <div className="flex flex-col items-start justify-between w-full md:flex-row md:items-center dark:text-gray-400">
            <div className="flex items-center md:space-x-2">
              {authorImgUrl && (
                <Image
                  src={authorImgUrl}
                  alt="Speed Wings Human Resource"
                  width={400}
                  height={400}
                  className="w-14 h-14 border rounded-full dark:bg-gray-500 dark:border-gray-700"
                />
              )}
              <p className="text-md dark:text-sky-400">
                {author?.name || "Saroj Phuyal"} • {formatDate(publishedAt)}
              </p>
            </div>
          </div>
        </div>

        <div className="dark:text-gray-100">
          <p>{description}</p>

          {data.attributes.blocks.map((section: any, index: number) =>
            postRenderer(section, index)
          )}
        </div>
      </article>
    </>
  );
}
