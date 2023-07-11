"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Logo from "./Logo";
import { AiFillTwitterCircle, AiFillYoutube } from "react-icons/ai";

interface FooterLink {
  id: number;
  url: string;
  newTab: boolean;
  text: string;
  social?: string;
}

interface CategoryLink {
  id: string;
  attributes: {
    name: string;
    slug: string;
  };
}

function FooterLink({ url, text }: FooterLink) {
  const path = usePathname();
  return (
    <li className="flex">
      <Link
        href={url}
        className={`hover:dark:text-sky-400 ${path === url && "dark:text-sky-400 dark:border-sky-400"
          }}`}
      >
        {text}
      </Link>
    </li>
  );
}

function CategoryLink({ attributes }: CategoryLink) {
  return (
    <li className="flex">
      <Link
        href={`/blog/${attributes.slug}`}
        className="text-sm leading-6 hover:text-sky-400"
      >
        {attributes.name}
      </Link>
    </li>
  );
}

function RenderSocialIcon({ social }: { social: string | undefined }) {
  switch (social) {
    case "TWITTER":
      return <AiFillTwitterCircle />;
    case "YOUTUBE":
      return <AiFillYoutube />;

    default:
      return null;
  }
}


export default function Footer({
  logoUrl,
  logoText,
  menuLinks,
  categoryLinks,
  legalLinks,
  socialLinks,
}: {
  logoUrl: string | null;
  logoText: string | null;
  menuLinks: Array<FooterLink>;
  categoryLinks: Array<CategoryLink>;
  legalLinks: Array<FooterLink>;
  socialLinks: Array<FooterLink>;
}) {

  return(
    <footer className="dark:bg-gray-900 text-gray-900" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="mx-auto max-w-7xl px-6 pb-8 pt-16 sm:pt-24 lg:px-8 lg:pt-32">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8">
            <Logo src={logoUrl}>
              {logoText && <h2 className="sr-only">{logoText}</h2>}
            </Logo>
            <p className="text-sm leading-6 dark:text-gray-300">
              Bridging Talent to Opportunity: Let's Write Your Success Story!
            </p>
            <div className="flex space-x-6">
              {socialLinks.map((link: FooterLink) => {
                return (
                  <a
                    key={link.id}
                    rel="noopener noreferrer"
                    href={link.url}
                    title={link.text}
                    target={link.newTab ? "_blank" : "_self"}
                    className="text-gray-900 hover:text-gray-600"
                  >
                    <RenderSocialIcon social={link.social} />
                  </a>
                );
              })}
            </div>


          </div>
          <div className="mt-1 grid grid-cols-2 gap-8  xl:col-span-2 xl:mt-0 dark:text-white-900">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div className="mt-8 md:mt-0">
                <ul role="list" className="mt-6 space-y-4">
                {categoryLinks.map((link: CategoryLink) => (
                <CategoryLink key={link.id} {...link} />
              ))}
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                
                <ul role="list" className="mt-6 space-y-4">
                {menuLinks.map((item: FooterLink) => (
                    <li key={item.id}>
                      <a href={item.url} className="text-sm leading-6 dark:text-gray-300 hover:text-sky-400 dark:text-white-400">
                        {item.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
          </div>
        </div>
        <div className="mt-16 border-t border-white/10 pt-8 sm:mt-15 lg:mt-15">
          <p className="text-xs leading-5 text-gray-400"> ©{new Date().getFullYear()} Speed Wings Human Resource. All rights reserved.</p>
        </div>
      </div>
      </div>
    </footer>
  )
}
