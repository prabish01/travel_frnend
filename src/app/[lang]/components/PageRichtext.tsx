import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface RichTextProps {
  data: {
    content: string;
  };
}

export default function PageRichText({ data }: RichTextProps) {
  // TODO: STYLE THE MARKDOWN
  return (
    <section className="rich-text py-6 dark:text-gray-50 ">
      <div className="m-4" >
      <Markdown children={data.content} remarkPlugins={[remarkGfm]} />
      </div>
    </section>
  );
}
