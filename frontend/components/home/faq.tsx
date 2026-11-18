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
    question: "What is the role of the Foundry platform?",
    answer:
      "Foundry is an information portal that centralizes administrative procedures for business creation, market analysis, and project evaluation in Tunisia.",
  },
  {
    id: "item-2",
    question: "Is the platform free to use?",
    answer:
      "Yes, browsing the procedural guides, sector indicators, and evaluation tools on the portal is completely free of charge.",
  },
  {
    id: "item-3",
    question: "Where does the portal's data and information come from?",
    answer:
      "All information is based on official Tunisian public sources: RNE, APII, INS, the Ministry of Finance, and JORT legal texts.",
  },
  {
    id: "item-4",
    question: "Does Foundry replace official government agencies?",
    answer:
      "No, the portal is an information and decision-support tool. It does not substitute for administrative offices and does not process any applications.",
  },
  {
    id: "item-5",
    question: "How do I start evaluating my project on the portal?",
    answer:
      "Click the \"Get started\" button in the menu to access the three main services: Business Creation, Market Analysis, or Feasibility Study.",
  },
  {
    id: "item-6",
    question: "Do the generated reports and analyses carry legal weight?",
    answer:
      "The summaries and studies are provided for informational purposes only to help you prepare your application; only official legal texts and government decisions are legally binding.",
  },
];

export function Faq() {
  return (
    <HomeSection id="faq" labelledBy="faq-title" className="border-b-0">
      <p className="text-sm font-semibold tracking-wide text-primary uppercase">
        Frequently Asked Questions
      </p>
      <h2 id="faq-title" className="mt-2 text-4xl font-semibold sm:text-5xl">
        Answers to Your Questions
      </h2>
      <p className="mt-3 max-w-3xl text-lg text-zinc-600">
        Everything you need to know about how the portal works, its data, and
        how to use it.
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
