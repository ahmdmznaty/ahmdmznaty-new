"use client";

import "./style.css";
import constants from "@/config/constants";
import ScrollToBtn from "@/components/ScrollToBtn";
import Logo from "@/components/Logo";
import { useEffect, useState } from "react";

const TABS = [
    { label: "Projects", selector: constants.sections.projects },
    { label: "Skills", selector: constants.sections.techStack },
    { label: "Experience", selector: constants.sections.experience },
];

export default function NavBar() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <header className={"nav-bar" + (scrolled ? " scrolled" : "")}>
            <ScrollToBtn selector={constants.sections.hero} className="logo" aria-label="Back to top">
                <Logo variant="dark" />
            </ScrollToBtn>

            <nav className="tabs">
                {TABS.map((tab) => (
                    <ScrollToBtn key={tab.label} selector={tab.selector} className="tab">
                        <span>{tab.label}</span>
                    </ScrollToBtn>
                ))}
            </nav>

            <div className="actions">
                <ScrollToBtn selector={constants.sections.footer} className="contact-me">
                    <span>Contact Me</span>
                </ScrollToBtn>
            </div>
        </header>
    );
}
