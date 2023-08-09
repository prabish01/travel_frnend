import classNames from "classnames";
import Link from "next/link";

function colors(type: string) {
  switch (type) {
    case "info":
      return "bg-teal-50000";
    case "warning":
      return "bg-teal-500";
    case "alert":
      return "bg-teal-500";
    default:
      return "bg-teal-300";
  }
}

interface BannerProps {
  data: {
    heading: string;
    text: string;
    type: string;
    show: boolean;
    link: {
      id: number;
      url: string;
      newTab: boolean;
      text: string;
    };
  } | null;
}

export default function Banner({ data }: BannerProps) {
  if (!data) return null;
  const { heading, text, type, show, link } = data;
  if (!show) return null;
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 sm:flex sm:justify-center sm:px-6 sm:pb-5 lg:px-8">
      <div className={classNames("pointer-events-auto flex items-center justify-between gap-x-6 py-2.5 px-6 sm:rounded-xl sm:py-3 sm:pr-3.5 sm:pl-4", colors(type))}>
        <p className="text-sm leading-6 text-white">
          <Link href={link.url} target={link.newTab ? "_blank" : "_self"}>
            <strong className="font-semibold">{heading}</strong> {text}&nbsp;
            <span aria-hidden="true">&rarr;</span>
          </Link>
        </p>
      </div>
    </div>
  );
}
