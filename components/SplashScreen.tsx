"use client";

import React, { useState, useEffect, useRef } from "react";

import { gsap, Expo } from "gsap";

const SplashScreen = ({ children }: { children: React.ReactNode }) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const revealRef = useRef<HTMLDivElement>(null);

  const [counter, setCounter] = useState<number>(0);

  const reveal = () => {
    if (!revealRef.current) return;
    const tl = gsap.timeline({
      onComplete: () => {
        console.log("completed");
      },
    });
    tl.to(revealRef.current, {
      scaleY: 0,
      transformOrigin: "top",
      ease: Expo.easeInOut,
      duration: 1.2,
    }).to(contentRef.current, {
      scale: 1,
      opacity: 1,
      display: "flex",
      transformOrigin: "center",
      ease: "none",
      duration: 0.4,
    });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          reveal();
          return 100;
        }
        return prev + 1;
      });
    }, 25);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full text-black relative">
      <div
        ref={revealRef}
        className="h-screen w-screen bg-black flex justify-center items-center absolute top-0 origin-top"
      ></div>

      <div
        ref={contentRef}
        className="opacity-0 hidden h-full w-full scale-90 bg-background z-2 flex-col text-black"
      >
        {children}
      </div>
    </div>
  );
};

export default SplashScreen;
