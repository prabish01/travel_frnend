import Link from "next/link";
import Image from "next/image";
import HighlightedText from "./HighlightedText";

import { renderButtonStyle } from "../utils/render-button-style";
// import { FadeIn, FadeInStagger } from "./FadeIn";

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
  const alternativeText = data.picture.data.attributes.alternativeText;
  return (
    <div className="relative isolate overflow-hidden pt-14">
      <Image
        src={imgUrl}
        alt={alternativeText}
        className="absolute inset-0 -z-10 h-full w-full object-cover"
        width={1280}
        height={720}
        priority
      />

      <div className="mx-baseline max-w-3xl py-42 ml-2 sm:py-48 lg:py-56 lg:ml-40">
        <div className="hidden sm:mb-8 sm:flex sm:justify-center"></div>
        <div className="text-center">
          <h1 className="text-3xl font-bold leading-8 tracking-wide text-left lg:text-5xl">
          {data.title}
          </h1>
          <p className="mt-6 text-lg text-left leading-8 lg:text-3xl">
          {data.description}
          </p>

          <div className="mt-10 flex items-center justify-center gap-x-6">
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
      </div>

    </div>
  );
}
