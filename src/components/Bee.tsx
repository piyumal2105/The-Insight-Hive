import { useEffect, useRef, useState } from 'react';

function BeeSVG({ wingPhase }: { wingPhase: number }) {
  const wingY = Math.sin(wingPhase * Math.PI * 2) * 4;
  return (
    <svg width="56" height="48" viewBox="0 0 56 48" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.25))' }}>
      {/* Wings */}
      <ellipse cx="18" cy={16 + wingY} rx="13" ry="7" fill="rgba(200,230,255,0.75)" stroke="rgba(160,200,240,0.5)" strokeWidth="0.5" />
      <ellipse cx="38" cy={16 + wingY} rx="13" ry="7" fill="rgba(200,230,255,0.75)" stroke="rgba(160,200,240,0.5)" strokeWidth="0.5" />
      <ellipse cx="16" cy={22 + wingY * 0.5} rx="9" ry="5" fill="rgba(200,230,255,0.6)" stroke="rgba(160,200,240,0.4)" strokeWidth="0.5" />
      <ellipse cx="40" cy={22 + wingY * 0.5} rx="9" ry="5" fill="rgba(200,230,255,0.6)" stroke="rgba(160,200,240,0.4)" strokeWidth="0.5" />
      {/* Body */}
      <ellipse cx="28" cy="32" rx="10" ry="13" fill="#2A1A00" />
      {/* Amber stripes */}
      <ellipse cx="28" cy="27" rx="9.5" ry="4" fill="#E8A020" opacity="0.9" />
      <ellipse cx="28" cy="33" rx="9" ry="3.5" fill="#E8A020" opacity="0.9" />
      <ellipse cx="28" cy="39" rx="7" ry="3" fill="#E8A020" opacity="0.8" />
      {/* Brand gradient glow on thorax */}
      <ellipse cx="28" cy="23" rx="7" ry="5" fill="url(#beeGrad)" opacity="0.35" />
      {/* Head */}
      <circle cx="28" cy="20" r="7" fill="#1A1000" />
      {/* Eyes */}
      <ellipse cx="25" cy="19" rx="2.5" ry="2.5" fill="#3A2800" />
      <ellipse cx="31" cy="19" rx="2.5" ry="2.5" fill="#3A2800" />
      <circle cx="25.8" cy="18.3" r="0.9" fill="rgba(255,255,255,0.6)" />
      <circle cx="31.8" cy="18.3" r="0.9" fill="rgba(255,255,255,0.6)" />
      {/* Antennae */}
      <path d="M24 13 Q20 8 17 5" stroke="#1A1000" strokeWidth="1.2" strokeLinecap="round" />
      <circle cx="17" cy="5" r="1.5" fill="#E8A020" />
      <path d="M32 13 Q36 8 39 5" stroke="#1A1000" strokeWidth="1.2" strokeLinecap="round" />
      <circle cx="39" cy="5" r="1.5" fill="#E8A020" />
      {/* Legs */}
      <path d="M20 32 Q14 35 10 38" stroke="#1A1000" strokeWidth="1" strokeLinecap="round" opacity="0.7" />
      <path d="M20 36 Q13 38 9 42" stroke="#1A1000" strokeWidth="1" strokeLinecap="round" opacity="0.7" />
      <path d="M36 32 Q42 35 46 38" stroke="#1A1000" strokeWidth="1" strokeLinecap="round" opacity="0.7" />
      <path d="M36 36 Q43 38 47 42" stroke="#1A1000" strokeWidth="1" strokeLinecap="round" opacity="0.7" />
      <defs>
        <linearGradient id="beeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#7A2E8C" />
          <stop offset="50%" stopColor="#C2436B" />
          <stop offset="100%" stopColor="#E8722E" />
        </linearGradient>
      </defs>
    </svg>
  );
}

interface BeePos { x: number; y: number }

function randomPos(): BeePos {
  const margin = 80;
  return {
    x: margin + Math.random() * (window.innerWidth - margin * 2),
    y: margin + Math.random() * (window.innerHeight - margin * 2),
  };
}

export default function Bee() {
  const [pos, setPos] = useState<BeePos>({ x: -100, y: -100 });
  const [targetPos, setTargetPos] = useState<BeePos>({ x: 200, y: 200 });
  const [wingPhase, setWingPhase] = useState(0);
  const [rotation, setRotation] = useState(0);
  const [visible, setVisible] = useState(false);
  const animRef = useRef<number>(0);
  const wingRef = useRef<number>(0);
  const posRef = useRef(pos);
  const targetRef = useRef(targetPos);

  useEffect(() => {
    // Delay first appearance
    const t = setTimeout(() => {
      const start = { x: window.innerWidth * 0.6, y: window.innerHeight * 0.25 };
      setPos(start);
      posRef.current = start;
      const tgt = randomPos();
      setTargetPos(tgt);
      targetRef.current = tgt;
      setVisible(true);
    }, 2000);
    return () => clearTimeout(t);
  }, []);

  // Wing flutter
  useEffect(() => {
    let phase = 0;
    const flutter = () => {
      phase += 0.08;
      setWingPhase(phase);
      wingRef.current = requestAnimationFrame(flutter);
    };
    wingRef.current = requestAnimationFrame(flutter);
    return () => cancelAnimationFrame(wingRef.current);
  }, []);

  // Flight movement
  useEffect(() => {
    if (!visible) return;

    let pauseTimer: ReturnType<typeof setTimeout>;

    const moveToTarget = () => {
      const animate = () => {
        const cur = posRef.current;
        const tgt = targetRef.current;
        const dx = tgt.x - cur.x;
        const dy = tgt.y - cur.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 4) {
          // Arrived — pause then pick new target
          const pauseDuration = 2000 + Math.random() * 3000;
          pauseTimer = setTimeout(() => {
            const newTgt = randomPos();
            targetRef.current = newTgt;
            setTargetPos(newTgt);
            setRotation(Math.atan2(newTgt.y - posRef.current.y, newTgt.x - posRef.current.x) * (180 / Math.PI));
            moveToTarget();
          }, pauseDuration);
          return;
        }

        const speed = 1.8;
        const nx = cur.x + (dx / dist) * speed;
        const ny = cur.y + (dy / dist) * speed;
        const newPos = { x: nx, y: ny };
        posRef.current = newPos;
        setPos(newPos);
        setRotation(Math.atan2(dy, dx) * (180 / Math.PI));
        animRef.current = requestAnimationFrame(animate);
      };
      animRef.current = requestAnimationFrame(animate);
    };

    moveToTarget();
    return () => {
      cancelAnimationFrame(animRef.current);
      clearTimeout(pauseTimer);
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      style={{
        position: 'fixed',
        left: pos.x - 28,
        top: pos.y - 24,
        zIndex: 9999,
        pointerEvents: 'none',
        transform: `rotate(${rotation > 90 || rotation < -90 ? 180 : 0}deg)`,
        transition: 'transform 0.3s ease',
      }}
    >
      <BeeSVG wingPhase={wingPhase} />
    </div>
  );
}
