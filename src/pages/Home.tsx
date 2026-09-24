import { NavLink } from 'react-router';
import { useEffect, useRef, useState, useMemo } from 'react';
import HexIcon from '../components/HexIcon';
import { useInView } from '../components/useInView';
import { useCountUp } from '../components/useCountUp';
import Icon, { type IconName } from '../components/Icon';

import image01 from "../assets/rasamathakagallery/img07.jpg"

const clientNames = [
  'Emirates', 'Litro Gas', 'Euro Motors', 'Marico', 'All Out', 'Baygon',
  'Glade', 'KIWI', 'Pledge', 'Asthijeewa', 'UNDP', 'Wipro',
  'Browns EV', 'MELBET', 'Bellosé', 'Astra',
];

const logoModules = import.meta.glob('../assets/logo/img*.{png,jpg,jpeg,svg,webp}', {
  eager: true,
  import: 'default',
}) as Record<string, string>;

const sortedLogoSrcs = Object.keys(logoModules)
  .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
  .map((key) => logoModules[key]);

type Client = { name: string; logo: string };

const clients: Client[] = clientNames
  .map((name, i) => ({ name, logo: sortedLogoSrcs[i] }))
  .filter((c) => Boolean(c.logo));

const capabilities = [
  { icon: 'strategy' as IconName, title: 'Brand Strategy', sub: 'Consumer Insight & Positioning' },
  { icon: 'creative' as IconName, title: 'Creative & Content', sub: 'Storytelling at Scale' },
  { icon: 'media' as IconName, title: 'Integrated Media', sub: 'Planning & Buying' },
  { icon: 'chart' as IconName, title: 'Digital & Performance', sub: 'Strategy & Execution' },
  { icon: 'message' as IconName, title: 'Social Content', sub: 'Management & Community' },
  { icon: 'chart' as IconName, title: 'Data & Measurement', sub: 'Analytics & Attribution' },
];

const pillars = [
  { icon: 'heart' as IconName, title: 'Big on Passion', desc: 'Every brief gets the best version of us.' },
  { icon: 'bolt' as IconName, title: 'Fierce on Dedication', desc: 'We stay until the work is right, not just done.' },
  { icon: 'handshake' as IconName, title: 'Built on Trust', desc: 'Transparent, audited, and accountable.' },
];

/** Generic reveal-on-scroll wrapper: fades + slides up a grid of children, staggered. */
function useStaggerReveal() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

/** Lightweight magnetic-hover effect for buttons: nudges toward the cursor. */
function useMagnetic(strength = 0.35) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [style, setStyle] = useState<React.CSSProperties>({});
  const onMouseMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * strength;
    const y = (e.clientY - rect.top - rect.height / 2) * strength;
    setStyle({ transform: `translate(${x}px, ${y}px)` });
  };
  const onMouseLeave = () => setStyle({ transform: 'translate(0, 0)' });
  return { ref, style, onMouseMove, onMouseLeave };
}

function StatCard({ prefix, number, suffix, label, started }: { prefix?: string; number: number; suffix?: string; label: string; started: boolean }) {
  const count = useCountUp(number, 2200, started);
  return (
    <div
      className="rounded-2xl p-6 transition-transform duration-300 hover:-translate-y-1"
      style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
    >
      <div className="text-4xl font-extrabold mb-2" style={{ background: 'linear-gradient(90deg, #92278F, #C2436B, #F7941F)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
        {prefix}{count.toLocaleString()}{suffix}
      </div>
      <p className="text-sm leading-relaxed" style={{ color: '#9A9A9A' }}>{label}</p>
    </div>
  );
}

/* ---------- Honeycomb hero background ("bee home") ---------- */

const GRAD_STOPS = ['#92278F', '#C2436B', '#F7941F'];

function lerpChannel(a: number, b: number, t: number) {
  return Math.round(a + (b - a) * t);
}
function hexToRgb(hex: string) {
  const v = parseInt(hex.slice(1), 16);
  return { r: (v >> 16) & 0xff, g: (v >> 8) & 0xff, b: v & 0xff };
}
function gradientColorAt(t: number) {
  const clamped = Math.max(0, Math.min(1, t));
  const [c0, c1, c2] = GRAD_STOPS.map(hexToRgb);
  const seg = clamped <= 0.5 ? [c0, c1, clamped / 0.5] : [c1, c2, (clamped - 0.5) / 0.5];
  const [from, to, localT] = seg as [{ r: number; g: number; b: number }, { r: number; g: number; b: number }, number];
  return `rgb(${lerpChannel(from.r, to.r, localT)}, ${lerpChannel(from.g, to.g, localT)}, ${lerpChannel(from.b, to.b, localT)})`;
}

type Hex = { key: string; x: number; y: number; color: string; opacity: number };

function HiveBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    let frame: number;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        setSize({ width: el.offsetWidth, height: el.offsetHeight });
      });
    };
    update();
    const obs = new ResizeObserver(update);
    obs.observe(el);
    return () => {
      obs.disconnect();
      cancelAnimationFrame(frame);
    };
  }, []);

  const hexSize = 96;
  const hexW = hexSize;
  const hexH = hexSize * 1.1547;
  const rowGap = hexH * 0.76;

  const hexes: Hex[] = useMemo(() => {
    if (size.width === 0 || size.height === 0) return [];

    const cols = Math.ceil(size.width / (hexW * 0.98)) + 2;
    const rows = Math.ceil(size.height / rowGap) + 2;
    const startCol = -1;
    const startRow = -1;
    const list: Hex[] = [];

    for (let r = startRow; r < rows; r++) {
      for (let c = startCol; c < cols; c++) {
        const offsetX = ((r % 2) + 2) % 2 === 1 ? hexW / 2 : 0;
        const x = c * hexW * 0.98 + offsetX;
        const y = r * rowGap;
        const t = Math.max(0, Math.min(1, x / size.width));
        list.push({
          key: `${r}-${c}`,
          x,
          y,
          color: gradientColorAt(t),
          opacity: 0.12 + t * 0.48,
        });
      }
    }
    return list;
  }, [size.width, size.height]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 hidden lg:block pointer-events-none overflow-hidden"
      aria-hidden="true"
      style={{ contain: 'layout paint' }}
    >
      <div className="absolute inset-0">
        {hexes.map((h) => (
          <div
            key={h.key}
            className="absolute pointer-events-auto hive-hex"
            style={{
              left: h.x,
              top: h.y,
              width: hexW,
              height: hexH,
              clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
              background: h.color,
              opacity: h.opacity,
              willChange: 'transform',
              transform: 'translateZ(0)',
            }}
          />
        ))}
      </div>

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(90deg, #EFEFEF 0%, rgba(239,239,239,0.85) 30%, rgba(239,239,239,0.25) 55%, rgba(239,239,239,0) 75%)',
        }}
      />

      <style>{`
        .hive-hex {
          transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.3s ease;
        }
        .hive-hex:hover {
          transform: scale(1.15) translateZ(0);
          opacity: 0.85 !important;
        }
      `}</style>
    </div>
  );
}

export default function Home() {
  const { ref: statsRef, inView: statsInView } = useInView(0.2);
  const { ref: pillarsRef, visible: pillarsVisible } = useStaggerReveal();
  const { ref: capsRef, visible: capsVisible } = useStaggerReveal();
  const { ref: workRef, visible: workVisible } = useStaggerReveal();
  const [marqueePaused, setMarqueePaused] = useState(false);

  const heroLetsTalk = useMagnetic(0.25);
  const heroSeeWork = useMagnetic(0.25);
  const ctaButton = useMagnetic(0.2);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden" style={{ background: '#EFEFEF', minHeight: 'calc(100vh - 88px)' }}>
        <HiveBackground />
        <div className="absolute inset-0 pointer-events-none">
          <div style={{ position: 'absolute', top: -120, right: -120, width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(146,39,143,0.05) 0%, transparent 70%)' }} />
          <div style={{ position: 'absolute', bottom: -80, left: -80, width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(247,148,31,0.05) 0%, transparent 70%)' }} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-16 lg:py-20 flex items-center" style={{ minHeight: 'calc(100vh - 88px)' }}>
          <div className="max-w-2xl">
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-8 tracking-widest"
              style={{ background: 'rgba(146,39,143,0.1)', color: '#92278F', animation: 'fadeUp 0.6s ease both' }}
            >
              OMNICOM GROUP AFFILIATE
            </div>
            <h1
              className="font-extrabold leading-[1.02] mb-6"
              style={{ fontSize: 'clamp(2.75rem, 6.5vw, 5.25rem)', color: '#1A1A1A', animation: 'fadeUp 0.6s ease 0.1s both', letterSpacing: '-0.02em' }}
            >
              <span className="font-light">The</span>{' '}
              {/* nowrap + non-breaking hyphen keeps "All-Rounders" on one line */}
              <span style={{ whiteSpace: 'nowrap', background: 'linear-gradient(90deg, #92278F, #C2436B, #F7941F)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>All&#8209;Rounders</span>{' '}
              <span className="font-light">of</span>{' '}
              <span>Marketing</span>
            </h1>
            <p
              className="text-lg mb-10 max-w-xl leading-relaxed"
              style={{ color: '#5E5E5E', animation: 'fadeUp 0.6s ease 0.2s both' }}
            >
              Brand Strategy, Consumer Insight, Creative, Integrated Media, Digital, and Data — under one roof. Founded by veterans with 44+ years combined experience.
            </p>
            <div className="flex flex-wrap gap-4" style={{ animation: 'fadeUp 0.6s ease 0.3s both' }}>
              <NavLink
                ref={heroLetsTalk.ref}
                to="/contact"
                onMouseMove={heroLetsTalk.onMouseMove}
                onMouseLeave={heroLetsTalk.onMouseLeave}
                style={heroLetsTalk.style}
                className="btn-grad text-white font-bold px-8 py-4 rounded-full text-base transition-transform"
              >
                Let's Talk
              </NavLink>
              <NavLink
                ref={heroSeeWork.ref}
                to="/our-work"
                onMouseMove={heroSeeWork.onMouseMove}
                onMouseLeave={heroSeeWork.onMouseLeave}
                style={{ ...heroSeeWork.style, borderColor: '#1A1A1A', background: 'rgba(255,255,255,0.5)' }}
                className="font-semibold px-8 py-4 rounded-full text-base border-2 transition-all hover:bg-[#1A1A1A] hover:text-[#EFEFEF]"
              >
                See Our Work
              </NavLink>
            </div>
          </div>

        </div>

        <style>{`
          @keyframes fadeUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @media (prefers-reduced-motion: reduce) {
            *, *::before, *::after { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; transition-duration: 0.01ms !important; }
          }
        `}</style>
      </section>

      {/* Trust bar — seamless looping logo strip */}
      <section
        className="py-10 overflow-hidden"
        style={{ background: '#fff', borderTop: '1px solid rgba(26,26,26,0.06)', borderBottom: '1px solid rgba(26,26,26,0.06)' }}
      >
        <p className="text-center text-xs font-semibold tracking-widest mb-6" style={{ color: '#9A9A9A' }}>TRUSTED BY</p>
        <div
          className="relative overflow-hidden"
          onMouseEnter={() => setMarqueePaused(true)}
          onMouseLeave={() => setMarqueePaused(false)}
        >
          <div
            className="flex items-center"
            style={{
              width: 'max-content',
              animation: `marquee ${clients.length * 2.2}s linear infinite`,
              animationPlayState: marqueePaused ? 'paused' : 'running',
              willChange: 'transform',
            }}
          >
            {[...clients, ...clients].map((c, i) => (
              <div
                key={`${c.name}-${i}`}
                className="flex-shrink-0 flex items-center justify-center"
                style={{ width: 148, height: 64 }}
                title={c.name}
              >
                <img
                  src={c.logo}
                  alt={c.name}
                  className="max-h-10 md:max-h-12 w-auto max-w-[120px] object-contain transition-transform duration-300 hover:scale-110"
                />
              </div>
            ))}
          </div>
        </div>
        <div className="text-center mt-6">
          <NavLink
            to="/our-work"
            className="text-sm font-semibold hover:opacity-70 transition-opacity"
            style={{ color: '#92278F' }}
          >
            See our full portfolio →
          </NavLink>
        </div>
        <style>{`
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}</style>
      </section>

      {/* Capabilities */}
      <section className="py-24" style={{ background: '#EFEFEF' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16">
            <h2 className="font-extrabold mb-4" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#1A1A1A' }}>
              <span className="font-light">What</span> We Do
            </h2>
            <p style={{ color: '#6B6B6B' }} className="max-w-xl">End-to-end marketing expertise with no silos. Every specialist masters the full picture.</p>
          </div>
          <div ref={capsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {capabilities.map((cap, i) => (
              <div
                key={i}
                className="p-8 rounded-2xl group cursor-pointer transition-all duration-500 hover:-translate-y-2 hover:shadow-xl"
                style={{
                  background: '#fff',
                  border: '1px solid rgba(26,26,26,0.07)',
                  opacity: capsVisible ? 1 : 0,
                  transform: capsVisible ? 'translateY(0)' : 'translateY(24px)',
                  transition: `opacity 0.6s ease ${i * 90}ms, transform 0.6s ease ${i * 90}ms, box-shadow 0.3s ease, translate 0.3s ease`,
                }}
              >
                <div className="transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6 inline-block">
                  <HexIcon size={52}><Icon name={cap.icon} /></HexIcon>
                </div>
                <h3 className="font-bold text-lg mt-5 mb-2" style={{ color: '#1A1A1A' }}>{cap.title}</h3>
                <p className="text-sm" style={{ color: '#6B6B6B' }}>{cap.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact stats */}
      <section ref={statsRef} className="py-24" style={{ background: '#262626' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16 text-center">
            <h2 className="font-extrabold mb-4" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#F2F2F2' }}>
              <span className="font-light">Impact &</span> Milestones
            </h2>
            <p style={{ color: '#9A9A9A' }} className="max-w-xl mx-auto">Evidence over claims. These numbers represent real work, real clients, real results.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <StatCard prefix="~Rs. " number={1} suffix="Bn" label="2024 Presidential election media spend won on a competitive pitch against Ogilvy Media — in their first year." started={statsInView} />
            <StatCard number={2} suffix="nd Largest" label="Cricket World Cup 2023 media spender in Sri Lanka." started={statsInView} />
            <StatCard number={1} suffix="st Globally" label="Astra Sri Lanka Global Digital Engagement Leadership 2025, outperforming 90+ markets worldwide." started={statsInView} />
            <StatCard number={3} suffix=" Awards" label="Sri Lanka Leadership Awards 2026 winner." started={statsInView} />
            <StatCard number={90} suffix="+ Markets" label="Outperformed globally with Astra Sri Lanka's integrated digital campaign." started={statsInView} />
            <StatCard number={44} suffix="+ Years" label="Combined founding team experience in marketing communications." started={statsInView} />
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-24" style={{ background: '#EFEFEF' }}>
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="font-extrabold mb-16 text-center" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#1A1A1A' }}>
            <span className="font-light">Our</span> Philosophy
          </h2>
          <div ref={pillarsRef} className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pillars.map((p, i) => (
              <div
                key={i}
                className="text-center p-10 rounded-2xl transition-all duration-700 hover:-translate-y-1 hover:shadow-lg"
                style={{
                  background: '#fff',
                  border: '1px solid rgba(26,26,26,0.07)',
                  opacity: pillarsVisible ? 1 : 0,
                  transform: pillarsVisible ? 'translateY(0)' : 'translateY(32px)',
                  transitionDelay: `${i * 150}ms`,
                }}
              >
                <HexIcon size={60}><Icon name={p.icon} /></HexIcon>
                <h3 className="font-extrabold text-xl mt-6 mb-3" style={{ color: '#1A1A1A' }}>{p.title}</h3>
                <p style={{ color: '#6B6B6B' }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Selected work */}
      <section className="py-24" style={{ background: '#262626' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between mb-16">
            <h2 className="font-extrabold" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#F2F2F2' }}>
              <span className="font-light">Selected</span> Work
            </h2>
            <NavLink to="/our-work" className="inline-flex items-center gap-2 text-sm font-semibold hover:opacity-70 transition-opacity" style={{ color: '#9A9A9A' }}>View All <Icon name="arrow-right" size={16} /></NavLink>
          </div>
          <div ref={workRef} className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <CaseCard
              to="/astra-rasa-mathaka"
              title="Astra — Rasa Mathaka"
              tag="Integrated Campaign"
              result="83M media value · 993% ROMI"
              bg="#1A1A1A"
              img={image01}
              visible={workVisible}
              delay={0}
            />
            <CaseCard
              to="/our-work#kiwi-shoe-polish"
              title="KIWI — Shoe Polish"
              tag="Integrated Campaign"
              result="Full campaign breakdown on Our Work"
              bg="#1A1A1A"
              img="https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=800&h=500&fit=crop&auto=format"
              visible={workVisible}
              delay={120}
            />
          </div>
        </div>
      </section>

      {/* CTA band */}
      <section className="py-24 text-center" style={{ background: 'linear-gradient(135deg, #92278F, #C2436B, #F7941F)' }}>
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="font-extrabold mb-6" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#fff' }}>
            Ready to build something great?
          </h2>
          <p className="mb-10 text-lg opacity-90" style={{ color: '#fff' }}>
            Let's connect and see how The Insight Hive can move the needle for your brand.
          </p>
          <NavLink
            ref={ctaButton.ref}
            to="/contact"
            onMouseMove={ctaButton.onMouseMove}
            onMouseLeave={ctaButton.onMouseLeave}
            style={ctaButton.style}
            className="inline-block bg-white font-bold px-10 py-4 rounded-full text-base transition-all hover:shadow-2xl"
          >
            Start a Conversation
          </NavLink>
        </div>
      </section>
    </>
  );
}

function CaseCard({
  to, title, tag, result, bg, img, visible, delay,
}: { to: string; title: string; tag: string; result: string; bg: string; img: string; visible: boolean; delay: number }) {
  return (
    <NavLink
      to={to}
      className="group block rounded-2xl overflow-hidden relative"
      style={{
        background: bg,
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(24px)',
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
      }}
    >
      <div className="relative overflow-hidden h-64">
        <img
          src={img}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(26,26,26,0.8) 0%, transparent 60%)' }} />
      </div>
      <div className="p-8">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3" style={{ background: 'linear-gradient(90deg, #92278F, #C2436B, #F7941F)', color: '#fff' }}>{tag}</span>
        <h3 className="font-bold text-xl mb-2" style={{ color: '#F2F2F2' }}>{title}</h3>
        <p className="text-sm" style={{ color: '#9A9A9A' }}>{result}</p>
        <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ color: '#F7941F' }}>
          View Case Study <Icon name="arrow-right" size={16} />
        </div>
      </div>
    </NavLink>
  );
}