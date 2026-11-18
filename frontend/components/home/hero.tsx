import Link from "next/link";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/site";

export function Hero() {
  return (
    <section className="relative isolate -mx-8 min-h-160 overflow-hidden sm:-mx-6">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/hero.gif"
        alt=""
        className="absolute inset-0 size-full object-cover"
      />
      <div className="absolute inset-0 bg-black/55" />
      <div className="absolute inset-0 bg-linear-to-r from-black/60 via-black/45 to-black/20" />
      <div className="relative mx-auto flex min-h-156 max-w-7xl flex-col justify-center px-8 py-10 text-white sm:px-6 xl:px-0">
        <p className="text-xs font-semibold tracking-[0.2em] text-white/80 uppercase sm:text-sm">
          {site.republic} · {site.agency}
        </p>
        <p className="mt-6 max-w-4xl text-3xl leading-tight text-white sm:text-5xl">
          Information portal to start a business and evaluate your project
          in Tunisia.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <Button asChild className="h-12 rounded-sm px-8 text-md sm:h-14 sm:text-lg">
            <Link href="/services">Browse services</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="h-12 rounded-sm border-white bg-transparent px-8 text-md text-white hover:bg-white/10 hover:text-white sm:h-14 sm:text-lg"
          >
            <Link href="#resources">Official resources</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
