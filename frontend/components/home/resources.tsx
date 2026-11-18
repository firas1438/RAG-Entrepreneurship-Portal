import Link from "next/link";
import { ArrowUpRight, ShieldCheck } from "lucide-react";
import { HomeSection } from "@/components/home/section";

const resources = [
  {
    name: "National Register of Enterprises (RNE)",
    abbr: "RNE",
    domain: "Registration",
    description: "Registration, modification, and deregistration of Tunisian companies.",
    url: "https://www.registre-entreprises.tn",
  },
  {
    name: "Agency for the Promotion of Industry and Innovation (APII)",
    abbr: "APII",
    domain: "Investment",
    description: "One-stop shop for business creation and investor support.",
    url: "https://www.apii.tn",
  },
  {
    name: "National Institute of Statistics (INS)",
    abbr: "INS",
    domain: "Statistics",
    description: "Official demographic, economic, and sector-level data.",
    url: "https://www.ins.tn",
  },
  {
    name: "National Social Security Fund (CNSS)",
    abbr: "CNSS",
    domain: "Social coverage",
    description: "Employer registration, declarations, and social contributions.",
    url: "https://www.cnss.tn",
  },
  {
    name: "Ministry of Finance (MF)",
    abbr: "MF",
    domain: "Taxation",
    description: "Tax regimes, declarations, and applicable legislation.",
    url: "https://www.finances.gov.tn",
  },
  {
    name: "Tunisian Industry Portal (TI)",
    abbr: "TI",
    domain: "Industry",
    description: "Sector classifications, fee schedules, and industrial regulations.",
    url: "https://www.tunisieindustrie.nat.tn",
  },
];

export function Resources() {
  return (
    <HomeSection
      id="resources"
      labelledBy="resources-title"
      className="bg-zinc-50"
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold tracking-wide text-primary uppercase">
            Administration
          </p>
          <h2
            id="resources-title"
            className="mt-2 text-4xl font-semibold sm:text-5xl"
          >
            Official Resources
          </h2>
          <p className="mt-3 max-w-2xl text-lg text-zinc-600">
            Organizations to consult for procedures, taxation, social coverage,
            and statistics.
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-2 border border-zinc-200 bg-white px-4 py-3 text-xs text-zinc-500 sm:max-w-xs">
          <ShieldCheck className="size-4 shrink-0 text-primary" />
          <span>Official JORT texts prevail in case of discrepancy.</span>
        </div>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {resources.map((item) => (
          <Link
            key={item.url}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex flex-col justify-between overflow-hidden border border-zinc-300 bg-white p-6 no-underline transition-colors hover:border-primary/50"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 z-0 hidden bg-[url('/pattern.png')] bg-center bg-cover bg-no-repeat opacity-25 sm:block"
            />

            <div className="relative z-10 flex items-start justify-between gap-2">
              <p className="text-base font-semibold leading-snug text-zinc-950 transition-colors group-hover:text-primary">
                {item.name}
              </p>
              <ArrowUpRight className="size-4 shrink-0 text-zinc-400 transition-colors group-hover:text-primary" />
            </div>

            <div className="relative z-10 mt-1">

              <p className="mt-1.5 text-sm leading-snug text-zinc-500">
                {item.description}
              </p>
              <span className="mt-3 inline-block border border-zinc-200 bg-zinc-100 px-2 py-0.5 text-xs font-medium text-zinc-600">
                {item.domain}
              </span>
            </div>

            <p className="relative z-10 mt-4 text-xs text-zinc-400">
              {item.url.replace("https://", "")}
            </p>
          </Link>
        ))}
      </div>
    </HomeSection>
  );
}
