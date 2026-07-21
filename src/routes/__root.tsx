 import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Misk.229 — Parfumerie orientale à Cotonou" },
      {
        name: "description",
        content:
          "Misk.229, parfumerie de niche à Cotonou : oud, musc, ambre et senteurs orientales authentiques. Boulevard de St Michel, Cotonou, Bénin.",
      },
      { name: "author", content: "Misk.229" },

      // Open Graph — aperçu du lien sur WhatsApp / Instagram / Facebook
      { property: "og:type", content: "website" },
      { property: "og:title", content: "Misk.229 — Parfumerie orientale à Cotonou" },
      {
        property: "og:description",
        content: "Oud, musc, ambre et senteurs orientales authentiques. Découvrez notre collection à Cotonou.",
      },
      { property: "og:image", content: "https://images.unsplash.com/photo-1709662369957-0cbf9f8452fc?fm=jpg&q=80&w=1200&auto=format&fit=crop" },
      { property: "og:locale", content: "fr_FR" },

      // Twitter Card (repris par certains aperçus de liens)
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@themisk.229" },
      { name: "twitter:title", content: "Misk.229 — Parfumerie orientale à Cotonou" },
      { name: "twitter:description", content: "Oud, musc, ambre et senteurs orientales authentiques." },
      { name: "twitter:image", content: "https://images.unsplash.com/photo-1709662369957-0cbf9f8452fc?fm=jpg&q=80&w=1200&auto=format&fit=crop" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },

      // Préconnexion Google Fonts : évite le flash de police par défaut
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" },

      // Preload de la 1ère photo hero : elle s'affiche dès le chargement
      { rel: "preload", as: "image", href: "https://images.unsplash.com/photo-1709662369957-0cbf9f8452fc?fm=jpg&q=80&w=1200&auto=format&fit=crop" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
    </QueryClientProvider>
  );
}
