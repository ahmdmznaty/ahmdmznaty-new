"use client";

import { PROJECT_QUERY, PROJECTS_HEAD, type Project } from "./data";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

export default function ProjectCard({ project, delay = 0 }: { project: Project; delay?: number }) {
    const router = useRouter();
    const pathname = usePathname();

    /* the popup is a url state, not a component state — opening it is just a query push */
    const open = () => router.push(`${pathname}?${PROJECT_QUERY}=${project.slug}`, { scroll: false });

    return (
        <div className="aos-item" data-aos="zoom-in-up" data-aos-delay={delay}>
            <article className="project-card">
                <div className="banner">
                    <span className="pattern" aria-hidden="true" />
                    <Image className="logo" src={project.logo} alt={`${project.name} logo`} width={84} height={84} />
                    <div className="names">
                        <h3 className="name">{project.name}</h3>
                        <p className="tagline">{project.tagline}</p>
                    </div>
                </div>

                <div className="body">
                    <p className="description">{project.description}</p>
                    <button type="button" className="btn outline explore" onClick={open}>
                        {PROJECTS_HEAD.explore}
                    </button>
                </div>
            </article>
        </div>
    );
}
