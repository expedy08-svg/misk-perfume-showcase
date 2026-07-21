import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useRef, useState } from 'react'
import {
  motion,
  useMotionValue,
  useScroll,
  useTransform,
  useSpring,
  AnimatePresence,
} from 'framer-motion'
import {
  Menu,
  X,
  MessageCircle,
  Instagram,
  MapPin,
  Star,
  Phone,
  Sparkles,
} from 'lucide-react'

export const Route = createFileRoute('/')({
  component: Home,
})

// ============================================================
// CONTACT — MISK.229
// ============================================================
const WHATSAPP_NUMBER = '2290151259542'
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}`
const INSTAGRAM_HANDLE = '@themisk.229'
const INSTAGRAM_LINK = 'https://instagram.com/themisk.229'
const ADDRESS = 'Boulevard de St Michel, Cotonou, Bénin'
const GOOGLE_RATING = 5.0
const GOOGLE_REVIEWS_COUNT = 3

// Photos d'ambiance temporaires (Unsplash, libres de droits) — À REMPLACER
// dès que les vraies photos de la boutique Misk.229 sont disponibles.
// Il suffira de changer ces 3 URLs (ou de les remplacer par /boutique-1.jpg etc.
// après upload dans public/).
const HERO_PHOTOS = [
  'https://images.unsplash.com/photo-1709662369957-0cbf9f8452fc?fm=jpg&q=80&w=1600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1591892212776-a09de24dbe84?fm=jpg&q=80&w=1600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1749264361617-dbe17a223f54?fm=jpg&q=80&w=1600&auto=format&fit=crop',
]

// Produits — NOMS / PRIX À CONFIRMER PAR MISK.229, placeholders pour l'instant
const PRODUCTS = [
  {
    id: 1,
    name: 'Oud Impérial',
    family: 'Oriental boisé',
    price: '25 000 FCFA',
    note: 'Oud, safran, bois de santal',
  },
  {
    id: 2,
    name: 'Musc Noir',
    family: 'Musqué envoûtant',
    price: '20 000 FCFA',
    note: 'Musc blanc, ambre, vanille',
  },
  {
    id: 3,
    name: "Rose d'Orient",
    family: 'Floral oriental',
    price: '22 000 FCFA',
    note: 'Rose de Damas, oud, épices',
  },
  {
    id: 4,
    name: 'Ambre Doré',
    family: 'Ambré chaud',
    price: '23 000 FCFA',
    note: 'Ambre gris, cuir, fève tonka',
  },
]

const REVIEWS = [
  {
    name: 'Client Google',
    text: 'Accueil chaleureux et parfums qui tiennent toute la journée. Le Oud Impérial est devenu mon signature.',
  },
  {
    name: 'Client Google',
    text: "Boutique élégante, conseils personnalisés selon la peau. On sent vraiment l'expertise.",
  },
  {
    name: 'Client Google',
    text: 'Rapport qualité-prix excellent pour des senteurs qui rivalisent avec les grandes maisons.',
  },
]

// ============================================================
// UTIL — détecte un pointeur "souris" (désactive le tilt sur tactile)
// ============================================================
function usePointerFine() {
  const [fine, setFine] = useState(true)

  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)')
    setFine(mq.matches)
    const handler = (e: MediaQueryListEvent) => setFine(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  return fine
}

// ============================================================
// HOME
// ============================================================
function Home() {
  return (
    <div className="min-h-screen bg-noir text-creme font-body">
      <SmokeVeilIntro />
      <Header />
      <Hero />
      <Products />
      <About />
      <ReviewsSection />
      <Footer />
      <WhatsAppFloatingButton />
    </div>
  )
}

// ============================================================
// TRANSITION D'ENTRÉE — voile sombre qui se dissipe (fumée de parfum)
// ============================================================
function SmokeVeilIntro() {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 1900)
    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] pointer-events-none flex items-center justify-center bg-noir-profond"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.9, ease: 'easeInOut' } }}
        >
          <motion.div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(circle at 50% 50%, rgba(201,162,39,0.12) 0%, rgba(13,9,6,1) 70%)',
            }}
            initial={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            animate={{ opacity: 0, scale: 1.6, filter: 'blur(20px)' }}
            transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
          />
          <motion.p
            className="relative font-heading text-2xl md:text-3xl tracking-[0.3em] text-or-clair"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 1, 0] }}
            transition={{ duration: 1.8, times: [0, 0.3, 0.7, 1] }}
          >
            MISK.229
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// ============================================================
// HEADER
// ============================================================
function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { label: 'Accueil', href: '#accueil' },
    { label: 'Parfums', href: '#parfums' },
    { label: 'À propos', href: '#a-propos' },
    { label: 'Avis', href: '#avis' },
    { label: 'Contact', href: '#contact' },
  ]

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 1.9 }}
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-500 ${
        scrolled ? 'bg-noir/90 backdrop-blur-md border-b border-noyer-clair/30' : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 md:px-10 h-20 flex items-center justify-between">
        <a href="#accueil" className="font-heading text-2xl tracking-[0.25em] text-creme">
          MISK<span className="text-or">.229</span>
        </a>

        <nav className="hidden md:flex items-center gap-10">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm tracking-wide text-creme-douce hover:text-or transition-colors duration-300"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:block">
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-or/40 px-5 py-2 text-sm text-or hover:bg-or hover:text-noir transition-colors duration-300"
          >
            <MessageCircle className="w-4 h-4" />
            WhatsApp
          </a>
        </div>

        <button
          className="md:hidden text-creme"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="md:hidden overflow-hidden bg-noir border-b border-noyer-clair/30"
          >
            <div className="flex flex-col px-6 py-6 gap-5">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="text-creme-douce hover:text-or transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-or"
              >
                <MessageCircle className="w-4 h-4" />
                Écrire sur WhatsApp
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

// ============================================================
// HERO — titre lettre par lettre + halo doré pulsant
// ============================================================
function AnimatedTitle({ text }: { text: string }) {
  return (
    <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl text-creme leading-none">
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ opacity: 0, y: 30, filter: 'blur(6px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{
            duration: 0.7,
            delay: 2.1 + i * 0.07,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </h1>
  )
}

// Fond hero : fondu lent entre les 3 photos boutique (ambiance qui vit
// même sans avoir encore les photos produits en gros plan)
function HeroBackgroundSlideshow() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % HERO_PHOTOS.length)
    }, 6000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="absolute inset-0">
      <AnimatePresence mode="sync">
        <motion.div
          key={HERO_PHOTOS[index]}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${HERO_PHOTOS[index]})` }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.8, ease: 'easeInOut' }}
        />
      </AnimatePresence>
    </div>
  )
}

function Hero() {
  return (
    <section
      id="accueil"
      className="relative min-h-screen flex items-center justify-center overflow-hidden misk-grain"
    >
      {/* Fond photo boutique en fondu + voile sombre */}
      <HeroBackgroundSlideshow />
      <div className="absolute inset-0 bg-gradient-to-b from-noir-profond/90 via-noir/85 to-noir" />

      {/* Halo doré pulsant derrière le titre */}
      <div
        className="animate-misk-halo absolute w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, rgba(201,162,39,0.35) 0%, rgba(201,162,39,0) 70%)',
          filter: 'blur(10px)',
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.9 }}
          className="uppercase tracking-[0.4em] text-xs md:text-sm text-or mb-6"
        >
          Parfumerie orientale — Cotonou
        </motion.p>

        <AnimatedTitle text="MISK.229" />

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 3.2 }}
          className="mt-6 text-creme-douce text-lg md:text-xl font-light tracking-wide"
        >
          L'essence de l'orient, révélée dans la pénombre.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 3.5 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#parfums"
            className="inline-flex items-center gap-2 rounded-full bg-or px-8 py-3 text-noir font-medium tracking-wide hover:bg-or-clair transition-colors duration-300"
          >
            <Sparkles className="w-4 h-4" />
            Découvrir nos parfums
          </a>
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-creme/30 px-8 py-3 text-creme tracking-wide hover:border-or hover:text-or transition-colors duration-300"
          >
            <MessageCircle className="w-4 h-4" />
            Nous écrire
          </a>
        </motion.div>
      </div>

      {/* Indicateur de scroll, sobre */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 4 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-px h-10 bg-gradient-to-b from-or to-transparent"
        />
      </motion.div>
    </section>
  )
}

// ============================================================
// PRODUITS — flottaison + tilt 3D + ombre dorée + parallax
// ============================================================
function ProductCard({
  product,
  index,
}: {
  product: (typeof PRODUCTS)[number]
  index: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const canTilt = usePointerFine()
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), {
    stiffness: 150,
    damping: 18,
  })
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), {
    stiffness: 150,
    damping: 18,
  })

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!canTilt) return
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5)
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  function handleMouseLeave() {
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, delay: index * 0.12 }}
      className="animate-misk-float"
      style={{ animationDelay: `${index * 0.4}s` }}
    >
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={canTilt ? { rotateX, rotateY, transformPerspective: 800 } : undefined}
        className="misk-card-glow group relative rounded-lg border border-noyer-clair/40 bg-gradient-to-b from-noyer/40 to-noir-profond p-6 flex flex-col items-center text-center"
      >
        {/* Silhouette flacon — placeholder en attendant les photos gros plan */}
        <div className="relative w-full h-64 sm:h-72 mb-6 flex items-center justify-center overflow-hidden rounded-md bg-noir-profond/60">
          <BottleSilhouette />
          <div className="absolute inset-0 bg-gradient-to-t from-noir-profond/80 via-transparent to-transparent" />
        </div>

        <p className="text-xs uppercase tracking-[0.25em] text-or mb-2">
          {product.family}
        </p>
        <h3 className="font-heading text-2xl text-creme mb-2">{product.name}</h3>
        <p className="text-sm text-creme-douce/70 mb-4">{product.note}</p>
        <p className="text-or-clair font-medium mb-5">{product.price}</p>

        <a
          href={`${WHATSAPP_LINK}?text=${encodeURIComponent(
            `Bonjour, je suis intéressé(e) par ${product.name}.`,
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm text-creme border-b border-or/50 pb-0.5 hover:text-or transition-colors duration-300"
        >
          Se renseigner
        </a>
      </motion.div>
    </motion.div>
  )
}

function BottleSilhouette() {
  return (
    <svg
      viewBox="0 0 100 140"
      width={110}
      height={154}
      style={{ maxWidth: '45%', maxHeight: '80%' }}
      className="opacity-70 group-hover:opacity-90 transition-opacity duration-500"
      fill="none"
    >
      <rect x="40" y="8" width="20" height="14" rx="2" fill="#c9a227" opacity="0.8" />
      <rect x="44" y="2" width="12" height="8" rx="1.5" fill="#c9a227" />
      <path
        d="M35 22 L65 22 L72 40 L72 128 Q72 134 66 134 L34 134 Q28 134 28 128 L28 40 Z"
        fill="#b8763e"
        opacity="0.35"
        stroke="#c9a227"
        strokeWidth="1"
      />
    </svg>
  )
}

function Products() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const bgY = useTransform(scrollYProgress, [0, 1], ['-5%', '5%'])

  return (
    <section
      id="parfums"
      ref={sectionRef}
      className="relative py-28 md:py-36 overflow-hidden"
    >
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 opacity-40"
        aria-hidden
      >
        <div className="absolute inset-0 bg-gradient-to-b from-noir via-noyer/10 to-noir" />
      </motion.div>

      <div className="relative max-w-6xl mx-auto px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="uppercase tracking-[0.35em] text-xs text-or mb-3">
            Notre collection
          </p>
          <h2 className="font-heading text-4xl md:text-5xl text-creme">
            Parfums signature
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {PRODUCTS.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

// ============================================================
// À PROPOS
// ============================================================
function About() {
  return (
    <section id="a-propos" className="relative py-28 bg-noir-profond misk-grain">
      <div className="max-w-5xl mx-auto px-6 md:px-10 grid md:grid-cols-2 gap-14 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="relative aspect-[4/5] rounded-lg overflow-hidden border border-noyer-clair/30"
        >
          <img
            src={HERO_PHOTOS[1]}
            alt="Boutique Misk.229"
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-noir-profond/70 to-transparent" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.15 }}
        >
          <p className="uppercase tracking-[0.35em] text-xs text-or mb-3">
            Notre maison
          </p>
          <h2 className="font-heading text-4xl text-creme mb-6">À propos de Misk.229</h2>
          <p className="text-creme-douce/80 leading-relaxed mb-4">
            Nichée au cœur de Cotonou, Misk.229 est une parfumerie de niche dédiée
            aux amateurs de senteurs orientales authentiques. Oud, musc, ambre et
            épices précieuses composent un univers olfactif rare, sélectionné avec
            exigence.
          </p>
          <p className="text-creme-douce/80 leading-relaxed mb-8">
            Chaque flacon raconte une histoire — la nôtre commence dès votre premier
            passage en boutique.
          </p>

          <div className="flex items-center gap-3 text-creme-douce">
            <MapPin className="w-5 h-5 text-or shrink-0" />
            <span>{ADDRESS}</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// ============================================================
// AVIS
// ============================================================
function ReviewsSection() {
  return (
    <section id="avis" className="relative py-28">
      <div className="max-w-5xl mx-auto px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-14"
        >
          <p className="uppercase tracking-[0.35em] text-xs text-or mb-3">
            Ils nous font confiance
          </p>
          <h2 className="font-heading text-4xl md:text-5xl text-creme mb-4">Avis clients</h2>
          <div className="flex items-center justify-center gap-2">
            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-or text-or" />
              ))}
            </div>
            <span className="text-creme-douce">
              {GOOGLE_RATING.toFixed(1)} · {GOOGLE_REVIEWS_COUNT} avis Google
            </span>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {REVIEWS.map((review, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              className="rounded-lg border border-noyer-clair/30 bg-noyer/10 p-6"
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star key={s} className="w-4 h-4 fill-or text-or" />
                ))}
              </div>
              <p className="text-creme-douce/85 leading-relaxed mb-4">{review.text}</p>
              <p className="text-sm text-or-clair">{review.name}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ============================================================
// FOOTER
// ============================================================
function Footer() {
  return (
    <footer id="contact" className="relative bg-noir-profond border-t border-noyer-clair/30 pt-16 pb-8">
      <div className="max-w-6xl mx-auto px-6 md:px-10 grid md:grid-cols-3 gap-10 mb-12">
        <div>
          <p className="font-heading text-2xl tracking-[0.25em] text-creme mb-4">
            MISK<span className="text-or">.229</span>
          </p>
          <p className="text-creme-douce/70 text-sm leading-relaxed">
            Parfumerie orientale de niche à Cotonou. Oud, musc, ambre et épices
            précieuses, sélectionnés avec exigence.
          </p>
        </div>

        <div>
          <p className="uppercase tracking-[0.3em] text-xs text-or mb-4">Contact</p>
          <div className="flex flex-col gap-3 text-sm text-creme-douce/85">
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-or transition-colors">
              <Phone className="w-4 h-4" /> +229 01 51 25 95 42
            </a>
            <a href={INSTAGRAM_LINK} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-or transition-colors">
              <Instagram className="w-4 h-4" /> {INSTAGRAM_HANDLE}
            </a>
            <span className="flex items-center gap-2">
              <MapPin className="w-4 h-4 shrink-0" /> {ADDRESS}
            </span>
          </div>
        </div>

        <div>
          <p className="uppercase tracking-[0.3em] text-xs text-or mb-4">Navigation</p>
          <div className="flex flex-col gap-3 text-sm text-creme-douce/85">
            <a href="#accueil" className="hover:text-or transition-colors">Accueil</a>
            <a href="#parfums" className="hover:text-or transition-colors">Parfums</a>
            <a href="#a-propos" className="hover:text-or transition-colors">À propos</a>
            <a href="#avis" className="hover:text-or transition-colors">Avis</a>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 md:px-10 pt-6 border-t border-noyer-clair/20 text-center text-xs text-creme-douce/50">
        © {new Date().getFullYear()} Misk.229 — Tous droits réservés.
      </div>
    </footer>
  )
}

// ============================================================
// BOUTON WHATSAPP FLOTTANT
// ============================================================
function WhatsAppFloatingButton() {
  return (
    <motion.a
      href={WHATSAPP_LINK}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 4.2 }}
      whileHover={{ scale: 1.08 }}
      className="fixed bottom-6 right-6 z-40 flex items-center gap-2 rounded-full bg-or px-5 py-3.5 text-noir shadow-[0_8px_30px_rgba(201,162,39,0.4)]"
      aria-label="Contacter Misk.229 sur WhatsApp"
    >
      <MessageCircle className="w-5 h-5" />
      <span className="hidden sm:inline text-sm font-medium">Écrire sur WhatsApp</span>
    </motion.a>
  )
}
