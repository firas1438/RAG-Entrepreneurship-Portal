import { HomeSection } from "@/components/home/section";

const forms = [
  {
    name: "Entreprise individuelle",
    abbr: "EI",
    detail:
      "Sole proprietorship. Minimal formalities, unlimited personal liability.",
    capital: "No minimum",
    associes: "1 person",
    responsabilite: "Unlimited",
  },
  {
    name: "Société Unipersonnelle à Responsabilité Limitée",
    abbr: "SUARL",
    detail: "Single-member company. Separate business assets, written articles of association required.",
    capital: "No minimum",
    associes: "1 shareholder",
    responsabilite: "Limited to contributions",
  },
  {
    name: "Société à Responsabilité Limitée",
    abbr: "SARL",
    detail: "At least two shareholders. The standard form for small and medium enterprises.",
    capital: "No minimum",
    associes: "2 to 50 shareholders",
    responsabilite: "Limited to contributions",
  },
  {
    name: "Société Anonyme",
    abbr: "SA",
    detail: "For large-scale projects. Capital and governing bodies defined by law.",
    capital: "5,000 TND min.",
    associes: "7 shareholders min.",
    responsabilite: "Limited to contributions",
  },
];

export function LegalFramework() {
  return (
    <HomeSection id="cadre" labelledBy="cadre-title">
      <p className="text-sm font-semibold tracking-wide text-primary uppercase">
        Company Law
      </p>
      <h2 id="cadre-title" className="mt-2 text-4xl font-semibold sm:text-5xl">
        Legal Framework
      </h2>
      <p className="mt-3 max-w-3xl text-lg text-zinc-600">
        The most common legal forms for conducting business in Tunisia. The
        right choice depends on the number of shareholders and the level of
        risk.
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
                    Shareholders
                  </dt>
                  <dd className="mt-0.5 font-semibold text-zinc-800">
                    {form.associes}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-medium text-zinc-400 uppercase">
                    Liability
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
