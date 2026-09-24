import { NavLink } from 'react-router';
import { useEffect, useRef, useState } from 'react';
import { useInView } from '../components/useInView';
import { useCountUp } from '../components/useCountUp';
import Icon from '../components/Icon';

// "Get Ready to Shine" campaign creative (taken from The Insight Hive Cred Deck)
import kiwiCreative from '../assets/ourwork/img07.jpg';

const KIWI_RED = '#E10A17';
const KIWI_RED_DEEP = '#B80812';
const KIWI_RED_BRIGHT = '#FF3B44'; // readable on dark backgrounds
const KIWI_GOLD = '#F5C518';
const INK = '#1A1A1A';
const MUTED = '#9A9A9A';

function useStaggerReveal() {
    const [visible, setVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const obs = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                    obs.disconnect();
                }
            },
            { threshold: 0.15 }
        );
        obs.observe(el);
        return () => obs.disconnect();
    }, []);
    return { ref, visible };
}

function BackArrow() {
    return (
        <span style={{ display: 'inline-block', transform: 'rotate(180deg)' }}>
            <Icon name="arrow-right" size={14} />
        </span>
    );
}

function StatBlock({
    number,
    decimals = 0,
    suffix,
    label,
    started,
}: {
    number: number;
    decimals?: number;
    suffix?: string;
    label: string;
    started: boolean;
}) {
    const count = useCountUp(number, 2000, started);
    const display = decimals > 0 ? count.toFixed(decimals) : Math.round(count).toLocaleString();
    return (
        <div className="rounded-2xl p-6" style={{ background: '#fff', border: '1px solid rgba(26,26,26,0.08)' }}>
            <div className="text-5xl font-extrabold mb-2" style={{ color: KIWI_RED }}>
                {display}
                {suffix}
            </div>
            <p className="text-sm leading-relaxed" style={{ color: MUTED }}>{label}</p>
        </div>
    );
}

const challengePoints: string[] = [
    'Reconnect with loyal customers',
    'Attract a new generation',
    'Compete in a crowded market',
    'Adapt to changing consumer habits',
    'Get consumers to the concept of \u201CGet Ready to Shine\u201D',
];

const ideaSteps: { title: string; label: string; desc: string }[] = [
    {
        title: 'Kids\u2019 TV Shows',
        label: '01',
        desc: 'Sponsored popular local shows like \u201CDerana Little Star\u201D and \u201CVoice Kids Sri Lanka,\u201D creating special moments where children got ready to shine before their performances.',
    },
    {
        title: 'Morning TV',
        label: '02',
        desc: 'Partnered with morning TV shows to make \u201CGet Ready to Shine\u201D relatable to any consumer in their day-to-day life.',
    },
    {
        title: 'Sinhala & Hindu New Year',
        label: '03',
        desc: 'Focused on the Sinhala and Hindu New Year to make the campaign culturally relevant and impactful.',
    },
    {
        title: 'ICC Cricket World Cup 2023',
        label: '04',
        desc: 'Tapped into the wide viewership and excitement of the tournament, and built frequency.',
    },
];

const resultHighlights: string[] = [
    'Reignited brand awareness',
    'Connected with core audiences after a gap of several years',
    'Re-established distribution channels on the ground',
    'Improved the dominance of the KIWI brand in the mind of consumers',
];

export default function CaseStudyKiwi() {
    const { ref: statsRef, inView: statsInView } = useInView(0.2);
    const { ref: challengeRef, visible: challengeVisible } = useStaggerReveal();
    const { ref: ideaRef, visible: ideaVisible } = useStaggerReveal();
    const { ref: resultRef, visible: resultVisible } = useStaggerReveal();

    return (
        <>
            {/* Hero */}
            <section className="relative overflow-hidden" style={{ background: INK }}>
                <div
                    className="absolute inset-0"
                    style={{ background: `radial-gradient(circle at 15% 20%, ${KIWI_RED}33, transparent 55%)` }}
                />
                <div className="relative z-10 max-w-7xl mx-auto px-6 pt-16 pb-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <div
                            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold mb-6 tracking-widest"
                            style={{ background: KIWI_RED, color: '#fff' }}
                        >
                            INTEGRATED CAMPAIGN
                        </div>
                        <h1 className="font-extrabold leading-tight mb-6" style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', color: '#F2F2F2' }}>
                            KIWI Shoe Polish — <span style={{ color: KIWI_RED_BRIGHT }}>Get Ready to Shine</span>
                        </h1>
                        <p className="text-lg md:text-xl max-w-xl mb-10 leading-relaxed" style={{ color: '#C9C9C9' }}>
                            Re-establishing KIWI in Sri Lanka after a two-year hiatus, by helping the whole country get ready to shine.
                        </p>
                        <div className="flex flex-wrap gap-3">
                            {['Creative Campaign', 'Integrated Media', 'TV Sponsorships', 'Digital Engagement'].map((t) => (
                                <span key={t} className="px-4 py-2 rounded-full text-sm font-semibold" style={{ background: 'rgba(255,255,255,0.08)', color: '#F2F2F2', border: '1px solid rgba(255,255,255,0.12)' }}>
                                    {t}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="rounded-2xl overflow-hidden mx-auto w-full max-w-md lg:max-w-none lg:justify-self-end" style={{ background: '#fff', boxShadow: '0 30px 80px rgba(0,0,0,0.45)' }}>
                        <img
                            src={kiwiCreative}
                            alt="KIWI Shoe Polish — Get Ready to Shine campaign creative with brown leather shoes and a KIWI polish tin"
                            className="w-full h-auto block"
                        />
                    </div>
                </div>
            </section>

            {/* Quick stat strip — The Impact */}
            <section ref={statsRef} className="py-16" style={{ background: '#fff', borderBottom: '1px solid rgba(26,26,26,0.06)' }}>
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        <StatBlock number={4} suffix="M" label="Households reached through TV" started={statsInView} />
                        <StatBlock number={3.2} decimals={1} suffix="M" label="People connected with online" started={statsInView} />
                        <StatBlock number={21.37} decimals={2} suffix="M" label="Impressions generated" started={statsInView} />
                        <StatBlock number={7900} label="New page likes in just one month" started={statsInView} />
                    </div>
                    <p className="text-center mt-10 max-w-2xl mx-auto leading-relaxed" style={{ color: MUTED }}>
                        By integrating KIWI into big events and daily life, we successfully revived the brand.
                    </p>
                </div>
            </section>

            {/* The Challenge */}
            <section className="py-24" style={{ background: '#EFEFEF' }}>
                <div className="max-w-7xl mx-auto px-6">
                    <div className="mb-16 max-w-2xl">
                        <span className="text-xs font-bold tracking-widest" style={{ color: KIWI_RED }}>THE CHALLENGE</span>
                        <h2 className="font-extrabold mt-3 mb-4" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: INK }}>
                            A brand that had been away for two years
                        </h2>
                        <p className="leading-relaxed" style={{ color: MUTED }}>
                            KIWI Shoe Polish needed to re-establish itself in Sri Lanka after a two-year hiatus caused by COVID-19 disruptions. The challenge was to:
                        </p>
                    </div>

                    <div ref={challengeRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                        {challengePoints.map((p, i) => (
                            <div
                                key={p}
                                className="rounded-2xl p-6 relative overflow-hidden"
                                style={{
                                    background: '#fff',
                                    border: '1px solid rgba(26,26,26,0.08)',
                                    opacity: challengeVisible ? 1 : 0,
                                    transform: challengeVisible ? 'translateY(0)' : 'translateY(24px)',
                                    transition: `opacity 0.6s ease ${i * 110}ms, transform 0.6s ease ${i * 110}ms`,
                                }}
                            >
                                <div className="absolute top-0 left-0 right-0 h-1" style={{ background: i === challengePoints.length - 1 ? KIWI_GOLD : KIWI_RED }} />
                                <p className="font-bold leading-snug pt-2" style={{ color: INK }}>{p}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* The Idea */}
            <section className="py-24" style={{ background: '#262626' }}>
                <div className="max-w-7xl mx-auto px-6">
                    <div className="mb-16 text-center">
                        <span className="text-xs font-bold tracking-widest" style={{ color: KIWI_RED_BRIGHT }}>THE IDEA</span>
                        <h2 className="font-extrabold mt-3 mb-4" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#F2F2F2' }}>
                            Get Ready to Shine
                        </h2>
                        <p className="max-w-2xl mx-auto leading-relaxed" style={{ color: '#9A9A9A' }}>
                            To meet this challenge, we launched the &ldquo;Get Ready to Shine&rdquo; creative campaign, and made it relatable to any consumer through the shows, moments and events they already watch.
                        </p>
                    </div>

                    <div ref={ideaRef} className="relative">
                        <div
                            className="hidden lg:block absolute top-7 left-0 right-0 h-0.5"
                            style={{
                                background: `linear-gradient(90deg, ${KIWI_RED}, ${KIWI_GOLD})`,
                                transform: ideaVisible ? 'scaleX(1)' : 'scaleX(0)',
                                transformOrigin: 'left',
                                transition: 'transform 1.1s ease',
                            }}
                        />
                        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                            {ideaSteps.map((s, i) => (
                                <div
                                    key={s.title}
                                    className="relative"
                                    style={{
                                        opacity: ideaVisible ? 1 : 0,
                                        transform: ideaVisible ? 'translateY(0)' : 'translateY(24px)',
                                        transition: `opacity 0.6s ease ${i * 150}ms, transform 0.6s ease ${i * 150}ms`,
                                    }}
                                >
                                    <div
                                        className="w-14 h-14 rounded-full flex items-center justify-center font-extrabold text-lg mb-5 relative z-10"
                                        style={{ background: KIWI_RED, color: '#fff' }}
                                    >
                                        {s.label}
                                    </div>
                                    <h3 className="font-bold text-xl mb-2" style={{ color: '#F2F2F2' }}>{s.title}</h3>
                                    <p className="text-sm leading-relaxed" style={{ color: '#9A9A9A' }}>{s.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* The Result */}
            <section className="py-24" style={{ background: '#EFEFEF' }}>
                <div className="max-w-7xl mx-auto px-6">
                    <div className="mb-12 max-w-2xl">
                        <span className="text-xs font-bold tracking-widest" style={{ color: KIWI_RED }}>THE RESULT</span>
                        <h2 className="font-extrabold mt-3" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: INK }}>
                            In the client&rsquo;s words
                        </h2>
                    </div>

                    <div
                        ref={resultRef}
                        className="rounded-3xl p-10 md:p-16 relative overflow-hidden"
                        style={{
                            background: `linear-gradient(135deg, ${KIWI_RED_DEEP}, ${KIWI_RED})`,
                            opacity: resultVisible ? 1 : 0,
                            transform: resultVisible ? 'translateY(0)' : 'translateY(24px)',
                            transition: 'opacity 0.7s ease, transform 0.7s ease',
                        }}
                    >
                        <div className="absolute -top-6 left-6 md:left-10 font-extrabold leading-none select-none pointer-events-none" style={{ fontSize: 200, color: '#fff', opacity: 0.12 }} aria-hidden="true">
                            &ldquo;
                        </div>
                        <blockquote className="relative z-10 max-w-3xl">
                            <p className="font-bold leading-snug mb-8" style={{ fontSize: 'clamp(1.25rem, 2.4vw, 1.9rem)', color: '#fff' }}>
                                According to the client, the campaign reignited brand awareness and connected with core audiences after a gap of several years of action. It also helped to reestablish the distribution channels on the ground and improved the dominance of the KIWI brand in the mind of consumers.
                            </p>
                            <footer className="text-sm font-semibold" style={{ color: '#fff', opacity: 0.9 }}>
                                Sinclair Cruse, Brillon Consumer Products, Sri Lanka
                            </footer>
                        </blockquote>
                    </div>

                    <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {resultHighlights.map((h, i) => (
                            <div
                                key={h}
                                className="rounded-2xl p-6"
                                style={{
                                    background: '#fff',
                                    border: '1px solid rgba(26,26,26,0.08)',
                                    opacity: resultVisible ? 1 : 0,
                                    transform: resultVisible ? 'translateY(0)' : 'translateY(24px)',
                                    transition: `opacity 0.6s ease ${300 + i * 120}ms, transform 0.6s ease ${300 + i * 120}ms`,
                                }}
                            >
                                <div className="w-8 h-1 rounded-full mb-4" style={{ background: KIWI_RED }} />
                                <p className="font-bold leading-snug" style={{ color: INK }}>{h}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Closing CTA + case study nav */}
            <section className="pb-20" style={{ background: '#EFEFEF' }}>
                <div className="max-w-7xl mx-auto px-6">
                    <div className="rounded-3xl p-12 md:p-16 text-center mb-10" style={{ background: INK }}>
                        <h2 className="font-extrabold mb-4" style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', color: '#F2F2F2' }}>
                            Ready to help your brand get ready to shine?
                        </h2>
                        <p className="mb-8 max-w-xl mx-auto" style={{ color: '#C9C9C9' }}>
                            Let's talk about what an integrated campaign like this could look like for you.
                        </p>
                        <NavLink to="/contact" className="inline-block font-bold px-10 py-4 rounded-full text-base transition-all hover:shadow-2xl hover:-translate-y-1" style={{ background: KIWI_RED, color: '#fff' }}>
                            Let's Talk
                        </NavLink>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                        <NavLink to="/our-work" className="inline-flex items-center gap-2 text-sm font-semibold hover:opacity-70 transition-opacity" style={{ color: INK }}>
                            <BackArrow /> Back to Our Work
                        </NavLink>
                        <NavLink to="/astra-rasa-mathaka" className="inline-flex items-center gap-2 text-sm font-semibold hover:opacity-70 transition-opacity" style={{ color: INK }}>
                            Next: Astra — Rasa Mathaka <Icon name="arrow-right" size={14} />
                        </NavLink>
                    </div>
                </div>
            </section>
        </>
    );
}