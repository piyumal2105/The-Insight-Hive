import { useState } from 'react';
import Icon, { type IconName } from '../components/Icon';

const socialLinks: Record<string, string> = {
  linkedin: 'https://lk.linkedin.com/company/the-insight-hive',
  facebook: 'https://www.facebook.com/p/The-Insight-Hive-100094602075925/',
  instagram: 'https://www.instagram.com/dinsighthive/',
};

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', company: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setTimeout(() => setStatus('success'), 1800);
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
                <ContactItem icon="pin" label="Address" value="63 Fife Road, Colombo 5, Sri Lanka" />
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
                  {([['linkedin', 'LinkedIn'], ['facebook', 'Facebook'], ['instagram', 'Instagram']] as [IconName, string][]).map(([icon, name]) => (
                    <a
                      key={name}
                      href={socialLinks[icon]}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={name}
                      className="group flex items-center gap-2 cursor-pointer"
                    >
                      <div className="w-10 h-10 rounded-full flex items-center justify-center transition-all group-hover:scale-110" style={{ background: 'linear-gradient(135deg, #7A2E8C, #C2436B, #E8722E)', color: '#fff' }}><Icon name={icon} size={19} /></div>
                      <span className="text-sm font-medium" style={{ color: '#9A9A9A' }}>{name}</span>
                    </a>
                  ))}
                </div>
              </div>

              <div className="mt-12 p-6 rounded-2xl" style={{ background: '#fff', border: '1px solid rgba(26,26,26,0.07)' }}>
                <div className="text-xs font-semibold mb-2 tracking-wider" style={{ color: '#9A9A9A' }}>OMNICOM GROUP AFFILIATE</div>
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
                  {[
                    { key: 'name', label: 'Name', type: 'text', placeholder: 'Your full name' },
                    { key: 'email', label: 'Email', type: 'email', placeholder: 'you@company.com' },
                    { key: 'company', label: 'Company', type: 'text', placeholder: 'Your organisation' },
                  ].map(f => (
                    <div key={f.key}>
                      <label className="block text-sm font-semibold mb-2" style={{ color: '#1A1A1A' }}>{f.label}</label>
                      <input
                        type={f.type}
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