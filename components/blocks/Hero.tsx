"use client";
import { motion } from "motion/react";
import type { Block } from "@/lib/spec";
import { Button, Eyebrow } from "@/components/ui";
import { rich } from "@/lib/text";
import { HeroVisual } from "@/components/HeroVisual";

type P = Extract<Block, { type: "hero" }>;

const rise = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const } },
};

export function Hero({ eyebrow, headline, sub, primary, secondary, image, visual, note }: P) {
  return (
    <section className="glow relative overflow-hidden pt-32 pb-section sm:pt-40">
      <div className="container-x relative">
        <motion.div
          initial="hidden"
          animate="show"
          transition={{ staggerChildren: 0.09 }}
          className="mx-auto max-w-3xl text-center"
        >
          {eyebrow && (
            <motion.div variants={rise} className="mb-7">
              <Eyebrow>{eyebrow}</Eyebrow>
            </motion.div>
          )}
          <motion.h1 variants={rise} className="font-display text-display font-semibold text-balance">
            {rich(headline)}
          </motion.h1>
          <motion.p variants={rise} className="mx-auto mt-7 max-w-xl text-lead text-ink-muted text-pretty">
            {sub}
          </motion.p>
          <motion.div variants={rise} className="mt-10 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-center">
            <Button href={primary.href} full>{primary.label}</Button>
            {secondary && (
              <Button href={secondary.href} variant="ghost" full>
                {secondary.label}
              </Button>
            )}
          </motion.div>
          {note && (
            <motion.p variants={rise} className="mt-6 text-xs text-ink-muted">
              {note}
            </motion.p>
          )}
        </motion.div>

        {(image || visual === "mockup") && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto mt-14 max-w-4xl sm:mt-20"
          >
            {image ? (
              <div className="overflow-hidden rounded-card border border-line bg-bg-raise shadow-2xl shadow-black/20">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={image} alt="" className="w-full" />
              </div>
            ) : (
              <HeroVisual />
            )}
          </motion.div>
        )}
      </div>
    </section>
  );
}
