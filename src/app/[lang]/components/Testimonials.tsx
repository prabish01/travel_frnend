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


export default function Testimonials({ data }: TestimonialsProps) {
  return (
    <div className="py-12 sm:py-16">
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