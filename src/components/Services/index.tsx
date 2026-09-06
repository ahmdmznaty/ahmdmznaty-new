import "./style.css";
import { FEATURE_ICON, SERVICES, SERVICES_HEAD } from "./data";
import constants from "@/config/constants";
import ScrollToBtn from "@/components/ScrollToBtn";
import Image from "next/image";

export default function Services() {
    return (
        <section className="section services">
            <div className="section-head" data-aos="zoom-in-up">
                <h2 className="title">{SERVICES_HEAD.title}</h2>
                <p className="subtitle">{SERVICES_HEAD.subtitle}</p>
            </div>

            <div className="section-inner cards">
                {SERVICES.map((service, index) => (
                    <div className="aos-item" key={service.title} data-aos="zoom-in-up" data-aos-delay={index * 100}>
                        <article className="service-card">
                            <div className="head">
                                <Image className="icon" src={service.icon} alt="" width={56} height={56} />
                                <div className="text">
                                    <h3 className="title">{service.title}</h3>
                                    <p className="subtitle">{service.subtitle}</p>
                                </div>
                            </div>

                            <span className="divider" />

                            <ul className="features">
                                {service.features.map((feature) => (
                                    <li key={feature}>
                                        <Image src={FEATURE_ICON} alt="" width={30} height={30} />
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </article>
                    </div>
                ))}
            </div>

            <div className="section-tail" data-aos="zoom-in-up">
                <p className="note">{SERVICES_HEAD.note}</p>
                <ScrollToBtn className="btn outline" selector={constants.sections.footer}>
                    {SERVICES_HEAD.cta}
                </ScrollToBtn>
            </div>
        </section>
    );
}
