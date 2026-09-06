import "./style.css";
import { STACK, STACK_HEAD } from "./data";
import constants from "@/config/constants";
import ScrollToBtn from "@/components/ScrollToBtn";

export default function TechStack() {
    return (
        <section className="section tech-stack">
            <div className="section-head" data-aos="zoom-in-up">
                <h2 className="title">{STACK_HEAD.title}</h2>
                <p className="subtitle">{STACK_HEAD.subtitle}</p>
            </div>

            <div className="section-inner grid">
                {STACK.map((group, index) => (
                    <div className={"aos-item" + (group.wide ? " wide" : "")} key={group.no} data-aos="zoom-in-up" data-aos-delay={(index % 3) * 80}>
                        <article className={"stack-card" + (group.wide ? " wide" : "")}>
                            <div className="head">
                                <span className="badge">{group.no}</span>
                                <h3 className="title">{group.title}</h3>
                            </div>
                            <ul className="items">
                                {group.items.map((item) => (
                                    <li className="chip" key={item}>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </article>
                    </div>
                ))}
            </div>

            <div className="section-tail" data-aos="zoom-in-up">
                <p className="note">{STACK_HEAD.note}</p>
                <ScrollToBtn className="btn outline" selector={constants.sections.footer}>
                    {STACK_HEAD.cta}
                </ScrollToBtn>
            </div>
        </section>
    );
}
