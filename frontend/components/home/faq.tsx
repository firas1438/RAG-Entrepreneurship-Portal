"use client";

import { HomeSection } from "@/components/home/section";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    id: "item-1",
    question: "Quel est le rôle de la plateforme Foundry ?",
    answer:
      "Foundry est un portail d'orientation qui centralise les démarches administratives de création, l'analyse de marché et l'évaluation de projets en Tunisie.",
  },
  {
    id: "item-2",
    question: "L'utilisation de la plateforme est-elle gratuite ?",
    answer:
      "Oui, la consultation des guides de formalités, des indicateurs sectoriels et des outils d'évaluation sur le portail est totalement gratuite.",
  },
  {
    id: "item-3",
    question: "D'où proviennent les données et informations du portail ?",
    answer:
      "Toutes les informations s'appuient sur des sources officielles publiques tunisiennes : RNE, APII, INS, Ministère des Finances et textes du JORT.",
  },
  {
    id: "item-4",
    question: "Foundry remplace-t-il les administrations officielles ?",
    answer:
      "Non, le portail est un outil d'information et d'aide à la décision. Il ne se substitue pas aux guichets administratifs et n'instruit aucun dossier.",
  },
  {
    id: "item-5",
    question: "Comment démarrer l'évaluation de mon projet sur le portail ?",
    answer:
      "Cliquez sur le bouton « Commencer » dans le menu pour accéder aux trois services principaux : Création d'entreprise, Analyse de marché ou Faisabilité.",
  },
  {
    id: "item-6",
    question: "Les rapports et analyses générés ont-ils une valeur juridique ?",
    answer:
      "Les synthèses et études sont fournies à titre indicatif pour préparer votre dossier ; seuls les textes officiels et décisions des administrations font foi.",
  },
];

export function Faq() {
  return (
    <HomeSection id="faq" labelledBy="faq-title" className="border-b-0">
      <p className="text-sm font-semibold tracking-wide text-primary uppercase">
        Questions fréquentes
      </p>
      <h2 id="faq-title" className="mt-2 text-4xl font-semibold sm:text-5xl">
        Réponses à vos questions
      </h2>
      <p className="mt-3 max-w-3xl text-lg text-zinc-600">
        Tout ce que vous devez savoir sur le fonctionnement, les données et
        l&apos;utilisation du portail.
      </p>

      <div className="mt-10 border border-zinc-300 bg-white">
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq) => (
            <AccordionItem
              key={faq.id}
              value={faq.id}
              className="border-b border-zinc-200 px-6 last:border-b-0"
            >
              <AccordionTrigger className="py-4 text-left text-base font-semibold text-zinc-900 hover:text-primary hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="pb-4 text-sm leading-relaxed text-zinc-600">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </HomeSection>
  );
}
