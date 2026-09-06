/**
 * Smoothly scrolls a section into view by class selector.
 * Deliberately JS-driven — no `#id` anchors, so the URL never gets a hash
 * and the popup's `?project=` query stays the only thing in the address bar.
 */
export default function scrollToSection(selector: string) {
    const section = document.querySelector(selector);
    if (!section) return;

    const offset = parseInt(getComputedStyle(document.documentElement).getPropertyValue("--scroll-offset"), 10) || 120;
    const top = section.getBoundingClientRect().top + window.scrollY - offset;

    window.scrollTo({ top: Math.max(top, 0), behavior: "smooth" });
}

export function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
}
