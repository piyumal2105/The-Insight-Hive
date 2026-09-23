import { NavLink } from 'react-router';
import logo from '../assets/logo.png';

function LinkedInIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function FacebookIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function InstagramIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  );
}

const socials = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/company/theinsighthive', // ← replace with real URL
    icon: <LinkedInIcon size={15} />,
  },
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/theinsighthive', // ← replace with real URL
    icon: <FacebookIcon size={15} />,
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/theinsighthive', // ← replace with real URL
    icon: <InstagramIcon size={15} />,
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
                    background: 'linear-gradient(135deg, #7A2E8C, #C2436B, #E8722E)',
                    color: '#fff',
                  }}
                >
                  {s.icon}
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
          <p>© {year} The Insight Hive. Omnicom Group Affiliate. All rights reserved.</p>
          <NavLink to="/contact" className="hover:text-white transition-colors">
            Privacy Policy
          </NavLink>
        </div>
      </div>
    </footer>
  );
}