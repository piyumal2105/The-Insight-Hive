import { useEffect, useRef, useState } from 'react';
import { useInView } from '../components/useInView';
import { useCountUp } from '../components/useCountUp';
import { NavLink } from 'react-router';
import Icon from '../components/Icon';

// KIWI "Get Ready to Shine" campaign creative
import kiwiCreative from '../assets/ourwork/img07.jpg';

const clientLogoModules = import.meta.glob('../assets/ourwork/img*.{png,jpg,jpeg,webp}', {
  eager: true,
  import: 'default',
}) as Record<string, string>;

const sortedClientLogos = Object.keys(clientLogoModules)
  .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
  .map((key) => clientLogoModules[key]);

// sortedClientLogos: [0] img01 (UNDP), [1] img02 (Emirates), [2] img03 (Litro Gas), [3] img04, [4] img05 (Lemonade), [5] img06
const clients = [
  { name: 'Emirates', discipline: 'Integrated Media Planning', logo: sortedClientLogos[1] },
  { name: 'Litro Gas', discipline: 'Brand Strategy & Media', logo: sortedClientLogos[2] },
  { name: 'UNDP', discipline: 'Social Impact Communications', logo: sortedClientLogos[0] },
  { name: 'Astra', discipline: 'Integrated Campaign, Brand Strategy', logo: sortedClientLogos[3] },
  { name: 'KIWI Shoe Polish', discipline: 'Brand Activation & Media', logo: sortedClientLogos[5] },
  { name: 'Lemonade', discipline: 'Brand Campaign & Media', logo: sortedClientLogos[4] },
];

const awards = [
  { title: 'Sri Lanka Leadership Awards 2026', sub: '3 Awards Won', color: '#7A2E8C' },
  { title: 'Dragons of Sri Lanka 2026', sub: 'Category Winner', color: '#C2436B' },
  { title: 'Global Digital Engagement Leadership', sub: '#1 Globally — Astra Sri Lanka 2025', color: '#E8722E' },
  { title: '2024 Presidential Election', sub: '~Rs. 1Bn Spend Won vs. Ogilvy Media', color: '#7A2E8C' },
];

function ResultStat({ value, label, started }: { value: number; label: string; started: boolean }) {
  const count = useCountUp(value, 2000, started);
  return (
    <div className="text-center">
      <div className="text-3xl font-extrabold mb-1" style={{ background: 'linear-gradient(90deg, #7A2E8C, #C2436B, #E8722E)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
        {count.toLocaleString()}+
      </div>
      <p className="text-xs" style={{ color: '#9A9A9A' }}>{label}</p>
    </div>
  );
}

export default function OurWork() {
  const { ref: statsRef, inView: statsInView } = useInView(0.2);
  const [hoveredClient, setHoveredClient] = useState<number | null>(null);
  const [lineVisible, setLineVisible] = useState(false);
  const caseRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = caseRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setLineVisible(true); obs.disconnect(); } }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const steps = [
    { step: '01', title: 'Objective', desc: 'Reconnect consumers with 50+ years of nostalgic "Rasa Mathaka" heritage — reviving an emotional bond between the brand and Sri Lanka.' },
    { step: '02', title: 'Heritage', desc: 'Surfaced nostalgic memories tied to the brand, celebrating the moments and milestones Astra has been part of across generations.' },
    { step: '03', title: 'Engagement', desc: 'Nationwide memory-collection initiatives celebrating shared stories — turning brand history into personal, participatory moments.' },
    { step: '04', title: 'Experience', desc: 'Immersive, live on-ground brand activations that brought Rasa Mathaka to life across Sri Lanka.' },
  ];

  return (
    <>
      {/* Header */}
      <section className="py-24" style={{ background: 'linear-gradient(135deg, #262626 0%, #1A1A1A 100%)' }}>
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="font-extrabold mb-6 leading-tight" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', color: '#F2F2F2' }}>
            <span className="font-light">Work that</span><br />moves the needle.
          </h1>
          <p className="text-xl max-w-2xl" style={{ color: '#9A9A9A' }}>
            Real clients. Real results. Every campaign is built on insight, measured against outcomes, and audited for transparency.
          </p>
        </div>
      </section>

      {/* Client logo wall */}
      <section className="py-24" style={{ background: '#EFEFEF' }}>
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="font-extrabold mb-16" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#1A1A1A' }}>
            <span className="font-light">Clients</span> We've Served
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {clients.map((c, i) => (
              <div
                key={i}
                className="relative p-8 rounded-2xl flex flex-col items-center text-center cursor-pointer transition-all duration-300"
                style={{
                  background: hoveredClient === i ? '#262626' : '#fff',
                  border: '1px solid rgba(26,26,26,0.07)',
                  transform: hoveredClient === i ? 'translateY(-4px)' : 'none',
                }}
                onMouseEnter={() => setHoveredClient(i)}
                onMouseLeave={() => setHoveredClient(null)}
              >
                <div
                  className="w-full flex items-center justify-center rounded-xl mb-4 bg-white"
                  style={{ height: '84px', padding: '10px' }}
                >
                  <img
                    src={c.logo}
                    alt={c.name}
                    className="max-h-full max-w-full"
                    style={{ objectFit: 'contain' }}
                  />
                </div>
                <h3 className="font-bold text-lg mb-1 transition-colors" style={{ color: hoveredClient === i ? '#F2F2F2' : '#1A1A1A' }}>{c.name}</h3>
                <p className="text-xs transition-colors" style={{ color: '#9A9A9A' }}>{c.discipline}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Awards */}
      <section className="py-24" style={{ background: '#262626' }}>
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="font-extrabold mb-16" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#F2F2F2' }}>
            <span className="font-light">Awards &</span> Milestones
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {awards.map((a, i) => (
              <div key={i} className="p-6 rounded-2xl relative overflow-hidden group" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
                <div className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl" style={{ background: a.color }} />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div className="absolute top-0 left-[-100%] w-full h-full skew-x-12" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.04), transparent)', animation: 'shine 1.5s ease infinite' }} />
                </div>
                <h3 className="font-extrabold text-sm mb-2" style={{ color: '#F2F2F2' }}>{a.title}</h3>
                <p className="text-xs font-semibold" style={{ color: a.color }}>{a.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case study */}
      <section className="py-24" style={{ background: '#EFEFEF' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-6 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4" style={{ background: 'linear-gradient(90deg, #7A2E8C, #C2436B, #E8722E)', color: '#fff' }}>FEATURED CASE STUDY</span>
              <h2 className="font-extrabold mb-4" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#1A1A1A' }}>
                Astra — <span className="font-light">Rasa Mathaka</span>
              </h2>
              <p className="max-w-2xl leading-relaxed" style={{ color: '#9A9A9A' }}>
                An integrated campaign reconnecting Sri Lankans with 50+ years of nostalgic heritage. Nationwide memory collection, immersive activations, and a media strategy that delivered industry-defining results.
              </p>
            </div>
            <NavLink
              to="/astra-rasa-mathaka"
              className="inline-flex items-center gap-2 font-semibold text-sm px-6 py-3 rounded-full whitespace-nowrap hover:opacity-90 transition-opacity"
              style={{ background: '#1A1A1A', color: '#F2F2F2' }}
            >
              View Full Case Study
              <Icon name="arrow-right" size={16} />
            </NavLink>
          </div>

          {/* 4-step framework */}
          <div ref={caseRef} className="my-16 grid grid-cols-1 md:grid-cols-4 gap-0 relative">
            <div className="absolute top-8 left-0 right-0 h-0.5 hidden md:block" style={{ background: 'rgba(26,26,26,0.1)', zIndex: 0 }}>
              <div
                className="h-full transition-all duration-2000"
                style={{ background: 'linear-gradient(90deg, #7A2E8C, #C2436B, #E8722E)', width: lineVisible ? '100%' : '0%', transitionDuration: '1.5s' }}
              />
            </div>
            {steps.map((s, i) => (
              <div
                key={i}
                className="relative z-10 p-6 transition-all duration-700"
                style={{
                  opacity: lineVisible ? 1 : 0,
                  transform: lineVisible ? 'translateY(0)' : 'translateY(24px)',
                  transitionDelay: `${i * 250 + 300}ms`,
                }}
              >
                <div className="w-16 h-16 rounded-full flex items-center justify-center font-extrabold text-lg mb-4" style={{ background: 'linear-gradient(135deg, #7A2E8C, #C2436B, #E8722E)', color: '#fff' }}>
                  {s.step}
                </div>
                <h3 className="font-extrabold text-lg mb-3" style={{ color: '#1A1A1A' }}>{s.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: '#9A9A9A' }}>{s.desc}</p>
              </div>
            ))}
          </div>

          {/* Results */}
          <div ref={statsRef} className="rounded-2xl p-10" style={{ background: '#262626' }}>
            <h3 className="font-extrabold text-xl mb-10 text-center" style={{ color: '#F2F2F2' }}>Campaign Results</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8">
              <ResultStat value={8500} label="Memory collections nationwide" started={statsInView} />
              <ResultStat value={83} label="Million in media value" started={statsInView} />
              <ResultStat value={11} label="Million total reach" started={statsInView} />
              <ResultStat value={993} label="% ROMI achieved" started={statsInView} />
              <ResultStat value={588} label="Media exposures" started={statsInView} />
              <div className="text-center">
                <div className="text-3xl font-extrabold mb-1" style={{ background: 'linear-gradient(90deg, #7A2E8C, #C2436B, #E8722E)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>18.9%</div>
                <p className="text-xs" style={{ color: '#9A9A9A' }}>Volume share growth Q1 2025</p>
              </div>
            </div>
            <div className="mt-10 text-center flex flex-col sm:flex-row items-center justify-center gap-4">
              <div className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl cursor-pointer hover:opacity-80 transition-opacity" style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.15)' }}>
                <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #7A2E8C, #C2436B, #E8722E)' }}>
                  <Icon name="play" size={18} className="text-white" />
                </div>
                <span className="font-semibold" style={{ color: '#F2F2F2' }}>Watch the Rasa Mathaka Journey 2025</span>
              </div>
              <NavLink
                to="/astra-rasa-mathaka"
                className="inline-flex items-center gap-2 font-semibold text-sm px-6 py-4 rounded-2xl hover:opacity-80 transition-opacity"
                style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.15)', color: '#F2F2F2' }}
              >
                Read the full story
                <Icon name="arrow-right" size={16} />
              </NavLink>
            </div>
          </div>
        </div>
      </section>

      {/* KIWI Shoe Polish case study teaser */}
      <section id="kiwi-shoe-polish" className="py-16 scroll-mt-24" style={{ background: '#fff' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="rounded-2xl overflow-hidden flex flex-col md:flex-row" style={{ background: '#EFEFEF', border: '1px solid rgba(26,26,26,0.07)' }}>
            <img
              src={kiwiCreative}
              alt="KIWI Shoe Polish — Get Ready to Shine campaign creative"
              className="w-full md:w-80 h-56 md:h-auto object-cover flex-shrink-0"
              style={{ objectPosition: '50% 18%', background: '#fff' }}
            />
            <div className="p-8 flex flex-col justify-center">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4 w-fit" style={{ background: 'rgba(225,10,23,0.1)', color: '#E10A17' }}>CASE STUDY</span>
              <h3 className="font-extrabold text-2xl mb-3" style={{ color: '#1A1A1A' }}>KIWI Shoe Polish — Get Ready to Shine</h3>
              <p className="mb-6 max-w-2xl leading-relaxed" style={{ color: '#9A9A9A' }}>
                Re-establishing KIWI in Sri Lanka after a two-year hiatus through a creative campaign built around popular TV shows, the Sinhala and Hindu New Year, and the ICC Cricket World Cup 2023. It reached 4 million households through TV and generated 21.37 million impressions online.
              </p>
              <NavLink
                to="/kiwi-get-ready-to-shine"
                className="inline-flex items-center gap-2 font-semibold text-sm px-6 py-3 rounded-full whitespace-nowrap w-fit hover:opacity-90 transition-opacity"
                style={{ background: '#1A1A1A', color: '#F2F2F2' }}
              >
                View Full Case Study
                <Icon name="arrow-right" size={16} />
              </NavLink>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 text-center" style={{ background: '#EFEFEF' }}>
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="font-extrabold mb-6" style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', color: '#1A1A1A' }}>Want results like these?</h2>
          <NavLink to="/contact" className="btn-grad text-white font-bold px-10 py-4 rounded-full text-base inline-block">
            Let's Talk
          </NavLink>
        </div>
      </section>
    </>
  );
}