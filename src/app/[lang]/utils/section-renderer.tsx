// "use client";
import Hero from "../components/Hero";
import Features from "../components/Features";
import Testimonials from "../components/Testimonials";
import Pricing from "../components/Pricing";
import FeatureRow from "../components/FeatureRow";
import Statistic from "../components/Statistic";
import PageRichText from "../components/PageRichtext";


export function sectionRenderer(section: any, index: number) {


  switch (section.__component) {
    case "sections.hero":
      return <Hero key={index} data={section} />;
    case "sections.features":
      return <Features key={index} data={section} />;
    case "sections.testimonials-group":
      return <Testimonials key={index} data={section} />;
    case "sections.pricing":
      return <Pricing key={index} data={section} />;

    case "sections.feature-rows-group":
      return <FeatureRow key={index} data={section} />;
    case "sections.statistics":
      return <Statistic key={index} data={section}/>;
    case "sections.rich-text":
      return <PageRichText key={index} data={section} />;
    default:
      return null;
  }
}
