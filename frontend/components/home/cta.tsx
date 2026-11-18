import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Cta() {
  return (
    <section id="cta" className="w-full">
      <div className="mx-auto max-w-7xl pb-16 lg:pb-20">
        <div className="relative overflow-hidden rounded-xs bg-primary p-10 text-white shadow-xl sm:p-14 lg:p-16">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-0 bg-[url('/pattern.png')] bg-center bg-cover bg-no-repeat opacity-30"
          />

          <div className="relative z-10 flex flex-col items-start gap-8 md:flex-row md:items-center md:justify-between lg:gap-12">
            <div className="max-w-2xl space-y-3 sm:space-y-4">
              <h2 className="text-2xl text-secondary font-semibold leading-tight tracking-tight sm:text-3xl lg:text-4xl">
                Ready to launch your business?
              </h2>
              <p className="text-base leading-relaxed text-white/90 sm:text-lg">
                Browse the administrative procedures, check the required
                documents, and access official platforms directly.
              </p>
              <div className="pt-4">
                <Image
                  src="/organizations.png"
                  alt="Partner and official organizations"
                  width={600}
                  height={120}
                  className="h-14 w-full max-w-md object-contain"
                />
              </div>
            </div>

            <div className="shrink-0 md:ml-auto">
              <Button
                asChild
                size="lg"
                className="group h-12 cursor-pointer rounded-xs border border-white/20 bg-white px-8 text-sm font-semibold text-zinc-950 shadow-md transition-all hover:bg-zinc-100 active:scale-95 sm:h-14 sm:text-base"
              >
                <Link href="/services">
                  Browse services
                  <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1 sm:size-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
