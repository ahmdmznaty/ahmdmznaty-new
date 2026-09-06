import "./style.css";
import constants from "@/config/constants";
import Image from "next/image";

/**
 * The raw svgs in `public/icons` are only the inner glyph (40x35).
 * Figma wraps it in a 60x60 rounded square (rx 14) — that square lives here,
 * so the nav and the footer share one source of truth.
 *
 * dark  = navy square, white glyph   (nav bar)
 * light = white square, navy glyph   (footer)
 */
export default function Logo({ variant = "dark", className = "" }: { variant?: "dark" | "light"; className?: string }) {
    return (
        <span className={`logo-mark ${variant} ${className}`.trim()}>
            <Image
                src={variant === "dark" ? "/icons/my-logo-white.svg" : "/icons/my-logo-dark.svg"}
                alt={constants.name}
                width={40}
                height={35}
                priority
            />
        </span>
    );
}
