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
    /* the frame's own box — the only thing "is this shot tall?" needs that data cannot supply */
    const [box, setBox] = useState<{ w: number; h: number } | null>(null);
    /* auto-scroll is suspended while the reader is on the shot or has tapped it */
    const [hovered, setHovered] = useState(false);
    const [locked, setLocked] = useState(false);
    /* a hidden tab must not keep rastering a 5781px-tall screenshot */
    const [hidden, setHidden] = useState(false);

    const frame = useRef<HTMLDivElement>(null);
    const cells = useRef<(HTMLDivElement | null)[]>([]);
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

    /*
     * Previously this ran off every image's `onLoad` and always wrote a fresh array, so a
     * seven-shot project committed seven renders — and `scrolls` was a dependency of both
     * effects below, tearing them down and rebuilding them seven times, precisely while the
     * browser was busiest decoding. Now the frame reports its own size and the result is
     * bailed out of when unchanged, so this settles in a single commit and only stirs again
     * on a genuine resize.
     */
    useEffect(() => {
        const node = frame.current;
        if (!node) return;
        const read = () =>
            setBox((prev) => {
                const w = node.clientWidth;
                const h = node.clientHeight;
                return prev && prev.w === w && prev.h === h ? prev : { w, h };
            });
        read();
        const observer = new ResizeObserver(read);
        observer.observe(node);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const onVisibility = () => setHidden(document.hidden);
        document.addEventListener("visibilitychange", onVisibility);
        return () => document.removeEventListener("visibilitychange", onVisibility);
    }, []);

    /*
     * Whether a shot scrolls is now answered from `data.ts` alone. That is the whole point of
     * carrying intrinsic width/height: the old version had to download and decode an image
     * before it could tell, which forced every shot to load up front.
     */
    const isTall = useCallback((shot: Media) => (box && box.h > 0 ? ((shot.height / shot.width) * box.w) / box.h >= PAN_THRESHOLD : false), [box]);
    const tall = total > 0 && isTall(media[safe]);

    /*
     * Only the shot on screen and its two neighbours are mounted. Everything else is an empty
     * cell holding its slot in the track, so opening OffPlan decodes three images rather than
     * seven. The `total - 1` arm keeps the wrap-around neighbour ready, since stepping back
     * from the first shot lands on the last.
     */
    const near = useCallback(
        (i: number) => {
            if (total <= 3) return true;
            const gap = Math.abs(i - safe);
            return gap <= 1 || gap === total - 1;
        },
        [safe, total]
    );

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
    }, [safe, tall, paintThumb]);

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
    const paused = hovered || locked || hidden;
    useEffect(() => {
        const cell = cells.current[safe];
        if (!cell || !tall || paused) return;

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
    }, [safe, tall, paused]);

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
                    {media.map((shot, i) => (
                        <div
                            key={shot.src}
                            ref={(node) => {
                                cells.current[i] = node;
                            }}
                            className={"cell" + (i === safe ? " active" : "") + (isTall(shot) ? " tall" : "") + (shot.kind ? ` ${shot.kind}` : "")}
                            onMouseEnter={() => setHovered(true)}
                            onMouseLeave={() => setHovered(false)}
                            onPointerDown={() => setLocked((current) => !current)}
                            aria-hidden={i !== safe}
                        >
                            {near(i) && (
                                /*
                                  eslint-disable-next-line @next/next/no-img-element --
                                  next/image needs fixed width/height or `fill` + object-fit. Both fight this
                                  viewer: the first would force every screenshot into a fixed box, the second
                                  crops exactly what we are trying to show. A plain img renders the shot whole
                                  and lets a tall one scroll.
                                */
                                <img
                                    src={shot.src}
                                    alt={`${name} — ${shot.label}`}
                                    width={shot.width}
                                    height={shot.height}
                                    /* the neighbours are prefetched, but never ahead of the shot being read */
                                    fetchPriority={i === safe ? "high" : "low"}
                                    decoding="async"
                                    draggable={false}
                                />
                            )}
                        </div>
                    ))}
                </div>

                {tall && (
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
