import Link from "next/link";
import Image from "next/image";
import { getStrapiMedia } from "../utils/api-helpers";



interface FeaturesProps {
  data: {
    heading: string;
    description: string;
    feature: Feature[];
    media:Picture;
  };
}

interface Feature {
  icon: any;
  id: string;
  title: string;
  description: string;
  showLink: boolean;
  newTab: boolean;
  url: string;
  text: string;
}

interface Picture {
  data: {
    id: string;
    attributes: {
      url: string;
      caption: string;
      alternativeText: string;
    };
  };
}

export default function Features({ data }: FeaturesProps) {
  
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {data.heading}
          </h2>
          {/* <p>{data.description}</p> */}
          <dl className="col-span-2 grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2">
          {data.feature.map((feature:Feature) => (
              <div key={feature.id}>
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="mb-6 flex h-40 w-30 items-center justify-center rounded-lg">
                    <Image src={getStrapiMedia(feature.media.data.attributes.url) ?? ''} width={100} height={100} className="h-100 w-100 text-white" aria-hidden="true" />
                  </div>
                  {feature.title}
                </dt>
                <dd className="mt-1 text-base leading-7 text-gray-600">{feature.description}</dd>
                {feature.showLink && feature.url && feature.text && (
                    <p className="mt-6">
                      <Link href={feature.url} className="text-sm font-semibold leading-6 text-blue-400">
                        {feature.text} <span aria-hidden="true">→</span>
                      </Link>
                    </p>
                    )}
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>

  );
 
}
