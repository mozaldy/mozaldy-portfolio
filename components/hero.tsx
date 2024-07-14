import React from "react";
import { Spotlight } from "./ui/spotlights";
import { TextGenerateEffect } from "./ui/text-generate-effects";
import { MagicButton } from "./ui/magic-button";
import { FaLocationArrow } from "react-icons/fa";
import { HeroHighlight, Highlight } from "./ui/hero-higlights";

const Hero = () => {
  return (
    <div className="pb-20 pt-36">
      <div>
        <Spotlight
          className="left-0 h-screen md:left-9 md:top-0 "
          fill="white"
        />
      </div>
      <div className="z-[-10] bg-slate-950 fixed inset-0 bg-[radial-gradient(circle_500px_at_50%_200px,#034a4391,transparent)]" />
      <div className="h-[50rem] w-full top-0 dark:bg-dot-white/[0.2] bg-dot-black/[0.2] absolute flex items-center justify-center">
        <div className="absolute pointer-events-none  inset-0 flex items-center justify-center [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      </div>
      <div className="flex justify-center relative my-20 z-10">
        <div className="max-w-[89vw] md:max-w-2xl lg:max-w-[60vw] flex flex-col items-center justify-center">
          <p className="uppercase tracking-widest text-xs text-center text-slate-100 max-w-80">
            personal portfolio website
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
    </div>
  );
};
export default Hero;
