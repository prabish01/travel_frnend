"use client";

import { Disclosure } from '@headlessui/react';
import { MinusSmallIcon, PlusSmallIcon } from '@heroicons/react/24/outline';


interface QuestionAnswer {
  id: string;
  question:string;
  answer: string;

}

interface QuestionAnswerProps {
  data: {
    id: string;
    title: string;
    plans: QuestionAnswer[];
  };
}


export default function Pricing({ data }: QuestionAnswerProps) {

  return(
    <>

      <div className="mx-auto max-w-7xl px-6 py-12 sm:py-16 lg:px-8 lg:py-15">
        <div className="mx-auto max-w-4xl divide-y divide-white/10">
          <h2 className="leading-10 text-4xl font-semibold text-center dark:text-white">{data.title}</h2>
          <dl className="mt-10 space-y-6 divide-y dark:divide-orange/400">
            {data.plans.map((faq:QuestionAnswer) => (
              <Disclosure as="div" key={faq.question} className="pt-6">
                {({ open }) => (
                  <>
                    <dt>
                      <Disclosure.Button className="flex w-full items-start justify-between text-left dark:text-white">
                        <span className="text-base font-semibold leading-7">{faq.question}</span>
                        <span className="ml-6 flex h-7 items-center">
                          {open ? (
                            <MinusSmallIcon className="h-6 w-6" aria-hidden="true" />
                          ) : (
                            <PlusSmallIcon className="h-6 w-6" aria-hidden="true" />
                          )}
                        </span>
                      </Disclosure.Button>
                    </dt>
                    <Disclosure.Panel as="dd" className="mt-2 pr-12">
                      <p className="text-base leading-7 text-gray-700">{faq.answer}</p>
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
              
            ))}
          </dl>
        </div>
      </div>
    </>

  );
}
