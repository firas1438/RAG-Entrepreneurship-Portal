import { HomeSection } from "@/components/home/section";

const processSteps = [
  {
    number: "01",
    title: "Describe",
    description:
      "Indicate the activity, the location, and the question you want to address.",
  },
  {
    number: "02",
    title: "Review",
    description:
      "The portal returns the relevant procedures, incorporation documents, and market data.",
  },
  {
    number: "03",
    title: "Verify",
    description:
      "Confirm legal texts, authorizations, and fee schedules on official government websites.",
  },
];

export function HowItWorks() {
  return (
    <HomeSection
      id="how-it-works"
      labelledBy="steps-title"
      className="bg-zinc-50"
    >
      <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <div className="max-w-md">
          <p className="text-sm font-semibold tracking-wide text-primary uppercase">
            How It Works
          </p>
          <h2
            id="steps-title"
            className="mt-2 text-4xl font-semibold leading-tight tracking-tight sm:text-5xl"
          >
            How It Works
          </h2>

          <p className="mt-4 mb-8 text-lg leading-relaxed text-zinc-600">
            A structured three-step journey to take your business idea from
            concept to its administrative and regulatory completion in Tunisia.
            Each step guides you toward the right agencies, required documents,
            and applicable official texts.
          </p>
        </div>

        <div className="relative">
          <div
            aria-hidden="true"
            className="absolute bottom-8 left-5 top-8 border-l-2 border-dotted border-primary/50"
          />

          <div className="relative flex flex-col gap-4">
            {processSteps.map((step) => (
              <article
                key={step.number}
                className="group relative overflow-hidden rounded-sm border border-zinc-300 bg-white p-5 pl-14 shadow-xs transition-colors hover:border-primary/50 sm:p-6 sm:pl-16"
              >
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 z-0 hidden bg-[url('/pattern.png')] bg-center bg-cover bg-no-repeat opacity-25 sm:block"
                />

                <span
                  aria-hidden="true"
                  className="absolute left-[15px] top-6 flex size-3 items-center justify-center rounded-full bg-primary ring-4 ring-white transition-transform group-hover:scale-125"
                />

                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 z-0 flex items-center justify-end pr-4 select-none tabular-nums text-[9rem] font-bold leading-none tracking-tighter text-zinc-900 opacity-5 sm:inset-auto sm:-bottom-8 sm:-right-2 sm:block sm:p-0 sm:text-[10rem]"
                >
                  {step.number}
                </span>

                <div className="relative z-10">
                  <h3 className="text-2xl font-semibold tracking-tight text-zinc-950 transition-colors group-hover:text-primary">
                    {step.title}
                  </h3>

                  <p className="mt-2 max-w-xl text-sm leading-relaxed text-zinc-600">
                    {step.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </HomeSection>
  );
}
