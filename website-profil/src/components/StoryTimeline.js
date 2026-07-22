"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const storyData = [
  {
    year: "2015",
    title: "The Beginning",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    image: "/DokumPKL-Wira.jpg"
  },
  {
    year: "2018",
    title: "Exploring Passions",
    description: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    image: "/KarmelCoffee.jpg"
  },
  {
    year: "2021",
    title: "Diving into Tech",
    description: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
    image: "/P5-Ecocycle.jpg"
  },
  {
    year: "2024",
    title: "Building Projects",
    description: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet.",
    image: "/websiteprofile-eng.png"
  },
  {
    year: "2026",
    title: "Looking Forward",
    description: "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.",
    image: "/pengaduanalvinukk2026.png"
  }
];

export const StoryTimeline = () => {
  const [activeStep, setActiveStep] = useState(0);
  const stepRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute("data-index"));
            setActiveStep(index);
          }
        });
      },
      {
        rootMargin: "-45% 0px -45% 0px", 
      }
    );

    stepRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative min-h-screen py-24 px-6 md:px-16 max-w-6xl mx-auto w-full" id="story">
      {/* Header */}
      <div className="mb-12 md:mb-20 text-center relative z-10 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center"
        >
          <span className="px-4 py-1.5 rounded-full text-sm font-medium bg-zinc-100 dark:bg-zinc-800/50 text-zinc-600 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700 mb-6">
            ✦ Time Travel
          </span>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mb-4">
            My <span className="text-[#c5a059] dark:text-[#d4af37]">Story</span>
          </h2>
        </motion.div>
      </div>

      {/* Scrollytelling Container */}
      <div className="flex flex-col md:flex-row relative items-start gap-8 md:gap-16">
        
        {/* Left Column: Sticky Display */}
        <div className="sticky top-20 md:top-0 w-full md:w-[40%] h-auto md:h-screen flex flex-col justify-center items-center md:items-start z-30 py-6 md:py-0 bg-white/80 dark:bg-[#0a0a0a]/80 md:bg-transparent md:dark:bg-transparent backdrop-blur-md md:backdrop-blur-none border-b border-zinc-200 dark:border-zinc-800 md:border-none mb-4 md:mb-0 transition-all rounded-2xl md:rounded-none shadow-sm md:shadow-none">
          <div className="text-[4rem] sm:text-[5rem] md:text-[clamp(5rem,8vw,10rem)] font-black leading-none text-transparent transition-all duration-500"
               style={{ WebkitTextStroke: "2px #c5a059" }}>
            {storyData[activeStep]?.year}
          </div>
          
          {/* Progress Indicator */}
          <div className="flex gap-2 mt-4 md:mt-8">
            {storyData.map((_, index) => (
              <div 
                key={index}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  activeStep === index ? "w-10 bg-[#c5a059] dark:bg-[#d4af37]" : "w-3 bg-zinc-200 dark:bg-zinc-800"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Right Column: Scrolling Blocks */}
        <div className="w-full md:w-[60%] flex flex-col relative z-10">
          {storyData.map((item, index) => {
            const isActive = activeStep === index;
            return (
              <div
                key={index}
                ref={(el) => (stepRefs.current[index] = el)}
                data-index={index}
                className="flex flex-col justify-center w-full min-h-[60vh] md:min-h-screen py-10 transition-all duration-700"
                style={{
                  opacity: isActive ? 1 : 0.3,
                  transform: isActive ? "scale(1)" : "scale(0.95)",
                }}
              >
                <div className={`flex flex-col gap-6 p-6 md:p-8 rounded-3xl transition-colors duration-500 ${
                  isActive ? "bg-zinc-50 dark:bg-zinc-900/80 border-l-4 border-l-[#c5a059] shadow-xl backdrop-blur-sm" : "bg-transparent border-l-4 border-l-transparent"
                }`}>
                  
                  {/* Image */}
                  <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden bg-zinc-200 dark:bg-zinc-800">
                    <Image 
                      src={item.image} 
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-700 hover:scale-105"
                    />
                  </div>

                  {/* Text Content */}
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">
                      {item.title}
                    </h3>
                    <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed md:text-lg">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};