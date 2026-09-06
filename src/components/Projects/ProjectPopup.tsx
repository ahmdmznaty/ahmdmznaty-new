"use client";

import { PROJECT_QUERY, PROJECTS } from "./data";
import ProjectMedia from "./ProjectMedia";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

export default function ProjectPopup() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const panelRef = useRef<HTMLDivElement>(null);

    const slug = searchParams.get(PROJECT_QUERY);
    const project = PROJECTS.find((item) => item.slug === slug);

    /* keep the last known project while closing so the exit animation still has content */
    const [shown, setShown] = useState(project);
    useEffect(() => {
        if (project) setShown(project);
    }, [project]);

    const close = useCallback(() => router.push(pathname, { scroll: false }), [router, pathname]);

    /* an unknown slug is not a valid state — drop it rather than showing an empty shell */
    useEffect(() => {
        if (slug && !project) router.replace(pathname, { scroll: false });
    }, [slug, project, router, pathname]);

    useEffect(() => {
        if (!project) return;

        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") close();
        };

        /* lock the page behind the popup, compensating for the scrollbar so nothing shifts */
        const scrollbar = window.innerWidth - document.documentElement.clientWidth;
        const { overflow, paddingRight } = document.body.style;
        document.body.style.overflow = "hidden";
        if (scrollbar > 0) document.body.style.paddingRight = `${scrollbar}px`;

        document.addEventListener("keydown", onKeyDown);
        panelRef.current?.focus();

        return () => {
            document.removeEventListener("keydown", onKeyDown);
            document.body.style.overflow = overflow;
            document.body.style.paddingRight = paddingRight;
        };
    }, [project, close]);

    if (!shown) return null;

    return (
        <div className={"project-popup" + (project ? " open" : "")} onClick={close} role="presentation" aria-hidden={!project}>
            <div
                className="panel"
                ref={panelRef}
                tabIndex={-1}
                role="dialog"
                aria-modal="true"
                aria-label={shown.name}
                onClick={(event) => event.stopPropagation()}
            >
                <button type="button" className="close" onClick={close} aria-label="Close">
                    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <path d="M6 6L18 18M18 6L6 18" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
                    </svg>
                </button>

                {/* every main detail sits above the slider */}
                <header className="head">
                    <div className="ident">
                        <Image className="logo" src={shown.logo} alt={`${shown.name} logo`} width={84} height={84} />
                        <div className="titles">
                            <h3 className="name">{shown.name}</h3>
                            <p className="tagline">{shown.tagline}</p>
                        </div>
                        <span className={"status " + shown.status.toLowerCase().replace(/\s+/g, "-")}>{shown.status}</span>
                    </div>

                    {/* sector, year and site sit under the identity as their own pill strip */}
                    <ul className="meta">
                        <li className="pill">{shown.sector}</li>
                        <li className="pill">{shown.year}</li>
                        {shown.domain && (
                            <li className="pill link">
                                <a href={shown.url ?? `https://${shown.domain}`} target="_blank" rel="noopener noreferrer">
                                    {shown.domain}
                                </a>
                            </li>
                        )}
                    </ul>
                </header>

                {/* `display: contents` on wide screens, a single scroll region when stacked */}
                <div className="body">
                    {/*
                      keyed by slug: switching projects must remount the viewer, otherwise its
                      index and DOM refs carry over from the previous project's longer media list.
                    */}
                    <ProjectMedia key={shown.slug} media={shown.media} name={shown.name} />

                    <div className="info">
                        <section className="block">
                            <h4>Project Brief</h4>
                            <p className="summary">{shown.summary}</p>
                        </section>

                        {shown.highlights.length > 0 && (
                            <section className="block">
                                <h4>What I Built</h4>
                                <ul className="highlights">
                                    {shown.highlights.map((line) => (
                                        <li key={line}>
                                            <span className="dot" aria-hidden="true" />
                                            <span>{line}</span>
                                        </li>
                                    ))}
                                </ul>
                            </section>
                        )}

                        {shown.stack.length > 0 && (
                            <section className="block">
                                <h4>Stack</h4>
                                <ul className="stack">
                                    {shown.stack.map((tech) => (
                                        <li className="chip" key={tech}>
                                            {tech}
                                        </li>
                                    ))}
                                </ul>
                            </section>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
