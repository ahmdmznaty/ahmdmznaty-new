"use client";

import "./style.css";
import { FADE_MS, QUOTE_EXIT_MS, SLIDE_MS, TESTIMONIALS, TESTIMONIALS_HEAD } from "./data";
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
     * Which quotes are actually clipped by the 3-line clamp. Measured rather than guessed,
     * because the clamp depends on the font metrics and on the breakpoint's font size.
     *
     * Only the slide on screen can be measured, so results are cached per index as each one
     * comes round. That is enough to cover the outgoing copy too: a slide can only ever be
     * leaving if it was the active one first, so by then it has already been measured.
     */
    const [clipped, setClipped] = useState<boolean[]>([]);
    const textRef = useRef<HTMLParagraphElement>(null);

    /* index whose full quote is open in the popup; null when closed */
    const [expanded, setExpanded] = useState<number | null>(null);
    /* held through the exit animation so the panel does not blank out mid-fade */
    const [lingering, setLingering] = useState<number | null>(null);

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
        /* never rotate the slide out from under someone reading the full quote */
        if (expanded !== null) return;
        const tick = setTimeout(() => go(slide.index + 1), SLIDE_MS);
        return () => clearTimeout(tick);
    }, [slide.index, go, expanded]);

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

    /*
     * `scrollHeight > clientHeight` is the clamp's own overflow, so this asks the browser
     * rather than counting characters. Re-run on resize and once webfonts land, since both
     * change where the lines break. The setter bails out when nothing changed, so this never
     * turns into a render loop.
     */
    const measureClip = useCallback(() => {
        const el = textRef.current;
        if (!el) return;
        const over = el.scrollHeight > el.clientHeight + 1;
        setClipped((prev) => {
            if (prev[slide.index] === over) return prev;
            const next = [...prev];
            next[slide.index] = over;
            return next;
        });
    }, [slide.index]);

    useEffect(() => {
        measureClip();
        window.addEventListener("resize", measureClip);
        let live = true;
        document.fonts?.ready.then(() => live && measureClip());
        return () => {
            live = false;
            window.removeEventListener("resize", measureClip);
        };
    }, [measureClip]);

    useEffect(() => {
        if (expanded !== null) setLingering(expanded);
    }, [expanded]);

    /* drop the content once the exit transition has run */
    useEffect(() => {
        if (expanded !== null) return;
        const drop = setTimeout(() => setLingering(null), QUOTE_EXIT_MS);
        return () => clearTimeout(drop);
    }, [expanded]);

    /* escape to close, and lock the page behind the panel without shifting it */
    useEffect(() => {
        if (expanded === null) return;
        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") setExpanded(null);
        };
        const scrollbar = window.innerWidth - document.documentElement.clientWidth;
        const { overflow, paddingRight } = document.body.style;
        document.body.style.overflow = "hidden";
        if (scrollbar > 0) document.body.style.paddingRight = `${scrollbar}px`;
        document.addEventListener("keydown", onKeyDown);
        return () => {
            document.removeEventListener("keydown", onKeyDown);
            document.body.style.overflow = overflow;
            document.body.style.paddingRight = paddingRight;
        };
    }, [expanded]);

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
                    {/*
                      The clamp lives on `.text`, so the button has to be its sibling — inside
                      the clamped box it would simply be clipped away with the fourth line.
                    */}
                    <div className="swap">
                        {leaving && (
                            <div key={`out-${outgoing}`} className="quote-body leaving" aria-hidden="true">
                                <p className="text">{leaving.quote}</p>
                                {/* a span, not a button: the outgoing copy must not be focusable */}
                                <span className={"more" + (outgoing !== null && clipped[outgoing] ? "" : " ghost")}>{TESTIMONIALS_HEAD.more}</span>
                            </div>
                        )}
                        <div key={`in-${index}`} className={"quote-body entering" + (leaving ? " staggered" : "")}>
                            <p className="text" ref={textRef}>
                                {active.quote}
                            </p>
                            {/*
                              Always rendered, hidden with `visibility` when the quote is not
                              clipped. Dropping it from the DOM instead would shrink the slide by
                              the button's height, so the whole carousel jumped ~41px every time
                              rotation landed on a short quote. `visibility: hidden` keeps the
                              space, and takes the element out of the tab order and a11y tree.
                            */}
                            <button
                                type="button"
                                className={"more" + (clipped[index] ? "" : " ghost")}
                                onClick={() => setExpanded(index)}
                                disabled={!clipped[index]}
                            >
                                {TESTIMONIALS_HEAD.more}
                            </button>
                        </div>
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

            {lingering !== null && (
                <div
                    className={"quote-popup" + (expanded !== null ? " open" : "")}
                    onClick={() => setExpanded(null)}
                    role="presentation"
                    aria-hidden={expanded === null}
                >
                    <div
                        className="panel"
                        role="dialog"
                        aria-modal="true"
                        aria-label={`Testimonial from ${TESTIMONIALS[lingering].name}`}
                        onClick={(event) => event.stopPropagation()}
                    >
                        <button type="button" className="close" onClick={() => setExpanded(null)} aria-label="Close">
                            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                <path d="M6 6L18 18M18 6L6 18" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
                            </svg>
                        </button>

                        {/*
                          Same structure as the carousel's own blockquote, so the opening mark
                          top-left and the rotated closing mark bottom-right come straight from
                          `.testimonials .quote` — only the sizes are overridden for the panel.
                        */}
                        <blockquote className="quote">
                            <span className="mark open" aria-hidden="true">
                                &ldquo;
                            </span>
                            <p className="full">{TESTIMONIALS[lingering].quote}</p>
                            <span className="mark close" aria-hidden="true">
                                &ldquo;
                            </span>
                        </blockquote>

                        <div className="author">
                            <span className="avatar">{TESTIMONIALS[lingering].initials}</span>
                            <span className="who">
                                <span className="name">{TESTIMONIALS[lingering].name}</span>
                                <span className="role">{TESTIMONIALS[lingering].role}</span>
                            </span>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}
