import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Building2, TrendingUp, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";


const features = [
    {
        id: "creation",
        number: "01",
        title: "Business Creation",
        description:
            "Navigate business creation formalities in Tunisia: select legal forms, draft incorporation documents, and complete official registration with the RNE.",
        highlights: ["Legal form selection", "Documents & standard articles", "RNE registration"],
        image: "/services/11.png",
        icon: Building2,
        href: "/services/creation",
        action: "Start the creation",
    },
    {
        id: "analyse",
        number: "02",
        title: "Market Analysis",
        description:
            "Analyze your target market, evaluate direct competitors, identify regional industry trends, and assess commercial and financial feasibility for your project.",
        highlights: ["Competitive analysis", "Data by governorate", "Financial & commercial viability"],
        image: "/services/22.png",
        icon: TrendingUp,
        href: "/services/analysis",
        action: "Launch analysis",
    },
];

export default function ServicesPage() {
    return (
        <div className="mx-auto max-w-7xl py-10">
            <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-zinc-500">
                <Link href="/" className="hover:text-primary transition-colors">
                    Home
                </Link>
                <ChevronRight className="size-3 text-zinc-400" />
                <span className="font-medium text-zinc-800">Services</span>
            </nav>

            <div className="mt-6">
                <h1 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-950 sm:text-4xl">
                    Select a service
                </h1>
                <p className="mt-3 max-w-3xl text-lg text-zinc-600">
                    Use our interactive tools to structure your business creation or conduct a comprehensive
                    market analysis and commercial viability evaluation for your project in Tunisia.
                </p>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 sm:gap-8">
                {features.map((feature) => {
                    return (
                        <article
                            key={feature.id}
                            className="group relative flex flex-col justify-between overflow-hidden border border-zinc-300"
                        >
                            <div className="h-1.5 w-full bg-primary" />

                            <div className="flex flex-1 flex-col p-6 sm:p-8">
                                <div className="flex h-44 w-full items-center justify-center overflow-hidden rounded-xs p-1">
                                    <Image
                                        src={feature.image}
                                        alt={feature.title}
                                        width={340}
                                        height={220}
                                        className="max-h-full w-auto object-contain"
                                    />
                                </div>

                                <div className="mt-5">
                                    <h2 className="text-2xl font-semibold tracking-tight text-zinc-950">
                                        {feature.title}
                                    </h2>
                                </div>

                                <p className="mt-3 text-sm leading-relaxed text-zinc-600">
                                    {feature.description}
                                </p>

                                <div className="mt-auto pt-5">
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
