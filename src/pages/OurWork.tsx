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

const awardImageModules = import.meta.glob('../assets/awards/*.{png,jpg,jpeg,webp}', {
  eager: true,
  import: 'default',
}) as Record<string, string>;

function findAwardImage(namePart: string): string {
  const key = Object.keys(awardImageModules).find((k) =>
    k.toLowerCase().includes(namePart.toLowerCase()),
  );
  return key ? awardImageModules[key] : '';
}

// Match by file name (case-insensitive). If a wrong picture shows up, change the text in quotes.
const imgLeadership = findAwardImage('/awards/awards.png');
const imgDragon2026 = findAwardImage('dragon2026');
const imgDragon2025 = findAwardImage('dragon2025');
const imgSlim01 = findAwardImage('slim digi 01');
const imgSlim02 = findAwardImage('slim digi 02');
const imgSlim03 = findAwardImage('slim digi 03');

// sortedClientLogos: [0] img01 (UNDP), [1] img02 (Emirates), [2] img03 (Litro Gas), [3] img04 (Astra),
// [4] img05 (Lemonade), [5] img06 (KIWI), [6] img07 (KIWI creative), [7] img08 (Sera), [8] img09 (Cycle),
// [9] img10 (Jockey), [10] img11 (Assetline Finance), [11] img12 (Pure Dale), [12] img13 (Maharishi Naturals)
const clients = [
  { name: 'Emirates', discipline: 'Integrated Media Planning', logo: sortedClientLogos[1] },
  { name: 'Litro Gas', discipline: 'Brand Strategy & Media', logo: sortedClientLogos[2] },
  { name: 'UNDP', discipline: 'Social Impact Communications', logo: sortedClientLogos[0] },
  { name: 'Astra', discipline: 'Integrated Campaign, Brand Strategy', logo: sortedClientLogos[3] },
  { name: 'BRILLON', discipline: 'Brand Activation & Media', logo: sortedClientLogos[13] },
  { name: 'Lemonade', discipline: 'Brand Campaign & Media', logo: sortedClientLogos[4] },
  { name: 'CBL Sera', discipline: 'Brand Campaign & Media', logo: sortedClientLogos[7] },
  { name: 'Cycle Pure Incense', discipline: 'Brand Strategy & Media', logo: sortedClientLogos[8] },
  { name: 'Jockey', discipline: 'Brand Campaign & Media', logo: sortedClientLogos[9] },
  { name: 'Assetline Finance', discipline: 'Brand Campaign & Media', logo: sortedClientLogos[10] },
  { name: 'Pure Dale', discipline: 'Brand Campaign & Media', logo: sortedClientLogos[11] },
  { name: 'Maharishi Naturals', discipline: 'Brand Campaign & Media', logo: sortedClientLogos[12] },
];

// Headline milestones (top row of the section)
const awards = [
  { title: 'Dragons of Sri Lanka 2026', sub: '4 Recognitions', color: '#C2436B' },
  { title: 'SLIM DIGIS 2026', sub: '1 Bronze + 2 Merit Awards', color: '#E8722E' },
  { title: 'Sri Lanka Leadership Awards 2026', sub: '3 Awards Won', color: '#7A2E8C' },
  { title: 'Global Digital Engagement Leadership', sub: '#1 Globally — Astra Sri Lanka 2025', color: '#C2436B' },
];

type Entry = { badge: string; color: string; text?: string; title: string; desc?: string };

type Showcase = {
  id: string;
  event: string;
  heading: string;
  subheading?: string;
  intro: string;
  image: string;
  imageAlt: string;
  entries: Entry[];
  reverse?: boolean;
  /** Forces the image into a fixed frame (e.g. '3 / 2') so it matches the Leadership layout. */
  imageRatio?: string;
  /** Slightly tighter text spacing so the text column height matches the image. */
  compact?: boolean;
};

type SlimCard = {
  id: string;
  image: string;
  badge: string;
  color: string;
  category: string;
  campaign?: string;
  desc: string;
};

type LightboxItem = { image: string; event: string; title: string; caption?: string };

const GOLD = '#D9A21B';
const BRONZE = '#B8703A';
const BLACK_DRAGON = '#000000';

// Dragons of Sri Lanka 2026
const dragons2026: Showcase = {
  id: 'dragons-2026',
  event: 'Dragons of Sri Lanka Awards 2026',
  heading: 'Mage Hondama Chef Mage Amma',
  subheading: 'My Best Chef, My Amma',
  intro:
    'A heartfelt campaign celebrating the love, talent and culinary magic of mothers. It received four recognitions, highlighting excellence in social media and AI-driven advertising, as well as digital and creative execution.',
  image: imgDragon2026,
  imageAlt: 'Dragons of Sri Lanka 2026 — Gold, Bronze and two Black Dragon certificates',
  imageRatio: '3 / 2',
  compact: true,
  entries: [
    {
      badge: 'Gold',
      color: GOLD,
      text: '#1A1A1A',
      title: 'Social Media-Based Advertising',
      desc: 'Top honour for turning a heartfelt idea into a social-first campaign that connected with audiences.',
    },
    {
      badge: 'Bronze',
      color: BRONZE,
      title: 'AI-Based Advertising',
      desc: 'Recognised for the creative use of AI in bringing the campaign story to life.',
    },
    {
      badge: 'Black Dragon',
      color: BLACK_DRAGON,
      title: 'Digital Excellence',
      desc: 'Celebrates outstanding digital execution across the campaign.',
    },
    {
      badge: 'Black Dragon',
      color: BLACK_DRAGON,
      title: 'Creative Excellence',
      desc: 'Awarded for the strength of the creative idea and the craft behind it.',
    },
  ],
};

// SLIM DIGIS 2026 (3 cards in one row)
const slimCards: SlimCard[] = [
  {
    id: 'slim-game-of-christmas',
    image: imgSlim03,
    badge: 'Merit',
    color: '#7A2E8C',
    category: 'FMCG: Food & Beverages',
    campaign: 'Game of Christmas',
    desc: 'Brought festive engagement and brand storytelling together through a creative digital campaign.',
  },
  {
    id: 'slim-baking',
    image: imgSlim01,
    badge: 'Merit',
    color: '#7A2E8C',
    category: 'FMCG: Food & Beverages',
    campaign: 'Baking Nam Cake, Cake Nam Baking',
    desc: 'Celebrated the joy of baking through an engaging digital campaign that connected with audiences through creativity and brand relevance.',
  },
  {
    id: 'slim-creators',
    image: imgSlim02,
    badge: 'Bronze',
    color: BRONZE,
    category: 'Best Use of Creators / Influencers',
    campaign: 'Kamathiyi, Kamathiyi, Kamathiyi',
    desc: 'Recognised for the effective use of creators and influencers, this Bronze-winning campaign demonstrated the power of creator-led storytelling in building brand engagement and connecting with audiences.',
  },
];

// Sri Lanka Leadership Awards 2026
const leadership2026: Showcase = {
  id: 'leadership-2026',
  event: 'Sri Lanka Leadership Awards 2026',
  heading: 'Three trophies, one night',
  intro:
    'Presented on 25 August 2026 at Taj Samudra, Colombo, recognising the agency and the Astra Spread campaign Mage Hondama Chef Mage Amma (My Best Chef, My Amma).',
  image: imgLeadership,
  imageAlt: 'Sri Lanka Leadership Awards 2026 — three trophies and certificates',
  reverse: true,
  entries: [
    {
      badge: 'Winner',
      color: '#7A2E8C',
      title: 'Digital Agency of the Year',
      desc: 'Celebrates the agency’s contribution to digital innovation, creative excellence and impactful brand communication.',
    },
    {
      badge: 'Winner',
      color: '#C2436B',
      title: 'Best Use of Social Media',
      desc: 'Mage Hondama Chef Mage Amma showed the power of social storytelling in bringing a meaningful brand idea to life and creating an engaging connection with audiences.',
    },
    {
      badge: 'Winner',
      color: '#E8722E',
      title: 'Marketing Campaign of the Year',
      desc: 'Mage Hondama Chef Mage Amma, for Astra Spread.',
    },
  ],
};

// Dragons of Sri Lanka 2025
const dragons2025: Showcase = {
  id: 'dragons-2025',
  event: 'Dragons of Sri Lanka Awards 2025',
  heading: 'Astra Rasa Mathaka',
  subheading: 'Tasteful Memories with Astra',
  intro:
    'The nostalgia-led Astra campaign earned a Black Dragon for Integrated Marketing, entered by The Insight Hive Sri Lanka for Flora Food Group Sri Lanka.',
  image: imgDragon2025,
  imageAlt: 'Dragons of Sri Lanka 2025 — Black Dragon certificate for Integrated Marketing',
  entries: [
    { badge: 'Black Dragon', color: BLACK_DRAGON, title: 'Integrated Marketing' },
  ],
};

// All showcases use the same layout as "Three trophies, one night".
// Only the image side changes via `reverse`.
function AwardShowcase({
  group,
  onOpen,
}: {
  group: Showcase;
  onOpen: (item: LightboxItem) => void;
}) {
  const title = group.subheading ? `${group.heading} (${group.subheading})` : group.heading;
  const fixedFrame = Boolean(group.imageRatio);
  return (
    <div
      className="mt-20 pt-16"
      style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-center">
        {/* Image */}
        <button
          type="button"
          onClick={() => group.image && onOpen({ image: group.image, event: group.event, title })}
          aria-label={`View ${group.event} — ${title}`}
          className={`group lg:col-span-3 rounded-2xl overflow-hidden block w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E8722E] transition-all duration-300 shadow-[0_12px_32px_rgba(0,0,0,0.35)] hover:shadow-[0_18px_40px_rgba(0,0,0,0.45)] ${group.reverse ? 'lg:order-2' : ''}`}
          style={{
            background: '#1A1A1A',
            border: '1px solid rgba(255,255,255,0.1)',
            ...(fixedFrame ? { aspectRatio: group.imageRatio } : {}),
          }}
        >
          {group.image ? (
            <img
              src={group.image}
              alt={group.imageAlt}
              loading="lazy"
              className={`w-full block transition-transform duration-700 ease-out group-hover:scale-[1.02] ${fixedFrame ? 'h-full object-cover object-center' : 'h-auto'}`}
            />
          ) : (
            <span className="flex items-center justify-center h-64 text-xs" style={{ color: '#9A9A9A' }}>
              Image not found in src/assets/awards
            </span>
          )}
        </button>

        {/* Text */}
        <div className={`lg:col-span-2 ${group.reverse ? 'lg:order-1' : ''}`}>
          <p className="text-sm font-semibold mb-3" style={{ color: '#E8722E' }}>{group.event}</p>
          <h3 className="font-extrabold leading-tight mb-2" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', color: '#F2F2F2' }}>
            {group.heading}
          </h3>
          {group.subheading && (
            <p className={`font-light text-lg ${group.compact ? 'mb-3' : 'mb-4'}`} style={{ color: '#D0D0D0' }}>{group.subheading}</p>
          )}
          <p className={`leading-relaxed ${group.compact ? 'mb-6' : 'mb-8'}`} style={{ color: '#9A9A9A' }}>{group.intro}</p>

          <ul className="flex flex-col">
            {group.entries.map((e, i) => (
              <li
                key={i}
                className={`flex flex-col gap-2 ${group.compact ? 'py-3' : 'py-4'}`}
                style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}
              >
                <div className="flex items-center gap-3 flex-wrap">
                  <span
                    className="px-3 py-1 rounded-full text-xs font-bold"
                    style={{ background: e.color, color: e.text ?? '#fff', border: '1px solid rgba(255,255,255,0.18)' }}
                  >
                    {e.badge}
                  </span>
                  <span className="font-bold text-base" style={{ color: '#F2F2F2' }}>{e.title}</span>
                </div>
                {e.desc && <p className="text-sm leading-relaxed" style={{ color: '#9A9A9A' }}>{e.desc}</p>}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

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
  const [lineVisible, setLineVisible] = useState(false);
  const [activeAward, setActiveAward] = useState<LightboxItem | null>(null);
  const caseRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = caseRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setLineVisible(true); obs.disconnect(); } }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Lightbox: close on Esc + lock page scroll while open
  useEffect(() => {
    if (!activeAward) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setActiveAward(null); };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [activeAward]);

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
          {/* 2 cols on mobile, 3 on tablet, 4 on desktop → 12 clients = 3 even rows of 4 */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {clients.map((c, i) => (
              <div
                key={i}
                className="group relative overflow-hidden p-6 pb-7 rounded-2xl flex flex-col items-center text-center cursor-pointer bg-white transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-[0_18px_40px_rgba(122,46,140,0.18)]"
                style={{ border: '1px solid rgba(26,26,26,0.07)' }}
              >
                {/* Logo */}
                <div
                  className="w-full flex items-center justify-center mb-5"
                  style={{ height: '170px', padding: '4px' }}
                >
                  <img
                    src={c.logo}
                    alt={c.name}
                    className="max-h-full max-w-full transition-transform duration-500 ease-out group-hover:scale-105"
                    style={{ objectFit: 'contain' }}
                  />
                </div>

                <h3 className="font-bold text-lg mb-1" style={{ color: '#1A1A1A' }}>{c.name}</h3>
                <p className="text-xs" style={{ color: '#9A9A9A' }}>{c.discipline}</p>

                {/* Brand gradient line that slides in on hover */}
                <span
                  className="absolute bottom-0 left-0 h-1 w-0 group-hover:w-full transition-all duration-500 ease-out"
                  style={{ background: 'linear-gradient(90deg, #7A2E8C, #C2436B, #E8722E)' }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Awards */}
      <section className="py-24" style={{ background: '#262626' }}>
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="font-extrabold mb-6" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#F2F2F2' }}>
            <span className="font-light">Awards &</span> Milestones
          </h2>
          <p className="max-w-2xl mb-16 leading-relaxed text-lg" style={{ color: '#9A9A9A' }}>
            Recognised for creativity, digital excellence and integrated marketing, built with the brands that trust us.
          </p>

          {/* Headline milestones */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4">
            {awards.map((a, i) => (
              <div key={i} className="p-8 rounded-2xl relative overflow-hidden group" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
                <div className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl" style={{ background: a.color }} />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div className="absolute top-0 left-[-100%] w-full h-full skew-x-12" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.04), transparent)', animation: 'shine 1.5s ease infinite' }} />
                </div>
                <h3 className="font-extrabold text-lg leading-snug mb-3" style={{ color: '#F2F2F2' }}>{a.title}</h3>
                <p className="text-base font-semibold" style={{ color: a.color === '#7A2E8C' ? '#B266C7' : a.color }}>{a.sub}</p>
              </div>
            ))}
          </div>

          {/* Dragons of Sri Lanka 2026 */}
          <AwardShowcase group={dragons2026} onOpen={setActiveAward} />

          {/* SLIM DIGIS 2026 */}
          <div className="mt-20 pt-16" style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
            <p className="text-sm font-semibold mb-3" style={{ color: '#E8722E' }}>SLIM DIGIS 2026</p>
            <h3 className="font-extrabold mb-4" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', color: '#F2F2F2' }}>
              <span className="font-light">Three wins for</span> Food &amp; Beverage
            </h3>
            <p className="max-w-2xl mb-10 leading-relaxed" style={{ color: '#9A9A9A' }}>
              Two Merit awards and a Bronze from the Sri Lanka Institute of Marketing’s digital awards.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {slimCards.map((c) => (
                <div
                  key={c.id}
                  className="group rounded-2xl overflow-hidden flex flex-col relative transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-[0_18px_40px_rgba(0,0,0,0.45)]"
                  style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
                >
                  <button
                    type="button"
                    onClick={() => c.image && setActiveAward({ image: c.image, event: `SLIM DIGIS 2026 · ${c.badge}`, title: c.campaign ?? c.category, caption: c.category })}
                    aria-label={`View ${c.badge} award — ${c.campaign ?? c.category}`}
                    className="relative block w-full overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E8722E]"
                    style={{ aspectRatio: '5 / 4', background: '#1A1A1A' }}
                  >
                    {c.image ? (
                      <img src={c.image} alt={`SLIM DIGIS 2026 ${c.badge} — ${c.campaign ?? c.category}`} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" />
                    ) : (
                      <span className="w-full h-full flex items-center justify-center text-xs" style={{ color: '#9A9A9A' }}>Image not found in src/assets/awards</span>
                    )}
                    <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold text-white" style={{ background: c.color, boxShadow: '0 4px 14px rgba(0,0,0,0.35)' }}>
                      {c.badge}
                    </span>
                  </button>
                  <div className="p-6 flex flex-col gap-2 flex-1">
                    <p className="text-xs font-semibold" style={{ color: '#E8722E' }}>{c.category}</p>
                    {c.campaign && <h4 className="font-extrabold text-base leading-snug" style={{ color: '#F2F2F2' }}>{c.campaign}</h4>}
                    <p className="text-sm leading-relaxed" style={{ color: '#9A9A9A' }}>{c.desc}</p>
                  </div>
                  <span className="absolute bottom-0 left-0 h-1 w-0 group-hover:w-full transition-all duration-500 ease-out" style={{ background: 'linear-gradient(90deg, #7A2E8C, #C2436B, #E8722E)' }} />
                </div>
              ))}
            </div>
          </div>

          {/* Sri Lanka Leadership Awards 2026 */}
          <AwardShowcase group={leadership2026} onOpen={setActiveAward} />

          {/* Dragons of Sri Lanka 2025 */}
          <AwardShowcase group={dragons2025} onOpen={setActiveAward} />
        </div>
      </section>

      {/* Award lightbox */}
      {activeAward && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${activeAward.event} — ${activeAward.title}`}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10"
          style={{ background: 'rgba(10,10,10,0.88)', backdropFilter: 'blur(6px)' }}
          onClick={() => setActiveAward(null)}
        >
          <div
            className="relative max-w-5xl w-full max-h-full flex flex-col rounded-2xl overflow-hidden"
            style={{ background: '#1A1A1A', border: '1px solid rgba(255,255,255,0.12)' }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setActiveAward(null)}
              aria-label="Close"
              className="absolute top-3 right-3 z-10 w-10 h-10 rounded-full flex items-center justify-center text-xl font-bold hover:opacity-80 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E8722E]"
              style={{ background: 'rgba(26,26,26,0.8)', color: '#F2F2F2' }}
            >
              ×
            </button>
            <div className="flex-1 min-h-0 flex items-center justify-center" style={{ background: '#111' }}>
              <img src={activeAward.image} alt={`${activeAward.event} — ${activeAward.title}`} className="max-w-full object-contain" style={{ maxHeight: '70vh' }} />
            </div>
            <div className="p-6">
              <p className="text-xs font-semibold mb-1" style={{ color: '#E8722E' }}>{activeAward.event}</p>
              <h4 className="font-extrabold text-lg mb-1" style={{ color: '#F2F2F2' }}>{activeAward.title}</h4>
              {activeAward.caption && <p className="text-xs" style={{ color: '#9A9A9A' }}>{activeAward.caption}</p>}
            </div>
          </div>
        </div>
      )}

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
              {/* <div className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl cursor-pointer hover:opacity-80 transition-opacity" style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.15)' }}>
                <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #7A2E8C, #C2436B, #E8722E)' }}>
                  <Icon name="play" size={18} className="text-white" />
                </div>
                <span className="font-semibold" style={{ color: '#F2F2F2' }}>Watch the Rasa Mathaka Journey 2025</span>
              </div> */}
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