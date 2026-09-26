import { NavLink } from 'react-router';
import logo from '../assets/logo.png';
import Icon, { type IconName } from '../components/Icon';

const socials: { label: string; href: string; icon: IconName; background: string }[] = [
  {
    label: 'LinkedIn',
    href: 'https://lk.linkedin.com/company/the-insight-hive',
    icon: 'linkedin',
    background: '#0A66C2',
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/dinsighthive/',
    icon: 'instagram',
    background: 'linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)',
  },
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/p/The-Insight-Hive-100094602075925/',
    icon: 'facebook',
    background: '#1877F2',
  },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer style={{ background: '#262626', color: '#F2F2F2' }} className="pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="mb-5">
              <img
                src={logo}
                alt="The Insight Hive"
                className="h-36 w-auto object-contain brightness-0 invert"
              />
            </div>
            <p style={{ color: '#9A9A9A' }} className="text-sm leading-relaxed max-w-xs">
              All-Rounders. A full-service marketing agency connecting brand strategy, consumer insight, and integrated media under one roof.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-sm mb-4 tracking-wider" style={{ color: '#9A9A9A' }}>
              QUICK LINKS
            </h4>
            <div className="flex flex-col gap-3">
              {[
                ['/', 'Home'],
                ['/about', 'About'],
                ['/what-we-do', 'What We Do'],
                ['/our-work', 'Our Work'],
                ['/contact', 'Contact'],
              ].map(([to, label]) => (
                <NavLink
                  key={to}
                  to={to}
                  className="text-sm hover:text-white transition-colors"
                  style={{ color: '#9A9A9A' }}
                >
                  {label}
                </NavLink>
              ))}
            </div>
          </div>

          {/* Get in Touch */}
          <div>
            <h4 className="font-semibold text-sm mb-4 tracking-wider" style={{ color: '#9A9A9A' }}>
              GET IN TOUCH
            </h4>
            <div className="flex flex-col gap-2 text-sm" style={{ color: '#9A9A9A' }}>
              <p>63 Fife Road, Colombo 5, Sri Lanka</p>
              <a href="tel:+94112567626" className="hover:text-white transition-colors">
                +94 112 56 76 26
              </a>
              <a href="mailto:info@dinsighthive.com" className="hover:text-white transition-colors">
                info@dinsighthive.com
              </a>
            </div>

            {/* Social icons */}
            <div className="flex gap-3 mt-6">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-transform hover:scale-110"
                  style={{
                    background: s.background,
                    color: '#fff',
                  }}
                >
                  <Icon name={s.icon} size={16} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="border-t pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs"
          style={{ borderColor: '#9A9A9A22', color: '#9A9A9A' }}
        >
          <p>© {year} The Insight Hive. All rights reserved.</p>
          <NavLink to="/contact" className="hover:text-white transition-colors">
            Privacy Policy
          </NavLink>
        </div>
      </div>
    </footer >
  );
}