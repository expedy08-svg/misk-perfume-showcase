 import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState, type ReactNode } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import {
  Scissors, Sparkles, Hand, Eye, Brush, Flower2, Droplets, Wand2,
  Phone, MapPin, Clock, Star, Instagram, Facebook, ChevronDown, Check,
} from "lucide-react";

import heroWoman from "@/assets/hero-woman.jpg";
import salonInterior from "@/assets/salon-interior.jpg";
import galleryNails from "@/assets/gallery-nails.jpg";
import galleryBride from "@/assets/gallery-bride.jpg";
import galleryLashes from "@/assets/gallery-lashes.jpg";
import gallerySpa from "@/assets/gallery-spa.jpg";
import bgDecor from "@/assets/bg-decor.jpg";

export const Route = createFileRoute("/")({ component: Index });

/* ---------- Reusable primitives ---------- */

function CurveDivider({ flip = false, color = "#FDF8F5" }: { flip?: boolean; color?: string }) {
  return (
    <div className="relative w-full leading-none" style={{ transform: flip ? "rotate(180deg)" : undefined }}>
      <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="block w-full h-[60px] md:h-[100px]">
        <path d="M0,64 C240,120 480,0 720,40 C960,80 1200,120 1440,56 L1440,120 L0,120 Z" fill={color} />
      </svg>
    </div>
  );
}

function Reveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function useLayered(ref: React.RefObject<HTMLElement | null>, reduced: boolean) {
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], reduced ? ["0%", "0%"] : ["-12%", "12%"]);
  const fgY = useTransform(scrollYProgress, [0, 1], reduced ? ["0%", "0%"] : ["6%", "-6%"]);
  const zoom = useTransform(scrollYProgress, [0, 1], reduced ? [1, 1] : [1, 1.15]);
  const softOp = useTransform(scrollYProgress, [0, 0.5, 1], [0.85, 1, 0.85]);
  return { scrollYProgress, bgY, fgY, zoom, softOp };
}

function ZoomImage({ src, alt, className = "", height = "h-[380px] md:h-[520px]" }: { src: string; alt: string; className?: string; height?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], reduced ? [1, 1] : [1.08, 1.32]);
  const y = useTransform(scrollYProgress, [0, 1], reduced ? ["0%", "0%"] : ["-7%", "7%"]);
  return (
    <div ref={ref} className={`relative overflow-hidden rounded-3xl ${height} ${className}`}>
      <motion.img
        src={src} alt={alt} loading="lazy"
        style={{ scale, y }}
        className="absolute inset-0 h-full w-full object-cover will-change-transform"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#3A2020]/25 via-transparent to-transparent" />
    </div>
  );
}

/* ---------- Data ---------- */

const SERVICES = [
  { icon: Scissors, title: "Coiffure & Coiffure mariage", desc: "Coupes, coiffage, chignons de mariée, tresses, brushing." },
  { icon: Sparkles, title: "Extensions & Dreadlocks", desc: "Pose, entretien et coiffage sur mesure." },
  { icon: Hand, title: "Ongles", desc: "Manucure, pédicure, gel, semi-permanent, nail art." },
  { icon: Eye, title: "Cils & Sourcils", desc: "Extensions de cils, rehaussement, restructuration sourcils." },
  { icon: Brush, title: "Maquillage & Permanent", desc: "Maquillage soirée, mariée, dermopigmentation." },
  { icon: Flower2, title: "Massage", desc: "Relaxant, tonique, aux pierres chaudes, aux huiles chaudes." },
  { icon: Droplets, title: "Soins peau & acné", desc: "Nettoyage, hydratation, protocoles anti-acné." },
  { icon: Wand2, title: "Épilation", desc: "Cire, sourcils, visage et corps." },
];

const REVIEWS = [
  { name: "Aïcha K.", text: "Un accueil chaleureux et un travail impeccable. Mes ongles sont sublimes, je recommande à 100% !", rating: 5 },
  { name: "Fatou D.", text: "J'ai fait mon maquillage de mariage ici. Résultat magnifique, tenue toute la journée. Merci !", rating: 5 },
  { name: "Chimène A.", text: "Institut très propre, personnel professionnel. Le massage est un vrai moment de détente.", rating: 5 },
  { name: "Roxane M.", text: "Mes extensions de cils sont parfaites, naturelles et bien posées. Je reviens sans hésiter.", rating: 5 },
];

const PRICES = [
  { name: "Manucure classique", price: "8 000 FCFA" },
  { name: "Pose semi-permanent", price: "15 000 FCFA" },
  { name: "Extensions de cils", price: "à partir de 20 000 FCFA" },
  { name: "Maquillage soirée", price: "25 000 FCFA" },
  { name: "Maquillage mariée", price: "à partir de 75 000 FCFA" },
  { name: "Massage 60 min", price: "20 000 FCFA" },
  { name: "Soin visage complet", price: "18 000 FCFA" },
  { name: "Coiffure mariage", price: "sur devis" },
];

const FAQ = [
  { q: "Faut-il prendre rendez-vous à l'avance ?", a: "Oui, nous fonctionnons uniquement sur rendez-vous pour vous garantir un accueil personnalisé et éviter toute attente." },
  { q: "Quels moyens de paiement acceptez-vous ?", a: "Espèces, Mobile Money (MTN, Moov) et cartes bancaires acceptés en institut." },
  { q: "Proposez-vous des forfaits mariée ?", a: "Oui, nous créons un forfait sur mesure : essai, coiffure, maquillage, ongles et soins pour vous et votre cortège." },
  { q: "Puis-je annuler ou reporter mon rendez-vous ?", a: "Bien sûr, un préavis de 24h nous permet de réorganiser l'agenda et de servir d'autres clientes." },
];

/* ---------- Sections ---------- */

function Nav() {
  return (
    <header className="fixed top-0 inset-x-0 z-50">
      <div className="mx-auto mt-4 max-w-6xl px-4">
        <div className="glass-card flex items-center justify-between px-5 py-3">
          <a href="#hero" className="flex items-center gap-2">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-white" style={{ background: "var(--gradient-brand)" }}>
              <Flower2 className="h-4 w-4" />
            </span>
            <span className="font-display text-xl text-[color:var(--bordeaux)]">Lac de Beauté</span>
          </a>
          <nav className="hidden md:flex items-center gap-7 text-sm text-[color:var(--ink)]/80">
            {[["À propos","about"],["Services","services"],["Galerie","gallery"],["Avis","reviews"],["Tarifs","prices"],["Contact","contact"]].map(([l,h])=>(
              <a key={h} href={`#${h}`} className="hover:text-[color:var(--bordeaux)] transition">{l}</a>
            ))}
          </nav>
          <a href="#booking" className="btn-pill text-sm !py-2.5 !px-5">Rendez-vous</a>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], reduced ? ["0%","0%"] : ["-32%", "32%"]);
  const midY = useTransform(scrollYProgress, [0, 1], reduced ? ["0%","0%"] : ["-18%", "18%"]);
  const txtY = useTransform(scrollYProgress, [0, 1], reduced ? ["0%","0%"] : ["-4%", "4%"]);
  const imgScale = useTransform(scrollYProgress, [0, 1], reduced ? [1,1] : [1, 1.22]);
  const imgRotate = useTransform(scrollYProgress, [0, 1], reduced ? [0,0] : [0, -3]);
  const fade = useTransform(scrollYProgress, [0, 1], [1, 0.55]);

  return (
    <section id="hero" ref={ref} className="relative min-h-[100svh] overflow-hidden pt-28 md:pt-32 pb-24">
      {/* Layer 0: soft silk background */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 -z-10">
        <img src={bgDecor} alt="" className="h-full w-full object-cover opacity-60" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(253,248,245,0.75) 0%, rgba(251,234,229,0.9) 100%)" }} />
      </motion.div>

      {/* Layer 1: floating decorative blobs */}
      <motion.div style={{ y: midY }} className="pointer-events-none absolute inset-0 -z-[5]">
        <motion.div
          animate={{ x: [0, 30, -10, 0], y: [0, -20, 15, 0], scale: [1, 1.08, 0.96, 1] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-10 -left-16 h-72 w-72 rounded-full blur-3xl opacity-60"
          style={{ background: "radial-gradient(circle, #E8B4B8, transparent 70%)" }}
        />
        <motion.div
          animate={{ x: [0, -25, 15, 0], y: [0, 20, -15, 0], scale: [1, 0.94, 1.06, 1] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute top-40 right-0 h-96 w-96 rounded-full blur-3xl opacity-50"
          style={{ background: "radial-gradient(circle, #D4A574, transparent 70%)" }}
        />
        <motion.div
          animate={{ x: [0, 15, -20, 0], y: [0, -10, 10, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-0 left-1/3 h-64 w-64 rounded-full blur-3xl opacity-40"
          style={{ background: "radial-gradient(circle, #FBEAE5, transparent 70%)" }}
        />
      </motion.div>

      <div className="mx-auto max-w-6xl px-5 grid md:grid-cols-2 gap-10 items-center">
        <motion.div style={{ y: txtY }} className="relative z-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-[color:var(--rose-gold)]/40 bg-white/60 backdrop-blur px-4 py-1.5 text-xs tracking-[0.2em] uppercase text-[color:var(--bordeaux)]">
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: "var(--gradient-brand)" }} />
            Institut de beauté · Abomey-Calavi
          </div>
          <h1 className="mt-6 text-[36px] leading-[1.05] md:text-[56px] md:leading-[1.02] font-display">
            L'art de révéler <br />
            <em className="not-italic bg-clip-text text-transparent" style={{ backgroundImage: "var(--gradient-brand)" }}>votre beauté</em>,
            en toute sérénité.
          </h1>
          <p className="mt-5 max-w-lg text-[color:var(--ink)]/70 text-base md:text-lg font-light">
            Coiffure, ongles, cils, maquillage, massage et soins de la peau —
            une parenthèse d'exception au cœur d'Abomey-Calavi, pensée pour vous.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#booking" className="btn-pill">Prendre rendez-vous</a>
            <a href="tel:+2290150787878" className="btn-pill-outline"><Phone className="h-4 w-4" /> Appeler maintenant</a>
          </div>
          <div className="mt-8 flex items-center gap-4 text-sm text-[color:var(--ink)]/70">
            <div className="flex">{Array.from({length:5}).map((_,i)=>(<Star key={i} className="h-4 w-4 fill-[color:var(--rose-gold)] text-[color:var(--rose-gold)]" />))}</div>
            <span><strong className="text-[color:var(--bordeaux)]">5,0</strong> · avis Google clientes</span>
          </div>
        </motion.div>

        <motion.div style={{ y: midY, opacity: fade }} className="relative">
          <div className="absolute -inset-4 rounded-[36px] blur-2xl opacity-70" style={{ background: "var(--gradient-brand)" }} />
          <div className="relative overflow-hidden rounded-[32px] border border-white/60 shadow-[0_30px_80px_rgba(107,39,55,0.25)]">
            <motion.img
              src={heroWoman} alt="Portrait beauté" width={1280} height={1600}
              style={{ scale: imgScale, rotate: imgRotate }}
              className="h-[420px] md:h-[600px] w-full object-cover will-change-transform"
            />
            <div className="absolute bottom-4 left-4 right-4 glass-card px-4 py-3 flex items-center gap-3">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-white" style={{ background: "var(--gradient-brand)" }}>
                <Sparkles className="h-4 w-4" />
              </span>
              <div className="min-w-0">
                <p className="text-xs uppercase tracking-widest text-[color:var(--bordeaux)]/70">Nouveau</p>
                <p className="text-sm text-[color:var(--ink)] truncate">Forfait mariée sur mesure</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[color:var(--bordeaux)]/60 animate-bounce">
        <ChevronDown className="h-6 w-6" />
      </div>
    </section>
  );
}

function About() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { bgY, fgY } = useLayered(ref, !!reduced);
  return (
    <section id="about" ref={ref} className="relative py-24 md:py-32 overflow-hidden">
      <motion.div
        aria-hidden
        style={{ y: bgY, background: "radial-gradient(circle, #FBEAE5, transparent 70%)" }}
        className="pointer-events-none absolute -top-24 -right-24 h-[500px] w-[500px] rounded-full opacity-50 blur-3xl"
      />
      <div className="mx-auto max-w-6xl px-5 grid md:grid-cols-2 gap-14 items-center">
        <Reveal>
          <ZoomImage src={salonInterior} alt="Intérieur du salon Lac de Beauté" height="h-[420px] md:h-[560px]" />
        </Reveal>
        <motion.div style={{ y: fgY }}>
          <Reveal>
            <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--rose-gold)]">À propos</p>
            <h2 className="mt-3 text-3xl md:text-5xl">Un écrin de douceur, pensé pour vous.</h2>
            <p className="mt-6 text-[color:var(--ink)]/75 leading-relaxed">
              Chez <strong>Lac de Beauté</strong>, chaque prestation est un moment suspendu.
              Notre équipe passionnée conjugue expertise, produits haut de gamme et écoute
              attentive pour révéler la beauté singulière de chacune.
            </p>
            <ul className="mt-6 space-y-3">
              {["Équipe certifiée & bienveillante","Produits professionnels sélectionnés","Hygiène irréprochable","Rendez-vous personnalisés"].map((t)=>(
                <li key={t} className="flex items-start gap-3 text-[color:var(--ink)]/80">
                  <span className="mt-1 grid h-6 w-6 shrink-0 place-items-center rounded-full text-white" style={{ background: "var(--gradient-brand)" }}>
                    <Check className="h-3.5 w-3.5" />
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>
        </motion.div>
      </div>
    </section>
  );
}

function ServiceCard({ Icon, title, desc, index }: { Icon: any; title: string; desc: string; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay: index * 0.06, ease: "easeOut" }}
      whileHover={{ y: -12, scale: 1.03, boxShadow: "0 25px 50px rgba(107,39,55,0.2)" }}
      className="glass-card p-6 md:p-7 group cursor-default"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0.7 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.15 + index * 0.05 }}
        className="grid h-14 w-14 place-items-center rounded-2xl text-white shadow-[0_10px_20px_rgba(212,165,116,0.35)]"
        style={{ background: "var(--gradient-brand)" }}
      >
        <Icon className="h-6 w-6" />
      </motion.div>
      <h3 className="mt-5 text-xl">{title}</h3>
      <p className="mt-2 text-sm text-[color:var(--ink)]/70 leading-relaxed">{desc}</p>
    </motion.div>
  );
}

function Services() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { bgY } = useLayered(ref, !!reduced);
  return (
    <section id="services" ref={ref} className="relative py-24 md:py-32 overflow-hidden">
      <motion.div style={{ y: bgY }} className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, #FBEAE5 0%, #FDF8F5 100%)" }} />
        <div className="absolute top-20 left-1/2 -translate-x-1/2 h-[600px] w-[900px] rounded-full opacity-40 blur-3xl" style={{ background: "radial-gradient(ellipse, #E8B4B8, transparent 70%)" }} />
      </motion.div>
      <div className="mx-auto max-w-6xl px-5">
        <Reveal className="text-center max-w-2xl mx-auto">
          <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--rose-gold)]">Nos prestations</p>
          <h2 className="mt-3 text-3xl md:text-5xl">Toute la beauté, sous un même toit.</h2>
          <p className="mt-4 text-[color:var(--ink)]/70">Des soins minutieux à la coiffure de mariage, notre carte complète répond à chacun de vos désirs.</p>
        </Reveal>
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((s, i) => (
            <ServiceCard key={s.title} Icon={s.icon} title={s.title} desc={s.desc} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Gallery() {
  const items = [
    { src: galleryBride, alt: "Maquillage & coiffure mariée", tag: "Mariée" },
    { src: galleryNails, alt: "Manucure élégante", tag: "Ongles" },
    { src: galleryLashes, alt: "Extensions de cils", tag: "Cils" },
    { src: gallerySpa, alt: "Soin & spa", tag: "Soins" },
    { src: heroWoman, alt: "Maquillage & coiffure", tag: "Beauté" },
    { src: salonInterior, alt: "Notre salon", tag: "Institut" },
  ];
  return (
    <section id="gallery" className="relative py-24 md:py-32 overflow-hidden">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--rose-gold)]">Galerie</p>
          <h2 className="mt-3 text-3xl md:text-5xl">Nos moments de beauté.</h2>
        </Reveal>
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {items.map((it, i) => (
            <Reveal key={i} delay={i * 0.05} className="relative group">
              <ZoomImage
                src={it.src}
                alt={it.alt}
                height={i % 3 === 1 ? "h-[420px] md:h-[560px]" : "h-[360px] md:h-[440px]"}
              />
              <div className="absolute left-4 top-4 glass-card !rounded-full px-3 py-1 text-xs text-[color:var(--bordeaux)]">
                {it.tag}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Reviews() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { bgY, fgY } = useLayered(ref, !!reduced);
  return (
    <section id="reviews" ref={ref} className="relative py-24 md:py-32 overflow-hidden">
      <motion.div style={{ y: bgY }} className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, #FDF8F5, #FBEAE5)" }} />
      </motion.div>
      <div className="mx-auto max-w-6xl px-5">
        <Reveal className="text-center max-w-2xl mx-auto">
          <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--rose-gold)]">Elles nous font confiance</p>
          <h2 className="mt-3 text-3xl md:text-5xl">
            <span className="bg-clip-text text-transparent" style={{ backgroundImage: "var(--gradient-brand)" }}>5,0</span>
            <span className="ml-3">de moyenne sur Google</span>
          </h2>
          <div className="mt-4 flex justify-center">
            {Array.from({length:5}).map((_,i)=>(<Star key={i} className="h-5 w-5 fill-[color:var(--rose-gold)] text-[color:var(--rose-gold)]" />))}
          </div>
        </Reveal>
        <motion.div style={{ y: fgY }} className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {REVIEWS.map((r, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <motion.article whileHover={{ y: -6 }} className="glass-card p-6 h-full">
                <div className="flex gap-0.5">
                  {Array.from({length:r.rating}).map((_,k)=>(<Star key={k} className="h-4 w-4 fill-[color:var(--rose-gold)] text-[color:var(--rose-gold)]" />))}
                </div>
                <p className="mt-4 text-[color:var(--ink)]/80 text-sm leading-relaxed">« {r.text} »</p>
                <p className="mt-5 text-sm font-medium text-[color:var(--bordeaux)]">— {r.name}</p>
              </motion.article>
            </Reveal>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function Prices() {
  return (
    <section id="prices" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-5xl px-5">
        <Reveal className="text-center max-w-2xl mx-auto">
          <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--rose-gold)]">Tarifs</p>
          <h2 className="mt-3 text-3xl md:text-5xl">Une transparence totale.</h2>
          <p className="mt-4 text-[color:var(--ink)]/70">Nos tarifs indicatifs les plus demandés. Demandez un devis personnalisé pour les prestations mariage et forfaits.</p>
        </Reveal>
        <Reveal className="mt-12">
          <div className="glass-card p-6 md:p-10">
            <ul className="divide-y divide-[color:var(--rose-gold)]/20">
              {PRICES.map((p) => (
                <li key={p.name} className="grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-4 py-4">
                  <span className="font-display text-lg md:text-xl text-[color:var(--bordeaux)] truncate">{p.name}</span>
                  <span className="text-sm md:text-base text-[color:var(--ink)]/80 whitespace-nowrap">{p.price}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3 justify-center">
              <a href="#booking" className="btn-pill">Réserver</a>
              <a href="#contact" className="btn-pill-outline">Demander un devis</a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Booking() {
  const [sent, setSent] = useState(false);
  return (
    <section id="booking" className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 -z-10" style={{ background: "linear-gradient(180deg, #FBEAE5, #FDF8F5)" }} />
      <div className="mx-auto max-w-4xl px-5">
        <Reveal className="text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--rose-gold)]">Rendez-vous</p>
          <h2 className="mt-3 text-3xl md:text-5xl">Réservez votre parenthèse.</h2>
          <p className="mt-4 text-[color:var(--ink)]/70">Choisissez votre prestation, date et heure — nous confirmons sous quelques heures.</p>
        </Reveal>
        <Reveal className="mt-12">
          <form
            onSubmit={(e) => { e.preventDefault(); setSent(true); }}
            className="glass-card p-6 md:p-10 grid gap-5 sm:grid-cols-2"
          >
            <label className="grid gap-2 text-sm">
              <span className="text-[color:var(--bordeaux)]">Prénom & nom</span>
              <input required className="rounded-xl border border-[color:var(--rose-gold)]/40 bg-white/70 px-4 py-3 outline-none focus:border-[color:var(--rose-gold)]" placeholder="Votre nom" />
            </label>
            <label className="grid gap-2 text-sm">
              <span className="text-[color:var(--bordeaux)]">Téléphone</span>
              <input required type="tel" className="rounded-xl border border-[color:var(--rose-gold)]/40 bg-white/70 px-4 py-3 outline-none focus:border-[color:var(--rose-gold)]" placeholder="01 50 78 78 78" />
            </label>
            <label className="grid gap-2 text-sm sm:col-span-2">
              <span className="text-[color:var(--bordeaux)]">Prestation souhaitée</span>
              <select required className="rounded-xl border border-[color:var(--rose-gold)]/40 bg-white/70 px-4 py-3 outline-none focus:border-[color:var(--rose-gold)]">
                <option value="">Choisir une prestation…</option>
                {SERVICES.map((s) => <option key={s.title}>{s.title}</option>)}
              </select>
            </label>
            <label className="grid gap-2 text-sm">
              <span className="text-[color:var(--bordeaux)]">Date</span>
              <input required type="date" className="rounded-xl border border-[color:var(--rose-gold)]/40 bg-white/70 px-4 py-3 outline-none focus:border-[color:var(--rose-gold)]" />
            </label>
            <label className="grid gap-2 text-sm">
              <span className="text-[color:var(--bordeaux)]">Heure</span>
              <input required type="time" className="rounded-xl border border-[color:var(--rose-gold)]/40 bg-white/70 px-4 py-3 outline-none focus:border-[color:var(--rose-gold)]" />
            </label>
            <label className="grid gap-2 text-sm sm:col-span-2">
              <span className="text-[color:var(--bordeaux)]">Message (optionnel)</span>
              <textarea rows={3} className="rounded-xl border border-[color:var(--rose-gold)]/40 bg-white/70 px-4 py-3 outline-none focus:border-[color:var(--rose-gold)] resize-none" placeholder="Précisions, préférences…" />
            </label>
            <div className="sm:col-span-2 flex flex-wrap items-center justify-between gap-4 pt-2">
              <p className="text-xs text-[color:var(--ink)]/60">En envoyant ce formulaire, vous acceptez d'être recontactée.</p>
              <motion.button whileHover={{ scale: 1.03, boxShadow: "0 0 30px rgba(212,165,116,0.6)" }} className="btn-pill">
                {sent ? "Demande envoyée ✓" : "Confirmer le rendez-vous"}
              </motion.button>
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5 grid md:grid-cols-2 gap-10">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--rose-gold)]">Contact & horaires</p>
          <h2 className="mt-3 text-3xl md:text-5xl">Venez nous rencontrer.</h2>
          <ul className="mt-8 space-y-5 text-[color:var(--ink)]/80">
            <li className="flex items-start gap-4">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl text-white" style={{ background: "var(--gradient-brand)" }}><MapPin className="h-5 w-5" /></span>
              <div><p className="font-medium text-[color:var(--bordeaux)]">Adresse</p><p className="text-sm">443, Abomey-Calavi, Bénin</p></div>
            </li>
            <li className="flex items-start gap-4">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl text-white" style={{ background: "var(--gradient-brand)" }}><Phone className="h-5 w-5" /></span>
              <div><p className="font-medium text-[color:var(--bordeaux)]">Téléphone</p><a href="tel:+2290150787878" className="text-sm hover:text-[color:var(--bordeaux)]">01 50 78 78 78</a></div>
            </li>
            <li className="flex items-start gap-4">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl text-white" style={{ background: "var(--gradient-brand)" }}><Clock className="h-5 w-5" /></span>
              <div>
                <p className="font-medium text-[color:var(--bordeaux)]">Horaires</p>
                <p className="text-sm">Lundi — <em className="not-italic text-[color:var(--bordeaux)]/70">fermé</em></p>
                <p className="text-sm">Mardi à Dimanche — 08h00 à 22h00</p>
              </div>
            </li>
          </ul>
          <div className="mt-8 flex gap-3">
            <a href="#" className="btn-pill-outline !py-2.5 !px-4"><Instagram className="h-4 w-4" /> Instagram</a>
            <a href="#" className="btn-pill-outline !py-2.5 !px-4"><Facebook className="h-4 w-4" /> Facebook</a>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="overflow-hidden rounded-3xl border border-[color:var(--rose-gold)]/30 shadow-[0_20px_60px_rgba(107,39,55,0.15)] h-[420px]">
            <iframe
              title="Lac de Beauté — Abomey-Calavi"
              src="https://www.google.com/maps?q=Abomey-Calavi,B%C3%A9nin&output=embed"
              className="h-full w-full"
              loading="lazy"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="relative py-24 md:py-32">
      <div className="absolute inset-0 -z-10" style={{ background: "linear-gradient(180deg, #FDF8F5, #FBEAE5)" }} />
      <div className="mx-auto max-w-3xl px-5">
        <Reveal className="text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--rose-gold)]">FAQ</p>
          <h2 className="mt-3 text-3xl md:text-5xl">Vos questions, nos réponses.</h2>
        </Reveal>
        <div className="mt-12 space-y-3">
          {FAQ.map((f, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <button
                type="button"
                onClick={() => setOpen(open === i ? null : i)}
                className="glass-card w-full text-left px-6 py-5 transition"
              >
                <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
                  <span className="font-display text-lg text-[color:var(--bordeaux)]">{f.q}</span>
                  <ChevronDown className={`h-5 w-5 shrink-0 text-[color:var(--rose-gold)] transition ${open === i ? "rotate-180" : ""}`} />
                </div>
                {open === i && (
                  <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="mt-3 text-sm text-[color:var(--ink)]/75 leading-relaxed">
                    {f.a}
                  </motion.p>
                )}
              </button>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="relative pt-16 pb-10 text-[color:var(--cream)]" style={{ background: "linear-gradient(180deg, #6B2737 0%, #4a1a26 100%)" }}>
      <div className="mx-auto max-w-6xl px-5 grid gap-10 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="grid h-10 w-10 place-items-center rounded-full text-white" style={{ background: "var(--gradient-brand)" }}><Flower2 className="h-5 w-5" /></span>
            <span className="font-display text-2xl">Lac de Beauté</span>
          </div>
          <p className="mt-4 text-sm text-white/70 max-w-xs">Institut de beauté à Abomey-Calavi — coiffure, ongles, cils, maquillage, massage, soins.</p>
        </div>
        <div className="text-sm text-white/80">
          <p className="font-display text-lg text-white">Contact</p>
          <p className="mt-3">443, Abomey-Calavi</p>
          <p><a href="tel:+2290150787878" className="hover:text-white">01 50 78 78 78</a></p>
          <p className="mt-2">Mar–Dim · 08h–22h</p>
        </div>
        <div className="text-sm text-white/80">
          <p className="font-display text-lg text-white">Navigation</p>
          <ul className="mt-3 grid grid-cols-2 gap-y-1">
            {[["Services","services"],["Galerie","gallery"],["Avis","reviews"],["Tarifs","prices"],["Rendez-vous","booking"],["FAQ","faq"]].map(([l,h])=>(
              <li key={h}><a className="hover:text-white" href={`#${h}`}>{l}</a></li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mt-10 border-t border-white/10 pt-6 text-center text-xs text-white/50">
        © {new Date().getFullYear()} Lac de Beauté · Tous droits réservés
      </div>
    </footer>
  );
}

function Index() {
  return (
    <main className="relative">
      <Nav />
      <Hero />
      <CurveDivider color="#FDF8F5" />
      <About />
      <Services />
      <Gallery />
      <Reviews />
      <Prices />
      <Booking />
      <Contact />
      <Faq />
      <Footer />
    </main>
  );
}
