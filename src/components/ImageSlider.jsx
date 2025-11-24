import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'motion/react';

export const ImageSlider = ({ slides }) => {
  const [width, setWidth] = useState(0);
  const carousel = useRef();

  useEffect(() => {
    if (carousel.current) {
      setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
    }
  }, [slides]);

  return (
    <div className="w-full max-w-[100vw] overflow-hidden bg-[var(--worklog-card-bg)] py-10">
      <motion.div 
        ref={carousel} 
        className="cursor-grab"
        whileTap={{ cursor: "grabbing" }}
      >
        <motion.div 
          drag="x" 
          dragConstraints={{ right: 0, left: -width }}
          className="flex gap-4 px-8 py-4"
        >
          {slides.map((slide, index) => (
            <motion.div 
              key={index} 
              className="relative min-w-[80vw] md:min-w-[60vw] lg:min-w-[50vw] h-[40vh] md:h-[50vh] lg:h-[60vh] p-2"
            >
              <img 
                src={slide.image} 
                alt={`Slide ${index}`} 
                className="w-full h-full object-fill rounded-md shadow-lg border border-[var(--worklog-text-medium)]/20 pointer-events-none"
              />
              {slide.text && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <h3 className="text-2xl md:text-3xl font-bold text-center text-white font-[NeueBit] tracking-wider drop-shadow-md">
                    {slide.text}
                  </h3>
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};
