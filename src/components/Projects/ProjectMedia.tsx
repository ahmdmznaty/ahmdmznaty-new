"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { ProjectMedia as Media } from "./data";

/** downward travel, px per second */
const PAN_SPEED = 130;
/** the trip back to the top — deliberately near-instant */
const RETURN_SPEED = 6500;
/** pause at the bottom before snapping back, and at the top before setting off */
const HOLD_BOTTOM_MS = 500;
const HOLD_TOP_MS = 300;
/*
 * Only genuinely long shots scroll. An ordinary landscape screenshot that merely overflows a
 * short frame is scaled down to fit instead — scrolling it would hide half of an image that
 * could simply be shown whole. 1.8 clears a 16:10 shot in the stacked (tablet) layout,
 * while a real landing page runs 3x the frame or more.
 */
const PAN_THRESHOLD = 1.8;

export default function ProjectMedia({ media, name }: { media: Media[]; name: string }) {
    const [index, setIndex] = useState(0);
    /* which shots are tall enough to scroll */
    const [scrolls, setScrolls] = useState<boolean[]>([]);
    /* auto-scroll is suspended while the reader is on the shot or has tapped it */
    const [hovered, setHovered] = useState(false);
    const [locked, setLocked] = useState(false);

    const frame = useRef<HTMLDivElement>(null);
    const cells = useRef<(HTMLDivElement | null)[]>([]);
    const images = useRef<(HTMLImageElement | null)[]>([]);
    const thumb = useRef<HTMLSpanElement>(null);
    const drag = useRef<{ startY: number; startTop: number } | null>(null);

    const total = media.length;
    /*
     * `index` is state, so it survives a props change. If this component is ever reused
     * across projects, a render can land with the previous project's index against a
     * shorter media array — `media[index]` would be undefined and the render throws.
     * The parent keys this component by slug, which remounts it; this clamp is the
     * belt to that braces, and costs nothing.
     */
    const safe = total ? Math.min(index, total - 1) : 0;
    const go = useCallback((next: number) => setIndex(((next % total) + total) % total), [total]);

    /*
     * The scrollbar is drawn rather than native. Chrome ignores `::-webkit-scrollbar` as soon as
     * `scrollbar-width` is set, and macOS then shows an overlay bar that fades away — so the
     * position indicator would vanish exactly when it is wanted. This one is always visible,
     * and draggable.
     */
    const paintThumb = useCallback(() => {
        const cell = cells.current[safe];
        const bar = thumb.current;
        if (!cell || !bar) return;
        const max = cell.scrollHeight - cell.clientHeight;
        if (max <= 0) return;
        const ratio = cell.clientHeight / cell.scrollHeight;
        const height = Math.max(28, cell.clientHeight * ratio);
        const travel = cell.clientHeight - height;
        bar.style.height = `${height}px`;
        bar.style.transform = `translateY(${(cell.scrollTop / max) * travel}px)`;
    }, [safe]);

    const measure = useCallback(() => {
        const box = frame.current;
        if (!box) return;
        setScrolls(
            images.current.map((img) => {
                if (!img || !img.complete || !img.naturalWidth) return false;
                const rendered = (img.naturalHeight / img.naturalWidth) * box.clientWidth;
                return rendered / box.clientHeight >= PAN_THRESHOLD;
            })
        );
    }, []);

    useEffect(() => {
        measure();
        window.addEventListener("resize", measure);
        return () => window.removeEventListener("resize", measure);
    }, [measure]);

    /* a new shot starts from the top, and releases any tap-hold */
    useEffect(() => {
        const cell = cells.current[safe];
        if (cell) cell.scrollTop = 0;
        setLocked(false);
    }, [safe]);

    /* follow the cell's own scroll, however it was moved — auto, wheel, drag or thumb */
    useEffect(() => {
        const cell = cells.current[safe];
        if (!cell) return;
        paintThumb();
        cell.addEventListener("scroll", paintThumb, { passive: true });
        return () => cell.removeEventListener("scroll", paintThumb);
    }, [safe, scrolls, paintThumb]);

    /* dragging the thumb maps 1:1 onto the shot's scrollable range */
    useEffect(() => {
        if (!drag.current) return;
        const onMove = (event: PointerEvent) => {
            const cell = cells.current[safe];
            const state = drag.current;
            if (!cell || !state) return;
            const max = cell.scrollHeight - cell.clientHeight;
            const ratio = cell.clientHeight / cell.scrollHeight;
            const travel = cell.clientHeight - Math.max(28, cell.clientHeight * ratio);
            cell.scrollTop = state.startTop + ((event.clientY - state.startY) / travel) * max;
        };
        const onUp = () => {
            drag.current = null;
            setLocked(false);
        };
        window.addEventListener("pointermove", onMove);
        window.addEventListener("pointerup", onUp, { once: true });
        return () => {
            window.removeEventListener("pointermove", onMove);
            window.removeEventListener("pointerup", onUp);
        };
    }, [safe, locked]);

    /*
     * The auto-scroll drives the cell's own scrollTop rather than a transform, so the reader
     * keeps a real scrollbar, a real wheel and real touch dragging — they can go straight to
     * any part of the screenshot themselves.
     */
    const paused = hovered || locked;
    useEffect(() => {
        const cell = cells.current[safe];
        if (!cell || !scrolls[safe] || paused) return;

        let raf = 0;
        let last = performance.now();
        let direction: 1 | -1 = 1;
        let holdUntil = 0;

        const step = (now: number) => {
            const dt = Math.min((now - last) / 1000, 0.05);
            last = now;

            if (now >= holdUntil) {
                const max = cell.scrollHeight - cell.clientHeight;
                const speed = direction === 1 ? PAN_SPEED : RETURN_SPEED;
                let next = cell.scrollTop + direction * speed * dt;

                if (next >= max) {
                    next = max;
                    direction = -1;
                    holdUntil = now + HOLD_BOTTOM_MS;
                } else if (next <= 0) {
                    next = 0;
                    direction = 1;
                    holdUntil = now + HOLD_TOP_MS;
                }
                cell.scrollTop = next;
            }
            raf = requestAnimationFrame(step);
        };

        raf = requestAnimationFrame(step);
        return () => cancelAnimationFrame(raf);
    }, [safe, scrolls, paused]);

    if (!total) {
        return (
            <div className="project-media empty">
                <p>Screenshots for this one are on the way.</p>
            </div>
        );
    }

    return (
        <div className="project-media">
            {/* every shot lives in the track; changing index slides it horizontally */}
            <div className="frame" ref={frame}>
                <div className="track" style={{ transform: `translateX(-${safe * 100}%)` }}>
                    {media.map((shot, i) => {
                        const tall = scrolls[i] ?? false;
                        return (
                            <div
                                key={shot.src}
                                ref={(node) => {
                                    cells.current[i] = node;
                                }}
                                className={"cell" + (i === safe ? " active" : "") + (tall ? " tall" : "") + (shot.kind ? ` ${shot.kind}` : "")}
                                onMouseEnter={() => setHovered(true)}
                                onMouseLeave={() => setHovered(false)}
                                onPointerDown={() => setLocked((current) => !current)}
                                aria-hidden={i !== safe}
                            >
                                {/*
                                  eslint-disable-next-line @next/next/no-img-element --
                                  next/image needs fixed width/height or `fill` + object-fit. Both fight this
                                  viewer: the first would force every screenshot's intrinsic size into the data
                                  file, the second crops exactly what we are trying to show. A plain img keeps
                                  the natural aspect measurable so tall shots can scroll.
                                */}
                                <img
                                    ref={(node) => {
                                        images.current[i] = node;
                                    }}
                                    src={shot.src}
                                    alt={`${name} — ${shot.label}`}
                                    onLoad={measure}
                                    decoding="async"
                                    draggable={false}
                                />
                            </div>
                        );
                    })}
                </div>

                {scrolls[safe] && (
                    <>
                        <div className="scroller" aria-hidden="true">
                            <span
                                className="thumb"
                                ref={thumb}
                                onPointerDown={(event) => {
                                    const cell = cells.current[safe];
                                    if (!cell) return;
                                    event.stopPropagation();
                                    drag.current = { startY: event.clientY, startTop: cell.scrollTop };
                                    setLocked(true);
                                }}
                            />
                        </div>
                        <span className={"pan-hint" + (paused ? " paused" : "")}>{paused ? "scroll to explore" : "hover to pause"}</span>
                    </>
                )}
            </div>

            <div className="shot-bar">
                <button type="button" className="step" onClick={() => go(safe - 1)} aria-label="Previous screenshot" disabled={total < 2}>
                    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <path d="M15 5L8 12L15 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>

                {/* dots and caption share one fully-rounded capsule */}
                <div className="capsule">
                    {total > 1 && (
                        <span className="dots" aria-hidden="true">
                            {media.map((item, i) => (
                                <span key={item.src} className={"dot" + (i === safe ? " on" : "")} />
                            ))}
                        </span>
                    )}
                    <span className="label">{media[safe].label}</span>
                </div>

                <button type="button" className="step" onClick={() => go(safe + 1)} aria-label="Next screenshot" disabled={total < 2}>
                    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <path d="M9 5L16 12L9 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
            </div>
        </div>
    );
}
