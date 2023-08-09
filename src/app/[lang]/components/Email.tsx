import FormSubmit from "./FormSubmit";

interface EmailProps {
  id: string;
  __component: string;
  title: string;
  description: string;
  emailPlaceholder: string;
  submitButton: {
    text: string;
  };
}

export default function Email({ data }: { data: EmailProps }) {
  return (
    <section className="py-12 bg-teal-400 dark:text-gray-50 sm:py-16">
      <div className="container mx-auto flex flex-col justify-center p-4 space-y-8 md:p-10 lg:space-y-0 lg:space-x-12 lg:justify-between lg:flex-row">
        <div className="flex flex-col space-y-4 text-center lg:text-left">
          <h2 className="font-semibold text-white leading-none">{data.title}</h2>
          <p className="text-lg text-teal-100">{data.description}</p>
        </div>
        <FormSubmit placeholder={data.emailPlaceholder} text={data.submitButton.text} />
      </div>
    </section>
  );
}
