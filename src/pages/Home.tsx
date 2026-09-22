import { NavLink } from 'react-router';
import { useEffect, useRef, useState } from 'react';
import HexIcon from '../components/HexIcon';
import { useInView } from '../components/useInView';
import { useCountUp } from '../components/useCountUp';
import logo from '../assets/logo.png';
import Icon, { type IconName } from '../components/Icon';

// Full real client/portfolio list (from the credentials deck)
const clients = [
  'Emirates', 'Litro Gas', 'Euro Motors', 'Marico', 'All Out', 'Baygon',
  'Glade', 'KIWI', 'Pledge', 'Asthijeewa', 'UNDP', 'Wipro',
  'Browns EV', 'MELBET', 'Bellosé', 'Astra',
];

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

/** Replaces the old hexagon graphic: an interactive tilt card for the logo, following the cursor. */
function InteractiveLogoCard() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0, mx: 50, my: 50 });

  const onMouseMove = (e: React.MouseEvent) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    setTilt({
      rx: (0.5 - py) * 14,
      ry: (px - 0.5) * 14,
      mx: px * 100,
      my: py * 100,
    });
  };
  const onMouseLeave = () => setTilt({ rx: 0, ry: 0, mx: 50, my: 50 });

  return (
    <div style={{ perspective: 1000 }}>
      <div
        ref={cardRef}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        className="relative rounded-3xl px-14 py-12 cursor-pointer transition-transform duration-200 ease-out"
        style={{
          background: '#fff',
          border: '1px solid rgba(26,26,26,0.07)',
          transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
          boxShadow: '0 24px 60px rgba(146,39,143,0.14)',
        }}
      >
        <div
          className="absolute inset-0 rounded-3xl opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${tilt.mx}% ${tilt.my}%, rgba(146,39,143,0.12), transparent 60%)`,
          }}
        />
        <img
          src={logo}
          alt="The Insight Hive"
          className="w-64 max-w-full relative"
          style={{ transform: 'translateZ(30px)' }}
        />
      </div>
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
      <section className="relative overflow-hidden" style={{ background: '#EFEFEF' }}>
        <div className="absolute inset-0 pointer-events-none">
          <div style={{ position: 'absolute', top: -120, right: -120, width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(146,39,143,0.07) 0%, transparent 70%)' }} />
          <div style={{ position: 'absolute', bottom: -80, left: -80, width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(247,148,31,0.06) 0%, transparent 70%)' }} />
        </div>
        <div className="max-w-7xl mx-auto px-6 py-16 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1">
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-8 tracking-widest"
              style={{ background: 'rgba(146,39,143,0.1)', color: '#92278F', animation: 'fadeUp 0.6s ease both' }}
            >
              OMNICOM GROUP AFFILIATE
            </div>
            <h1
              className="font-extrabold leading-none mb-6"
              style={{ fontSize: 'clamp(3rem, 7vw, 5.5rem)', color: '#1A1A1A', animation: 'fadeUp 0.6s ease 0.1s both' }}
            >
              <span className="font-light">The</span>{' '}
              <span style={{ background: 'linear-gradient(90deg, #92278F, #C2436B, #F7941F)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>All-Rounders</span>{' '}
              <span className="font-light">of</span>{' '}
              <span>Marketing</span>
            </h1>
            <p
              className="text-lg mb-10 max-w-xl leading-relaxed"
              style={{ color: '#9A9A9A', animation: 'fadeUp 0.6s ease 0.2s both' }}
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
                style={heroSeeWork.style}
                className="font-semibold px-8 py-4 rounded-full text-base border-2 transition-all hover:bg-[#1A1A1A] hover:text-[#EFEFEF]"
                css={undefined}
                {...{}}
              >
                See Our Work
              </NavLink>
            </div>
          </div>
          <div className="flex-shrink-0" style={{ animation: 'fadeUp 0.7s ease 0.15s both' }}>
            <InteractiveLogoCard />
          </div>
        </div>
        <style>{`
          @keyframes fadeUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
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
          className="relative flex justify-center"
          onMouseEnter={() => setMarqueePaused(true)}
          onMouseLeave={() => setMarqueePaused(false)}
        >
          <div
            className="flex gap-4 whitespace-nowrap"
            style={{
              animation: `marquee ${clients.length * 2.2}s linear infinite`,
              animationPlayState: marqueePaused ? 'paused' : 'running',
              willChange: 'transform',
            }}
          >
            {[...clients, ...clients].map((c, i) => (
              <span
                key={i}
                className="flex-shrink-0 px-6 py-3 rounded-xl text-base font-bold tracking-tight transition-all duration-300 hover:scale-105"
                style={{
                  color: '#1A1A1A',
                  opacity: 0.55,
                  border: '1px solid rgba(26,26,26,0.08)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.opacity = '1';
                  e.currentTarget.style.background = 'linear-gradient(90deg, #92278F, #C2436B, #F7941F)';
                  e.currentTarget.style.WebkitBackgroundClip = 'text';
                  (e.currentTarget.style as any).WebkitTextFillColor = 'transparent';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.opacity = '0.55';
                  e.currentTarget.style.background = 'none';
                  (e.currentTarget.style as any).WebkitTextFillColor = '#1A1A1A';
                }}
              >
                {c}
              </span>
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
            <p style={{ color: '#9A9A9A' }} className="max-w-xl">End-to-end marketing expertise with no silos. Every specialist masters the full picture.</p>
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
                <p className="text-sm" style={{ color: '#9A9A9A' }}>{cap.sub}</p>
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
                <p style={{ color: '#9A9A9A' }}>{p.desc}</p>
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
              to="/our-work#astra-rasa-mathaka"
              title="Astra — Rasa Mathaka"
              tag="Integrated Campaign"
              result="83M media value · 993% ROMI"
              bg="#1A1A1A"
              img="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=500&fit=crop&auto=format"
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