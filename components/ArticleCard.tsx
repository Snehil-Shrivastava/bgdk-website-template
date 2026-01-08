"use client"; // Ensure this is a client component

import Image from "next/image";
import { useState } from "react";
import "./ArticleCard.css";

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

// 1. We create a sub-component for the individual card
// This ensures 'isExpanded' belongs to this specific card only.
const SingleCard = ({
  article,
  strapiURL,
}: {
  article: Article;
  strapiURL: string;
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <article
      className={`bg-background flex gap-10 relative ${
        isExpanded ? "articleCardContainerEnlarged" : "articleCardContainer"
      }`}
      onClick={handleToggle}
    >
      <div
        className={`relative cursor-pointer ${isExpanded ? "w-4/5" : "w-full"}`}
      >
        <Image
          className="object-cover transition-all duration-500 ease-in-out select-none" // Added transition to image
          src={strapiURL + article.cover.url}
          alt={article.title}
          fill
          // Update sizes so the browser downloads the high-res version for the expanded state
          priority
        />
        <div className="flex flex-col w-70 items-end absolute top-0 -left-85">
          <div className="w-12 h-12 bg-black mb-3" />
          <h3 className="text-2xl font-medium text-gray-800 text-end">
            {article.title}
          </h3>
          <span className="text-neutral-600">{article.author.name}</span>
          <span className="text-neutral-600 text-sm hide">2026</span>
        </div>
      </div>
    </article>
  );
};

// 2. The main component simply maps the data to the sub-component
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
