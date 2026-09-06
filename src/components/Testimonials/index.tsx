"use client";

import "./style.css";
import { FADE_MS, SLIDE_MS, TESTIMONIALS, TESTIMONIALS_HEAD } from "./data";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

export default function Testimonials() {
    /*
     * index and outgoing MUST live in one state object.
     *
     * When they were separate, `setIndex` committed first and `setOutgoing` only on the
     * following effect. That intermediate commit rendered the new slide ALONE — new key,
     * so the old node was unmounted, and no `staggered` class yet, so it started at
     * opacity 0. The quote area went blank for a frame and the old text then popped back
     * to full opacity to begin fading: the flash before the transition.
     *
     * Updating both in a single commit means the hand-over is complete on its very first
     * painted frame.
     */
    const [slide, setSlide] = useState<{ index: number; outgoing: number | null }>({ index: 0, outgoing: null });
    const live = useRef(slide);
    const busy = useRef(false);
    const queued = useRef<number | null>(null);

    const total = TESTIMONIALS.length;

    /*
     * A change requested mid-transition is queued, not applied immediately. Swapping the
     * incoming slide while it is still fading in tears its animation down and restarts it
     * from zero, which also reads as a flash.
     */
    const go = useCallback(
        (next: number) => {
            const target = ((next % total) + total) % total;
            const current = live.current;
            if (target === current.index) return;
            if (busy.current) {
                queued.current = target;
                return;
            }
            busy.current = true;
            const next_ = { index: target, outgoing: current.index };
            live.current = next_;
            setSlide(next_);
        },
        [total]
    );

    /* autoplay; restarts on every change so a click resets the dwell */
    useEffect(() => {
        const tick = setTimeout(() => go(slide.index + 1), SLIDE_MS);
        return () => clearTimeout(tick);
    }, [slide.index, go]);

    /* drop the outgoing copy once the hand-over is done, then flush any queued request */
    useEffect(() => {
        if (slide.outgoing === null) return;
        const done = setTimeout(() => {
            const settled = { index: live.current.index, outgoing: null };
            live.current = settled;
            setSlide(settled);
            busy.current = false;
            if (queued.current !== null) {
                const next = queued.current;
                queued.current = null;
                go(next);
            }
        }, FADE_MS);
        return () => clearTimeout(done);
    }, [slide, go]);

    const { index, outgoing } = slide;
    const active = TESTIMONIALS[index];
    const leaving = outgoing === null ? null : TESTIMONIALS[outgoing];

    return (
        <section className="section testimonials">
            <div className="section-head" data-aos="zoom-in-up">
                <h2 className="title">{TESTIMONIALS_HEAD.title}</h2>
                <p className="subtitle">{TESTIMONIALS_HEAD.subtitle}</p>
            </div>

            <div className="section-inner carousel" data-aos="zoom-in-up">
                {/* bars loop on their own timing, unrelated to the slide dwell */}
                <div className="progress top">
                    <span className="fill" />
                </div>

                <blockquote className="quote">
                    <span className="mark open" aria-hidden="true">
                        &ldquo;
                    </span>
                    <div className="swap">
                        {leaving && (
                            <p key={`out-${outgoing}`} className="text leaving" aria-hidden="true">
                                {leaving.quote}
                            </p>
                        )}
                        <p key={`in-${index}`} className={"text entering" + (leaving ? " staggered" : "")}>
                            {active.quote}
                        </p>
                    </div>
                    <span className="mark close" aria-hidden="true">
                        &ldquo;
                    </span>
                </blockquote>

                <div className="foot">
                    <div className="progress bottom">
                        <span className="fill" />
                    </div>

                    <div className="author-row">
                        {/* the client details cross-fade on exactly the same timing as the quote */}
                        <div className="swap author-swap">
                            {leaving && (
                                <div key={`aout-${outgoing}`} className="author leaving" aria-hidden="true">
                                    <span className="avatar">{leaving.initials}</span>
                                    <span className="who">
                                        <span className="name">{leaving.name}</span>
                                        <span className="role">{leaving.role}</span>
                                    </span>
                                </div>
                            )}
                            <div key={`ain-${index}`} className={"author entering" + (leaving ? " staggered" : "")}>
                                <span className="avatar">{active.initials}</span>
                                <span className="who">
                                    <span className="name">{active.name}</span>
                                    <span className="role">{active.role}</span>
                                </span>
                            </div>
                        </div>

                        <div className="controls">
                            <button type="button" className="nav prev" onClick={() => go(index - 1)} aria-label="Previous testimonial">
                                <Image src="/icons/arrow-line-dark.svg" alt="" width={16} height={14} />
                            </button>
                            {/* the light arrow points left in the file — flipped to point right on the dark button */}
                            <button type="button" className="nav next" onClick={() => go(index + 1)} aria-label="Next testimonial">
                                <Image src="/icons/arrow-line-light.svg" alt="" width={16} height={14} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
