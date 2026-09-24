import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router';
import logo from '../assets/logo.png';

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/what-we-do', label: 'What We Do' },
  { to: '/our-work', label: 'Our Work' },
  { to: '/contact', label: 'Contact' },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [open, setOpen] = useState(false);
  // On the home page the header floats over the hero (out of the layout flow), so the
  // honeycomb background runs behind the nav instead of a solid strip above it.
  const isHome = useLocation().pathname === '/';

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScrolled(window.scrollY > 24);
      setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    // In-flow sticky wrapper: page layouts stay unchanged, the pill floats over content on scroll.
    <header
      className={`${isHome ? 'fixed inset-x-0' : 'sticky'} top-0 z-50 px-3 sm:px-6 py-3 transition-colors duration-300`}
      style={{ background: scrolled || isHome ? 'transparent' : '#EFEFEF' }}
    >
      <nav
        aria-label="Main"
        className="relative max-w-6xl mx-auto rounded-full transition-all duration-300"
        style={{
          // More opaque white so the pill clearly separates from the grey header / page content
          background: scrolled ? 'rgba(255,255,255,0.92)' : 'rgba(255,255,255,0.85)',
          backdropFilter: 'blur(16px) saturate(160%)',
          WebkitBackdropFilter: 'blur(16px) saturate(160%)',
          // Faint brand-purple hairline defines the edge
          border: '1px solid rgba(146,39,143,0.10)',
          // Brand-tinted shadow, visible at the top and stronger on scroll
          boxShadow: scrolled
            ? '0 14px 34px -8px rgba(146,39,143,0.32), 0 4px 12px rgba(26,26,26,0.10)'
            : '0 8px 24px -6px rgba(146,39,143,0.20), 0 2px 8px rgba(26,26,26,0.08)',
        }}
      >
        <div className={`flex items-center justify-between pl-5 pr-2 transition-all duration-300 ${scrolled ? 'h-14' : 'h-16'}`}>
          {/* Logo: oversized image is centred so its transparent padding never stretches the bar */}
          <NavLink to="/" onClick={() => setOpen(false)} aria-label="The Insight Hive – Home" className="flex items-center h-full w-44 shrink-0">
            <img
              src={logo}
              alt="The Insight Hive"
              className={`w-auto object-contain transition-all duration-300 ${scrolled ? 'h-28' : 'h-32'}`}
            />
          </NavLink>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-1">
            {links.map(({ to, label }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  end={to === '/'}
                  className={({ isActive }) =>
                    `relative block px-4 py-2 rounded-full text-sm font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-[#92278F] ${isActive ? 'text-[#1A1A1A]' : 'text-[#6B6B6B] hover:text-[#1A1A1A] hover:bg-black/5'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {isActive && (
                        <span
                          aria-hidden="true"
                          className="absolute inset-0 rounded-full -z-10"
                          style={{ background: 'linear-gradient(90deg, rgba(146,39,143,0.12), rgba(194,67,107,0.12), rgba(247,148,31,0.16))' }}
                        />
                      )}
                      {label}
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <NavLink
              to="/contact"
              className="btn-grad hidden sm:inline-block text-white text-sm font-semibold px-6 py-2.5 rounded-full transition-transform hover:scale-105 outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#92278F]"
            >
              Let's Talk
            </NavLink>

            {/* Mobile toggle */}
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-label={open ? 'Close menu' : 'Open menu'}
              className="md:hidden w-11 h-11 rounded-full flex flex-col items-center justify-center gap-[5px] hover:bg-black/5 outline-none focus-visible:ring-2 focus-visible:ring-[#92278F]"
            >
              <span className="block h-0.5 w-5 rounded bg-[#1A1A1A] transition-transform duration-300" style={{ transform: open ? 'translateY(7px) rotate(45deg)' : 'none' }} />
              <span className="block h-0.5 w-5 rounded bg-[#1A1A1A] transition-opacity duration-200" style={{ opacity: open ? 0 : 1 }} />
              <span className="block h-0.5 w-5 rounded bg-[#1A1A1A] transition-transform duration-300" style={{ transform: open ? 'translateY(-7px) rotate(-45deg)' : 'none' }} />
            </button>
          </div>
        </div>

        {/* Scroll progress line, clipped to the pill */}
        <div className="absolute left-6 right-6 bottom-0 h-[2px] overflow-hidden rounded-full pointer-events-none" aria-hidden="true">
          <div
            className="h-full origin-left"
            style={{
              transform: `scaleX(${progress})`,
              background: 'linear-gradient(90deg, #92278F, #C2436B, #F7941F)',
              opacity: scrolled ? 1 : 0,
              transition: 'opacity 0.3s ease',
            }}
          />
        </div>

        {/* Mobile panel */}
        <div
          className="md:hidden absolute left-0 right-0 top-full mt-2 rounded-3xl overflow-hidden transition-all duration-300 origin-top"
          style={{
            background: 'rgba(255,255,255,0.95)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            boxShadow: '0 20px 40px -12px rgba(26,26,26,0.2)',
            opacity: open ? 1 : 0,
            transform: open ? 'scaleY(1)' : 'scaleY(0.95)',
            pointerEvents: open ? 'auto' : 'none',
            visibility: open ? 'visible' : 'hidden',
          }}
        >
          <ul className="p-3 flex flex-col">
            {links.map(({ to, label }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  end={to === '/'}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `block px-5 py-3 rounded-2xl text-base font-medium ${isActive ? 'text-[#92278F] bg-[#92278F]/10' : 'text-[#1A1A1A] hover:bg-black/5'
                    }`
                  }
                >
                  {label}
                </NavLink>
              </li>
            ))}
            <li className="pt-2">
              <NavLink
                to="/contact"
                onClick={() => setOpen(false)}
                className="btn-grad block text-center text-white font-semibold px-5 py-3 rounded-2xl"
              >
                Let's Talk
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}