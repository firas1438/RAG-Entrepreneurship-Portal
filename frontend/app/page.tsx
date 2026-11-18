import { Hero } from "@/components/home/hero";
import { Services } from "@/components/home/services";
import { HowItWorks } from "@/components/home/how-it-works";
import { Resources } from "@/components/home/resources";
import { Faq } from "@/components/home/faq";
import { Cta } from "@/components/home/cta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      <HowItWorks />
      <Resources />
      <Faq />
      <Cta />
    </>
  );
}
