import React, { useState, useEffect, useRef } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import MuxPlayer from "@mux/mux-player-react";

import Field from "/components/Field";
import Label from "/components/Label";

const DemoReels = ({ demoReels }) => {
  const demoReelRef = useRef(null);

  const attemptAutoPlay = () => {
    demoReelRef &&
      demoReelRef.current &&
      demoReelRef.current.play().catch((error) => {
        console.error("Error attempting to auto play", error);
      });
  };

  useEffect(() => {
    attemptAutoPlay();
  }, []);

  const { title } = demoReels;

  const demoButtonRef = useRef({});

  const demoReelButton = (i) => {
    toggleDemoReelButton(i);
    setCurrentIndex(i);
    // console.log(demoReelButtonRef)
  };

  const toggleDemoReelButton = (i) => {
    setCurrentDemo(i);
    {
      demoReels.map(
        ({ title }, l) => (
          (demoButtonRef.current[l].style.background = "var(--color-white)"),
          (demoButtonRef.current[l].style.color = "var(--color-black)")
        )
      );
    }
    demoButtonRef.current[i].style.color = "var(--color-white)";
    demoButtonRef.current[i].style.background = "var(--color-black)";
  };

  const [currentIndex, setCurrentIndex] = useState(0);
  const [length, setLength] = useState();
  const [translation, setTranslation] = useState("0%");
  // const [ratio, setRatio] = useState('100');
  // console.log(carousel)

  useEffect(() => {
    setLength(demoReels.length);
    // setRatio(carousel.ratio)
    // setRatio('67')
    console.log(currentIndex);
    if (currentIndex === 0) {
      setTranslation("0%");
    } else {
      setTranslation(`${currentIndex * -100}%`);
    }
  }, [demoReels.length, currentIndex]);

  const prev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevState) => prevState - 1);
      toggleDemoReelButton(currentIndex - 1);
    } else {
      setCurrentIndex(length - 1);
      toggleDemoReelButton(length - 1);
    }
  };
  const next = () => {
    if (currentIndex < length - 1) {
      setCurrentIndex((prevState) => prevState + 1);
      toggleDemoReelButton(currentIndex + 1);
    } else {
      setCurrentIndex(0);
      toggleDemoReelButton(0);
    }
  };

  const [currentDemo, setCurrentDemo] = useState(0);

  // On hover, underline category
  const demoMouseEnter = (i) => {
    demoButtonRef.current[i].style.color = "var(--color-white)";
    demoButtonRef.current[i].style.background = "var(--color-black)";
  };

  const demoMouseLeave = (i) => {
    demoButtonRef.current[i].style.color = "var(--color-black)";
    demoButtonRef.current[i].style.background = "var(--color-white)";
    demoButtonRef.current[currentDemo].style.color = "var(--color-white)";
    demoButtonRef.current[currentDemo].style.background = "var(--color-black)";
  };

  return (
    <div className="pt-[88px] md:pt-[52px] relative">
      <div className="sticky top-[88px] md:top-[52px] bg-white justify-between items-center border-b border-black px-sm py-xs z-20">
        <div className="md:grid md:grid-cols-6 xl:grid-cols-8">
          {/* <button className="hover:cursor group ">
                    <div onClick={prev} className="text-black text-sm transition-transform duration-500 ease-in-out group-hover:-translate-x-[3px]">
                    &lt;
                    </div>
                </button> */}
          <div className="font-mono text-xs text-black py-[6px] w-[128px] col-span-1">
            Demo Reels
          </div>
          <div className="flex mt-xs md:mt-[0px]">
            {demoReels.map(({ title }, i) => (
              <button
                key={i}
                ref={(element) => (demoButtonRef.current[i] = element)}
                onMouseEnter={() => demoMouseEnter(i)}
                onMouseLeave={() => demoMouseLeave(i)}
                onClick={() => {
                  demoReelButton(i);
                }}
                className="first:text-white first:bg-black font-mono text-xs text-black hover:text-white bg-white hover:bg-black border rounded-[0px] border-black text-center px-[10px] py-[6px]"
              >
                {title}
              </button>
            ))}
          </div>
          {/* <button className="group">
                    <div onClick={next} className="text-black text-sm transition-transform duration-500 ease-in-out group-hover:translate-x-[3px]">
                    &gt;
                    </div>
                </button> */}
        </div>
      </div>
      <div className="relative min-w-full overflow-hidden">
        <div
          className="relative transition-all duration-500  ease-[cubic-bezier(.23,1,.32,1)] top-0 flex"
          style={{ transform: "translate3d(" + translation + ", 0px, 0px)" }}
        >
          {demoReels.map(({ playbackId }) => (
            <MuxPlayer
              loop
              muted
              autoPlay
              key={playbackId}
              ref={demoReelRef}
              className="last:left-[100%] first:relative absolute w-full first:h-full top-0 whitespace-nowrap"
              streamType="on-demand"
              playbackId={playbackId}
              metadata={{ video_title: title }}
            />
          ))}
        </div>
        {/* <div className="absolute w-full h-full flex top-[0px]">
        <div
          className="w-1/2 h-full z-10 border"
          onClick={() => {
            prev();
          }}
        ></div>
        <div
          className="w-1/2 h-full z-10 border"
          onClick={() => {
            next();
          }}
        ></div>
      </div> */}
      </div>
    </div>
  );
};

export default DemoReels;
