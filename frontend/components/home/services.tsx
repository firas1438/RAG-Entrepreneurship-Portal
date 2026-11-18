import { HomeSection } from "@/components/home/section";

const services = [
  {
    title: "Business Creation",
    text: "Identification of suitable legal forms, full preparation of incorporation documents, official registration with the Registre National des Entreprises (RNE), and targeted guidance toward the relevant authorities and one-stop shops.",
    image: "/services/11.png",
  },
  {
    title: "Market Analysis",
    text: "Competitive mapping, analysis of recent macroeconomic and sector-specific indicators, identification of regional opportunities, and demand assessment by governorate to validate your business positioning.",
    image: "/services/22.png",
  },
  {
    title: "Feasibility Study",
    text: "Multi-criteria evaluation covering commercial, technical, regulatory, and financial dimensions. Delivered as a structured indicative report to anticipate investment needs and support informed decision-making.",
    image: "/services/33.png",
  },
];

export function Services() {
  return (
    <HomeSection id="services" labelledBy="services-title">
      <p className="text-sm font-semibold tracking-wide text-primary uppercase">
        Services &amp; Procedures
      </p>
      <h2 id="services-title" className="mt-2 text-4xl font-semibold sm:text-4xl">
        Services for Founders and Businesses
      </h2>
      <div className="mt-10">
        {services.map((service, index) => (
          <article
            key={service.title}
            className="grid items-center border-t border-zinc-200 md:grid-cols-2"
          >
            <div
              className={`flex justify-center py-6 ${index % 2 === 1 ? "md:order-2" : ""}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={service.image}
                alt={service.title}
                width={500}
                height={420}
                className="h-auto w-full max-w-[420px] object-contain"
              />
            </div>
            <div className="px-0 py-8 md:px-10">
              <h3 className="text-3xl font-semibold sm:text-4xl">{service.title}</h3>
              <p className="mt-4 text-xl leading-snug text-zinc-600">
                {service.text}
              </p>
            </div>
          </article>
        ))}
      </div>
    </HomeSection>
  );
}
