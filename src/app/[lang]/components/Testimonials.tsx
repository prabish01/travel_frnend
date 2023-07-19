import Image from "next/image";


interface Testimonial {
  id:number;
  text: string;
  authorName: string;
  picture: {
    data: {
      id: string;
      attributes: {
        name: string;
        alternativeText: string;
        url: string;
      };
    };
  };
}

interface TestimonialsProps {
  data: {
    id: string;
    title: string;
    description: string;
    testimonials: Testimonial[];
  };
}

// function Testimonial({ text, authorName, picture }: Testimonial) {
//   const imageUrl = picture.data.attributes.url;
//   return (
//     <div className="flex flex-col items-center mx-12 lg:mx-0">
//       <div className="flex items-center">
//         <div className="my-6">
//           <Image
//             src={imageUrl || ""}
//             alt={picture.data.attributes.alternativeText || "none provided"}
//             className="inline-block h-32 w-32 rounded-full"
//             width={200}
//             height={200}
//           />
//         </div>
//       </div>
//       <div className="relative text-center">
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           viewBox="0 0 512 512"
//           fill="currentColor"
//           className="absolute top-0 left-0 w-8 h-8 dark:text-gray-700"
//         >
//           <path d="M232,246.857V16H16V416H54.4ZM48,48H200V233.143L48,377.905Z"></path>
//           <path d="M280,416h38.4L496,246.857V16H280ZM312,48H464V233.143L312,377.905Z"></path>
//         </svg>
//         <p className="px-6 py-1 text-lg italic">{text}</p>
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           viewBox="0 0 512 512"
//           fill="currentColor"
//           className="absolute bottom-0 right-0 w-8 h-8 dark:text-gray-700"
//         >
//           <path d="M280,185.143V416H496V16H457.6ZM464,384H312V198.857L464,54.1Z"></path>
//           <path d="M232,16H193.6L16,185.143V416H232ZM200,384H48V198.857L200,54.1Z"></path>
//         </svg>
//       </div>
//       <span className="w-12 h-1 my-2 rounded-lg dark:bg-sky-400"></span>
//       <p>{authorName}</p>
//     </div>
//   );
// }

// export default function Testimonials({ data }: TestimonialsProps) {
  
//   return (
//     <section className="dark:text-gray-100  m:py-12 lg:py-24">
//       <div className="container mx-auto py-4 space-y-2 text-center">
//         <h1 className="text-4xl font-semibold leading-none text-center">
//           {data.title}
//         </h1>
//         <p className="mt-4 text-lg text-center">{data.description}</p>
//       </div>
//       <div className="container mx-auto grid grid-cols-1 gap-8 lg:gap-20 md:px-10 md:pb-10 lg:grid-cols-2">
//         {data.testimonials.map((testimonial: Testimonial, index: number) => (
//           <>
//           <Testimonial key={index} {...testimonial} />
//           {console.log(testimonial)}
//           </>
//         ))}

//       </div>
//     </section>
//   );
// }
export default function Testimonials({ data }: TestimonialsProps) {
  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-lg font-semibold leading-8 tracking-tight text-orange-400">{data.title}</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          {data.description}
          </p>
        </div>
        <div className="mx-auto mt-16 flow-root max-w-2xl sm:mt-20 lg:mx-0 lg:max-w-none">
          <div className="-mt-8 sm:-mx-4 sm:columns-2 sm:text-[0] lg:columns-3">
            {data.testimonials.map((testimonial:Testimonial,index:number) => (
              <div key={testimonial.id} className="pt-8 sm:inline-block sm:w-full sm:px-4">
                <figure className="rounded-2xl bg-gray-50 p-8 text-sm leading-6">
                  <blockquote className="text-gray-900">
                    <p>{`“${testimonial.text}”`}</p>
                  </blockquote>
                  <figcaption className="mt-6 flex items-center gap-x-4">
                    <Image className="h-10 w-10 rounded-full bg-gray-50" 
                    src={testimonial.picture.data.attributes.url} alt="Speed WIngs HUman Resource"
                    width={100}
                    height={100}
                     />
                    <div>
                      <div className="font-semibold text-gray-900">{testimonial.authorName}</div>
                  
                    </div>
                  </figcaption>
                </figure>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}