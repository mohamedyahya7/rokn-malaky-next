"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export const InfiniteScrollClients = ({
  clients,
  direction = "left",
  speed = 1,
}) => {
  const containerRef = useRef(null);
  const [position, setPosition] = useState(0);
  const [contentWidth, setContentWidth] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Measure the width of one set of logos
    const firstSet = container.children[0];
    if (firstSet) {
      setContentWidth(firstSet.offsetWidth);
    }
  }, [clients]);

  useEffect(() => {
    if (contentWidth === 0) return;

    let animationId;
    let currentPosition = position;

    const animate = () => {
      if (direction === "left") {
        currentPosition -= speed;
        if (currentPosition <= -contentWidth) {
          currentPosition = 0;
        }
      } else {
        currentPosition += speed;
        if (currentPosition >= 0) {
          currentPosition = -contentWidth;
        }
      }

      setPosition(currentPosition);
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [contentWidth, direction, speed]);

  return (
    <div className="w-full py-4 overflow-hidden">
      <div
        ref={containerRef}
        className="flex"
        style={{ transform: `translateX(${position}px)` }}
      >
        {/* First set of logos */}
        <div className="flex gap-6 shrink-0">
          {clients.map((client, index) => (
            <div
              key={`first-${client.name}-${index}`}
              className="shrink-0 flex items-center justify-center px-4"
            >
              <div className="relative h-12 w-24 md:h-16 md:w-28 lg:h-20 lg:w-36 transition-transform duration-300 hover:scale-110">
                <Image
                  src={client.logo}
                  alt={client.name}
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          ))}
        </div>
        {/* Duplicate set for seamless loop */}
        <div className="flex gap-6 shrink-0">
          {clients.map((client, index) => (
            <div
              key={`second-${client.name}-${index}`}
              className="shrink-0 flex items-center justify-center px-4"
            >
              <div className="relative h-12 w-24 md:h-16 md:w-28 lg:h-20 lg:w-36 transition-transform duration-300 hover:scale-110">
                <Image
                  src={client.logo}
                  alt={client.name}
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
