"use client";
import { useEffect, useRef, useState, useMemo } from "react";
import { siteData } from "@/lib/data";

const { clients } = siteData;

export default function Clients() {
  const trackRef = useRef(null);
  const pos = useRef(0);
  const velocity = useRef(0);
  const dragging = useRef(false);
  const startX = useRef(0);

  const [centerIndex, setCenterIndex] = useState(0);

  const slides = useMemo(() => [...clients, ...clients], []);

  useEffect(() => {
    const track = trackRef.current;
    const slideWidth = 280;
    const max = (slides.length / 2) * slideWidth;

    const animate = () => {
      if (!dragging.current) velocity.current -= 0.03; // auto scroll

      pos.current += velocity.current;
      velocity.current *= 0.92;

      if (pos.current <= -max) pos.current += max;
      if (pos.current >= 0) pos.current -= max;

      track.style.transform = `translateX(${pos.current}px)`;

      const center = Math.abs(pos.current - window.innerWidth / 2) / slideWidth;
      setCenterIndex(Math.round(center) % clients.length);

      requestAnimationFrame(animate);
    };

    animate();
  }, [slides]);

  const start = (x) => {
    dragging.current = true;
    startX.current = x;
  };

  const move = (x) => {
    if (!dragging.current) return;
    const dx = x - startX.current;
    pos.current += dx;
    velocity.current = dx * 0.4;
    startX.current = x;
  };

  const end = () => (dragging.current = false);

  return (
    <div style={styles.wrapper}>
      <div
        ref={trackRef}
        style={styles.track}
        onMouseDown={(e) => start(e.clientX)}
        onMouseMove={(e) => move(e.clientX)}
        onMouseUp={end}
        onMouseLeave={end}
        onTouchStart={(e) => start(e.touches[0].clientX)}
        onTouchMove={(e) => move(e.touches[0].clientX)}
        onTouchEnd={end}
      >
        {slides.map((src, i) => {
          const active = i % clients.length === centerIndex;
          return (
            <div
              key={i}
              style={{
                ...styles.slide,
                transform: active ? "scale(1.1)" : "scale(0.9)",
                filter: active ? "grayscale(0)" : "grayscale(100%)",
                opacity: active ? 1 : 0.5,
              }}
            >
              <p>{src.name}</p>
              <img src={src.logo} style={styles.img} alt={src.name} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    height: "100vh",
    background: "#111",
    display: "flex",
    alignItems: "center",
    overflow: "hidden",
  },
  track: {
    display: "flex",
    gap: 20,
    paddingLeft: "50vw",
    willChange: "transform",
  },
  slide: {
    width: 260,
    height: 360,
    borderRadius: 18,
    overflow: "hidden",
    transition: "0.3s ease",
    boxShadow: "0 20px 40px rgba(0,0,0,.6)",
    flexShrink: 0,
  },
  img: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
};
