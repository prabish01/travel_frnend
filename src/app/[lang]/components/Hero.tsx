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

// export default function Hero({ data }: HeroProps) {
//   const imgUrl = data.picture.data.attributes.url;
//   const alternativeText =  data.picture.data.attributes.alternativeText;

//   return (
//     <section className="dark:bg-gray-900 dark:text-gray-100">
//       <div className="container flex flex-col justify-center p-6 mx-auto sm:py-12 lg:py-24 lg:flex-row lg:justify-between">

//         <div className="flex flex-col text-center rounded-lg lg:max-w-md xl:max-w-lg lg:text-left">

//           <HighlightedText
//             text={data.title}
//             tag="h1"
//             className="text-3xl font-bold leading-none sm:text-4xl mb-8"
//             color="dark:text-sky-400"
//           />

//           <HighlightedText
//             text={data.description}
//             tag="p"
//             className="tmt-6 mb-8 text-lg sm:mb-12"
//             color="dark:text-sky-400"
//           />
//           <div className="flex flex-col space-y-4  sm:items-center sm:justify-center sm:flex-row sm:space-y-0 sm:space-x-4 lg:justify-start">
//             {data.buttons.map((button: Button, index: number) => (
//               <Link
//                 key={button.id}
//                 href={button.url}
//                 target={button.newTab ? "_blank" : "_self"}
//                 className={renderButtonStyle(button.type)}
//               >
//                 {button.text}
//               </Link>
//             ))}
//           </div>

//         </div>

//         <div className="flex items-center justify-center p-6 mt-2 lg:mt-0 h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128">

//           <Image
//             src={imgUrl || "Speed Wings Human Resource: Best Recruitment Agency for Manpower solutions"}
//             alt={
//               alternativeText || "Speed Wings Human Resource"
//             }
//             className="h-172 w-200 object-contain  sm:h-80 lg:h-96 xl:h-112 2xl:h-128 "
//             width={600}
//             height={600}
//             priority={true}
//           />
//         </div>
//       </div>
//     </section>
//   );
// }
export default function Hero({ data }: HeroProps) {
  const imgUrl = data.picture.data.attributes.url;
  const alternativeText = data.picture.data.attributes.alternativeText;
  return (
    <div className="relative isolate overflow-hidden pt-14">
      <Image
        src={imgUrl}
        alt={data.picture.data.attributes.alternativeText}
        className="absolute inset-0 -z-10 h-full w-full object-cover"
        width={500}
        height={500}

      />
      <div
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        aria-hidden="true"
      >
        <div
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>
      <div className="mx-baseline max-w-3xl py-42 ml-2 sm:py-48 lg:py-56 lg:ml-40">
        <div className="hidden sm:mb-8 sm:flex sm:justify-center"></div>
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-left lg:text-5xl">
          {data.title}
          </h1>
          <p className="mt-6 text-lg text-left leading-8 text-orange-300">
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
      <div
        className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
        aria-hidden="true"
      >
        <div
          className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>
    </div>
  );
}
