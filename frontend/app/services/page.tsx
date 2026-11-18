import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Building2, TrendingUp, Calculator, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
    title: "Services & Démarches",
    description:
        "Accédez aux principaux services d'orientation, d'analyse de marché et de faisabilité de projet en Tunisie.",
};

const features = [
    {
        id: "creation",
        number: "01",
        title: "Création d'entreprise",
        description:
            "Guider l'entrepreneur dans l'ensemble des formalités d'établissement en Tunisie : formes juridiques, statuts, pièces requises et immatriculation au RNE.",
        highlights: ["Choix de forme juridique", "Pièces & Statuts types", "Immatriculation au RNE"],
        image: "/services/11.png",
        icon: Building2,
        href: "/creation",
        action: "Démarrer la création",
    },
    {
        id: "analyse",
        number: "02",
        title: "Analyse de marché",
        description:
            "Comprendre votre marché cible, identifier les acteurs concurrents, analyser les tendances économiques et évaluer la demande locale par gouvernorat.",
        highlights: ["Étude concurrentielle", "Données par gouvernorat", "Tendances sectorielles"],
        image: "/services/22.png",
        icon: TrendingUp,
        href: "/analysis",
        action: "Lancer l'analyse",
    },
    {
        id: "faisabilite",
        number: "03",
        title: "Étude de faisabilité",
        description:
            "Évaluer la viabilité de votre idée à travers une analyse multicritère rigoureuse : faisabilité commerciale, technique, réglementaire et financière.",
        highlights: ["Seuil de rentabilité", "Besoins d'investissement", "Rapport de synthèse"],
        image: "/services/33.png",
        icon: Calculator,
        href: "/feasability",
        action: "Évaluer la faisabilité",
    },
];

export default function ServicesPage() {
    return (
        <div className="mx-auto max-w-7xl py-10">
            {/* Breadcrumb */}
            <nav aria-label="Fil d'Ariane" className="flex items-center gap-1.5 text-xs text-zinc-500">
                <Link href="/" className="hover:text-primary transition-colors">
                    Accueil
                </Link>
                <ChevronRight className="size-3 text-zinc-400" />
                <span className="font-medium text-zinc-800">Services aux entrepreneurs</span>
            </nav>

            {/* Header section */}
            <div className="mt-6">
                <h1 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-950 sm:text-4xl">
                    Sélectionnez votre démarche
                </h1>
                <p className="mt-3 max-w-3xl text-lg text-zinc-600">
                    Accédez aux outils interactifs pour structurer votre création, analyser votre
                    marché cible ou évaluer la viabilité financière de votre projet d&apos;entreprise.
                </p>
            </div>

            {/* 3 Cards Side by Side on Desktop */}
            <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 sm:gap-8">
                {features.map((feature) => {
                    return (
                        <article
                            key={feature.id}
                            className="group relative flex flex-col justify-between overflow-hidden border border-zinc-300"
                        >
                            {/* Top red governmental accent line */}
                            <div className="h-1.5 w-full bg-primary" />

                            <div className="flex flex-col p-6 sm:p-8">
                                {/* Illustration container */}
                                <div className="flex h-44 w-full items-center justify-center overflow-hidden rounded-xs p-1">
                                    <Image
                                        src={feature.image}
                                        alt={feature.title}
                                        width={340}
                                        height={220}
                                        className="max-h-full w-auto object-contain"
                                    />
                                </div>

                                {/* Title */}
                                <div className="mt-5">
                                    <h2 className="text-2xl font-semibold tracking-tight text-zinc-950">
                                        {feature.title}
                                    </h2>
                                </div>

                                {/* Description */}
                                <p className="mt-3 text-sm leading-relaxed text-zinc-600">
                                    {feature.description}
                                </p>

                                {/* Action Button */}
                                <div className="mt-5">
                                    <Button
                                        asChild
                                        className="w-full justify-between rounded-xs bg-zinc-950 p-5 text-sm font-medium text-white shadow-xs transition-colors hover:bg-primary group-hover:bg-primary"
                                    >
                                        <Link href={feature.href}>
                                            <span>{feature.action}</span>
                                            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        </article>
                    );
                })}
            </div>
        </div>
    );
}
