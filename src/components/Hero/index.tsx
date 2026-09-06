import "./style.css";
import { HERO, STATS } from "./data";
import constants from "@/config/constants";
import ScrollToBtn from "@/components/ScrollToBtn";
import Image from "next/image";

export default function Hero() {
    return (
        <section className="hero">
            <div className="pattern" aria-hidden="true" />

            <div className="hero-inner">
                <div className="content" data-aos="zoom-in-up">
                    <p className="greeting">{HERO.greeting}</p>
                    <h1 className="name">
                        <span className="lead">{HERO.lead} </span>
                        {HERO.name}
                    </h1>
                    <h2 className="tagline">{HERO.tagline}</h2>
                    <p className="description">{HERO.description}</p>

                    <div className="ctas">
                        <a className="btn outline" href={constants.cv} download>
                            Download CV
                        </a>
                        <ScrollToBtn className="btn solid" selector={constants.sections.projects}>
                            See My Work
                        </ScrollToBtn>
                    </div>
                </div>

                <div className="picture" data-aos="zoom-in">
                    <Image src={HERO.picture} alt={constants.name} width={480} height={566} priority sizes="(max-width: 900px) 60vw, 480px" />
                </div>
            </div>

            <div className="stats" data-aos="zoom-in-up" data-aos-delay="150">
                {STATS.map((stat) => (
                    <div className="stat" key={stat.value + stat.label[0]}>
                        <div className="value">{stat.value}</div>
                        <div className="label">
                            {stat.label.map((line) => (
                                <span key={line}>{line}</span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
