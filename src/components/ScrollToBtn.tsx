"use client";

import { ReactNode } from "react";
import scrollToSection from "@/utils/scrollToSection";

interface ScrollToBtnProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    selector: string;
    children: ReactNode;
}

export default function ScrollToBtn({ selector, children, onClick, ...props }: ScrollToBtnProps) {
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        scrollToSection(selector);
        onClick?.(event);
    };

    return (
        <button type="button" onClick={handleClick} {...props}>
            {children}
        </button>
    );
}
