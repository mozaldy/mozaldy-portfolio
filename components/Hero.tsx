import React from "react";
import { Spotlight } from "./ui/spotlights";
import { TextGenerateEffect } from "./ui/text-generate-effects";
import { MagicButton } from "./ui/magic-button";
import { FaLocationArrow } from "react-icons/fa";
import { HeroHighlight, Highlight } from "./ui/hero-higlights";

const Hero = () => {
  return (
    <div className="pb-20 pt-36">
      <div className="text-center mx-auto max-w-[80vw] md:max-w-[70vw] lg:max-w-[60vw]">
        <Spotlight
          className="left-0 h-screen md:left-9 md:top-0 "
          fill="white"
        />
        <p className="uppercase tracking-widest text-xs text-slate-100 ">
          personal portfolio and blog
        </p>
        <TextGenerateEffect
          words="Enthusiastic IT student ready to create"
          className="text-center text-[40px] md:text-5xl lg:text-6xl"
        />
        <HeroHighlight>
          <p className="text-center md:tracking-wider mb-4 text-sm md:text-lg lg:text-2xl">
            Hello! I&apos;m Rizaldy, a{" "}
            <Highlight color="blue">full-stack</Highlight> web developer and{" "}
            <Highlight color="red">cybersecurity</Highlight> enthusiast from
            Indonesia
          </p>
        </HeroHighlight>
        <a href="#about">
          <MagicButton
            title="Show my work"
            icon={<FaLocationArrow />}
            position="right"
          />
        </a>
      </div>
    </div>
  );
};
export default Hero;
