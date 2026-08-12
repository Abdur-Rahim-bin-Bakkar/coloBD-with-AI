"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView, useMotionValue, useMotionValueEvent } from "framer-motion";

export default function CountUp({ to, suffix = "", duration = 1.8 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const value = useMotionValue(0);

  const [display, setDisplay] = useState("0");

  useMotionValueEvent(value, "change", (latest) => {
    setDisplay(latest.toFixed(0));
  });

  useEffect(() => {
    if (inView) {
      const controls = animate(value, to, {
        duration,
        ease: [0.16, 1, 0.3, 1],
      });
      return controls.stop;
    }
  }, [inView, to, duration, value]);

  return (
    <span ref={ref} className="tabular-nums">
      {display}
      {suffix}
    </span>
  );
}