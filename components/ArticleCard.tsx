"use client";

import Image from "next/image";
import "./ArticleCard.css";

import { useRef } from "react";
import { Flip } from "gsap/all";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import dog from "@/public/dog-placeholder.jpg";
export interface Article {
  id: string;
  title: string;
  content: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  cover: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  author: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  category: any;
  publishedAt: Date;
}

gsap.registerPlugin(Flip, ScrollTrigger);

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
//   const textContentRef = useRef<HTMLDivElement>(null); // Add this ref
//   const isExpanded = useRef(false);

//   const toggleAnimation = () => {
//     const mainContainer = mainContainerRef.current;
//     const imageOuterContainer = imageOuterContainerRef.current;
//     const imageInnerContainer = imageInnerContainerRef.current;
//     const image = imageRef.current;
//     const textContent = textContentRef.current; // Get the ref

//     if (
//       !mainContainer ||
//       !imageOuterContainer ||
//       !imageInnerContainer ||
//       !image ||
//       !textContent // Add check
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

//       // Remove 'hide' class after animation completes
//       tl.call(
//         () => {
//           textContent.classList.remove("hide");
//         },
//         [],
//         1.5
//       ); // At 1.5 seconds (when animation ends)

//       tl.to(textContent, {
//         opacity: 1,
//       });
//     } else {
//       // === GO SMALL ===

//       // Add 'hide' class immediately when collapsing
//       textContent.classList.add("hide");

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

//       tl.to(textContent, {
//         opacity: 1,
//       });
//     }

//     tl.eventCallback("onComplete", () => {
//       isExpanded.current = !isExpanded.current;
//     });
//   };

//   return (
//     <article
//       className={`relative select-none w-170 h-110 z-50 left-1/2 -translate-x-1/2`}
//       ref={mainContainerRef}
//     >
//       <div
//         ref={imageOuterContainerRef}
//         className={`relative cursor-pointer w-full h-full flex gap-20`}
//         onClick={toggleAnimation}
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
//         </div>

//         {/* Text Content - Add ref here */}
//         <div className="flex flex-col w-70 items-end absolute top-0 -left-85 pointer-events-none">
//           <div className="w-12 h-12 bg-black mb-3" />
//           <h3 className="text-2xl font-medium text-gray-800 text-end">
//             {article.title}
//           </h3>
//           <span className="text-neutral-600">{article.author.name}</span>
//           <span className="text-neutral-600 uppercase font-semibold">
//             {article.category.name}
//           </span>
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

const SingleCard = ({
  article,
  strapiURL,
}: {
  article: Article;
  strapiURL: string;
}) => {
  const mainContainerRef = useRef<HTMLDivElement>(null);
  const imageOuterContainerRef = useRef<HTMLDivElement>(null);
  const imageInnerContainerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const textContentRef = useRef<HTMLDivElement>(null);
  const isExpanded = useRef(false);

  const toggleAnimation = () => {
    const mainContainer = mainContainerRef.current;
    const imageOuterContainer = imageOuterContainerRef.current;
    const imageInnerContainer = imageInnerContainerRef.current;
    const image = imageRef.current;
    const textContent = textContentRef.current;

    if (
      !mainContainer ||
      !imageOuterContainer ||
      !imageInnerContainer ||
      !image ||
      !textContent
    )
      return;

    const tl = gsap.timeline();

    if (!isExpanded.current) {
      // === GO BIG ===

      const state = Flip.getState([mainContainer, imageOuterContainer]);

      imageOuterContainer.style.width = "23000px";
      mainContainer.style.height = "1100px";
      imageOuterContainer.style.height = "1100px";

      Flip.from(state, {
        duration: 1.5,
        ease: "power3.inOut",
        zIndex: 51,
      });

      tl.to(
        imageInnerContainer,
        {
          width: "1400px",
          height: "1100px",
          duration: 1.5,
          ease: "power3.inOut",
        },
        0
      );

      tl.call(
        () => {
          textContent.classList.remove("hide");
        },
        [],
        1.5
      );

      tl.to(textContent, {
        opacity: 1,
        duration: 0.5,
      });

      // Add horizontal scroll after expansion completes
      // tl.call(
      //   () => {
      //     if (!imageOuterContainer) return;

      //     const scrollWidth = imageOuterContainer.scrollWidth;
      //     const containerWidth = imageOuterContainer.offsetWidth;

      //     // Create horizontal scroll animation
      //     scrollTriggerInstance.current = ScrollTrigger.create({
      //       trigger: mainContainer,
      //       start: "top top",
      //       end: () => `+=${scrollWidth - containerWidth}`,
      //       pin: true,
      //       scrub: 1,
      //       onUpdate: (self) => {
      //         const scrollAmount =
      //           self.progress * (scrollWidth - containerWidth);
      //         gsap.set(imageOuterContainer, { x: -scrollAmount });
      //       },
      //     });
      //   },
      //   [],
      //   1.5
      // );
    } else {
      // === GO SMALL ===

      textContent.classList.add("hide");

      const state = Flip.getState([mainContainer, imageOuterContainer]);

      imageOuterContainer.style.width = "";
      mainContainer.style.height = "";
      imageOuterContainer.style.height = "";

      Flip.from(state, {
        duration: 1.5,
        ease: "power3.inOut",
        zIndex: 51,
      });

      tl.to(
        imageInnerContainer,
        {
          width: "680px",
          height: "440px",
          duration: 1.5,
          ease: "power3.inOut",
        },
        0
      );

      tl.to(textContent, {
        opacity: 0,
        duration: 0.1,
      });
    }

    tl.eventCallback("onComplete", () => {
      isExpanded.current = !isExpanded.current;
    });
  };

  return (
    <article
      className={`relative select-none w-170 h-110 z-50 left-1/2 -translate-x-1/2 will-change-transform`}
      ref={mainContainerRef}
      onClick={toggleAnimation}
    >
      <div
        ref={imageOuterContainerRef}
        className={`relative cursor-pointer w-full h-full flex gap-20`}
      >
        <div ref={imageInnerContainerRef} className="w-170 h-110 shrink-0">
          <Image
            className="w-full h-full"
            src={strapiURL + article.cover.url}
            alt={article.title}
            priority
            ref={imageRef}
            width={680}
            height={440}
          />

          <div className="absolute top-0 -left-85 w-70 flex items-end">
            <div className="flex flex-col w-70 items-end pointer-events-none">
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

        <div ref={textContentRef} className="hide opacity-0 flex">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque
            modi, fugit ducimus omnis eligendi totam numquam dolore nemo commodi
            sapiente esse. Cum iste aliquam rerum, aut explicabo corporis
            delectus obcaecati!
          </p>
          <div>
            <Image src={dog} alt="dog-placeholder" />
          </div>
        </div>
      </div>
    </article>
  );
};

const ArticleCard = ({
  articles,
  strapiURL,
}: {
  articles: Article[];
  strapiURL: string;
}) => {
  return (
    <>
      {articles.map((article) => (
        <SingleCard key={article.id} article={article} strapiURL={strapiURL} />
      ))}
    </>
  );
};

export default ArticleCard;
