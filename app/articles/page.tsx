"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import ArticleCard from "@/components/ArticleCard";

export interface Article {
  id: string;
  title: string;
  content: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  cover: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  author: any;
  publishedAt: Date;
}

const STRAPI_URL = "http://127.0.0.1:1337";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

const Article = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  const [articles, setArticles] = useState<Article[]>([]);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    };
    return new Date(date).toLocaleDateString("en-US", options);
  };

  useEffect(() => {
    const smoother = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 1.7,
      effects: true,
    });

    let isMounted = true;

    const fetchArticles = async () => {
      try {
        const response = await fetch(`${STRAPI_URL}/api/articles?populate=*`);
        const data = await response.json();
        if (isMounted && data.data) {
          setArticles(data.data);
        }
      } catch (error) {
        console.error("Failed to fetch articles", error);
      }
    };

    fetchArticles();

    // Scroll squeeze effect
    const handleScroll = () => {
      if (containerRef.current) {
        // Squeeze the container when scrolling
        gsap.to(containerRef.current, {
          scale: 0.9,
          duration: 1.5,
          ease: "power2.out",
        });

        // Clear existing timeout
        if (scrollTimeout.current) {
          clearTimeout(scrollTimeout.current);
        }

        // Set timeout to restore scale when scrolling stops
        scrollTimeout.current = setTimeout(() => {
          if (containerRef.current) {
            gsap.to(containerRef.current, {
              scale: 1,
              duration: 1.5,
              ease: "power2.out",
            });
          }
        }, 150);
      }
    };

    // Add scroll listener
    window.addEventListener("scroll", handleScroll);

    return () => {
      isMounted = false;
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
      if (smoother) {
        smoother.kill();
      }
    };
  }, []);

  return (
    <div ref={wrapperRef} id="smooth-wrapper" className="min-h-screen">
      <div ref={contentRef} id="smooth-content" className="p-6">
        <div className="w-full mx-auto py-20">
          <div
            ref={containerRef}
            className="flex flex-col gap-8 origin-center will-change-transform w-full max-w-170 mx-auto"
          >
            <ArticleCard articles={articles} strapiURL={STRAPI_URL} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Article;
