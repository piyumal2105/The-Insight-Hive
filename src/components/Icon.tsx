export type IconName =
  | 'arrow-right'
  | 'bolt'
  | 'chart'
  | 'check'
  | 'creative'
  | 'cricket'
  | 'facebook'
  | 'flame'
  | 'globe'
  | 'handshake'
  | 'heart'
  | 'instagram'
  | 'linkedin'
  | 'mail'
  | 'media'
  | 'message'
  | 'phone'
  | 'pin'
  | 'plane'
  | 'play'
  | 'shoe'
  | 'star'
  | 'strategy'
  | 'trophy'
  | 'users';

export default function Icon({
  name,
  size = 24,
  className,
}: {
  name: IconName;
  size?: number;
  className?: string;
}) {
  const common = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.8,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    className,
    'aria-hidden': true,
  };

  switch (name) {
    case 'strategy':
      return <svg {...common}><circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="3" /><path d="M15 9l4-4M16 5h3v3" /></svg>;
    case 'creative':
      return <svg {...common}><path d="M9 18h6M10 22h4M8.5 15.5a7 7 0 1 1 7 0c-1 .8-1.5 1.5-1.5 2.5h-4c0-1-.5-1.7-1.5-2.5Z" /><path d="M12 6v4M10 8h4" /></svg>;
    case 'media':
      return <svg {...common}><rect x="4" y="7" width="16" height="11" rx="2" /><path d="m9 7 6-4M8 12h8M8 15h5" /></svg>;
    case 'chart':
      return <svg {...common}><path d="M4 20V10M10 20V4M16 20v-7M22 20V7" /></svg>;
    case 'message':
      return <svg {...common}><path d="M20 15a3 3 0 0 1-3 3H9l-5 3v-6a3 3 0 0 1-1-2V7a3 3 0 0 1 3-3h11a3 3 0 0 1 3 3Z" /><path d="M7 9h10M7 13h6" /></svg>;
    case 'heart':
      return <svg {...common}><path d="M20.8 5.7a5.5 5.5 0 0 0-7.8 0L12 6.8l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 22l8.8-8.5a5.5 5.5 0 0 0 0-7.8Z" /></svg>;
    case 'bolt':
      return <svg {...common}><path d="m13 2-9 12h7l-1 8 9-12h-7Z" /></svg>;
    case 'handshake':
      return <svg {...common}><path d="m8 12 3 3a2 2 0 0 0 3 0l4-4M3 7l4-2 4 3M21 7l-4-2-5 3-2 2a2 2 0 0 0 3 1l2-1 5 5M6 14l2 2M9 16l1 1" /></svg>;
    case 'globe':
      return <svg {...common}><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" /></svg>;
    case 'users':
      return <svg {...common}><circle cx="9" cy="8" r="3" /><path d="M3 20a6 6 0 0 1 12 0M16 5a3 3 0 0 1 0 6M17 14a5 5 0 0 1 4 5" /></svg>;
    case 'trophy':
      return <svg {...common}><path d="M8 4h8v5a4 4 0 0 1-8 0ZM12 13v5M8 21h8M6 6H3v2a4 4 0 0 0 5 4M18 6h3v2a4 4 0 0 1-5 4" /></svg>;
    case 'pin':
      return <svg {...common}><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></svg>;
    case 'phone':
      return <svg {...common}><path d="M6.5 3h3l1.5 5-2 1.5a15 15 0 0 0 5.5 5.5l1.5-2 5 1.5v3a3 3 0 0 1-3 3A15 15 0 0 1 3.5 6a3 3 0 0 1 3-3Z" /></svg>;
    case 'mail':
      return <svg {...common}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m4 7 8 6 8-6" /></svg>;
    case 'check':
      return <svg {...common}><path d="m5 12 4 4L19 6" /></svg>;
    case 'plane':
      return <svg {...common}><path d="m22 2-8 20-3-9-9-3ZM11 13l5-5" /></svg>;
    case 'flame':
      return <svg {...common}><path d="M12 22a7 7 0 0 0 7-7c0-5-3-8-6-12 0 4-3 5-3 9-1-2-2-3-4-4-1 2-1 4-1 7a7 7 0 0 0 7 7Z" /><path d="M9 18c0-2 2-3 3-5 1 2 3 3 3 5a3 3 0 0 1-6 0Z" /></svg>;
    case 'star':
      return <svg {...common}><path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.6l6.2-.9Z" /></svg>;
    case 'shoe':
      return <svg {...common}><path d="M4 5v8l-2 3c0 2 1 3 3 3h15c2 0 3-1 3-3-5 0-9-2-12-5L7 5ZM3 15h17" /></svg>;
    case 'cricket':
      return <svg {...common}><path d="m8 18 7-14 3 2-7 14ZM6 20l7-14M15 18l4 4M17 16l4 4" /><circle cx="4" cy="5" r="2" /></svg>;
    case 'play':
      return <svg {...common} fill="currentColor" stroke="none"><path d="m8 5 11 7-11 7Z" /></svg>;
    case 'arrow-right':
      return <svg {...common}><path d="M5 12h14M14 7l5 5-5 5" /></svg>;
    case 'linkedin':
      return <svg {...common}><path d="M6 9v10M6 5v.01M10 19v-6a4 4 0 0 1 8 0v6M10 9v10" /></svg>;
    case 'facebook':
      return <svg {...common}><path d="M14 21v-8h3l.5-4H14V7c0-1.2.5-2 2-2h2V2h-3c-3 0-5 2-5 5v2H7v4h3v8" /></svg>;
    case 'instagram':
      return <svg {...common}><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><path d="M17.5 6.5h.01" /></svg>;
  }
}
