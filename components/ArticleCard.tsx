// "use client";

// import Image from "next/image";
// import "./ArticleCard.css";

// import { useRef } from "react";
// import { Flip } from "gsap/all";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { Article } from "@/context/ArticlesContext";

// gsap.registerPlugin(Flip, ScrollTrigger);

// const SingleCard = ({
//   article,
//   strapiURL,
// }: {
//   article: Article;
//   strapiURL: string;
// }) => {
//   const mainContainerRef = useRef<HTMLDivElement>(null);
//   const imageOuterContainerRef = useRef<HTMLDivElement>(null);
//   const imageInnerContainerRef = useRef<HTMLDivElement>(null);
//   const imageRef = useRef<HTMLImageElement>(null);
//   const textContentRef = useRef<HTMLDivElement>(null);
//   const isExpanded = useRef(false);

//   const toggleAnimation = () => {
//     const mainContainer = mainContainerRef.current;
//     const imageOuterContainer = imageOuterContainerRef.current;
//     const imageInnerContainer = imageInnerContainerRef.current;
//     const image = imageRef.current;
//     const textContent = textContentRef.current;

//     if (
//       !mainContainer ||
//       !imageOuterContainer ||
//       !imageInnerContainer ||
//       !image ||
//       !textContent
//     )
//       return;

//     const tl = gsap.timeline();

//     if (!isExpanded.current) {
//       // === GO BIG ===

//       const state = Flip.getState([mainContainer, imageOuterContainer]);

//       imageOuterContainer.style.width = "23000px";
//       mainContainer.style.height = "1100px";
//       imageOuterContainer.style.height = "1100px";

//       Flip.from(state, {
//         duration: 1.5,
//         ease: "power3.inOut",
//         zIndex: 51,
//       });

//       tl.to(
//         imageInnerContainer,
//         {
//           width: "1400px",
//           height: "1100px",
//           duration: 1.5,
//           ease: "power3.inOut",
//         },
//         0
//       );

//       tl.call(
//         () => {
//           textContent.classList.remove("hide");
//         },
//         [],
//         1.5
//       );

//       tl.to(textContent, {
//         display: "block",
//         opacity: 1,
//         duration: 0.5,
//       });
//     } else {
//       // === GO SMALL ===

//       textContent.classList.add("hide");

//       tl.to(textContent, {
//         display: "none",
//         opacity: 0,
//         duration: 0.01,
//       });

//       const state = Flip.getState([mainContainer, imageOuterContainer]);

//       imageOuterContainer.style.width = "";
//       mainContainer.style.height = "";
//       imageOuterContainer.style.height = "";

//       Flip.from(state, {
//         duration: 1.5,
//         ease: "power3.inOut",
//         zIndex: 51,
//       });

//       tl.to(
//         imageInnerContainer,
//         {
//           width: "680px",
//           height: "440px",
//           duration: 1.5,
//           ease: "power3.inOut",
//         },
//         0
//       );
//     }

//     tl.eventCallback("onComplete", () => {
//       isExpanded.current = !isExpanded.current;
//     });
//   };

//   return (
//     <article
//       className={`relative select-none w-170 h-110 z-50 left-1/2 -translate-x-1/2 will-change-transform`}
//       ref={mainContainerRef}
//       onClick={toggleAnimation}
//     >
//       <div
//         ref={imageOuterContainerRef}
//         className={`relative cursor-pointer w-full h-full flex gap-20`}
//       >
//         <div ref={imageInnerContainerRef} className="w-170 h-110 shrink-0">
//           <Image
//             className="w-full h-full"
//             src={strapiURL + article.cover.url}
//             alt={article.title}
//             priority
//             ref={imageRef}
//             width={680}
//             height={440}
//           />

//           <div className="absolute top-0 -left-85 w-70 flex items-end">
//             <div className="flex flex-col w-70 items-end pointer-events-none">
//               <div className="w-12 h-12 bg-black mb-3" />
//               <h3 className="text-2xl font-medium text-gray-800 text-end">
//                 {article.title}
//               </h3>
//               <span className="text-neutral-600">{article.author.name}</span>
//               <span className="text-neutral-600 uppercase font-semibold">
//                 {article.category.name}
//               </span>
//             </div>
//           </div>
//         </div>

//         <div ref={textContentRef} className="hide opacity-0">
//           <p>
//             Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque
//             modi, fugit ducimus omnis eligendi totam numquam dolore nemo commodi
//             sapiente esse. Cum iste aliquam rerum, aut explicabo corporis
//             delectus obcaecati!
//           </p>
//         </div>
//       </div>
//     </article>
//   );
// };

// const ArticleCard = ({
//   articles,
//   strapiURL,
// }: {
//   articles: Article[];
//   strapiURL: string;
// }) => {
//   return (
//     <>
//       {articles.map((article) => (
//         <SingleCard key={article.id} article={article} strapiURL={strapiURL} />
//       ))}
//     </>
//   );
// };

// export default ArticleCard;

"use client";

import Image from "next/image";
import "./ArticleCard.css";

import { useRef } from "react";
import gsap from "gsap";
import { Flip } from "gsap/all";
import { Article } from "@/context/ArticlesContext";

gsap.registerPlugin(Flip);

/* ---------------- CONSTANTS ---------------- */

const COLLAPSED = {
  width: 680,
  height: 440,
};

const EXPANDED = {
  outerWidth: 23000,
  height: 1100,
  innerWidth: 1400,
};

/* ---------------- SINGLE CARD ---------------- */

const SingleCard = ({
  article,
  strapiURL,
}: {
  article: Article;
  strapiURL: string;
}) => {
  const mainRef = useRef<HTMLDivElement>(null);
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  const isExpanded = useRef(false);
  const isAnimating = useRef(false);

  const toggleAnimation = () => {
    if (isAnimating.current) return;

    const main = mainRef.current;
    const outer = outerRef.current;
    const inner = innerRef.current;
    const text = textRef.current;

    if (!main || !outer || !inner || !text) return;

    isAnimating.current = true;

    const state = Flip.getState([main, outer]);
    const tl = gsap.timeline({
      defaults: { ease: "power3.inOut" },
      onComplete: () => {
        isExpanded.current = !isExpanded.current;
        isAnimating.current = false;
      },
    });

    if (!isExpanded.current) {
      // ===== EXPAND =====

      gsap.set(outer, {
        width: EXPANDED.outerWidth,
        height: EXPANDED.height,
      });

      gsap.set(main, { height: EXPANDED.height });

      Flip.from(state, { duration: 1.5, zIndex: 51 });

      tl.to(
        inner,
        {
          width: EXPANDED.innerWidth,
          height: EXPANDED.height,
          duration: 1.6,
        },
        0
      )
        .set(text, { display: "block" })
        .to(text, { autoAlpha: 1, duration: 0.4 });
    } else {
      // ===== COLLAPSE =====

      tl.to(text, { autoAlpha: 0, duration: 0.2 }).set(text, {
        display: "none",
      });

      tl.to(
        inner,
        {
          width: COLLAPSED.width,
          height: COLLAPSED.height,
        },
        0
      );

      gsap.set(outer, { width: "", height: "" });
      gsap.set(main, { height: "" });

      Flip.from(state, { duration: 1.5, zIndex: 51 });

      // tl.to(
      //   inner,
      //   {
      //     width: COLLAPSED.width,
      //     height: COLLAPSED.height,
      //     duration: 0.8,
      //   },
      //   0
      // );
    }
  };

  return (
    <article
      ref={mainRef}
      onClick={toggleAnimation}
      className="relative select-none w-170 h-110 z-50 will-change-transform"
    >
      <div className="absolute top-0 -left-85 w-70 flex items-end pointer-events-none">
        <div className="flex flex-col w-70 items-end">
          <div className="w-12 h-12 bg-black mb-3" />
          <h3 className="text-2xl font-medium text-gray-800 text-end">
            {article.title}
          </h3>
          <span className="text-neutral-600">{article.author.name}</span>
          <span className="text-neutral-600 uppercase font-semibold">
            {article.category.name}
          </span>
        </div>
      </div>
      <div
        ref={outerRef}
        className="relative cursor-pointer w-full h-full flex gap-20"
      >
        <div ref={innerRef} className="w-170 h-110 shrink-0 overflow-hidden">
          <Image
            src={strapiURL + article.cover.url}
            alt={article.title}
            width={COLLAPSED.width}
            height={COLLAPSED.height}
            priority
            className="w-full h-full object-cover"
          />

          <div className="absolute top-0 -left-85 w-70 flex items-end pointer-events-none">
            <div className="flex flex-col w-70 items-end">
              <div className="w-12 h-12 bg-black mb-3" />
              <h3 className="text-2xl font-medium text-gray-800 text-end">
                {article.title}
              </h3>
              <span className="text-neutral-600">{article.author.name}</span>
              <span className="text-neutral-600 uppercase font-semibold">
                {article.category.name}
              </span>
            </div>
          </div>
        </div>

        <div ref={textRef} className="opacity-0 hidden">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque
            modi, fugit ducimus omnis eligendi totam numquam dolore nemo.
          </p>
        </div>
      </div>
    </article>
  );
};

/* ---------------- LIST ---------------- */

const ArticleCard = ({
  articles,
  strapiURL,
}: {
  articles: Article[];
  strapiURL: string;
}) => {
  return articles.map((article) => (
    <SingleCard key={article.id} article={article} strapiURL={strapiURL} />
  ));
};

export default ArticleCard;
