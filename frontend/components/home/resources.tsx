import Link from "next/link";
import { ArrowUpRight, ShieldCheck } from "lucide-react";
import { HomeSection } from "@/components/home/section";

const resources = [
  {
    name: "Registre national des entreprises",
    abbr: "RNE",
    domain: "Immatriculation",
    description: "Immatriculation, modification et radiation des entreprises tunisiennes.",
    url: "https://www.registre-entreprises.tn",
  },
  {
    name: "Agence de promotion de l'industrie et de l'innovation",
    abbr: "APII",
    domain: "Investissement",
    description: "Guichet unique pour la création d'entreprise et l'accompagnement des investisseurs.",
    url: "https://www.apii.tn",
  },
  {
    name: "Institut national de la statistique",
    abbr: "INS",
    domain: "Statistiques",
    description: "Données démographiques, économiques et sectorielles officielles.",
    url: "https://www.ins.tn",
  },
  {
    name: "Caisse nationale de sécurité sociale",
    abbr: "CNSS",
    domain: "Protection sociale",
    description: "Affiliation, déclarations et cotisations sociales des employeurs.",
    url: "https://www.cnss.tn",
  },
  {
    name: "Ministère des Finances",
    abbr: "MF",
    domain: "Fiscalité",
    description: "Régimes fiscaux, déclarations et textes de loi en vigueur.",
    url: "https://www.finances.gov.tn",
  },
  {
    name: "Portail de l'industrie tunisienne",
    abbr: "TI",
    domain: "Industrie",
    description: "Nomenclatures sectorielles, barèmes et réglementations industrielles.",
    url: "https://www.tunisieindustrie.nat.tn",
  },
];

export function Resources() {
  return (
    <HomeSection
      id="ressources"
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
            Ressources officielles
          </h2>
          <p className="mt-3 max-w-2xl text-lg text-zinc-600">
            Organismes à consulter pour les procédures, la fiscalité, le social
            et les statistiques.
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-2 border border-zinc-200 bg-white px-4 py-3 text-xs text-zinc-500 sm:max-w-xs">
          <ShieldCheck className="size-4 shrink-0 text-primary" />
          <span>Les textes officiels publiés au JORT prévalent en cas de divergence.</span>
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
