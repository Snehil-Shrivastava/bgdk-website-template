"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

const Navbar = () => {
  const navbarContainerRef = useRef(null);
  const navbarLogoContainerRef = useRef(null);
  const navRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline();

    tl.fromTo(
      navRef.current,
      {
        position: "absolute",
        left: "50%",
        top: "50%",
        translateX: "-50%",
        translateY: "-50%",
        color: "white",
      },
      {
        position: "fixed",
        left: 40,
        top: 20,
        translateX: 0,
        translateY: 0,
        color: "black",
        ease: "power1.inOut",
        duration: 0.7,
        delay: 3,
      }
    )
      .to(navbarContainerRef.current, {
        height: "80px",
      })
      .to(navbarLogoContainerRef.current, {
        opacity: 1,
      });
  }, []);

  return (
    <div ref={navbarContainerRef} className="fixed top-0 w-full h-full z-99">
      <div
        ref={navbarLogoContainerRef}
        className="absolute top-0 left-0 w-full opacity-0 bg-background pt-8 pb-4 flex flex-col gap-5"
      >
        <div className="flex justify-center items-center gap-20 h-full uppercase text-neutral-600 text-sm">
          <div>Landscape</div>
          <div>Engineering</div>
          <div>Architecture</div>
          <div>Planning</div>
          <div>Products</div>
        </div>

        {/* secondary links/categories */}

        {/* <div className="text-xs flex justify-center items-center gap-20 text-neutral-600">
          <div>Public Realm</div>
          <div>Parks</div>
          <div>Gardens</div>
          <div>Terraces</div>
        </div> */}
      </div>
      <h1 ref={navRef} className="absolute text-4xl font-bold">
        LOGO
      </h1>
    </div>
  );
};

export default Navbar;
