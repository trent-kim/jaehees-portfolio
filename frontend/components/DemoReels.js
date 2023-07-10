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

  const [currentIndex, setCurrentIndex] = useState(0);
  const [length, setLength] = useState();

  useEffect(() => {
    setLength(demoReels.length);
  }, [demoReels.length, currentIndex]);

  const prev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevState) => prevState - 1);
    } else {
      setCurrentIndex(length - 1);
    }
  };
  const next = () => {
    if (currentIndex < length - 1) {
      setCurrentIndex((prevState) => prevState + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  return (
    <div className="mt-xl mr-[0px] sm:mr-xl mb-sm">
      <Field>
        <div className="flex justify-end self-end pb-[55px]">
          <Label>
            Demo Reel {demoReels[currentIndex].title}
            <br></br>
            {currentIndex + 1}/{length}
          </Label>
        </div>
        <Carousel
          infiniteLoop
          showArrows={false}
          showThumbs={false}
          showStatus={false}
          showIndicators={false}
          renderArrowPrev={(clickHandler) => {
            return (
              <div className="absolute bottom-[0px]" onClick={clickHandler}>
                <button
                  className="font-sans text-xs text-black hover:text-white bg-white hover:bg-black border-2 rounded-[5px] border-black text-center px-[12px] py-[5px]"
                  onClick={prev}
                >
                  Prev
                </button>
              </div>
            );
          }}
          renderArrowNext={(clickHandler) => {
            return (
              <div className="mt-[21px] ml-[66.7px]" onClick={clickHandler}>
                <button
                  className="font-sans text-xs text-black hover:text-white bg-white hover:bg-black border-2 rounded-[5px] border-black text-center px-[12px] py-[5px]"
                  onClick={next}
                >
                  Next
                </button>
              </div>
            );
          }}
        >
          {demoReels.map(({ playbackId }) => (
            <MuxPlayer
              loop
              muted
              autoPlay
              key={playbackId}
              ref={demoReelRef}
              className="w-full"
              streamType="on-demand"
              playbackId={playbackId}
              metadata={{ video_title: title }}
            />
          ))}
        </Carousel>
      </Field>
    </div>
  );
};

export default DemoReels;
