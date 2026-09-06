"use client";

import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

export default function AOSWrapper() {
    useEffect(() => {
        /*
         * `offset` is how far the element must travel INTO the viewport before it animates.
         * Keep it small: AOS needs `offset` px of document below an element's own top for it
         * to ever reach the trigger, so a large value leaves anything near the page bottom
         * stuck at opacity 0 until the reader scrolls past it.
         */
        AOS.init({ duration: 900, easing: "ease-out-cubic", once: false, offset: 80 });

        /*
         * AOS caches every element's page offset at init. This page changes height after that —
         * fonts swap in, the hero image decodes, and the experience accordion expands — which
         * leaves those cached offsets stale. Stale offsets are why cards stopped animating and
         * why opened cards left a blank gap: AOS was testing the viewport against old positions.
         */
        let frame = 0;
        const refresh = () => {
            cancelAnimationFrame(frame);
            frame = requestAnimationFrame(() => AOS.refreshHard());
        };

        window.addEventListener("load", refresh);
        document.fonts?.ready.then(refresh).catch(() => {});

        const observer = new ResizeObserver(refresh);
        observer.observe(document.body);

        return () => {
            cancelAnimationFrame(frame);
            window.removeEventListener("load", refresh);
            observer.disconnect();
        };
    }, []);

    return null;
}
