import type { Metadata } from "next";
import "./globals.css";
import { getMenuItems, getStrapiURL } from "./utils/api-helpers";
import { fetchAPI } from "./utils/fetch-api";

import { i18n } from "../../../i18n-config";
import Banner from "./components/Banner";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { FALLBACK_SEO } from "@/app/[lang]/utils/constants";
import { LogoJsonLd } from "next-seo";


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

  if (!meta.data) return FALLBACK_SEO;

  const { metadata, favicon } = meta.data.attributes;

  const { url } = favicon.data.attributes;

  return {
    metadataBase: new URL("https://speedwingshr.com"),
    applicationName: metadata.metaTitle,
    referrer: "origin-when-cross-origin",
    icons: {
      icon: [new URL(url, getStrapiURL())],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        noimageindex: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    themeColor: [
      { media: "(prefers-color-scheme: light)", color: "#1899c8" },
      { media: "(prefers-color-scheme: dark)", color: "#111827" },
    ],
    alternates: {
      canonical: "/",
      languages: {
        en: "/en",
      },

      types: {
        "application/rss+xml": "/rss",
      },
    },
    openGraph: {
      title: metadata.metaTitle,
      description: metadata.metaDescription,
      url: "/",
      siteName: metadata.metaTitle,
      images: [
        {
          url: "/og.png",
          width: 1800,
          height: 1600,
          alt: "Speed Wings Human Resource",
        },
      ],
      locale: "en_US",
      type: "website",
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
        <LogoJsonLd
        useAppDir={true}
      logo={navbarLogoUrl}
      url={`${process.env.NEXT_PUBLIC_DOMAIN}`}
    />

        <main className="dark:bg-gray-900 dark:text-gray-400 min-h-screen">
          {children}
        </main>
        

        <Banner data={notificationBanner} />
   
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
