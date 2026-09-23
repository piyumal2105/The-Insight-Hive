import { NavLink } from 'react-router';
import { useEffect, useRef, useState } from 'react';
import { useInView } from '../components/useInView';
import { useCountUp } from '../components/useCountUp';
import Icon from '../components/Icon';


import leadershipAwardsImg from '../assets/awards/sri-lanka-leadership-awards-2026.jpg';
import dragonsAwardImg from '../assets/awards/dragons-of-sri-lanka-2026.jpg';

const ASTRA_YELLOW = '#FADE4E';
const ASTRA_YELLOW_DEEP = '#F0B90B';
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

function ResultNumber({ n, suffix, started }: { n: number; suffix: string; started: boolean }) {
    const count = useCountUp(n, 2000, started);
    const display = Number.isInteger(n) ? Math.round(count).toLocaleString() : count.toFixed(1);
    return (
        <div className="text-3xl font-extrabold" style={{ color: '#F7941F' }}>
            {display}{suffix}
        </div>
    );
}

function StatBlock({ number, suffix, label, started }: { number: number; suffix?: string; label: string; started: boolean }) {
    const count = useCountUp(number, 2000, started);
    return (
        <div className="rounded-2xl p-6" style={{ background: '#fff', border: '1px solid rgba(26,26,26,0.08)' }}>
            <div className="text-5xl font-extrabold mb-2" style={{ color: INK }}>
                {count.toLocaleString()}{suffix}
            </div>
            <p className="text-sm leading-relaxed" style={{ color: MUTED }}>{label}</p>
        </div>
    );
}

function EventDayNumber({ target, label, started }: { target: number; label: string; started: boolean }) {
    const count = useCountUp(target, 1800, started);
    return (
        <div>
            <div className="text-4xl font-extrabold" style={{ color: INK }}>
                {count.toFixed(1)}M
            </div>
            <p className="text-sm font-semibold mt-1" style={{ color: INK, opacity: 0.75 }}>{label}</p>
        </div>
    );
}

const frameworkSteps: { title: string; label: string; desc: string }[] = [
    {
        title: 'Objective',
        label: '01',
        desc: "Reconnect consumers with Astra's 50+ years of nostalgic \u201CRasa Mathaka\u201D heritage \u2014 the taste memories woven into generations of Sri Lankan households.",
    },
    {
        title: 'Heritage',
        label: '02',
        desc: 'Revived the nostalgic memories tied to the brand itself, grounding the campaign in five decades of shared history rather than a fleeting trend.',
    },
    {
        title: 'Engagement',
        label: '03',
        desc: 'Ran nationwide memory-collection initiatives, inviting people across the country to share and celebrate their own "Rasa Mathaka" stories.',
    },
    {
        title: 'Experience',
        label: '04',
        desc: 'Brought it all to life through immersive, live on-ground brand activations that let people relive those memories in person.',
    },
];

const resultStats: { n: number; s: string; l: string }[] = [
    { n: 8500, s: '+', l: 'Memory collections nationwide' },
    { n: 7000, s: '+', l: 'On-ground foot fall' },
    { n: 83, s: 'M', l: 'Media value generated' },
    { n: 11, s: 'M', l: 'Total campaign reach' },
    { n: 993, s: '%', l: 'ROMI (Return on Media Investment)' },
    { n: 588, s: '', l: 'Media exposures' },
    { n: 9215, s: ' sec', l: 'Total airtime secured' },
    { n: 2.5, s: 'M', l: 'Organic reach' },
    { n: 2.14, s: 'M', l: 'Paid reach' },
    { n: 18.9, s: '%', l: 'Volume share growth, Q1 2025' },
];

// Both real award banners, shown as full designed graphics (they already
// carry their own titles, categories and the Astra credit tag baked in).
const awardBanners: { img: string; alt: string; caption: string }[] = [
    {
        img: leadershipAwardsImg,
        alt: 'Sri Lanka Leadership Awards 2026 — three trophies for Marketing Campaign of the Year, Digital Rebrand of the Year, and Best Use of Social Media',
        caption: 'Sri Lanka Leadership Awards 2026 — three wins for the Astra Spread "My Best Chef, My Amma" campaign.',
    },
    {
        img: dragonsAwardImg,
        alt: 'Dragons of Sri Lanka 2026 — Black Dragon, Gold PMAS, Bronze PMAS, and Black Dragon awards',
        caption: 'Dragons of Sri Lanka 2026 — four wins for "Astra Amma, The First Chef You Ever Knew," Flora Food Group Sri Lanka.',
    },
];

// Gallery placeholder set — swap these for real on-ground activation /
// memory-collection photography from the Rasa Mathaka campaign.
const galleryImages: string[] = [
    'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=700&h=900&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=700&h=500&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1531956656799-c8ea3b8b3e5f?w=700&h=700&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1543007630-9710e4a00a20?w=700&h=900&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=700&h=500&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=700&h=700&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=700&h=900&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1556740738-b6a63e27c4df?w=700&h=500&fit=crop&auto=format',
];

function Lightbox({
    images,
    index,
    direction,
    onClose,
    onNav,
}: {
    images: string[];
    index: number;
    direction: 1 | -1;
    onClose: () => void;
    onNav: (dir: 1 | -1) => void;
}) {
    useEffect(() => {
        function onKey(e: KeyboardEvent) {
            if (e.key === 'Escape') onClose();
            if (e.key === 'ArrowRight') onNav(1);
            if (e.key === 'ArrowLeft') onNav(-1);
        }
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [onClose, onNav]);

    return (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 overflow-hidden"
            style={{ background: 'rgba(26,26,26,0.92)' }}
            onClick={onClose}
        >
            <button
                onClick={(e) => { e.stopPropagation(); onClose(); }}
                className="absolute top-6 right-6 text-white text-3xl leading-none opacity-80 hover:opacity-100 transition-opacity z-10"
                aria-label="Close"
            >
                &times;
            </button>
            <button
                onClick={(e) => { e.stopPropagation(); onNav(-1); }}
                className="absolute left-4 md:left-8 text-white text-3xl opacity-70 hover:opacity-100 transition-opacity p-2 z-10"
                aria-label="Previous"
            >
                &#8249;
            </button>

            {/* key={index} forces a remount so the slide-in animation replays every navigation */}
            <img
                key={index}
                src={images[index]}
                alt=""
                className="max-h-[85vh] max-w-[85vw] rounded-xl object-contain"
                onClick={(e) => e.stopPropagation()}
                style={{
                    boxShadow: '0 20px 80px rgba(0,0,0,0.5)',
                    animation: `${direction === 1 ? 'slideInFromRight' : 'slideInFromLeft'} 0.35s cubic-bezier(0.22, 1, 0.36, 1) both`,
                }}
            />

            <button
                onClick={(e) => { e.stopPropagation(); onNav(1); }}
                className="absolute right-4 md:right-8 text-white text-3xl opacity-70 hover:opacity-100 transition-opacity p-2 z-10"
                aria-label="Next"
            >
                &#8250;
            </button>

            <style>{`
        @keyframes slideInFromRight {
          from { opacity: 0; transform: translateX(60px) scale(0.98); }
          to { opacity: 1; transform: translateX(0) scale(1); }
        }
        @keyframes slideInFromLeft {
          from { opacity: 0; transform: translateX(-60px) scale(0.98); }
          to { opacity: 1; transform: translateX(0) scale(1); }
        }
      `}</style>
        </div>
    );
}

export default function CaseStudyAstra() {
    const { ref: statsRef, inView: statsInView } = useInView(0.2);
    const { ref: eventRef, inView: eventInView } = useInView(0.2);
    const { ref: frameworkRef, visible: frameworkVisible } = useStaggerReveal();
    const { ref: awardsRef, visible: awardsVisible } = useStaggerReveal();
    const { ref: galleryRef, visible: galleryVisible } = useStaggerReveal();
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
    const [lightboxDirection, setLightboxDirection] = useState<1 | -1>(1);

    function openLightbox(i: number) {
        setLightboxDirection(1);
        setLightboxIndex(i);
    }

    function closeLightbox() {
        setLightboxIndex(null);
    }

    function navLightbox(dir: 1 | -1) {
        setLightboxDirection(dir);
        setLightboxIndex((cur) => {
            if (cur === null) return cur;
            return (cur + dir + galleryImages.length) % galleryImages.length;
        });
    }

    return (
        <>
            {/* Hero */}
            <section className="relative overflow-hidden" style={{ background: '#1A1A1A' }}>
                <div
                    className="absolute inset-0"
                    style={{ background: `radial-gradient(circle at 15% 20%, ${ASTRA_YELLOW}22, transparent 55%)` }}
                />
                <div className="relative z-10 max-w-7xl mx-auto px-6 pt-12 pb-20">
                    <NavLink to="/our-work" className="inline-flex items-center gap-2 text-sm font-semibold mb-10 hover:opacity-80 transition-opacity" style={{ color: MUTED }}>
                        {/* <BackArrow /> Back to Our Work */}
                    </NavLink>

                    <div
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold mb-6 tracking-widest"
                        style={{ background: ASTRA_YELLOW, color: INK }}
                    >
                        FLAGSHIP CASE STUDY
                    </div>
                    <h1 className="font-extrabold leading-tight mb-6" style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', color: '#F2F2F2' }}>
                        Astra — <span style={{ color: ASTRA_YELLOW }}>Rasa Mathaka</span>
                    </h1>
                    <p className="text-lg md:text-xl max-w-2xl mb-10 leading-relaxed" style={{ color: '#C9C9C9' }}>
                        Reviving 50+ years of nostalgic taste memories — one story, one household, one moment at a time.
                    </p>
                    <div className="flex flex-wrap gap-3 mb-14">
                        {['Brand Strategy', 'Integrated Media', 'On-Ground Activation', 'Digital & Performance'].map((t) => (
                            <span key={t} className="px-4 py-2 rounded-full text-sm font-semibold" style={{ background: 'rgba(255,255,255,0.08)', color: '#F2F2F2', border: '1px solid rgba(255,255,255,0.12)' }}>
                                {t}
                            </span>
                        ))}
                    </div>

                    <div className="rounded-2xl overflow-hidden" style={{ boxShadow: '0 30px 80px rgba(0,0,0,0.4)' }}>
                        <img
                            src="https://images.unsplash.com/photo-1509440159596-0249088772ff?w=1600&h=700&fit=crop&auto=format"
                            alt="Astra Rasa Mathaka campaign"
                            className="w-full h-[320px] md:h-[440px] object-cover"
                        />
                    </div>
                </div>
            </section>

            {/* Quick stat strip */}
            <section ref={statsRef} className="py-16" style={{ background: '#fff', borderBottom: '1px solid rgba(26,26,26,0.06)' }}>
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6">
                    <StatBlock number={8500} suffix="+" label="Memory collections nationwide" started={statsInView} />
                    <StatBlock number={993} suffix="%" label="Return on media investment (ROMI)" started={statsInView} />
                    <StatBlock number={1} suffix="st" label="Ranked globally for digital engagement growth" started={statsInView} />
                    <StatBlock number={18.9} suffix="%" label="Volume share growth, Q1 2025" started={statsInView} />
                </div>
            </section>

            {/* The Framework */}
            <section className="py-24" style={{ background: '#EFEFEF' }}>
                <div className="max-w-7xl mx-auto px-6">
                    <div className="mb-16 max-w-2xl">
                        <span className="text-xs font-bold tracking-widest" style={{ color: ASTRA_YELLOW_DEEP }}>THE APPROACH</span>
                        <h2 className="font-extrabold mt-3 mb-4" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: INK }}>
                            A four-part framework
                        </h2>
                        <p style={{ color: MUTED }}>
                            Every "Rasa Mathaka" touchpoint was built on the same throughline — from why the campaign existed, to how people actually felt it in their own communities.
                        </p>
                    </div>

                    <div ref={frameworkRef} className="relative">
                        <div
                            className="hidden lg:block absolute top-16 left-0 right-0 h-0.5"
                            style={{
                                background: `linear-gradient(90deg, ${ASTRA_YELLOW_DEEP}, ${ASTRA_YELLOW})`,
                                transform: frameworkVisible ? 'scaleX(1)' : 'scaleX(0)',
                                transformOrigin: 'left',
                                transition: 'transform 1.1s ease',
                            }}
                        />
                        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                            {frameworkSteps.map((s, i) => (
                                <div
                                    key={s.title}
                                    className="relative"
                                    style={{
                                        opacity: frameworkVisible ? 1 : 0,
                                        transform: frameworkVisible ? 'translateY(0)' : 'translateY(24px)',
                                        transition: `opacity 0.6s ease ${i * 150}ms, transform 0.6s ease ${i * 150}ms`,
                                    }}
                                >
                                    <div
                                        className="w-14 h-14 rounded-full flex items-center justify-center font-extrabold text-lg mb-5 relative z-10"
                                        style={{ background: ASTRA_YELLOW, color: INK }}
                                    >
                                        {s.label}
                                    </div>
                                    <h3 className="font-bold text-xl mb-2" style={{ color: INK }}>{s.title}</h3>
                                    <p className="text-sm leading-relaxed" style={{ color: MUTED }}>{s.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Full results dashboard */}
            <section className="py-24" style={{ background: '#262626' }}>
                <div className="max-w-7xl mx-auto px-6">
                    <div className="mb-16 text-center">
                        <span className="text-xs font-bold tracking-widest" style={{ color: ASTRA_YELLOW }}>THE RESULTS</span>
                        <h2 className="font-extrabold mt-3 mb-4" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#F2F2F2' }}>
                            Evidence, not adjectives
                        </h2>
                        <p className="max-w-xl mx-auto" style={{ color: '#9A9A9A' }}>Every number below is a reported campaign result, not an estimate.</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {resultStats.map((s) => (
                            <div key={s.l} className="rounded-2xl p-6" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.09)' }}>
                                <ResultNumber n={s.n} suffix={s.s} started={statsInView} />
                                <p className="text-sm leading-relaxed mt-2" style={{ color: '#9A9A9A' }}>{s.l}</p>
                            </div>
                        ))}
                    </div>

                    {/* Event day spotlight */}
                    <div ref={eventRef} className="mt-12 rounded-2xl p-10 text-center" style={{ background: `linear-gradient(135deg, ${ASTRA_YELLOW_DEEP}, ${ASTRA_YELLOW})` }}>
                        <p className="text-xs font-bold tracking-widest mb-3" style={{ color: INK, opacity: 0.75 }}>ANNOUNCEMENT — EVENT DAY</p>
                        <div className="flex flex-col sm:flex-row justify-center gap-10">
                            <EventDayNumber target={1.7} label="Organic Views" started={eventInView} />
                            <EventDayNumber target={5.6} label="Paid Views" started={eventInView} />
                        </div>
                    </div>

                    {/* Video callout */}
                    <a href="#" className="group mt-12 relative block rounded-2xl overflow-hidden" style={{ height: 340 }}>
                        <img
                            src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1400&h=700&fit=crop&auto=format"
                            alt="Watch the Rasa Mathaka Journey 2025"
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4" style={{ background: 'rgba(26,26,26,0.45)' }}>
                            <div
                                className="w-20 h-20 rounded-full flex items-center justify-center transition-transform group-hover:scale-110"
                                style={{ background: ASTRA_YELLOW }}
                            >
                                <div style={{ width: 0, height: 0, borderTop: '14px solid transparent', borderBottom: '14px solid transparent', borderLeft: `22px solid ${INK}`, marginLeft: 6 }} />
                            </div>
                            <p className="text-white font-bold text-lg">Watch the Rasa Mathaka Journey 2025</p>
                        </div>
                    </a>
                </div>
            </section>

            {/* Awards & Recognition — both real award banners, shown in full */}
            <section className="py-24" style={{ background: '#EFEFEF' }}>
                <div className="max-w-7xl mx-auto px-6">
                    <div className="mb-16 max-w-2xl">
                        <span className="text-xs font-bold tracking-widest" style={{ color: ASTRA_YELLOW_DEEP }}>AWARDS & RECOGNITION</span>
                        <h2 className="font-extrabold mt-3 mb-4" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: INK }}>
                            Recognized. Respected. Reinforced.
                        </h2>
                        <p style={{ color: MUTED }}>Two award nights, seven trophies, one campaign behind all of them.</p>
                    </div>

                    <div ref={awardsRef} className="flex flex-col gap-10">
                        {awardBanners.map((a, i) => (
                            <div
                                key={a.caption}
                                className="rounded-2xl overflow-hidden"
                                style={{
                                    boxShadow: '0 20px 60px rgba(26,26,26,0.12)',
                                    opacity: awardsVisible ? 1 : 0,
                                    transform: awardsVisible ? 'translateY(0)' : 'translateY(24px)',
                                    transition: `opacity 0.6s ease ${i * 150}ms, transform 0.6s ease ${i * 150}ms`,
                                }}
                            >
                                <img src={a.img} alt={a.alt} className="w-full h-auto block" />
                                <div className="p-5" style={{ background: '#fff' }}>
                                    <p className="text-sm font-medium" style={{ color: MUTED }}>{a.caption}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Gallery: Ape Rasa Mathaka */}
            <section className="py-24" style={{ background: '#262626' }}>
                <div className="max-w-7xl mx-auto px-6">
                    <div className="mb-16 text-center">
                        <span className="text-xs font-bold tracking-widest" style={{ color: ASTRA_YELLOW }}>THE GALLERY</span>
                        <h2 className="font-extrabold mt-3 mb-4" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#F2F2F2' }}>
                            Ape Rasa Mathaka
                        </h2>
                        <p className="max-w-xl mx-auto" style={{ color: '#9A9A9A' }}>
                            Moments from the memory collections and on-ground activations, in the words of the people who lived them.
                        </p>
                    </div>
                    <div ref={galleryRef} className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
                        {galleryImages.map((src, i) => (
                            <button
                                key={i}
                                onClick={() => openLightbox(i)}
                                className="block w-full rounded-xl overflow-hidden group relative"
                                style={{
                                    opacity: galleryVisible ? 1 : 0,
                                    transform: galleryVisible ? 'scale(1)' : 'scale(0.96)',
                                    transition: `opacity 0.5s ease ${i * 70}ms, transform 0.5s ease ${i * 70}ms`,
                                }}
                            >
                                <img src={src} alt={`Ape Rasa Mathaka ${i + 1}`} className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105" />
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center" style={{ background: 'rgba(26,26,26,0.35)' }}>
                                    <Icon name="arrow-right" size={20} />
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Closing CTA + case study nav */}
            <section className="py-20" style={{ background: '#EFEFEF' }}>
                <div className="max-w-7xl mx-auto px-6">
                    <div className="rounded-3xl p-12 md:p-16 text-center mb-10" style={{ background: `linear-gradient(135deg, ${ASTRA_YELLOW_DEEP}, ${ASTRA_YELLOW})` }}>
                        <h2 className="font-extrabold mb-4" style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', color: INK }}>
                            Ready to write your brand's own Rasa Mathaka?
                        </h2>
                        <p className="mb-8 max-w-xl mx-auto" style={{ color: INK, opacity: 0.8 }}>
                            Let's talk about what an integrated campaign like this could look like for you.
                        </p>
                        <NavLink to="/contact" className="inline-block font-bold px-10 py-4 rounded-full text-base transition-all hover:shadow-2xl hover:-translate-y-1" style={{ background: INK, color: '#fff' }}>
                            Let's Talk
                        </NavLink>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                        <NavLink to="/our-work" className="inline-flex items-center gap-2 text-sm font-semibold hover:opacity-70 transition-opacity" style={{ color: INK }}>
                            <BackArrow /> Back to Our Work
                        </NavLink>
                        <NavLink to="/our-work#kiwi-shoe-polish" className="inline-flex items-center gap-2 text-sm font-semibold hover:opacity-70 transition-opacity" style={{ color: INK }}>
                            Next: KIWI — Shoe Polish <Icon name="arrow-right" size={14} />
                        </NavLink>
                    </div>
                </div>
            </section>

            {lightboxIndex !== null && (
                <Lightbox
                    images={galleryImages}
                    index={lightboxIndex}
                    direction={lightboxDirection}
                    onClose={closeLightbox}
                    onNav={navLightbox}
                />
            )}
        </>
    );
}