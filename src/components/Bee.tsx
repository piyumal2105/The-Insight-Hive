import { useEffect, useRef, useState } from 'react';

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

      {/* Back wing pair (behind body, larger flap) */}
      <g style={{ transformOrigin: '22px 18px', transform: `rotate(${wingTilt}deg)` }}>
        <ellipse cx="14" cy={17 - wingFlap * 0.5} rx="12" ry="6.5" fill="url(#wingSheen)" stroke="rgba(150,190,230,0.6)" strokeWidth="0.4" opacity={wingOpacity} />
      </g>
      <g style={{ transformOrigin: '38px 18px', transform: `rotate(${-wingTilt}deg)` }}>
        <ellipse cx="46" cy={17 - wingFlap * 0.5} rx="12" ry="6.5" fill="url(#wingSheen)" stroke="rgba(150,190,230,0.6)" strokeWidth="0.4" opacity={wingOpacity} />
      </g>

      {/* Front wing pair (smaller, flaps opposite phase slightly) */}
      <g style={{ transformOrigin: '20px 22px', transform: `rotate(${wingTilt * 1.4}deg)` }}>
        <ellipse cx="16" cy={23 - wingFlap * 0.35} rx="8.5" ry="4.5" fill="url(#wingSheen)" stroke="rgba(150,190,230,0.5)" strokeWidth="0.4" opacity={wingOpacity * 0.9} />
      </g>
      <g style={{ transformOrigin: '40px 22px', transform: `rotate(${-wingTilt * 1.4}deg)` }}>
        <ellipse cx="44" cy={23 - wingFlap * 0.35} rx="8.5" ry="4.5" fill="url(#wingSheen)" stroke="rgba(150,190,230,0.5)" strokeWidth="0.4" opacity={wingOpacity * 0.9} />
      </g>

      {/* Abdomen (striped, tapered) */}
      <path d="M30 26 C 40 26 46 33 44 40 C 42 47 34 50 30 50 C 26 50 18 47 16 40 C 14 33 20 26 30 26 Z" fill="url(#bodyShade)" />
      <path d="M18 33 C 22 31 38 31 42 33 C 43 35.5 43 35.5 42 38 C 38 36.5 22 36.5 18 38 C 17 35.5 17 35.5 18 33 Z" fill="#F0A824" />
      <path d="M17.5 40 C 21 38.7 39 38.7 42.5 40 C 42 42.3 42 42.3 41 44.3 C 37 43 23 43 19 44.3 C 18 42.3 18 42.3 17.5 40 Z" fill="#F0A824" />
      <path d="M20 45.5 C 23.5 44.6 36.5 44.6 40 45.5 C 38.7 47.4 38.7 47.4 36.8 48.7 C 32 47.7 28 47.7 23.2 48.7 C 21.3 47.4 21.3 47.4 20 45.5 Z" fill="#F0A824" opacity="0.9" />
      {/* Abdomen fuzzy highlight */}
      <ellipse cx="26" cy="29" rx="5" ry="2.5" fill="rgba(255,255,255,0.18)" />

      {/* Thorax (fuzzy, brand-tinted) */}
      <ellipse cx="30" cy="23" rx="9.5" ry="8.5" fill="#1E1300" />
      <ellipse cx="30" cy="21.5" rx="8" ry="6.5" fill="url(#beeGrad)" opacity="0.4" />
      {/* Fuzz texture dots */}
      <circle cx="25" cy="19" r="0.7" fill="rgba(255,255,255,0.35)" />
      <circle cx="34" cy="18" r="0.6" fill="rgba(255,255,255,0.3)" />
      <circle cx="30" cy="16" r="0.6" fill="rgba(255,255,255,0.35)" />
      <circle cx="27" cy="24" r="0.5" fill="rgba(255,255,255,0.25)" />

      {/* Head */}
      <circle cx="30" cy="13" r="6.2" fill="#150D00" />
      {/* Compound eyes */}
      <ellipse cx="26" cy="12.3" rx="2.6" ry="3.1" fill="#241505" />
      <ellipse cx="34" cy="12.3" rx="2.6" ry="3.1" fill="#241505" />
      <ellipse cx="26" cy="11.4" rx="1.5" ry="1.7" fill="rgba(255,255,255,0.4)" />
      <ellipse cx="34" cy="11.4" rx="1.5" ry="1.7" fill="rgba(255,255,255,0.4)" />
      <circle cx="26.5" cy="10.9" r="0.5" fill="rgba(255,255,255,0.85)" />
      <circle cx="34.5" cy="10.9" r="0.5" fill="rgba(255,255,255,0.85)" />

      {/* Antennae */}
      <path d="M27 8 Q23 3 19 1" stroke="#150D00" strokeWidth="1.1" strokeLinecap="round" fill="none" />
      <circle cx="19" cy="1" r="1.3" fill="#E8A020" />
      <path d="M33 8 Q37 3 41 1" stroke="#150D00" strokeWidth="1.1" strokeLinecap="round" fill="none" />
      <circle cx="41" cy="1" r="1.3" fill="#E8A020" />

      {/* Legs (trailing, slight sway) */}
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

export default function Bee() {
  const [pos, setPos] = useState<BeePos>({ x: -100, y: -100 });
  const [wingPhase, setWingPhase] = useState(0);
  const [renderRotation, setRenderRotation] = useState(0);
  const [bob, setBob] = useState(0);
  const [speedNow, setSpeedNow] = useState(0);
  const [visible, setVisible] = useState(false);

  const animRef = useRef<number>(0);
  const wingRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);

  // Physics state kept in refs so the animation loop reads fresh values
  const posRef = useRef<BeePos>({ x: 0, y: 0 });
  const velRef = useRef<BeePos>({ x: 0, y: 0 });
  const targetRef = useRef<BeePos>({ x: 0, y: 0 });
  const angleRef = useRef(0);
  const wobbleSeedRef = useRef(Math.random() * 1000);
  const pausedUntilRef = useRef(0);

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

  // Wing flutter — fast, continuous, independent of flight loop
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

  // Smooth physics-based flight: acceleration toward target, gentle sine-wave
  // wobble perpendicular to travel direction (real bees don't fly in straight lines),
  // eased rotation, and a pause-then-retarget behaviour once it arrives.
  useEffect(() => {
    if (!visible) return;

    const accel = 0.012;      // how eagerly it steers toward target
    const damping = 0.965;    // velocity decay -> smooth deceleration, no jitter
    const maxSpeed = 2.6;

    const step = (time: number) => {
      if (!lastTimeRef.current) lastTimeRef.current = time;
      const dt = Math.min(time - lastTimeRef.current, 48); // clamp big jumps (tab switch etc)
      lastTimeRef.current = time;

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
        // Arrived: hover-pause, then choose a new destination
        pausedUntilRef.current = time + 1800 + Math.random() * 2600;
        const newTgt = randomPos();
        targetRef.current = newTgt;
        animRef.current = requestAnimationFrame(step);
        return;
      }

      // Steering: accelerate velocity toward target, then damp (creates natural ease-in/out)
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

      // Perpendicular sine wobble for a meandering, organic flight path
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

  if (!visible) return null;

  const facingLeft = renderRotation > 90 || renderRotation < -90;

  return (
    <div
      style={{
        position: 'fixed',
        left: pos.x - 30,
        top: pos.y - 26 + bob,
        zIndex: 9999,
        pointerEvents: 'none',
        transform: `rotate(${facingLeft ? 180 : 0}deg) rotate(${Math.max(-14, Math.min(14, (facingLeft ? -1 : 1) * (renderRotation - (facingLeft ? 180 : 0)) * 0.12))}deg)`,
        transition: 'transform 0.25s ease-out',
      }}
    >
      <BeeSVG wingPhase={wingPhase} speed={speedNow} />
    </div>
  );
}