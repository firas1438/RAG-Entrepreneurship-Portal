import { HomeSection } from "@/components/home/section";

const services = [
  {
    title: "Création d'entreprise",
    text: "Identification des formes juridiques adaptées, préparation complète des pièces constitutives, immatriculation officielle au Registre National des Entreprises (RNE) et orientation ciblée vers les administrations et guichets uniques compétents.",
    image: "/services/11.png",
  },
  {
    title: "Analyse de marché",
    text: "Cartographie concurrentielle, analyse des indicateurs macroéconomiques et sectoriels récents, identification des opportunités régionales et évaluation de la demande par gouvernorat pour valider le positionnement de votre activité.",
    image: "/services/22.png",
  },
  {
    title: "Étude de faisabilité",
    text: "Évaluation multicritère couvrant les volets commercial, technique, réglementaire et financier. Restitution sous forme de rapport indicatif structuré pour anticiper les besoins en investissement et sécuriser votre prise de décision.",
    image: "/services/33.png",
  },
];

export function Services() {
  return (
    <HomeSection id="services" labelledBy="services-title">
      <p className="text-sm font-semibold tracking-wide text-primary uppercase">
        Missions & Démarches
      </p>
      <h2 id="services-title" className="mt-2 text-4xl font-semibold sm:text-4xl">
        Services aux créateurs et aux entreprises
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
