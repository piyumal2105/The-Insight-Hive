import { NavLink } from 'react-router';
import { useEffect, useRef, useState } from 'react';
import HexIcon from '../components/HexIcon';
import { useInView } from '../components/useInView';
import { useCountUp } from '../components/useCountUp';
import logo from '../assets/logo.png';
import Icon, { type IconName } from '../components/Icon';

const clients = ['Emirates', 'Litro Gas', 'UNDP', 'Astra', 'Emirates', 'Litro Gas', 'UNDP', 'Astra'];

const capabilities = [
  { icon: 'strategy' as IconName, title: 'Brand Strategy', sub: 'Consumer Insight & Positioning' },
  { icon: 'creative' as IconName, title: 'Creative & Content', sub: 'Storytelling at Scale' },
  { icon: 'media' as IconName, title: 'Integrated Media', sub: 'Planning & Buying' },
  { icon: 'chart' as IconName, title: 'Digital & Performance', sub: 'Strategy & Execution' },
  { icon: 'message' as IconName, title: 'Social Content', sub: 'Management & Community' },
  { icon: 'chart' as IconName, title: 'Data & Measurement', sub: 'Analytics & Attribution' },
];

function StatCard({ prefix, number, suffix, label, started }: { prefix?: string; number: number; suffix?: string; label: string; started: boolean }) {
  const count = useCountUp(number, 2200, started);
  return (
    <div className="rounded-2xl p-6" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}>
      <div className="text-4xl font-extrabold mb-2" style={{ background: 'linear-gradient(90deg, #7A2E8C, #C2436B, #E8722E)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
        {prefix}{count.toLocaleString()}{suffix}
      </div>
      <p className="text-sm leading-relaxed" style={{ color: '#9A9A9A' }}>{label}</p>
    </div>
  );
}

const pillars = [
  { icon: 'heart' as IconName, title: 'Big on Passion', desc: 'Every brief gets the best version of us.' },
  { icon: 'bolt' as IconName, title: 'Fierce on Dedication', desc: 'We stay until the work is right, not just done.' },
  { icon: 'handshake' as IconName, title: 'Built on Trust', desc: 'Transparent, audited, and accountable.' },
];

export default function Home() {
  const { ref: statsRef, inView: statsInView } = useInView(0.2);
  const [pillarsVisible, setPillarsVisible] = useState(false);
  const pillarsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = pillarsRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setPillarsVisible(true); obs.disconnect(); } }, { threshold: 0.2 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden" style={{ background: '#EFEFEF', minHeight: 'calc(100vh - 64px)' }}>
        <div className="absolute inset-0 pointer-events-none">
          <div style={{ position: 'absolute', top: -120, right: -120, width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(122,46,140,0.07) 0%, transparent 70%)' }} />
          <div style={{ position: 'absolute', bottom: -80, left: -80, width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(232,114,46,0.06) 0%, transparent 70%)' }} />
        </div>
        <div className="max-w-7xl mx-auto px-6 py-24 flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-8 tracking-widest" style={{ background: 'rgba(122,46,140,0.1)', color: '#7A2E8C' }}>
              OMNICOM GROUP AFFILIATE
            </div>
            <h1 className="font-extrabold leading-none mb-6" style={{ fontSize: 'clamp(3rem, 7vw, 5.5rem)', color: '#1A1A1A' }}>
              <span className="font-light">The</span>{' '}
              <span style={{ background: 'linear-gradient(90deg, #7A2E8C, #C2436B, #E8722E)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>All-Rounders</span>{' '}
              <span className="font-light">of</span>{' '}
              <span>Marketing</span>
            </h1>
            <p className="text-lg mb-10 max-w-xl leading-relaxed" style={{ color: '#9A9A9A' }}>
              Brand Strategy, Consumer Insight, Creative, Integrated Media, Digital, and Data — under one roof. Founded by veterans with 44+ years combined experience.
            </p>
            <div className="flex flex-wrap gap-4">
              <NavLink to="/contact" className="btn-grad text-white font-bold px-8 py-4 rounded-full text-base">
                Let's Talk
              </NavLink>
              <NavLink to="/our-work" className="font-semibold px-8 py-4 rounded-full text-base border-2 transition-colors hover:bg-[#1A1A1A] hover:text-[#EFEFEF]" style={{ borderColor: '#1A1A1A', color: '#1A1A1A' }}>
                See Our Work
              </NavLink>
            </div>
          </div>
          <div className="flex-shrink-0 flex flex-col items-center justify-center gap-8">
            <AnimatedHex />
            <img
              src={logo}
              alt="The Insight Hive"
              className="w-72 max-w-full"
              style={{ filter: 'drop-shadow(0 4px 24px rgba(122,46,140,0.15))' }}
            />
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <section className="py-8 overflow-hidden" style={{ background: '#fff', borderTop: '1px solid rgba(26,26,26,0.06)', borderBottom: '1px solid rgba(26,26,26,0.06)' }}>
        <p className="text-center text-xs font-semibold tracking-widest mb-6" style={{ color: '#9A9A9A' }}>TRUSTED BY</p>
        <div className="relative flex gap-16 whitespace-nowrap" style={{ animation: 'marquee 20s linear infinite' }}>
          {[...clients, ...clients].map((c, i) => (
            <span key={i} className="text-xl font-extrabold tracking-tight flex-shrink-0" style={{ color: '#1A1A1A', opacity: 0.7 }}>{c}</span>
          ))}
        </div>
        <style>{`@keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }`}</style>
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {capabilities.map((cap, i) => (
              <div
                key={i}
                className="p-8 rounded-2xl group cursor-pointer transition-all duration-300 hover:-translate-y-1"
                style={{ background: '#fff', border: '1px solid rgba(26,26,26,0.07)' }}
              >
                <HexIcon size={52}><Icon name={cap.icon} /></HexIcon>
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
                className="text-center p-10 rounded-2xl transition-all duration-700"
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <CaseCard
              title="Astra — Rasa Mathaka"
              tag="Integrated Campaign"
              result="83M media value · 993% ROMI"
              bg="#1A1A1A"
              img="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=500&fit=crop&auto=format"
            />
            <CaseCard
              title="UNDP — Community Impact"
              tag="Brand Strategy"
              result="Nationwide grassroots reach"
              bg="#1A1A1A"
              img="https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=800&h=500&fit=crop&auto=format"
            />
          </div>
        </div>
      </section>

      {/* CTA band */}
      <section className="py-24 text-center" style={{ background: 'linear-gradient(135deg, #7A2E8C, #C2436B, #E8722E)' }}>
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="font-extrabold mb-6" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#fff' }}>
            Ready to build something great?
          </h2>
          <p className="mb-10 text-lg opacity-90" style={{ color: '#fff' }}>
            Let's connect and see how The Insight Hive can move the needle for your brand.
          </p>
          <NavLink to="/contact" className="inline-block bg-white font-bold px-10 py-4 rounded-full text-base transition-all hover:shadow-2xl hover:-translate-y-1" style={{ color: '#7A2E8C' }}>
            Start a Conversation
          </NavLink>
        </div>
      </section>
    </>
  );
}

function AnimatedHex() {
  const [pulse, setPulse] = useState(false);
  useEffect(() => {
    const id = setInterval(() => setPulse(p => !p), 1200);
    return () => clearInterval(id);
  }, []);
  const bars = [0.4, 0.6, 0.85, 1.0, 0.85, 0.6, 0.4];
  const size = 220;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ filter: 'drop-shadow(0 20px 60px rgba(122,46,140,0.3))' }}>
      <defs>
        <linearGradient id="heroHexGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#7A2E8C" />
          <stop offset="50%" stopColor="#C2436B" />
          <stop offset="100%" stopColor="#E8722E" />
        </linearGradient>
      </defs>
      <polygon
        points={`${size*0.5},4 ${size*0.93},${size*0.25} ${size*0.93},${size*0.75} ${size*0.5},${size-4} ${size*0.07},${size*0.75} ${size*0.07},${size*0.25}`}
        fill="url(#heroHexGrad)"
      />
      {bars.map((h, i) => {
        const barW = 16;
        const gap = 8;
        const total = bars.length * barW + (bars.length - 1) * gap;
        const x = (size - total) / 2 + i * (barW + gap);
        const baseH = h * size * 0.5;
        const animH = pulse ? baseH * (0.85 + Math.random() * 0.3) : baseH;
        const y = (size - animH) / 2;
        return (
          <rect
            key={i}
            x={x} y={y}
            width={barW} height={animH}
            rx={8}
            fill="rgba(255,255,255,0.9)"
            style={{ transition: 'height 0.6s ease, y 0.6s ease' }}
          />
        );
      })}
    </svg>
  );
}

function CaseCard({ title, tag, result, bg, img }: { title: string; tag: string; result: string; bg: string; img: string }) {
  return (
    <NavLink to="/our-work" className="group block rounded-2xl overflow-hidden relative" style={{ background: bg }}>
      <div className="relative overflow-hidden h-64">
        <img
          src={img}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(26,26,26,0.8) 0%, transparent 60%)' }} />
      </div>
      <div className="p-8">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3" style={{ background: 'linear-gradient(90deg, #7A2E8C, #C2436B, #E8722E)', color: '#fff' }}>{tag}</span>
        <h3 className="font-bold text-xl mb-2" style={{ color: '#F2F2F2' }}>{title}</h3>
        <p className="text-sm" style={{ color: '#9A9A9A' }}>{result}</p>
        <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ color: '#E8722E' }}>
          View Case Study <Icon name="arrow-right" size={16} />
        </div>
      </div>
    </NavLink>
  );
}
