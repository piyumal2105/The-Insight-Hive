import { NavLink } from 'react-router';
import logo from '../assets/logo.png';

export default function Footer() {
  return (
    <footer style={{ background: '#262626', color: '#F2F2F2' }} className="pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div>
            <div className="mb-5">
              <img src={logo} alt="The Insight Hive" className="h-36 w-auto object-contain brightness-0 invert" />
            </div>
            <p style={{ color: '#9A9A9A' }} className="text-sm leading-relaxed max-w-xs">
              All-Rounders. A full-service marketing agency connecting brand strategy, consumer insight, and integrated media under one roof.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-4 tracking-wider" style={{ color: '#9A9A9A' }}>QUICK LINKS</h4>
            <div className="flex flex-col gap-3">
              {[['/', 'Home'], ['/about', 'About'], ['/what-we-do', 'What We Do'], ['/our-work', 'Our Work'], ['/contact', 'Contact']].map(([to, label]) => (
                <NavLink key={to} to={to} className="text-sm hover:text-white transition-colors" style={{ color: '#9A9A9A' }}>{label}</NavLink>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-4 tracking-wider" style={{ color: '#9A9A9A' }}>GET IN TOUCH</h4>
            <div className="flex flex-col gap-2 text-sm" style={{ color: '#9A9A9A' }}>
              <p>63 Fife Road, Colombo 5, Sri Lanka</p>
              <a href="tel:+94112567626" className="hover:text-white transition-colors">+94 112 56 76 26</a>
              <a href="mailto:info@dinsighthive.com" className="hover:text-white transition-colors">info@dinsighthive.com</a>
            </div>
            <div className="flex gap-4 mt-6">
              {['in', 'fb', 'ig'].map(s => (
                <div key={s} className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-transform hover:scale-110" style={{ background: 'linear-gradient(135deg, #7A2E8C, #C2436B, #E8722E)', color: '#fff' }}>
                  {s.toUpperCase()}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="border-t pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs" style={{ borderColor: '#9A9A9A22', color: '#9A9A9A' }}>
          <p>© 2025 The Insight Hive. Omnicom Group Affiliate. All rights reserved.</p>
          <NavLink to="/contact" className="hover:text-white transition-colors">Privacy Policy</NavLink>
        </div>
      </div>
    </footer>
  );
}