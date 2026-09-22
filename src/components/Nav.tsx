import { NavLink } from 'react-router';
import logo from '../assets/logo.png';

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/what-we-do', label: 'What We Do' },
  { to: '/our-work', label: 'Our Work' },
  { to: '/contact', label: 'Contact' },
];

export default function Nav() {
  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md" style={{ background: 'rgba(239,239,239,0.92)', borderBottom: '1px solid rgba(26,26,26,0.08)' }}>
      <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
        <NavLink to="/" className="flex items-center group">
          <img
            src={logo}
            alt="The Insight Hive"
            className="h-36 w-auto object-contain shrink-0"
            style={{ imageRendering: 'auto' }}
          />
        </NavLink>

        <div className="hidden md:flex items-center gap-8">
          {links.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors relative pb-1 ${
                  isActive ? 'text-[#1A1A1A]' : 'text-[#9A9A9A] hover:text-[#1A1A1A]'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {label}
                  {isActive && (
                    <span
                      className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full"
                      style={{ background: 'linear-gradient(90deg, #7A2E8C, #C2436B, #E8722E)' }}
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </div>

        <NavLink
          to="/contact"
          className="btn-grad text-white text-sm font-semibold px-5 py-2.5 rounded-full"
        >
          Let's Talk
        </NavLink>
      </div>
    </nav>
  );
}