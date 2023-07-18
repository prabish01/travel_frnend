import Link from "next/link";
import Image from "next/image";
import HighlightedText from "./HighlightedText";

import { renderButtonStyle } from "../utils/render-button-style";


interface Button {
  id: string;
  url: string;
  text: string;
  type: string;
  newTab: boolean;
}

interface Picture {
  data: {
    id: string;
    attributes: {
      url: string;
      name: string;
      alternativeText: string;
    };
  };
}

interface HeroProps {
  data: {
    id: string;
    title: string;
    description: string;
    picture: Picture;
    buttons: Button[];
  };
}

export default function Hero({ data }: HeroProps) {
  const imgUrl = data.picture.data.attributes.url;
  const alternativeText =  data.picture.data.attributes.alternativeText;

  return (
    <section className="dark:bg-gray-900 dark:text-gray-100">
      <div className="container flex flex-col justify-center p-6 mx-auto sm:py-12 lg:py-24 lg:flex-row lg:justify-between">
        <div className="flex flex-col justify-center p-6 text-center rounded-lg lg:max-w-md xl:max-w-lg lg:text-left">
          <HighlightedText
            text={data.title}
            tag="h1"
            className="text-3xl font-bold leading-none sm:text-4xl mb-8"
            color="dark:text-sky-400"
          />

          <HighlightedText
            text={data.description}
            tag="p"
            className="tmt-6 mb-8 text-lg sm:mb-12"
            color="dark:text-sky-400"
          />
          <div className="flex flex-col space-y-4  sm:items-center sm:justify-center sm:flex-row sm:space-y-0 sm:space-x-4 lg:justify-start">
            {data.buttons.map((button: Button, index: number) => (
              <Link
                key={button.id}
                href={button.url}
                target={button.newTab ? "_blank" : "_self"}
                className={renderButtonStyle(button.type)}
              >
                {button.text}
              </Link>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-center p-6 mt-2 lg:mt-0 h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128">
          <Image
            src={imgUrl || "Speed Wings Human Resource: Best Recruitment Agency for Manpower solutions"}
            alt={
              alternativeText || "Speed Wings Human Resource"
            }
            className="h-172 w-200 object-contain  sm:h-80 lg:h-96 xl:h-112 2xl:h-128 "
            width={600}
            height={600}
            priority={true}
          />
        {/* <ImageSD data={{ image: imgUrl, altText: alternativeText }} /> */}

        </div>
      </div>
    </section>
  );
}
