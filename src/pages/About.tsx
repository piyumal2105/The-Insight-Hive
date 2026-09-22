import { useEffect, useRef, useState } from 'react';
import HexIcon from '../components/HexIcon';
import Icon from '../components/Icon';
import { NavLink } from 'react-router';

const ethos = [
  { value: 'Client Centric', size: 'text-2xl' },
  { value: 'Innovation at Core', size: 'text-lg' },
  { value: 'Transparency & Integrity', size: 'text-xl' },
  { value: 'Data Driven', size: 'text-2xl' },
  { value: 'Community & Social Impact', size: 'text-lg' },
  { value: 'Empowerment & Inclusivity', size: 'text-xl' },
  { value: 'Continuous Learning', size: 'text-lg' },
];

const team = [
  {
    name: 'Peter Solomon',
    title: 'Managing Director / Chief Insights Officer',
    bio: '28+ years in marketing communications. Leads strategic direction and oversees client partnerships across all Insight Hive operations.',
    img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&h=300&fit=crop&auto=format',
  },
  {
    name: 'Irshad Farook',
    title: 'Director Operations',
    bio: '14+ years in integrated media planning & buying. Drives operational excellence and media investment strategy.',
    img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&auto=format',
  },
  {
    name: 'Ishani Anuradha',
    title: 'Head of Strategy',
    bio: '16+ years across GroupM and dentsu. Architect of brand and consumer strategy frameworks.',
    img: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=300&h=300&fit=crop&auto=format',
  },
  {
    name: 'Yoosuf Faizal',
    title: 'Head of Digital Strategy',
    bio: '10+ years in brand & communications. Leads digital transformation and performance marketing.',
    img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop&auto=format',
  },
  {
    name: 'Madhavi Jayawardena',
    title: 'Manager, Integrated Media Planning',
    bio: '7+ years orchestrating multi-channel media campaigns for leading Sri Lankan and global brands.',
    img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&h=300&fit=crop&auto=format',
  },
  {
    name: 'Shalika Udeni',
    title: 'Head of Finance',
    bio: '15+ years. CMA Sri Lanka. Ensures financial integrity and transparent reporting on all client media investments.',
    img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop&auto=format',
  },
];

const network = [
  {
    name: 'Omnicom Group',
    sub: 'Global Media & Marketing Holding Company',
    desc: 'New York HQ. One of the world\'s largest holding companies spanning media, marketing, and communications.',
    color: '#7A2E8C',
  },
  {
    name: 'UM Worldwide',
    sub: '"Full Color Media"',
    desc: 'Global media network in 100+ countries. Inclusive, data-powered, culturally nuanced media that drives real impact.',
    color: '#C2436B',
  },
  {
    name: 'Initiative Worldwide',
    sub: '"Fame & Flow"',
    desc: 'Top-ranked global media agency in 90+ markets. Builds brand fame while driving performance flow.',
    color: '#E8722E',
  },
];

export default function About() {
  const ethosRef = useRef<HTMLDivElement>(null);
  const [ethosVisible, setEthosVisible] = useState(false);

  useEffect(() => {
    const el = ethosRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setEthosVisible(true); obs.disconnect(); } }, { threshold: 0.15 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <>
      {/* Hero */}
      <section className="py-24" style={{ background: 'linear-gradient(135deg, #262626 0%, #1A1A1A 100%)' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-8 tracking-widest" style={{ background: 'rgba(122,46,140,0.2)', color: '#C2436B' }}>
              FOUNDED APRIL 2023
            </div>
            <h1 className="font-extrabold mb-6 leading-tight" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', color: '#F2F2F2' }}>
              <span className="font-light">Who</span> We Are
            </h1>
            <p className="text-xl leading-relaxed mb-6" style={{ color: '#9A9A9A' }}>
              Founded by industry veterans with <strong style={{ color: '#F2F2F2' }}>44+ years combined experience</strong>, The Insight Hive is a full-service marketing agency and proud <strong style={{ color: '#F2F2F2' }}>Omnicom Group affiliate</strong> — future-facing across traditional and digital media.
            </p>
            <p style={{ color: '#9A9A9A' }} className="leading-relaxed">
              We connect Brand Strategy, Consumer Insight, Creative & Content, Integrated Media, Digital & Performance, and Data & Measurement under one roof. All-Rounders, by design.
            </p>
          </div>
        </div>
      </section>

      {/* No silos */}
      <section className="py-24" style={{ background: '#EFEFEF' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="w-16 h-0.5 mx-auto mb-8" style={{ background: 'linear-gradient(90deg, #7A2E8C, #C2436B, #E8722E)' }} />
            <h2 className="font-extrabold mb-6" style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', color: '#1A1A1A' }}>
              <span className="font-light">One team,</span> no silos.
            </h2>
            <p className="text-xl leading-relaxed" style={{ color: '#9A9A9A' }}>
              Most agencies compartmentalize strategy, planning, buying and digital into separate silos. The Insight Hive trains every team member to <strong style={{ color: '#1A1A1A' }}>master all of it</strong> — using role-rotation and the Omnicom network to build agile, future-facing media experts with end-to-end accountability.
            </p>
          </div>
        </div>
      </section>

      {/* Ethos */}
      <section className="py-24" style={{ background: '#fff' }}>
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="font-extrabold mb-4" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#1A1A1A' }}>
            <span className="font-light">Our</span> Ethos
          </h2>
          <p style={{ color: '#9A9A9A' }} className="mb-16 max-w-lg">Seven principles that govern every engagement, every decision, every result.</p>
          <div ref={ethosRef} className="flex flex-wrap gap-6 justify-center">
            {ethos.map((e, i) => (
              <div
                key={i}
                className={`flex items-center gap-3 font-bold ${e.size} transition-all duration-700`}
                style={{
                  color: '#1A1A1A',
                  opacity: ethosVisible ? 1 : 0,
                  transform: ethosVisible ? 'translateY(0) scale(1)' : `translateY(${20 + i * 5}px) scale(0.95)`,
                  transitionDelay: `${i * 100}ms`,
                }}
              >
                <HexIcon size={32}><Icon name="check" size={16} /></HexIcon>
                {e.value}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24" style={{ background: '#EFEFEF' }}>
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="font-extrabold mb-4" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#1A1A1A' }}>
            <span className="font-light">Leadership</span> Team
          </h2>
          <p style={{ color: '#9A9A9A' }} className="mb-16 max-w-lg">Seasoned professionals who have shaped Sri Lanka's media landscape.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {team.map((m, i) => (
              <TeamCard key={i} {...m} />
            ))}
          </div>
        </div>
      </section>

      {/* Network */}
      <section className="py-24" style={{ background: '#262626' }}>
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="font-extrabold mb-4" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#F2F2F2' }}>
            <span className="font-light">Our</span> Network
          </h2>
          <p style={{ color: '#9A9A9A' }} className="mb-16 max-w-lg">Global affiliations that give every client access to world-class tools, data, and expertise.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {network.map((n, i) => (
              <div key={i} className="p-8 rounded-2xl" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
                <div className="w-1 h-10 rounded-full mb-6" style={{ background: n.color }} />
                <h3 className="font-extrabold text-xl mb-1" style={{ color: '#F2F2F2' }}>{n.name}</h3>
                <p className="text-sm font-semibold mb-4" style={{ color: n.color }}>{n.sub}</p>
                <p className="text-sm leading-relaxed" style={{ color: '#9A9A9A' }}>{n.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 text-center" style={{ background: '#EFEFEF' }}>
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="font-extrabold mb-6" style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', color: '#1A1A1A' }}>Ready to work with us?</h2>
          <NavLink to="/contact" className="btn-grad text-white font-bold px-10 py-4 rounded-full text-base inline-block">
            Start the Conversation
          </NavLink>
        </div>
      </section>
    </>
  );
}

function TeamCard({ name, title, bio, img }: { name: string; title: string; bio: string; img: string }) {
  const [flipped, setFlipped] = useState(false);
  return (
    <div
      className="rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1"
      style={{ background: '#fff', border: '1px solid rgba(26,26,26,0.07)' }}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
    >
      <div className="relative">
        <img src={img} alt={name} className="w-full h-56 object-cover" />
        <div
          className="absolute inset-0 p-6 flex flex-col justify-end transition-opacity duration-300"
          style={{ background: 'linear-gradient(to top, rgba(26,26,26,0.95) 0%, rgba(26,26,26,0.5) 60%, transparent 100%)', opacity: flipped ? 1 : 0 }}
        >
          <p className="text-sm leading-relaxed" style={{ color: '#F2F2F2' }}>{bio}</p>
        </div>
      </div>
      <div className="p-6">
        <h3 className="font-bold text-base mb-1" style={{ color: '#1A1A1A' }}>{name}</h3>
        <p className="text-xs" style={{ color: '#9A9A9A' }}>{title}</p>
      </div>
    </div>
  );
}
