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
        quote: "We collabprated in two different projects before I founded Qumra. What stayed with me is that he's a sharp engineer who grasps things quickly — you hand him a problem and he comes back with a solution. He has a deep well of technical experience that lets him see more than one route to a solution and pick the one that best suits the project's circumstances. More important than that, he's dependable in a way you can build on: the tasks he takes on get finished, and at the standard agreed upon. Any technical team would be lucky to have him.",
        name: "Abdulsatar Abdo",
        role: "Founder & CTO, Qumra",
        initials: "AA",
    },
    {
        quote: "Your biggest advantage is your ability to grasp ideas fast, and your questions always hit the nail on the head — you spare stakeholders from having to spell out every detail.",
        name: "Abdulkareem Alramlawy",
        role: "Software Engineer",
        initials: "AA",
    },
];

export const TESTIMONIALS_HEAD = {
    title: "Testimonials",
    subtitle: "Words from the people I handed the keys to",
    /** opens the full quote — only rendered when the quote is actually clipped */
    more: "Read more",
};

/**
 * How long the closed quote popup keeps its content mounted. Must match `--t-popup` (0.65s),
 * the panel's exit transition, or the text would vanish mid-animation.
 */
export const QUOTE_EXIT_MS = 650;

/** autoplay dwell per slide */
export const SLIDE_MS = 7000;

/**
 * How long the outgoing slide stays mounted. Must cover the full staggered sequence —
 * `--t-fade-delay` + `--t-fade` (0.62s + 0.9s) — or the leaving copy would be removed
 * while it is still on screen. Independent of the progress bars, which loop on their
 * own timing in CSS.
 */
export const FADE_MS = 1550;
