"use client";
import Image from "next/image";
import React from 'react'
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";
import img1 from '@/app/assets/img/photo-1511984804822-e16ba72f5848.webp'
import img2 from '@/app/assets/img/photo-1531554694128-c4c6665f59c2.webp'

import img3 from '@/app/assets/img/photo-1593508512255-86ab42a8e620.webp'

import img4 from '@/app/assets/img/photo-1599202860130-f600f4948364.webp'

import img5 from '@/app/assets/img/photo-1602081957921-9137a5d6eaee.webp'
import img6 from '@/app/assets/img/photo-1713869791518-a770879e60dc.webp'
import img7 from '@/app/assets/img/macbook.png'


export default function Cart() {
    const cards = data.map((card, index) => (
<Card key={index} card={card} index={index} />
      ));
  return (
    <div className="w-full h-full py-20">
      <h2 className="max-w-7xl pl-4 mx-auto text-xl md:text-5xl font-bold text-neutral-800 dark:text-neutral-200 font-sans">
        Get to know your iSad.
      </h2>
      <Carousel items={cards} />
    </div>
  )
}
const DummyContent = () => {
    return (
      <>
        {[...new Array(3).fill(1)].map((_, index) => {
          return (
            <div
              key={"dummy-content" + index}
              className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4"
            >
              <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
                <span className="font-bold text-neutral-700 dark:text-neutral-200">
                  The first rule of Apple club is that you boast about Apple club.
                </span>{" "}
                Keep a journal, quickly jot down a grocery list, and take amazing
                class notes. Want to convert those notes to text? No problem.
                Langotiya jeetu ka mara hua yaar is ready to capture every
                thought.
              </p>
              <Image
                src={img7}
                alt="Macbook mockup from Aceternity UI"
                height="500"
                width="500"
                className="md:w-1/2 md:h-1/2 h-full w-full mx-auto object-contain"
              />
            </div>
          );
        })}
      </>
    );
  };
   
  const data = [
    {
      category: "Artificial Intelligence",
      title: "You can do more with AI.",
      src:img1.src,
      content: <DummyContent />,
    },
    {
      category: "Productivity",
      title: "Enhance your productivity.",
      src:img2.src,
      content: <DummyContent />,
    },
    {
      category: "Product",
      title: "Launching the new Apple Vision Pro.",
      src: img3.src,
      content: <DummyContent />,
    },
   
    {
      category: "Product",
      title: "Maps for your iPhone 15 Pro Max.",
      src: img4.src,
      content: <DummyContent />,
    },
    {
      category: "iOS",
      title: "Photography just got better.",
      src:img5.src,
      content: <DummyContent />,
    },
    {
      category: "Hiring",
      title: "Hiring for a Staff Software Engineer",
      src: img6.src,
      content: <DummyContent />,
    },
  ];
