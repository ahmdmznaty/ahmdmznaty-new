"use client";

import "./style.css";
import { EXPERIENCE_HEAD, JOBS } from "./data";
import constants from "@/config/constants";
import ScrollToBtn from "@/components/ScrollToBtn";
import { Fragment, useState } from "react";

export default function Experience() {
    /* one open at a time — clicking the open card closes it */
    const [openId, setOpenId] = useState<string | null>(JOBS[0].id);

    return (
        <section className="section surface experience">
            <div className="section-head flipped" data-aos="zoom-in-up">
                <h2 className="title">{EXPERIENCE_HEAD.title}</h2>
                <p className="subtitle">{EXPERIENCE_HEAD.subtitle}</p>
            </div>

            <div className="section-inner timeline">
                {JOBS.map((job, index) => {
                    const open = openId === job.id;
                    const panelId = `exp-panel-${job.id}`;

                    return (
                        <Fragment key={job.id}>
                            <div className="aos-item" data-aos="zoom-in-up">
                                <article className={"exp-card" + (open ? " open" : "")}>
                                    {/*
                                     * Figma puts the connector INSIDE the lower card (a "Cover" frame at
                                     * y=-50), so it fades in and out with that card rather than on its own.
                                     */}
                                    {index > 0 && (
                                        <span className="connector" aria-hidden="true">
                                            <span className="line" />
                                            <span className="dot-top" />
                                            <span className="dot-bottom" />
                                        </span>
                                    )}
                                    <button
                                        type="button"
                                        className="exp-head"
                                        onClick={() => setOpenId(open ? null : job.id)}
                                        aria-expanded={open}
                                        aria-controls={panelId}
                                    >
                                        <span className="identity">
                                            <span className="badge">{job.letter}</span>
                                            <span className="titles">
                                                <span className="company">
                                                    {job.company} • {job.context}
                                                </span>
                                                <span className="role">{job.role}</span>
                                            </span>
                                        </span>

                                        <span className="meta">
                                            <span className="when">
                                                <span className="period">{job.period}</span>
                                                <span className="location">{job.location}</span>
                                            </span>
                                            <span className="expand" aria-hidden="true">
                                                <svg viewBox="0 0 24 24" fill="none">
                                                    <path
                                                        d="M6 9L12 15L18 9"
                                                        stroke="currentColor"
                                                        strokeWidth="2.2"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                </svg>
                                            </span>
                                        </span>
                                    </button>

                                    {/* 0fr -> 1fr animates to the content's real height without a magic max-height */}
                                    <div className="exp-panel" id={panelId} role="region" aria-hidden={!open}>
                                        <div className="exp-panel-inner">
                                            <ul className="tags">
                                                {job.tags.map((tag) => (
                                                    <li className="tag" key={tag}>
                                                        {tag}
                                                    </li>
                                                ))}
                                            </ul>
                                            <ul className="highlights">
                                                {job.highlights.map((highlight) => (
                                                    <li key={highlight}>
                                                        <span className="dot" aria-hidden="true" />
                                                        <span className="text">{highlight}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </article>
                            </div>
                        </Fragment>
                    );
                })}
            </div>

            <div className="section-tail" data-aos="zoom-in-up">
                <p className="note">{EXPERIENCE_HEAD.note}</p>
                <ScrollToBtn className="btn solid" selector={constants.sections.footer}>
                    {EXPERIENCE_HEAD.cta}
                </ScrollToBtn>
            </div>
        </section>
    );
}
