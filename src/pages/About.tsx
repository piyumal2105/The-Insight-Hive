import { useEffect, useRef, useState } from 'react';
import HexIcon from '../components/HexIcon';
import Icon from '../components/Icon';
import { NavLink } from 'react-router';

const teamPhotoModules = import.meta.glob('../assets/team/img*.{jpeg,jpg,png,webp}', {
  eager: true,
  import: 'default',
}) as Record<string, string>;

const sortedTeamPhotos = Object.keys(teamPhotoModules)
  .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
  .map((key) => teamPhotoModules[key]);

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
    name: 'Rtn. Peter Solomon',
    title: 'Managing Director / Chief Insights Officer',
    bio: 'Holds two Bachelor\'s degrees and an MBA from Cardiff Metropolitan University, UK. Served two terms on the board of the 4A\'s Sri Lanka Chapter, including as 2nd Vice President. Lectures on Advertising Media and mentors young talent entering integrated media planning and buying. 28+ years of marketing communications experience across local and international brands.',
    img: sortedTeamPhotos[0],
  },
  {
    name: 'Irshad Farook',
    title: 'Director Operations',
    bio: 'Brings 14+ years of leadership in integrated media planning and buying, combining global best practices from GroupM with deep local market know-how. The engine behind flawless campaign execution for clients like Pepsi, Red Bull, Dr. Fixit, Uber, Commercial Bank, NDB and Asian Paints, including the 2019 and 2024 Presidential Election campaigns.',
    img: sortedTeamPhotos[1],
  },
  {
    name: 'Ishani Anuradha',
    title: 'Head of Strategy',
    bio: '16+ years of hands-on expertise in media planning and buying across top multinational agencies. Led strategic campaigns at GroupM and dentsu, working with Unilever, Reckitt, Upfield and Astra. Her deep MNC exposure and passion for data-driven insight make her the architect of powerful, future-focused strategies.',
    img: sortedTeamPhotos[2],
  },
  {
    name: 'Yoosuf Faizal',
    title: 'Head of Digital Strategy',
    bio: 'A senior communications and brand leader with 10+ years shaping corporate narratives across internal, external, media, employer brand and ESG communications. Most recently led Corporate Communications and Brand at Brandix, and previously headed brand and digital strategy at Virtusa Sri Lanka, partnering with Dialog, Union Assurance, Hero and Maliban.',
    img: sortedTeamPhotos[3],
  },
  {
    name: 'Madhavi Jayawardena',
    title: 'Manager, Integrated Media Planning',
    bio: '7+ years of expertise in integrated media planning, social media management and paid media, honed at GroupM, Nextage and Leaeap Media. Has crafted data-driven, omni-channel campaigns for brands such as Unilever, Emirates, Solo, Java Institute, Coloma and UNFPA.',
    img: sortedTeamPhotos[4],
  },
  {
    name: 'Shalika Udeni',
    title: 'Head of Finance',
    bio: 'A seasoned finance professional with 15+ years leading finance and revenue operations across multi-entity organizations, spanning billing, revenue recognition, forecasting and compliance. Previously Group Head - Finance at Publicis Groupe Sri Lanka. CMA (Sri Lanka), proficient in SAP and Altair.',
    img: sortedTeamPhotos[5],
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
      className="rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1 flex flex-col h-full"
      style={{ background: '#fff', border: '1px solid rgba(26,26,26,0.07)' }}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
    >
      {/* Fixed-size image box: every card gets the exact same photo dimensions */}
      <div className="relative w-full shrink-0" style={{ height: '280px' }}>
        <img
          src={img}
          alt={name}
          className="absolute inset-0 w-full h-full"
          style={{ objectFit: 'cover', objectPosition: 'center 15%' }}
        />
        <div
          className="absolute inset-0 p-6 flex flex-col justify-end transition-opacity duration-300 overflow-y-auto"
          style={{ background: 'linear-gradient(to top, rgba(26,26,26,0.95) 0%, rgba(26,26,26,0.75) 55%, transparent 100%)', opacity: flipped ? 1 : 0 }}
        >
          <p className="text-xs leading-relaxed" style={{ color: '#F2F2F2' }}>{bio}</p>
        </div>
      </div>
      <div className="p-6 flex flex-col justify-center" style={{ minHeight: '96px' }}>
        <h3 className="font-bold text-base mb-1 truncate" style={{ color: '#1A1A1A' }}>{name}</h3>
        <p className="text-xs" style={{ color: '#9A9A9A' }}>{title}</p>
      </div>
    </div>
  );
}