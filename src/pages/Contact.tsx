import { useEffect, useState } from 'react';
import Icon, { type IconName } from '../components/Icon';

const WEB3FORMS_ACCESS_KEY = '7e664838-1a32-4881-bc67-5caf4f381918';

const OFFICE_ADDRESS = '63 Fife Road, Colombo 5, Sri Lanka';
const MAPS_SHARE_LINK = 'https://maps.app.goo.gl/K2owKrG6U6JtRj3y5';

const OFFICE_COORDS = '';

const GOOGLE_RATING = { score: '5.0', count: 3 };

const HIDE_GOOGLE_CARD_PX = 140;

const MAPS_QUERY = OFFICE_COORDS || `The Insight Hive, ${OFFICE_ADDRESS}`;
const MAPS_EMBED_SRC = `https://maps.google.com/maps?q=${encodeURIComponent(MAPS_QUERY)}&z=17&output=embed`;
const MAPS_DIRECTIONS = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(MAPS_QUERY)}`;

const socialLinks: Record<string, { href: string; background: string }> = {
  linkedin: {
    href: 'https://lk.linkedin.com/company/the-insight-hive',
    background: '#0A66C2',
  },
  facebook: {
    href: 'https://www.facebook.com/p/The-Insight-Hive-100094602075925/',
    background: '#1877F2',
  },
  instagram: {
    href: 'https://www.instagram.com/dinsighthive/',
    background: 'linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)',
  },
};

/** Returns whether the office is open right now, based on Sri Lanka time (Mon–Fri, 9:30–17:30). */
function getOfficeStatus() {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Colombo',
    weekday: 'short',
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
  }).formatToParts(new Date());

  const weekday = parts.find(p => p.type === 'weekday')?.value ?? '';
  const hour = Number(parts.find(p => p.type === 'hour')?.value ?? 0) % 24;
  const minute = Number(parts.find(p => p.type === 'minute')?.value ?? 0);
  const minutes = hour * 60 + minute;

  const isWeekday = !['Sat', 'Sun'].includes(weekday);
  return isWeekday && minutes >= 9 * 60 + 30 && minutes < 17 * 60 + 30;
}

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', company: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [mapActive, setMapActive] = useState(false);
  // Changing this key remounts the iframe, which reloads the map at the office location.
  const [mapKey, setMapKey] = useState(0);
  const [isOpen, setIsOpen] = useState(getOfficeStatus);

  useEffect(() => {
    const id = setInterval(() => setIsOpen(getOfficeStatus()), 60_000);
    return () => clearInterval(id);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    const formData = new FormData(e.currentTarget);
    formData.append('access_key', WEB3FORMS_ACCESS_KEY);
    formData.append('subject', `New inquiry from ${form.name} – The Insight Hive website`);
    formData.append('from_name', 'The Insight Hive Website');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setStatus('success');
        setForm({ name: '', email: '', company: '', message: '' });
      } else {
        setStatus('error');
        setErrorMsg(data.message || 'Something went wrong. Please try again.');
      }
    } catch {
      setStatus('error');
      setErrorMsg('Network error. Please check your connection and try again.');
    }
  };

  return (
    <>
      {/* Header */}
      <section className="py-24" style={{ background: 'linear-gradient(135deg, #262626 0%, #1A1A1A 100%)' }}>
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="font-extrabold mb-6 leading-tight" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', color: '#F2F2F2' }}>
            <span className="font-light">Let's build something</span><br />great together.
          </h1>
          <p className="text-xl max-w-xl" style={{ color: '#9A9A9A' }}>
            Whether you have a brief, a challenge, or just a question — we'd love to hear from you.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-24" style={{ background: '#EFEFEF' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {/* Left: info */}
            <div>
              <h2 className="font-extrabold text-2xl mb-8" style={{ color: '#1A1A1A' }}>Reach Us</h2>
              <div className="flex flex-col gap-8">
                <ContactItem icon="pin" label="Address" value={OFFICE_ADDRESS} />
                <ContactItem icon="phone" label="Phone" value="+94 112 56 76 26" href="tel:+94112567626" />
                <ContactItem icon="mail" label="Email" value="info@dinsighthive.com" href="mailto:info@dinsighthive.com" />
                <ContactItem
                  icon="clock"
                  label="Working Hours"
                  value="Mon – Fri: 9.30 AM – 5.30 PM"
                  subValue="Saturday & Sunday: Closed"
                />
              </div>

              <div className="mt-12">
                <h3 className="font-bold text-sm tracking-widest mb-6" style={{ color: '#9A9A9A' }}>FOLLOW US</h3>
                <div className="flex gap-4">
                  {([['linkedin', 'LinkedIn'], ['instagram', 'Instagram'], ['facebook', 'Facebook']] as [IconName, string][]).map(([icon, name]) => (
                    <a
                      key={name}
                      href={socialLinks[icon].href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={name}
                      className="group flex items-center gap-2 cursor-pointer"
                    >
                      <div className="w-10 h-10 rounded-full flex items-center justify-center transition-all group-hover:scale-110" style={{ background: socialLinks[icon].background, color: '#fff' }}><Icon name={icon} size={19} /></div>
                      <span className="text-sm font-medium" style={{ color: '#9A9A9A' }}>{name}</span>
                    </a>
                  ))}
                </div>
              </div>

              <div className="mt-12 p-6 rounded-2xl" style={{ background: '#fff', border: '1px solid rgba(26,26,26,0.07)' }}>
                {/* <div className="text-xs font-semibold mb-2 tracking-wider" style={{ color: '#9A9A9A' }}>OMNICOM GROUP AFFILIATE</div> */}
                <p className="text-sm" style={{ color: '#9A9A9A' }}>Working alongside UM Worldwide and Initiative Worldwide — global networks in 100+ countries.</p>
              </div>
            </div>

            {/* Right: form */}
            <div>
              {status === 'success' ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-12 rounded-2xl" style={{ background: '#fff', border: '1px solid rgba(26,26,26,0.07)' }}>
                  <div className="w-20 h-20 rounded-full flex items-center justify-center mb-6 text-4xl" style={{ background: 'linear-gradient(135deg, #7A2E8C, #C2436B, #E8722E)' }}>
                    <Icon name="check" size={40} className="text-white" />
                  </div>
                  <h3 className="font-extrabold text-2xl mb-3" style={{ color: '#1A1A1A' }}>Message Sent!</h3>
                  <p style={{ color: '#9A9A9A' }}>We'll be in touch within 24 hours. Thank you for reaching out.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="p-8 rounded-2xl flex flex-col gap-5" style={{ background: '#fff', border: '1px solid rgba(26,26,26,0.07)' }}>
                  <h2 className="font-extrabold text-xl mb-2" style={{ color: '#1A1A1A' }}>Send an Inquiry</h2>

                  {/* Honeypot spam protection (hidden from real users) */}
                  <input
                    type="checkbox"
                    name="botcheck"
                    className="hidden"
                    style={{ display: 'none' }}
                    tabIndex={-1}
                    autoComplete="off"
                  />

                  {[
                    { key: 'name', label: 'Name', type: 'text', placeholder: 'Your full name' },
                    { key: 'email', label: 'Email', type: 'email', placeholder: 'you@company.com' },
                    { key: 'company', label: 'Company', type: 'text', placeholder: 'Your organisation' },
                  ].map(f => (
                    <div key={f.key}>
                      <label className="block text-sm font-semibold mb-2" style={{ color: '#1A1A1A' }}>{f.label}</label>
                      <input
                        type={f.type}
                        name={f.key}
                        placeholder={f.placeholder}
                        value={form[f.key as keyof typeof form]}
                        onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
                        required
                        className="w-full px-4 py-3 rounded-xl outline-none transition-all text-sm"
                        style={{
                          background: '#EFEFEF',
                          border: '1px solid rgba(26,26,26,0.12)',
                          color: '#1A1A1A',
                        }}
                        onFocus={e => { e.target.style.borderColor = '#7A2E8C'; e.target.style.boxShadow = '0 0 0 3px rgba(122,46,140,0.12)'; }}
                        onBlur={e => { e.target.style.borderColor = 'rgba(26,26,26,0.12)'; e.target.style.boxShadow = 'none'; }}
                      />
                    </div>
                  ))}
                  <div>
                    <label className="block text-sm font-semibold mb-2" style={{ color: '#1A1A1A' }}>Message</label>
                    <textarea
                      name="message"
                      placeholder="Tell us about your brief or challenge..."
                      rows={5}
                      value={form.message}
                      onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                      required
                      className="w-full px-4 py-3 rounded-xl outline-none transition-all text-sm resize-none"
                      style={{ background: '#EFEFEF', border: '1px solid rgba(26,26,26,0.12)', color: '#1A1A1A' }}
                      onFocus={e => { e.target.style.borderColor = '#7A2E8C'; e.target.style.boxShadow = '0 0 0 3px rgba(122,46,140,0.12)'; }}
                      onBlur={e => { e.target.style.borderColor = 'rgba(26,26,26,0.12)'; e.target.style.boxShadow = 'none'; }}
                    />
                  </div>

                  {status === 'error' && (
                    <p className="text-sm font-medium" style={{ color: '#C2436B' }} role="alert">
                      {errorMsg}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="btn-grad text-white font-bold py-4 rounded-full text-base mt-2 relative overflow-hidden"
                  >
                    {status === 'loading' ? (
                      <span className="flex items-center justify-center gap-2">
                        <span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin inline-block" />
                        Sending...
                      </span>
                    ) : 'Send Message'}
                    {status === 'loading' && (
                      <div className="absolute inset-0 opacity-30" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)', animation: 'shine 1.5s ease infinite' }} />
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Find Us: map */}
      <section className="pb-24 pt-4" style={{ background: '#EFEFEF' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between flex-wrap gap-4 mb-8">
            <div>
              <p className="text-xs font-semibold tracking-widest mb-3" style={{ color: '#9A9A9A' }}>VISIT THE HIVE</p>
              <h2 className="font-extrabold leading-tight" style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', color: '#1A1A1A' }}>
                <span className="font-light">Come say hello,</span>{' '}
                <span style={{ background: 'linear-gradient(135deg, #7A2E8C, #C2436B, #E8722E)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>
                  in person.
                </span>
              </h2>
            </div>
          </div>

          {/* Gradient-bordered frame */}
          <div
            className="rounded-[28px] p-[2px]"
            style={{ background: 'linear-gradient(135deg, #7A2E8C, #C2436B, #E8722E)', boxShadow: '0 30px 60px -20px rgba(122,46,140,0.35)' }}
          >
            <div
              className="relative rounded-[26px] overflow-hidden"
              style={{ background: '#1A1A1A' }}
              onMouseEnter={() => setMapActive(true)}
              onMouseLeave={() => setMapActive(false)}
              onTouchStart={() => setMapActive(true)}
            >
              {/* Map area. The iframe is pushed up so Google's own place card is cropped out;
                  our glass card below replaces it. data-bee-anchor lets the Bee find the red pin
                  (the iframe's centre). */}
              <div className="relative h-[380px] md:h-[560px] overflow-hidden">
                <iframe
                  key={mapKey}
                  title="The Insight Hive office location"
                  src={MAPS_EMBED_SRC}
                  data-bee-anchor="hive-map"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                  className="absolute left-0 w-full block border-0"
                  style={{
                    top: -HIDE_GOOGLE_CARD_PX,
                    height: `calc(100% + ${HIDE_GOOGLE_CARD_PX}px)`,
                    filter: mapActive
                      ? 'grayscale(0) invert(0) contrast(1)'
                      : 'grayscale(1) invert(0.92) contrast(0.85) brightness(0.95)',
                    transition: 'filter 0.7s ease',
                  }}
                />

                {/* Brand tint that fades on hover */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: 'linear-gradient(135deg, rgba(122,46,140,0.25), rgba(232,114,46,0.12))',
                    mixBlendMode: 'soft-light',
                    opacity: mapActive ? 0 : 1,
                    transition: 'opacity 0.7s ease',
                  }}
                />

                {/* Recenter button: reloads the map back to the office location */}
                <button
                  type="button"
                  onClick={() => setMapKey(k => k + 1)}
                  aria-label="Recenter map to The Insight Hive"
                  className="absolute top-4 right-4 md:top-6 md:right-6 z-10 group flex items-center gap-2.5 text-white font-semibold text-sm pl-2 pr-5 py-2 rounded-full cursor-pointer transition-transform hover:scale-[1.04] active:scale-95"
                  style={{
                    background: 'rgba(20,20,22,0.72)',
                    backdropFilter: 'blur(18px) saturate(160%)',
                    WebkitBackdropFilter: 'blur(18px) saturate(160%)',
                    border: '1px solid rgba(255,255,255,0.14)',
                    boxShadow: '0 12px 28px -10px rgba(0,0,0,0.5)',
                  }}
                >
                  <span
                    className="w-8 h-8 rounded-full flex items-center justify-center"
                    style={{ background: 'linear-gradient(135deg, #7A2E8C, #C2436B, #E8722E)' }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-500 group-hover:rotate-90">
                      <circle cx="12" cy="12" r="3" />
                      <circle cx="12" cy="12" r="8" />
                      <path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
                    </svg>
                  </span>
                  Recenter
                </button>
              </div>

              {/* Single glass info card (replaces Google's place card). On mobile it sits under the map. */}
              <div
                className="md:absolute md:top-6 md:left-6 md:w-[340px] p-5 md:rounded-3xl"
                style={{
                  background: 'rgba(20,20,22,0.72)',
                  backdropFilter: 'blur(22px) saturate(160%)',
                  WebkitBackdropFilter: 'blur(22px) saturate(160%)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  boxShadow: '0 24px 48px -16px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.08)',
                  color: '#F2F2F2',
                }}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] font-semibold tracking-[0.18em]" style={{ color: '#9A9A9A' }}>THE INSIGHT HIVE HQ</span>
                  <span
                    className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1 rounded-full"
                    style={{
                      background: isOpen ? 'rgba(52,199,89,0.15)' : 'rgba(255,255,255,0.08)',
                      color: isOpen ? '#4ADE80' : '#9A9A9A',
                    }}
                  >
                    <span className="relative flex w-2 h-2">
                      {isOpen && <span className="absolute inline-flex w-full h-full rounded-full animate-ping" style={{ background: '#4ADE80', opacity: 0.7 }} />}
                      <span className="relative inline-flex w-2 h-2 rounded-full" style={{ background: isOpen ? '#4ADE80' : '#9A9A9A' }} />
                    </span>
                    {isOpen ? 'Open now' : 'Closed now'}
                  </span>
                </div>

                <p className="font-extrabold text-xl leading-snug mb-1">The Insight Hive (Pvt) Ltd</p>
                <div className="flex items-center gap-1.5 text-sm mb-5" style={{ color: '#D0D0D0' }}>
                  <span className="font-semibold">{GOOGLE_RATING.score}</span>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="#F5B84B" aria-hidden="true">
                    <path d="M12 2.5l2.93 6.1 6.57.9-4.8 4.63 1.2 6.6L12 17.6l-5.9 3.13 1.2-6.6L2.5 9.5l6.57-.9L12 2.5z" />
                  </svg>
                  <span style={{ color: '#9A9A9A' }}>({GOOGLE_RATING.count} Google reviews)</span>
                </div>

                <div className="flex items-start gap-3 mb-4">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: 'linear-gradient(135deg, #7A2E8C, #C2436B, #E8722E)' }}
                  >
                    <Icon name="pin" size={18} />
                  </div>
                  <div>
                    <p className="font-bold leading-snug">63 Fife Road</p>
                    <p className="text-sm" style={{ color: '#9A9A9A' }}>Colombo 5, Sri Lanka</p>
                  </div>
                </div>

                <div
                  className="flex items-center gap-2 text-sm px-3 py-2.5 rounded-xl mb-5"
                  style={{ background: 'rgba(255,255,255,0.06)', color: '#D0D0D0' }}
                >
                  <Icon name="clock" size={16} />
                  <span>Mon – Fri · 9.30 AM – 5.30 PM</span>
                </div>

                <div className="flex gap-2">
                  <a
                    href={MAPS_DIRECTIONS}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex-1 flex items-center justify-center gap-2 text-white font-bold text-sm py-3 rounded-full transition-transform hover:scale-[1.02]"
                    style={{ background: 'linear-gradient(135deg, #7A2E8C, #C2436B, #E8722E)' }}
                  >
                    Directions
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-1">
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </a>

                  <a
                    href={MAPS_SHARE_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 font-semibold text-sm py-3 rounded-full transition-colors hover:bg-white/10"
                    style={{ border: '1px solid rgba(255,255,255,0.18)', color: '#F2F2F2' }}
                  >
                    Google Maps
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function ContactItem({
  icon,
  label,
  value,
  subValue,
  href,
}: {
  icon: IconName;
  label: string;
  value: string;
  subValue?: string;
  href?: string;
}) {
  return (
    <div className="flex items-start gap-4">
      <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ background: 'rgba(122,46,140,0.1)', color: '#7A2E8C' }}><Icon name={icon} size={22} /></div>
      <div>
        <p className="text-xs font-semibold tracking-wider mb-1" style={{ color: '#9A9A9A' }}>{label.toUpperCase()}</p>
        {href ? (
          <a href={href} className="font-semibold hover:opacity-70 transition-opacity" style={{ color: '#1A1A1A' }}>{value}</a>
        ) : (
          <p className="font-semibold" style={{ color: '#1A1A1A' }}>{value}</p>
        )}
        {subValue && (
          <p className="text-sm mt-0.5" style={{ color: '#9A9A9A' }}>{subValue}</p>
        )}
      </div>
    </div>
  );
}