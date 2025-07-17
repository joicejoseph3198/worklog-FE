import React, { useEffect, useRef } from 'react'
import { motion, useAnimation, useInView } from "motion/react"

export const Reveal = ({ children, width = "fit-content", color = "#ff4500" }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true })

    const mainControls = useAnimation();
    const slideControls = useAnimation();

    useEffect(() => {
        if (isInView) {
            mainControls.start("end");
            slideControls.start("end");
        }
    }, [isInView, mainControls, slideControls])
    return (
        <div ref={ref} style={{ position: "relative", width, overflow: "hidden" }}>
            <motion.div
                variants={{
                    start: { opacity: 0, y: 75 },
                    end: { opacity: 1, y: 0 },
                }}
                initial="start"
                animate={mainControls}
                transition={{ duration: 0.5, delay: 0.25 }}
            >
                {children}
            </motion.div>
            <motion.div
                variants={{
                    start: { left: 0 },
                    end: { left: "100%" },
                }}
                initial="start"
                animate={slideControls}
                transition={{ duration: 0.5, ease: "easeIn" }}
                style={{
                    position: "absolute",
                    top: 4,
                    bottom: 4,
                    left: 0,
                    right: 0,
                    background: color,
                    zIndex: 20,
                }}
            >

            </motion.div>
        </div>
    )
}
