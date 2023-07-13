import type { Metadata } from "next";
import "./globals.css";
import { getMenuItems,getStrapiURL } from "./utils/api-helpers";
import { fetchAPI } from "./utils/fetch-api";

import { i18n } from "../../../i18n-config";
import Banner from "./components/Banner";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import {FALLBACK_SEO} from "@/app/[lang]/utils/constants";
import Contact from './components/Contact';



async function getGlobal(): Promise<any> {
  const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;


  if (!token) throw new Error(" API Token environment variable is not set.");

  const path = `/global`;
  const options = { headers: { Authorization: `Bearer ${token}` } };

  const urlParamsObject = {
    populate: [
      "metadata.shareImage",
      "favicon",
      "notificationBanner.link",
      "navbar.links",
      "navbar.navbarLogo.logoImg",
      "footer.footerLogo.logoImg",
      "footer.menuLinks",
      "footer.legalLinks",
      "footer.socialLinks",
      "footer.categories",
    ],
  };
  return await fetchAPI(path, urlParamsObject, options);
}

export async function generateMetadata(): Promise<Metadata> {
  const meta = await getGlobal();

  console.log("after",JSON.stringify(meta.data.attributes.favicon));


  if (!meta.data) return FALLBACK_SEO;

  const { metadata, favicon } = meta.data.attributes;
  const { url } = favicon.data.attributes;

  return {
    applicationName: 'Speed Wings Human Resource',
    title: metadata.metaTitle,
    description: metadata.metaDescription,
    referrer: 'origin-when-cross-origin',
    icons: {
      icon: [new URL(url, getStrapiURL())],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: false,
        noimageindex: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    themeColor: [
      { media: '(prefers-color-scheme: light)', color: '#1899c8' },
      { media: '(prefers-color-scheme: dark)', color: '#111827' },
    ],
    alternates: {
      canonical: process.env.NEXT_PUBLIC_HOST ?? "https://client-website.com/",
      languages: {
        'en': 'https://speedwingshr.com/en',
   
      },

      types: {
        'application/rss+xml': 'https://speedwingshr.com/rss',
      },
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  const global = await getGlobal();
  // TODO: CREATE A CUSTOM ERROR PAGE
  if (!global.data) return null;
  
  const { notificationBanner, navbar, footer } = global.data.attributes;

  const navbarLogoUrl = navbar.navbarLogo.logoImg.data.attributes.url;

  const footerLogoUrl = footer.footerLogo.logoImg.data.attributes.url;
  const menuItems = await getMenuItems();
  

  return (
    <html lang={params.lang}>
      <body>
        <Navbar
          menuItems={menuItems}
          logoUrl={navbarLogoUrl}
          logoText={navbar.navbarLogo.logoText}
        />

        <main className="dark:bg-gray-900 dark:text-gray-100 min-h-screen">
          {children}
        </main>

        <Banner data={notificationBanner} />

        <Contact/> 

        <Footer
          logoUrl={footerLogoUrl}
          logoText={footer.footerLogo.logoText}
          menuLinks={footer.menuLinks}
          categoryLinks={footer.categories.data}
          legalLinks={footer.legalLinks}
          socialLinks={footer.socialLinks}
        />
      </body>
    </html>
  );
}

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}
