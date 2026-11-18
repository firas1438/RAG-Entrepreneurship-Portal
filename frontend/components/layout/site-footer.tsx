import Link from "next/link";
import { site, navItems } from "@/lib/site";
import Image from "next/image";

const officialLinks = [
  { label: "Registre national des entreprises", href: "https://www.registre-entreprises.tn" },
  { label: "APII", href: "https://www.apii.tn" },
  { label: "INS", href: "https://www.ins.tn" },
  { label: "Ministère des Finances", href: "https://www.finances.gov.tn" },
];

export function SiteFooter() {
  return (
    <footer className="mt-auto bg-black text-background">
      <div className="h-1 bg-primary" />
      <div className="mx-auto grid max-w-7xl gap-10 px-8 sm:px-0 pt-8 pb-10 md:grid-cols-3">
        <div>
          <Link href="/" className="inline-flex items-center">
            <Image
              src="/logo2.png"
              alt="Foundry"
              width={220}
              height={48}
              className="h-6 w-auto sm:h-7.5"
            />
          </Link>
          <p className="mt-3 text-sm text-background">
            {site.republic}. Portail d&apos;information destiné aux citoyens et
            aux porteurs de projets.
          </p>
        </div>
        <div>
          <h2 className="text-sm font-semibold tracking-wide text-primary">
            Rubriques
          </h2>
          <ul className="mt-3 space-y-1 text-sm">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-secondary hover:underline">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-sm font-semibold tracking-wide text-primary">
            Liens utiles
          </h2>
          <ul className="mt-3 space-y-1 text-sm">
            {officialLinks.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="text-secondary hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-background/5">
        <div className="mx-auto flex max-w-7xl flex-col gap-1 px-8 py-4 text-xs text-background/60 sm:flex-row sm:justify-between sm:px-6">
          <p>
            © {new Date().getFullYear()} Foundry - {site.republic}. Tous droits
            réservés.
          </p>
          <p className=" hidden sm:block">Les textes officiels prévalent en cas de divergence.</p>
        </div>
      </div>
    </footer>
  );
}
