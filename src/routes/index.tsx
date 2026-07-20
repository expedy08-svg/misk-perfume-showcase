import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Phone, MapPin, Instagram, MessageCircle, Menu, X } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/")({
  component: Index,
});

const navLinks = [
  { label: "Accueil", href: "#accueil" },
  { label: "Nos parfums", href: "#parfums" },
  { label: "À propos", href: "#a-propos" },
  { label: "Contact", href: "#contact" },
];

const products = [
  {
    id: 1,
    name: "Misk Noir",
    price: "35 000 FCFA",
    image: "https://placehold.co/400x500/e2e8f0/1e293b?text=Misk+Noir",
  },
  {
    id: 2,
    name: "Misk Gold",
    price: "42 000 FCFA",
    image: "https://placehold.co/400x500/f1f5f9/1e293b?text=Misk+Gold",
  },
  {
    id: 3,
    name: "Misk Oud",
    price: "55 000 FCFA",
    image: "https://placehold.co/400x500/e2e8f0/1e293b?text=Misk+Oud",
  },
  {
    id: 4,
    name: "Misk Rose",
    price: "38 000 FCFA",
    image: "https://placehold.co/400x500/f1f5f9/1e293b?text=Misk+Rose",
  },
];

const testimonials = [
  {
    id: 1,
    name: "Amina S.",
    text: "Une fragrance unique qui tient toute la journée. Le service est impeccable.",
    rating: 5,
  },
  {
    id: 2,
    name: "Koffi M.",
    text: "Je recommande Misk à tous mes amis. Des parfums de qualité à Cotonou.",
    rating: 5,
  },
  {
    id: 3,
    name: "Grace T.",
    text: "Livraison rapide et produit soigneusement emballé. Merci Misk !",
    rating: 4,
  },
];

function Index() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link to="/" className="text-2xl font-bold tracking-tight">
            Misk
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Mobile menu button */}
          <button
            className="inline-flex items-center justify-center rounded-md p-2 text-foreground md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile nav */}
        {mobileMenuOpen && (
          <div className="border-t border-border md:hidden">
            <nav className="flex flex-col gap-4 px-4 py-6">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-base font-medium text-muted-foreground transition-colors hover:text-foreground"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>
        )}
      </header>

      {/* Hero */}
      <section id="accueil" className="flex min-h-[70vh] flex-col items-center justify-center px-4 py-24 text-center sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-6">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            L'essence du luxe, <br className="hidden sm:block" />
            inspirée par Cotonou
          </h1>
          <p className="mx-auto max-w-xl text-lg text-muted-foreground">
            Découvrez des parfums d'exception qui racontent votre personnalité. Misk,
            la parfumerie de luxe au cœur du Bénin.
          </p>
          <div className="pt-4">
            <Button asChild size="lg">
              <a href="#parfums">Découvrir nos parfums</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Products */}
      <section id="parfums" className="px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Nos parfums</h2>
            <p className="mt-4 text-muted-foreground">
              Une sélection raffinée de fragrances pour chaque occasion.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product) => (
              <Card key={product.id} className="overflow-hidden">
                <div className="aspect-[4/5] w-full overflow-hidden bg-muted">
                  <img
                    src={product.image}
                    alt={`Flacon ${product.name}`}
                    className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="text-lg font-semibold">{product.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{product.price}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="a-propos" className="bg-muted/50 px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">À propos de Misk</h2>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            Misk est une parfumerie de luxe fondée à Cotonou avec la volonté d'offrir au Bénin
            des fragrances d'exception, sélectionnées avec soin pour leur qualité et leur
            originalité. Chaque parfum est une invitation au voyage, entre tradition olfactive
            et modernité.
          </p>
        </div>
      </section>

      {/* Testimonials */}
      <section className="px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Avis clients</h2>
            <p className="mt-4 text-muted-foreground">Ce que nos clients disent de Misk.</p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id}>
                <CardContent className="p-6">
                  <div className="flex gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < testimonial.rating
                            ? "fill-primary text-primary"
                            : "text-muted-foreground"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="mt-4 text-muted-foreground">"{testimonial.text}"</p>
                  <p className="mt-4 text-sm font-semibold">{testimonial.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="border-t border-border bg-muted/30 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
            <div>
              <h3 className="text-2xl font-bold">Misk</h3>
              <p className="mt-4 text-sm text-muted-foreground">
                Parfumerie de luxe à Cotonou, Bénin.
              </p>
            </div>

            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider">Adresse</h4>
              <div className="mt-4 space-y-3 text-sm text-muted-foreground">
                <p className="flex items-start gap-2">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                  Boulevard de St Michel, Cotonou, Bénin
                </p>
                <p className="flex items-center gap-2">
                  <Phone className="h-4 w-4 shrink-0" />
                  +229 00 00 00 00
                </p>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider">Suivez-nous</h4>
              <div className="mt-4">
                <a
                  href="https://instagram.com/themisk.229"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Instagram className="h-4 w-4" />
                  @themisk.229
                </a>
              </div>
            </div>
          </div>

          <div className="mt-12 border-t border-border pt-8 text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} Misk. Tous droits réservés.
          </div>
        </div>
      </footer>

      {/* WhatsApp floating button */}
      <a
        href="https://wa.me/22900000000"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-green-600 text-white shadow-lg transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        aria-label="Nous contacter sur WhatsApp"
      >
        <MessageCircle className="h-7 w-7" />
      </a>
    </div>
  );
}
