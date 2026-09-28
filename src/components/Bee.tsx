import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router';

const HIVE_MESSAGES = [
  'Welcome to the Hive!',
  'I bring the buzz. You bring the brand.',
  'We’re always busy making ideas fly.',
  'Good ideas? I know where to find them.',
  "Ready to make some buzz? Let's talk!",
];

const MESSAGE_DURATION_MS = 2800;

/** Every card is this exact size, whatever the message's length. */
const POPUP_WIDTH = 280;
const POPUP_HEIGHT = 108;
const BRAND_GRADIENT = 'linear-gradient(135deg, #92278F 0%, #C2436B 50%, #F7941F 100%)';

const POPUP_OFFSET_X = 170;
const POPUP_OFFSET_Y = 80;
const VIEWPORT_MARGIN = 16;

const HINT_FIRST_DELAY_MS = 1500;
const HINT_VISIBLE_MS = 4200;
const HINT_REPEAT_DELAY_MS = 13000;
const HINT_MAX_APPEARANCES = 3;

/* ---------- Map "perch" settings (Contact page) ---------- */

/** The element on the Contact page whose centre is the red pin. */
const MAP_ANCHOR_SELECTOR = '[data-bee-anchor="hive-map"]';
/** Where the bee hovers relative to the pin tip (negative = above the pin). */
const PERCH_OFFSET_Y = -40;
const PERCH_MESSAGE = 'Yes, this is our Hive!';
const PERCH_SUBMESSAGE = 'Come say hello — we’d love to meet you.';

function BeeSVG({ wingPhase, speed }: { wingPhase: number; speed: number }) {
  const flapSpeedMul = 1 + Math.min(speed / 3, 1.5);
  const wingFlap = Math.sin(wingPhase * flapSpeedMul) * 10;
  const wingTilt = Math.cos(wingPhase * flapSpeedMul) * 3;
  const wingOpacity = 0.55 + Math.min(speed / 4, 1) * 0.25;

  return (
    <svg width="60" height="52" viewBox="0 0 60 52" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ filter: 'drop-shadow(0 3px 8px rgba(0,0,0,0.28))' }}>
      <defs>
        <linearGradient id="beeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#7A2E8C" />
          <stop offset="50%" stopColor="#C2436B" />
          <stop offset="100%" stopColor="#E8722E" />
        </linearGradient>
        <radialGradient id="wingSheen" cx="35%" cy="30%" r="80%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.9)" />
          <stop offset="60%" stopColor="rgba(210,235,255,0.55)" />
          <stop offset="100%" stopColor="rgba(180,215,245,0.25)" />
        </radialGradient>
        <linearGradient id="bodyShade" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#3A2400" />
          <stop offset="100%" stopColor="#140C00" />
        </linearGradient>
      </defs>

      <g style={{ transformOrigin: '22px 18px', transform: `rotate(${wingTilt}deg)` }}>
        <ellipse cx="14" cy={17 - wingFlap * 0.5} rx="12" ry="6.5" fill="url(#wingSheen)" stroke="rgba(150,190,230,0.6)" strokeWidth="0.4" opacity={wingOpacity} />
      </g>
      <g style={{ transformOrigin: '38px 18px', transform: `rotate(${-wingTilt}deg)` }}>
        <ellipse cx="46" cy={17 - wingFlap * 0.5} rx="12" ry="6.5" fill="url(#wingSheen)" stroke="rgba(150,190,230,0.6)" strokeWidth="0.4" opacity={wingOpacity} />
      </g>

      <g style={{ transformOrigin: '20px 22px', transform: `rotate(${wingTilt * 1.4}deg)` }}>
        <ellipse cx="16" cy={23 - wingFlap * 0.35} rx="8.5" ry="4.5" fill="url(#wingSheen)" stroke="rgba(150,190,230,0.5)" strokeWidth="0.4" opacity={wingOpacity * 0.9} />
      </g>
      <g style={{ transformOrigin: '40px 22px', transform: `rotate(${-wingTilt * 1.4}deg)` }}>
        <ellipse cx="44" cy={23 - wingFlap * 0.35} rx="8.5" ry="4.5" fill="url(#wingSheen)" stroke="rgba(150,190,230,0.5)" strokeWidth="0.4" opacity={wingOpacity * 0.9} />
      </g>

      <path d="M30 26 C 40 26 46 33 44 40 C 42 47 34 50 30 50 C 26 50 18 47 16 40 C 14 33 20 26 30 26 Z" fill="url(#bodyShade)" />
      <path d="M18 33 C 22 31 38 31 42 33 C 43 35.5 43 35.5 42 38 C 38 36.5 22 36.5 18 38 C 17 35.5 17 35.5 18 33 Z" fill="#F0A824" />
      <path d="M17.5 40 C 21 38.7 39 38.7 42.5 40 C 42 42.3 42 42.3 41 44.3 C 37 43 23 43 19 44.3 C 18 42.3 18 42.3 17.5 40 Z" fill="#F0A824" />
      <path d="M20 45.5 C 23.5 44.6 36.5 44.6 40 45.5 C 38.7 47.4 38.7 47.4 36.8 48.7 C 32 47.7 28 47.7 23.2 48.7 C 21.3 47.4 21.3 47.4 20 45.5 Z" fill="#F0A824" opacity="0.9" />
      <ellipse cx="26" cy="29" rx="5" ry="2.5" fill="rgba(255,255,255,0.18)" />

      <ellipse cx="30" cy="23" rx="9.5" ry="8.5" fill="#1E1300" />
      <ellipse cx="30" cy="21.5" rx="8" ry="6.5" fill="url(#beeGrad)" opacity="0.4" />
      <circle cx="25" cy="19" r="0.7" fill="rgba(255,255,255,0.35)" />
      <circle cx="34" cy="18" r="0.6" fill="rgba(255,255,255,0.3)" />
      <circle cx="30" cy="16" r="0.6" fill="rgba(255,255,255,0.35)" />
      <circle cx="27" cy="24" r="0.5" fill="rgba(255,255,255,0.25)" />

      <circle cx="30" cy="13" r="6.2" fill="#150D00" />
      <ellipse cx="26" cy="12.3" rx="2.6" ry="3.1" fill="#241505" />
      <ellipse cx="34" cy="12.3" rx="2.6" ry="3.1" fill="#241505" />
      <ellipse cx="26" cy="11.4" rx="1.5" ry="1.7" fill="rgba(255,255,255,0.4)" />
      <ellipse cx="34" cy="11.4" rx="1.5" ry="1.7" fill="rgba(255,255,255,0.4)" />
      <circle cx="26.5" cy="10.9" r="0.5" fill="rgba(255,255,255,0.85)" />
      <circle cx="34.5" cy="10.9" r="0.5" fill="rgba(255,255,255,0.85)" />

      <path d="M27 8 Q23 3 19 1" stroke="#150D00" strokeWidth="1.1" strokeLinecap="round" fill="none" />
      <circle cx="19" cy="1" r="1.3" fill="#E8A020" />
      <path d="M33 8 Q37 3 41 1" stroke="#150D00" strokeWidth="1.1" strokeLinecap="round" fill="none" />
      <circle cx="41" cy="1" r="1.3" fill="#E8A020" />

      <path d="M22 28 Q15 30 10 33" stroke="#1E1300" strokeWidth="1" strokeLinecap="round" opacity="0.75" fill="none" />
      <path d="M23 33 Q15 34 9 38" stroke="#1E1300" strokeWidth="1" strokeLinecap="round" opacity="0.75" fill="none" />
      <path d="M38 28 Q45 30 50 33" stroke="#1E1300" strokeWidth="1" strokeLinecap="round" opacity="0.75" fill="none" />
      <path d="M37 33 Q45 34 51 38" stroke="#1E1300" strokeWidth="1" strokeLinecap="round" opacity="0.75" fill="none" />
    </svg>
  );
}

interface BeePos { x: number; y: number }

function randomPos(): BeePos {
  const margin = 90;
  return {
    x: margin + Math.random() * (window.innerWidth - margin * 2),
    y: margin + Math.random() * (window.innerHeight - margin * 2),
  };
}

function lerpAngle(a: number, b: number, t: number) {
  let diff = ((b - a + 540) % 360) - 180;
  return a + diff * t;
}

/** Viewport position where the bee should hover over the map's red pin,
 *  or null when the map isn't on the current page. The Google embed always
 *  centres the pin in the iframe, so the iframe's centre is the pin tip. */
function getPerchTarget(): BeePos | null {
  const el = document.querySelector(MAP_ANCHOR_SELECTOR);
  if (!el) return null;
  const rect = el.getBoundingClientRect();
  if (rect.width === 0 || rect.height === 0) return null;
  return {
    x: rect.left + rect.width / 2,
    y: rect.top + rect.height / 2 + PERCH_OFFSET_Y,
  };
}

function computePopupAnchor(beePos: BeePos): { left: number; top: number } {
  const vw = window.innerWidth;
  const vh = window.innerHeight;

  const placeRight = beePos.x < vw / 2;
  const rawX = placeRight ? beePos.x + POPUP_OFFSET_X : beePos.x - POPUP_OFFSET_X;

  const placeBelow = beePos.y < vh / 2;
  const rawY = placeBelow ? beePos.y + POPUP_OFFSET_Y : beePos.y - POPUP_OFFSET_Y;

  const halfW = POPUP_WIDTH / 2;
  const halfH = POPUP_HEIGHT / 2;

  const left = Math.min(
    Math.max(rawX, halfW + VIEWPORT_MARGIN),
    vw - halfW - VIEWPORT_MARGIN
  );
  const top = Math.min(
    Math.max(rawY, halfH + VIEWPORT_MARGIN),
    vh - halfH - VIEWPORT_MARGIN
  );

  return { left, top };
}

/** A standalone square message card — same fixed size for every message, a
 *  light, easy-on-the-eye background, and a slow, gentle fade-out.
 *  Positioned near the bee at the moment it was clicked. */
function HiveMessagePopup({
  message,
  entered,
  left,
  top,
}: {
  message: string;
  entered: boolean;
  left: number;
  top: number;
}) {
  return (
    <div
      style={{
        position: 'fixed',
        left,
        top,
        width: POPUP_WIDTH,
        height: POPUP_HEIGHT,
        transform: `translate(-50%, -50%) translateY(${entered ? '0px' : '20px'}) scale(${entered ? 1 : 0.45})`,
        opacity: entered ? 1 : 0,
        filter: `blur(${entered ? 0 : 6}px)`,
        transition: entered
          ? 'opacity 0.5s cubic-bezier(0.34, 1.56, 0.64, 1), transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1), filter 0.4s ease'
          : 'opacity 1.3s ease, transform 1.3s ease, filter 1.3s ease',
        pointerEvents: 'none',
        zIndex: 9998,
      }}
    >
      <div
        className="hive-popup-glow"
        style={{
          position: 'absolute',
          inset: -16,
          borderRadius: 28,
          background: BRAND_GRADIENT,
          filter: 'blur(20px)',
          opacity: 0.28,
        }}
      />

      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxSizing: 'border-box',
          padding: '14px 36px',
          borderRadius: 22,
          background: 'linear-gradient(135deg, #ffffff 0%, #fbe7f3 45%, #fef1dd 100%)',
          boxShadow: '0 10px 28px rgba(146,39,143,0.18), 0 2px 6px rgba(0,0,0,0.06)',
        }}
      >
        <p
          style={{
            margin: 0,
            fontWeight: 800,
            fontSize: 14.5,
            lineHeight: 1.38,
            textAlign: 'center',
            background: BRAND_GRADIENT,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          {message}
        </p>
      </div>

      <style>{`
        @keyframes hivePopupPulse {
          0%, 100% { opacity: 0.22; transform: scale(1); }
          50% { opacity: 0.38; transform: scale(1.04); }
        }
        .hive-popup-glow {
          animation: hivePopupPulse 2.4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

function BeeDiscoveryHint({ visible }: { visible: boolean }) {
  return (
    <>
      {/* Bloom ring, centered on the bee icon */}
      <div
        style={{
          position: 'absolute',
          left: 30,
          top: 24,
          width: 10,
          height: 10,
          transform: 'translate(-50%, -50%)',
          borderRadius: '50%',
          background: BRAND_GRADIENT,
          opacity: visible ? 1 : 0,
          transition: 'opacity 0.4s ease',
          pointerEvents: 'none',
        }}
        className={visible ? 'hive-bloom-ring' : undefined}
      />

      {/* Speech-bubble hint */}
      <div
        style={{
          position: 'absolute',
          left: 30,
          top: -14,
          transform: `translate(-50%, -100%) translateY(${visible ? '0px' : '8px'}) scale(${visible ? 1 : 0.7})`,
          opacity: visible ? 1 : 0,
          transition: visible
            ? 'opacity 0.35s ease, transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)'
            : 'opacity 0.3s ease, transform 0.3s ease',
          pointerEvents: 'none',
          whiteSpace: 'nowrap',
        }}
        className={visible ? 'hive-hint-bob' : undefined}
      >
        <div
          style={{
            position: 'relative',
            padding: '7px 14px',
            borderRadius: 14,
            background: 'linear-gradient(135deg, #ffffff 0%, #fbe7f3 45%, #fef1dd 100%)',
            boxShadow: '0 6px 18px rgba(146,39,143,0.22), 0 1px 4px rgba(0,0,0,0.08)',
          }}
        >
          <span
            style={{
              fontSize: 12.5,
              fontWeight: 800,
              background: BRAND_GRADIENT,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Click me!
          </span>
          <div
            style={{
              position: 'absolute',
              bottom: -5,
              left: '50%',
              transform: 'translateX(-50%) rotate(45deg)',
              width: 10,
              height: 10,
              background: '#fbe7f3',
            }}
          />
        </div>
      </div>

      <style>{`
        @keyframes hiveBloomRing {
          0% { box-shadow: 0 0 0 0 rgba(146,39,143,0.35); opacity: 0.9; }
          70% { box-shadow: 0 0 0 20px rgba(146,39,143,0); opacity: 0; }
          100% { box-shadow: 0 0 0 20px rgba(146,39,143,0); opacity: 0; }
        }
        .hive-bloom-ring {
          animation: hiveBloomRing 1.8s ease-out infinite;
        }
        @keyframes hiveHintBob {
          0%, 100% { margin-top: 0px; }
          50% { margin-top: -4px; }
        }
        .hive-hint-bob {
          animation: hiveHintBob 1.6s ease-in-out infinite;
        }
      `}</style>
    </>
  );
}

/** Shown while the bee is hovering over the red map pin: a pulsing ripple
 *  on the pin plus a "Yes, this is our Hive!" bubble above the bee. */
function BeePerchBubble({ visible }: { visible: boolean }) {
  return (
    <>
      {/* Ripple on the pin tip */}
      <div
        style={{
          position: 'absolute',
          left: 30,
          top: 26 - PERCH_OFFSET_Y,
          width: 12,
          height: 12,
          transform: 'translate(-50%, -50%)',
          borderRadius: '50%',
          background: 'rgba(194,67,107,0.55)',
          opacity: visible ? 1 : 0,
          transition: 'opacity 0.5s ease',
          pointerEvents: 'none',
        }}
        className={visible ? 'hive-perch-ring' : undefined}
      />

      {/* Message bubble */}
      <div
        style={{
          position: 'absolute',
          left: 30,
          top: -12,
          transform: `translate(-50%, -100%) translateY(${visible ? '0px' : '10px'}) scale(${visible ? 1 : 0.6})`,
          transformOrigin: '50% 100%',
          opacity: visible ? 1 : 0,
          transition: visible
            ? 'opacity 0.4s ease, transform 0.55s cubic-bezier(0.34, 1.56, 0.64, 1)'
            : 'opacity 0.3s ease, transform 0.3s ease',
          pointerEvents: 'none',
          whiteSpace: 'nowrap',
        }}
      >
        <div
          className="hive-perch-glow"
          style={{
            position: 'absolute',
            inset: -10,
            borderRadius: 26,
            background: BRAND_GRADIENT,
            filter: 'blur(16px)',
            opacity: 0.3,
          }}
        />
        <div
          style={{
            position: 'relative',
            padding: '12px 22px',
            borderRadius: 18,
            textAlign: 'center',
            background: 'linear-gradient(135deg, #ffffff 0%, #fbe7f3 45%, #fef1dd 100%)',
            boxShadow: '0 10px 28px rgba(146,39,143,0.22), 0 2px 6px rgba(0,0,0,0.08)',
          }}
        >
          <div
            style={{
              fontSize: 15,
              fontWeight: 800,
              lineHeight: 1.3,
              background: BRAND_GRADIENT,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {PERCH_MESSAGE}
          </div>
          <div style={{ marginTop: 2, fontSize: 11.5, fontWeight: 600, color: '#8a6a86' }}>
            {PERCH_SUBMESSAGE}
          </div>
          <div
            style={{
              position: 'absolute',
              bottom: -6,
              left: '50%',
              transform: 'translateX(-50%) rotate(45deg)',
              width: 12,
              height: 12,
              background: '#fdeee6',
              borderRadius: 2,
            }}
          />
        </div>
      </div>

      <style>{`
        @keyframes hivePerchRing {
          0% { box-shadow: 0 0 0 0 rgba(194,67,107,0.45); }
          80%, 100% { box-shadow: 0 0 0 26px rgba(194,67,107,0); }
        }
        .hive-perch-ring { animation: hivePerchRing 1.9s ease-out infinite; }
        @keyframes hivePerchGlow {
          0%, 100% { opacity: 0.22; }
          50% { opacity: 0.4; }
        }
        .hive-perch-glow { animation: hivePerchGlow 2.4s ease-in-out infinite; }
      `}</style>
    </>
  );
}

export default function Bee() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  const [pos, setPos] = useState<BeePos>({ x: -100, y: -100 });
  const [wingPhase, setWingPhase] = useState(0);
  const [renderRotation, setRenderRotation] = useState(0);
  const [bob, setBob] = useState(0);
  const [speedNow, setSpeedNow] = useState(0);
  const [visible, setVisible] = useState(false);

  const [popupMounted, setPopupMounted] = useState(false);
  const [popupEntered, setPopupEntered] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [popupAnchor, setPopupAnchor] = useState<{ left: number; top: number } | null>(null);

  const [discovered, setDiscovered] = useState(false);
  const [hintVisible, setHintVisible] = useState(false);
  const hintAppearancesRef = useRef(0);
  const hintTimerRef = useRef<ReturnType<typeof setTimeout>>();

  // Map perch state: `perchActive` = bee is heading to / sitting on the pin,
  // `perchArrived` = it has reached the pin and the bubble should show.
  const [perchActive, setPerchActive] = useState(false);
  const [perchArrived, setPerchArrived] = useState(false);
  const perchModeRef = useRef(false);
  const arrivedRef = useRef(false);

  const animRef = useRef<number>(0);
  const wingRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);

  const posRef = useRef<BeePos>({ x: 0, y: 0 });
  const velRef = useRef<BeePos>({ x: 0, y: 0 });
  const targetRef = useRef<BeePos>({ x: 0, y: 0 });
  const angleRef = useRef(0);
  const wobbleSeedRef = useRef(Math.random() * 1000);
  const pausedUntilRef = useRef(0);

  const nextIndexRef = useRef(0);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout>>();
  const unmountTimerRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    const t = setTimeout(() => {
      const start = { x: window.innerWidth * 0.6, y: window.innerHeight * 0.25 };
      posRef.current = start;
      setPos(start);
      const tgt = randomPos();
      targetRef.current = tgt;
      setVisible(true);
    }, 2000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    let phase = 0;
    const flutter = () => {
      phase += 0.45;
      setWingPhase(phase);
      wingRef.current = requestAnimationFrame(flutter);
    };
    wingRef.current = requestAnimationFrame(flutter);
    return () => cancelAnimationFrame(wingRef.current);
  }, []);

  useEffect(() => {
    if (!visible) return;

    const accel = 0.012;
    const damping = 0.965;
    const maxSpeed = 2.6;

    const step = (time: number) => {
      if (!lastTimeRef.current) lastTimeRef.current = time;
      const dt = Math.min(time - lastTimeRef.current, 48);
      lastTimeRef.current = time;

      /* ---------- Map perch: fly to the red pin and hover there ---------- */
      const pin = getPerchTarget();
      const vh = window.innerHeight;
      const vw = window.innerWidth;
      const wasPerched = perchModeRef.current;

      // Hysteresis: easier to stay perched than to start, so it never flickers.
      let wantPerch = false;
      if (pin) {
        const lo = wasPerched ? 0.02 : 0.2;
        const hi = wasPerched ? 0.98 : 0.85;
        wantPerch = pin.y >= vh * lo && pin.y <= vh * hi && pin.x >= 0 && pin.x <= vw;
      }

      if (wantPerch !== wasPerched) {
        perchModeRef.current = wantPerch;
        setPerchActive(wantPerch);
        if (wantPerch) {
          pausedUntilRef.current = 0;
        } else {
          // Scrolled away from the map: hide bubble and go back to roaming.
          arrivedRef.current = false;
          setPerchArrived(false);
          targetRef.current = randomPos();
          pausedUntilRef.current = time + 400;
        }
      }

      if (wantPerch && pin) {
        const cur = posRef.current;
        const dx = pin.x - cur.x;
        const dy = pin.y - cur.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (!arrivedRef.current && dist < 10) {
          arrivedRef.current = true;
          setPerchArrived(true);
        } else if (arrivedRef.current && dist > 140) {
          arrivedRef.current = false;
          setPerchArrived(false);
        }

        let newPos: BeePos;
        let vSpeed = 0;

        if (arrivedRef.current) {
          // Locked on: stay glued to the pin even while the page scrolls.
          newPos = { x: cur.x + dx * 0.4, y: cur.y + dy * 0.4 };
          velRef.current = { x: 0, y: 0 };
        } else {
          // Smooth approach that slows down as it nears the pin.
          const desired = Math.min(3.4, dist * 0.06);
          const nx = dist > 0 ? dx / dist : 0;
          const ny = dist > 0 ? dy / dist : 0;
          velRef.current.x += (nx * desired - velRef.current.x) * 0.1;
          velRef.current.y += (ny * desired - velRef.current.y) * 0.1;
          vSpeed = Math.sqrt(velRef.current.x ** 2 + velRef.current.y ** 2);
          newPos = {
            x: cur.x + velRef.current.x * (dt / 16),
            y: cur.y + velRef.current.y * (dt / 16),
          };
          const travelAngle = Math.atan2(velRef.current.y, velRef.current.x) * (180 / Math.PI);
          angleRef.current = lerpAngle(angleRef.current, travelAngle, 0.08);
        }

        if (arrivedRef.current) {
          // Face forward (upright) while hovering.
          angleRef.current = lerpAngle(angleRef.current, 0, 0.1);
        }

        posRef.current = newPos;
        setPos(newPos);
        setRenderRotation(angleRef.current);
        setBob(Math.sin(time / 350 + wobbleSeedRef.current) * (arrivedRef.current ? 3.5 : 2.5));
        setSpeedNow(arrivedRef.current ? 0.9 : vSpeed);

        animRef.current = requestAnimationFrame(step);
        return;
      }

      /* ---------- Normal roaming ---------- */
      if (time < pausedUntilRef.current) {
        setSpeedNow((s) => s * 0.9);
        animRef.current = requestAnimationFrame(step);
        return;
      }

      const cur = posRef.current;
      const tgt = targetRef.current;
      const dx = tgt.x - cur.x;
      const dy = tgt.y - cur.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 6) {
        pausedUntilRef.current = time + 1800 + Math.random() * 2600;
        const newTgt = randomPos();
        targetRef.current = newTgt;
        animRef.current = requestAnimationFrame(step);
        return;
      }

      const nx = dx / dist;
      const ny = dy / dist;
      velRef.current.x += nx * accel * dt;
      velRef.current.y += ny * accel * dt;
      velRef.current.x *= damping;
      velRef.current.y *= damping;

      const vSpeed = Math.sqrt(velRef.current.x ** 2 + velRef.current.y ** 2);
      if (vSpeed > maxSpeed) {
        velRef.current.x = (velRef.current.x / vSpeed) * maxSpeed;
        velRef.current.y = (velRef.current.y / vSpeed) * maxSpeed;
      }

      const travelAngle = Math.atan2(velRef.current.y, velRef.current.x);
      const wobble = Math.sin(time / 220 + wobbleSeedRef.current) * 0.5;
      const perpX = Math.cos(travelAngle + Math.PI / 2) * wobble;
      const perpY = Math.sin(travelAngle + Math.PI / 2) * wobble;

      const newPos = {
        x: cur.x + velRef.current.x * (dt / 16) + perpX,
        y: cur.y + velRef.current.y * (dt / 16) + perpY,
      };
      posRef.current = newPos;

      const targetAngle = travelAngle * (180 / Math.PI);
      angleRef.current = lerpAngle(angleRef.current, targetAngle, 0.08);

      setPos(newPos);
      setRenderRotation(angleRef.current);
      setBob(Math.sin(time / 180 + wobbleSeedRef.current) * 2.5);
      setSpeedNow(vSpeed);

      animRef.current = requestAnimationFrame(step);
    };

    animRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animRef.current);
  }, [visible]);

  const canClick = isHomePage;

  useEffect(() => {
    if (!visible || !canClick || discovered) {
      setHintVisible(false);
      return;
    }

    let cancelled = false;

    const scheduleHint = (delay: number) => {
      hintTimerRef.current = setTimeout(() => {
        if (cancelled || discovered) return;
        setHintVisible(true);
        hintAppearancesRef.current += 1;
        hintTimerRef.current = setTimeout(() => {
          if (cancelled) return;
          setHintVisible(false);
          if (hintAppearancesRef.current < HINT_MAX_APPEARANCES) {
            scheduleHint(HINT_REPEAT_DELAY_MS);
          }
        }, HINT_VISIBLE_MS);
      }, delay);
    };

    scheduleHint(HINT_FIRST_DELAY_MS);

    return () => {
      cancelled = true;
      clearTimeout(hintTimerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible, canClick, discovered]);

  function closePopup() {
    clearTimeout(closeTimerRef.current);
    setPopupEntered(false);
    clearTimeout(unmountTimerRef.current);
    unmountTimerRef.current = setTimeout(() => setPopupMounted(false), 1350);
  }

  function handleBeeClick() {
    if (!canClick || popupMounted) return;

    if (!discovered) {
      setDiscovered(true);
      setHintVisible(false);
      clearTimeout(hintTimerRef.current);
    }

    const idx = nextIndexRef.current;
    nextIndexRef.current = (idx + 1) % HIVE_MESSAGES.length;

    // Anchor the popup to wherever the bee is right now.
    setPopupAnchor(computePopupAnchor(posRef.current));
    setActiveIndex(idx);
    setPopupMounted(true);

    requestAnimationFrame(() => requestAnimationFrame(() => setPopupEntered(true)));

    clearTimeout(closeTimerRef.current);
    closeTimerRef.current = setTimeout(closePopup, MESSAGE_DURATION_MS);
  }

  // Leaving the home page mid-message closes the popup immediately.
  useEffect(() => {
    if (!isHomePage && popupMounted) {
      closePopup();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isHomePage]);

  useEffect(
    () => () => {
      clearTimeout(closeTimerRef.current);
      clearTimeout(unmountTimerRef.current);
    },
    []
  );

  if (!visible) return null;

  const facingLeft = renderRotation > 90 || renderRotation < -90;

  return (
    <>
      {popupMounted && popupAnchor && (
        <HiveMessagePopup
          message={HIVE_MESSAGES[activeIndex]}
          entered={popupEntered}
          left={popupAnchor.left}
          top={popupAnchor.top}
        />
      )}
      <div
        style={{
          position: 'fixed',
          left: pos.x - 30,
          top: pos.y - 26 + bob,
          zIndex: 9999,
          pointerEvents: 'none',
        }}
      >
        {!discovered && canClick && <BeeDiscoveryHint visible={hintVisible} />}
        {perchActive && <BeePerchBubble visible={perchArrived} />}
        <div
          onClick={handleBeeClick}
          style={{
            pointerEvents: canClick ? 'auto' : 'none',
            cursor: canClick ? 'pointer' : 'default',
            transform: `rotate(${facingLeft ? 180 : 0}deg) rotate(${Math.max(-14, Math.min(14, (facingLeft ? -1 : 1) * (renderRotation - (facingLeft ? 180 : 0)) * 0.12))}deg)`,
            transition: 'transform 0.25s ease-out',
          }}
        >
          <BeeSVG wingPhase={wingPhase} speed={speedNow} />
        </div>
      </div>
    </>
  );
}