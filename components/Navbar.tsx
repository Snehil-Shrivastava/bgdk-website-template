"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { useArticles } from "@/context/ArticlesContext";

const Navbar = () => {
  const navbarContainerRef = useRef(null);
  const navbarLogoContainerRef = useRef(null);
  const navRef = useRef(null);

  const { categories, selectedCategory, setSelectedCategory } = useArticles();

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

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(selectedCategory === category ? null : category);
  };

  return (
    <div
      ref={navbarContainerRef}
      className="fixed top-0 w-full h-full z-99 select-none"
    >
      <div
        ref={navbarLogoContainerRef}
        className="absolute top-0 left-0 w-full opacity-0 bg-background pt-8 pb-4 flex flex-col gap-5"
      >
        <div className="h-full uppercase text-sm inline mx-auto">
          {categories.map((category, index) => (
            <div
              key={index}
              onClick={() => handleCategoryClick(category)}
              className={`cursor-pointer transition-colors duration-200 inline mr-20 ${
                selectedCategory === category
                  ? "text-black font-semibold"
                  : "text-neutral-600 hover:text-black"
              }`}
            >
              {category}
            </div>
          ))}
        </div>
      </div>
      <h1 ref={navRef} className="absolute text-4xl font-bold">
        LOGO
      </h1>
    </div>
  );
};

export default Navbar;
