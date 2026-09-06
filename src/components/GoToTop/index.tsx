"use client";

import "./style.css";
import { scrollToTop } from "@/utils/scrollToSection";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function GoToTop() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        /* show it once the hero is scrolled past — measured, not hardcoded */
        const onScroll = () => {
            const hero = document.querySelector(".hero");
            const threshold = hero ? hero.getBoundingClientRect().height * 0.8 : window.innerHeight * 0.8;
            setVisible(window.scrollY > threshold);
        };

        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onScroll);
        return () => {
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onScroll);
        };
    }, []);

    return (
        <button
            type="button"
            className={"go-to-top" + (visible ? " visible" : "")}
            onClick={scrollToTop}
            aria-label="Go to top"
            aria-hidden={!visible}
            tabIndex={visible ? 0 : -1}
        >
            {/* the shipped arrow points left; rotating it 90deg points it up */}
            <Image src="/icons/arrow-line-light.svg" alt="" width={16} height={14} />
        </button>
    );
}
