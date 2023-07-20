import Image from "next/image";

interface FeaturesRowProps {
  data: {
    heading: string;
    description: string;
    longDescription: string;
    features: FeaturesRow[];
    picture: Picture;
  };
}

interface FeaturesRow {
  icon: Picture;
  id: string;
  title: string;
  description: string;
}

interface Picture {
  data: {
    id: string;
    attributes: {
      width: number;
      height: number;
      url: string;
      caption: string;
      alternativeText: string;
    };
  };
}

export default function FeatureRow({ data }: FeaturesRowProps) {
  return (
    <div className="py-12 sm:py-16">
      <div className="lg:flex lg:flex-row lg:justify-center lg:items-center">
        <div className="mx-auto align-center align-left max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl sm:text-center">
            <h2 className="mt-30 text-base font-semibold leading-7">
              {data.heading}
            </h2>
            <p className="mt-2 text-3xl text-center font-bold tracking-tight sm:text-4xl">
              {data.description}
            </p>
            <p className="mt-6 text-lg leading-8">{data.longDescription}</p>
          </div>
        </div>
        <div className="relative overflow-hidden">
          <div className="mx-auto max-w-5xl px-6 lg:px-8">
            <Image
              src={data.picture.data.attributes.url}
              alt={data.picture.data.attributes.alternativeText}
              className="rounded-xl"
              width={data.picture.data.attributes.width}
              height={data.picture.data.attributes.height}
            />
          </div>
        </div>
      </div>

      <div className="mx-auto mt-16 max-w-7xl px-6 sm:mt-20 md:mt-24 lg:px-8">
        <dl className="mx-auto grid max-w-2xl grid-cols-1 gap-x-6 gap-y-6 text-base leading-7 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-x-10 lg:gap-y-10">
          {data.features.map((feature: FeaturesRow) => (
            <div key={feature.id} className="relative flex flex-col items-center rounded-2xl p-5 bg-gray-100 ">
              <Image
                src={feature?.icon?.data?.attributes.url}
                alt={feature?.icon?.data?.attributes.alternativeText}
                className="left-1 top-1 h-13 w-13 mr-8 mb-2"
                width={130}
                height={130}
              />
              <dt className="text-left font-semibold ">{feature.title}</dt>
              <dd className="mt-1 text-base text-justify leading-7 text-gray-600">
                {feature.description}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
