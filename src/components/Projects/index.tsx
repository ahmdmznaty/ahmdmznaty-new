import "./style.css";
import { PROJECTS, PROJECTS_HEAD } from "./data";
import ProjectCard from "./ProjectCard";
import ProjectPopup from "./ProjectPopup";
import constants from "@/config/constants";
import ScrollToBtn from "@/components/ScrollToBtn";
import { Suspense } from "react";

export default function Projects() {
    return (
        <section className="section surface projects">
            <div className="section-head flipped" data-aos="zoom-in-up">
                <h2 className="title">{PROJECTS_HEAD.title}</h2>
                <p className="subtitle">{PROJECTS_HEAD.subtitle}</p>
            </div>

            <div className="section-inner cards">
                {PROJECTS.map((project, index) => (
                    <ProjectCard key={project.slug} project={project} delay={(index % 3) * 100} />
                ))}
            </div>

            <div className="section-tail" data-aos="zoom-in-up">
                <p className="note">{PROJECTS_HEAD.note}</p>
                <ScrollToBtn className="btn solid" selector={constants.sections.footer}>
                    {PROJECTS_HEAD.cta}
                </ScrollToBtn>
            </div>

            {/* useSearchParams needs a boundary so the rest of the page still prerenders */}
            <Suspense fallback={null}>
                <ProjectPopup />
            </Suspense>
        </section>
    );
}
