export interface Testimonial {
    quote: string;
    name: string;
    /** shown uppercase — "ROLE, COMPANY" */
    role: string;
    initials: string;
}

/*
 * PLACEHOLDERS — these are not real endorsements.
 * The first quote is the one written in the Figma design; the rest follow its shape.
 * Replace all of them (and the names/roles) with real testimonials before going live.
 */
export const TESTIMONIALS: Testimonial[] = [
    {
        quote: "He took a rough spec and turned it into a product we could actually sell, then stayed on the parts nobody else wanted to touch.",
        name: "Client Name",
        role: "Founder, Company",
        initials: "CN",
    },
    {
        quote: "He owned the whole stack without needing to be managed, and the parts he shipped first are still the parts we never have to think about.",
        name: "Client Name",
        role: "Product Lead, Company",
        initials: "CN",
    },
    {
        quote: "We handed him the messiest half of the roadmap and he came back with something simpler than what we asked for, and faster.",
        name: "Client Name",
        role: "CTO, Company",
        initials: "CN",
    },
];

export const TESTIMONIALS_HEAD = {
    title: "Testimonials",
    subtitle: "Words from the people I handed the keys to",
};

/** autoplay dwell per slide */
export const SLIDE_MS = 7000;

/**
 * How long the outgoing slide stays mounted. Must cover the full staggered sequence —
 * `--t-fade-delay` + `--t-fade` (0.62s + 0.9s) — or the leaving copy would be removed
 * while it is still on screen. Independent of the progress bars, which loop on their
 * own timing in CSS.
 */
export const FADE_MS = 1550;
