import { HomeSection } from "@/components/home/section";

const forms = [
  {
    name: "Entreprise individuelle",
    abbr: "EI",
    detail:
      "Une personne physique. Formalités réduites, responsabilité illimitée.",
    capital: "Aucun minimum",
    associes: "1 personne",
    responsabilite: "Illimitée",
  },
  {
    name: "Société Unipersonnelle à Responsabilité Limitée",
    abbr: "SUARL",
    detail: "Associé unique. Patrimoine de la société distinct, statuts écrits.",
    capital: "Aucun minimum",
    associes: "1 associé",
    responsabilite: "Limitée aux apports",
  },
  {
    name: "Société à Responsabilité Limitée",
    abbr: "SARL",
    detail: "Deux associés au moins. Forme courante pour les PME.",
    capital: "Aucun minimum",
    associes: "2 à 50 associés",
    responsabilite: "Limitée aux apports",
  },
  {
    name: "Société Anonyme",
    abbr: "SA",
    detail: "Projets de taille importante. Capital et organes définis par la loi.",
    capital: "5 000 DT min.",
    associes: "7 actionnaires min.",
    responsabilite: "Limitée aux apports",
  },
];

export function LegalFramework() {
  return (
    <HomeSection id="cadre" labelledBy="cadre-title">
      <p className="text-sm font-semibold tracking-wide text-primary uppercase">
        Droit des sociétés
      </p>
      <h2 id="cadre-title" className="mt-2 text-4xl font-semibold sm:text-5xl">
        Cadre juridique
      </h2>
      <p className="mt-3 max-w-3xl text-lg text-zinc-600">
        Formes les plus utilisées pour exercer une activité en Tunisie. Le choix
        dépend du nombre d&apos;associés et du niveau de risque.
      </p>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {forms.map((form) => (
          <div
            key={form.abbr}
            className="relative overflow-hidden border border-zinc-300 bg-white"
          >
            {/* red left accent */}
            <div className="absolute inset-y-0 left-0 w-1 bg-primary" />

            <div className="p-6 pl-7">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="text-xs font-bold tracking-widest text-primary uppercase">
                    {form.abbr}
                  </span>
                  <h3 className="mt-0.5 text-xl font-semibold text-zinc-950">
                    {form.name}
                  </h3>
                </div>
              </div>

              <p className="mt-3 text-base text-zinc-600">{form.detail}</p>

              <dl className="mt-5 grid grid-cols-3 gap-3 border-t border-zinc-100 pt-4 text-sm">
                <div>
                  <dt className="text-xs font-medium text-zinc-400 uppercase">
                    Capital
                  </dt>
                  <dd className="mt-0.5 font-semibold text-zinc-800">
                    {form.capital}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-medium text-zinc-400 uppercase">
                    Associés
                  </dt>
                  <dd className="mt-0.5 font-semibold text-zinc-800">
                    {form.associes}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-medium text-zinc-400 uppercase">
                    Responsabilité
                  </dt>
                  <dd className="mt-0.5 font-semibold text-zinc-800">
                    {form.responsabilite}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        ))}
      </div>
    </HomeSection>
  );
}
