import { useEffect, useRef, useState } from 'react';
import HexIcon from '../components/HexIcon';
import { NavLink } from 'react-router';
import Icon, { type IconName } from '../components/Icon';

const services = [
  {
    icon: 'strategy' as IconName,
    title: 'Brand Strategy & Consumer Insight',
    desc: 'Deep consumer understanding drives bold brand decisions. We blend qualitative intuition with quantitative rigour to uncover what your audience truly needs.',
    tags: ['Brand Positioning', 'Consumer Research', 'Market Intelligence', 'Persona Development'],
    img: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=600&h=400&fit=crop&auto=format',
  },
  {
    icon: 'creative' as IconName,
    title: 'Creative & Content',
    desc: 'Storytelling that earns attention. From campaign concepts to content ecosystems, we create work that moves people and builds brands.',
    tags: ['Campaign Concepts', 'Content Creation', 'Video Production', 'Copy & Design'],
    img: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600&h=400&fit=crop&auto=format',
  },
  {
    icon: 'media' as IconName,
    title: 'Integrated Media Planning & Implementation',
    desc: 'Precision media strategies that connect the right message to the right audience at the right moment — across every channel.',
    tags: ['Media Planning', 'Media Buying', 'Channel Optimisation', 'Cross-Platform'],
    img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop&auto=format',
  },
  {
    icon: 'chart' as IconName,
    title: 'Digital Strategy & Performance',
    desc: 'Full-funnel digital execution. From awareness to conversion, we architect digital ecosystems that grow and perform.',
    tags: ['SEO/SEM', 'Programmatic', 'Paid Social', 'Performance Analytics'],
    img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop&auto=format',
  },
  {
    icon: 'message' as IconName,
    title: 'Social Content Management',
    desc: 'Always-on social presence that builds community and drives engagement. We manage the conversation so you can focus on the business.',
    tags: ['Community Management', 'Content Calendar', 'Influencer Partnerships', 'Social Analytics'],
    img: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=600&h=400&fit=crop&auto=format',
  },
  {
    icon: 'chart' as IconName,
    title: 'Data & Measurement',
    desc: 'Marketing intelligence that turns data into decisions. Every campaign is tracked, measured, and optimised against real business outcomes.',
    tags: ['Attribution Modelling', 'Dashboard Reporting', 'ROMI Analysis', 'Audience Insights'],
    img: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=600&h=400&fit=crop&auto=format',
  },
];

const differentiators = [
  { icon: 'bolt' as IconName, title: 'Agile, modular media approach', desc: 'Flexible frameworks that adapt and scale quickly — we move at the speed of your business.' },
  { icon: 'globe' as IconName, title: 'Global network-supported proprietary tools', desc: 'Advanced in-house technology, backed by Omnicom\'s global resources for smarter execution.' },
  { icon: 'users' as IconName, title: 'Multi-discipline media experts', desc: 'Specialists across media, data, strategy and tech working as one integrated team.' },
  { icon: 'trophy' as IconName, title: 'Proven success in high-stakes campaigns', desc: 'Strong track record in complex, high-impact work — including pitching and winning against global networks.' },
];

const techCapabilities = ['End-to-End Integration', 'Real-Time Optimization', 'AI-Driven Personalization', 'Unified Data & Technology Resources', 'Strategic Partnerships'];

export default function WhatWeDo() {
  const [visibleDiff, setVisibleDiff] = useState(false);
  const [techVisible, setTechVisible] = useState(false);
  const diffRef = useRef<HTMLDivElement>(null);
  const techRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = (el: HTMLDivElement | null, setter: (v: boolean) => void) => {
      if (!el) return;
      const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setter(true); o.disconnect(); } }, { threshold: 0.2 });
      o.observe(el);
      return () => o.disconnect();
    };
    obs(diffRef.current, setVisibleDiff);
    obs(techRef.current, setTechVisible);
  }, []);

  return (
    <>
      {/* Header */}
      <section className="py-24" style={{ background: 'linear-gradient(135deg, #262626 0%, #1A1A1A 100%)' }}>
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="font-extrabold mb-6 leading-tight" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', color: '#F2F2F2' }}>
            <span className="font-light">Everything</span> Under<br />One Roof
          </h1>
          <p className="text-xl max-w-2xl leading-relaxed" style={{ color: '#9A9A9A' }}>
            Six disciplines. One team. No silos. We connect every marketing function to deliver campaigns that are seamless, measurable, and built to perform.
          </p>
        </div>
      </section>

      {/* Services */}
      <section className="py-24" style={{ background: '#EFEFEF' }}>
        <div className="max-w-7xl mx-auto px-6 flex flex-col gap-24">
          {services.map((s, i) => (
            <div key={i} className={`flex flex-col ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-12 items-center`}>
              <div className="flex-1">
                <HexIcon size={56}><Icon name={s.icon} /></HexIcon>
                <h2 className="font-extrabold mt-6 mb-4" style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', color: '#1A1A1A' }}>{s.title}</h2>
                <p className="leading-relaxed mb-6" style={{ color: '#9A9A9A' }}>{s.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {s.tags.map(tag => (
                    <span key={tag} className="px-3 py-1.5 rounded-full text-xs font-semibold" style={{ background: 'rgba(122,46,140,0.1)', color: '#7A2E8C' }}>{tag}</span>
                  ))}
                </div>
              </div>
              <div className="flex-1 rounded-2xl overflow-hidden">
                <img src={s.img} alt={s.title} className="w-full h-64 object-cover" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Differentiators */}
      <section className="py-24" style={{ background: '#fff' }}>
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="font-extrabold mb-4" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#1A1A1A' }}>
            <span className="font-light">What Makes</span> Us Different
          </h2>
          <p style={{ color: '#9A9A9A' }} className="mb-16 max-w-xl">Four structural advantages that set us apart from traditional agencies.</p>
          <div ref={diffRef} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {differentiators.map((d, i) => (
              <div
                key={i}
                className="p-8 rounded-2xl transition-all duration-700"
                style={{
                  background: '#EFEFEF',
                  border: '1px solid rgba(26,26,26,0.07)',
                  opacity: visibleDiff ? 1 : 0,
                  transform: visibleDiff ? 'translateY(0)' : 'translateY(32px)',
                  transitionDelay: `${i * 120}ms`,
                }}
              >
                <HexIcon size={48}><Icon name={d.icon} /></HexIcon>
                <h3 className="font-bold text-lg mt-5 mb-3" style={{ color: '#1A1A1A' }}>{d.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: '#9A9A9A' }}>{d.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech stack */}
      <section className="py-24" style={{ background: '#262626' }}>
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="font-extrabold mb-4" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#F2F2F2' }}>
            <span className="font-light">Global Technology</span> & Partnerships
          </h2>
          <p style={{ color: '#9A9A9A' }} className="mb-16 max-w-xl">Backed by the world's most advanced marketing technology platforms.</p>
          <div ref={techRef} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                name: 'IPG Mediabrands — Interact',
                desc: 'An all-in-one marketing platform launched late 2024, built by KINESSO and powered by Acxiom\'s audience data — unifying data, media, creative and production.',
                caps: techCapabilities,
              },
              {
                name: 'KINESSO',
                desc: 'The technology-driven performance marketing engine behind IPG Mediabrands, operating in 60+ countries with 6,000+ professionals.',
                caps: ['60+ Countries', '6,000+ Professionals', 'Performance Marketing', 'Data Intelligence', 'Audience Science'],
              },
            ].map((t, i) => (
              <div key={i} className="p-8 rounded-2xl" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
                <h3 className="font-extrabold text-xl mb-4" style={{ color: '#F2F2F2' }}>{t.name}</h3>
                <p className="text-sm leading-relaxed mb-6" style={{ color: '#9A9A9A' }}>{t.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {t.caps.map((cap, ci) => (
                    <span
                      key={cap}
                      className="px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-500"
                      style={{
                        background: 'linear-gradient(135deg, #7A2E8C, #C2436B, #E8722E)',
                        color: '#fff',
                        opacity: techVisible ? 1 : 0,
                        transform: techVisible ? 'scale(1)' : 'scale(0.8)',
                        transitionDelay: `${(i * 300) + ci * 100}ms`,
                      }}
                    >
                      {cap}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Big picture */}
      <section className="py-32 text-center" style={{ background: 'linear-gradient(135deg, #7A2E8C, #C2436B, #E8722E)' }}>
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="font-extrabold leading-tight mb-6" style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', color: '#fff' }}>
            Built for the speed of Asia.
          </h2>
          <p className="text-xl opacity-90 mb-10 max-w-2xl mx-auto" style={{ color: '#fff' }}>
            Future-ready. Agile & scalable. Performance culture. Cross-border capability. This is The Insight Hive.
          </p>
          <NavLink to="/contact" className="inline-block bg-white font-bold px-10 py-4 rounded-full text-base transition-all hover:shadow-2xl hover:-translate-y-1" style={{ color: '#7A2E8C' }}>
            Let's Build Together
          </NavLink>
        </div>
      </section>
    </>
  );
}
