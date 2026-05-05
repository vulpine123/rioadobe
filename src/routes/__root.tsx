import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import appCss from "../styles.css?url";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { MobileNav } from "@/components/site/MobileNav";
import { CodestartersBadge } from "@/components/CodestartersBadge";
import { Toaster } from "@/components/ui/sonner";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-surface px-4">
      <div className="max-w-md text-center">
        <h1 className="font-headline text-7xl font-black text-primary">404</h1>
        <h2 className="mt-4 font-headline text-xl font-bold uppercase tracking-widest text-on-surface">Page not found</h2>
        <p className="mt-2 text-sm text-on-surface-variant">This page doesn’t exist or has moved.</p>
        <Link to="/" className="mt-6 inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-xs font-bold uppercase tracking-widest text-on-primary hover:opacity-90">
          Back home
        </Link>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Rio Adobe Southwest Cafe — Cupertino, CA" },
      { name: "description", content: "Rio Adobe Southwest Cafe in Cupertino: handcrafted Southwestern Mexican fare, fresh salsa bar, margaritas. Dine-in, take-out, delivery." },
      { name: "author", content: "Rio Adobe Southwest Cafe" },
      { property: "og:title", content: "Rio Adobe Southwest Cafe — Cupertino, CA" },
      { property: "og:description", content: "Rio Adobe Southwest Cafe in Cupertino: handcrafted Southwestern Mexican fare, fresh salsa bar, margaritas. Dine-in, take-out, delivery." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Rio Adobe Southwest Cafe — Cupertino, CA" },
      { name: "twitter:description", content: "Rio Adobe Southwest Cafe in Cupertino: handcrafted Southwestern Mexican fare, fresh salsa bar, margaritas. Dine-in, take-out, delivery." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/69f4bc19-b56b-4e07-8277-4f5a5693fbd1/id-preview-9316fb36--47dde36f-1388-4746-b022-8c7503e3e46b.lovable.app-1777935781065.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/69f4bc19-b56b-4e07-8277-4f5a5693fbd1/id-preview-9316fb36--47dde36f-1388-4746-b022-8c7503e3e46b.lovable.app-1777935781065.png" },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head><HeadContent /></head>
      <body>{children}<Scripts /></body>
    </html>
  );
}

function RootComponent() {
  return (
    <div className="min-h-screen flex flex-col bg-surface relative">
      <Navbar />
      <main className="flex-1 pt-20">
        <Outlet />
      </main>
      <Footer />
      <MobileNav />
      <CodestartersBadge />
    </div>
  );
}
