import "./style.css";
import { FOOTER, SOCIALS } from "./data";
import constants from "@/config/constants";
import Logo from "@/components/Logo";
import Image from "next/image";

export default function Footer() {
    /* frozen at build time, which is what we want for a statically built site */
    const year = new Date().getFullYear();

    return (
        <footer className="footer" data-aos="zoom-in-up">
            <div className="footer-inner">
                <Image className="bg" src={FOOTER.background} alt="" fill priority={false} sizes="100vw" />

                <div className="content">
                    <div className="brand">
                        <Logo variant="light" />
                        <div className="names">
                            <p className="name">{constants.name}</p>
                            <p className="tagline">{FOOTER.tagline}</p>
                        </div>
                    </div>

                    <div className="contact">
                        <a className="email" href={`mailto:${constants.email}`}>
                            <Image src="/icons/mail-icon.svg" alt="" width={28} height={28} />
                            <span>{constants.email}</span>
                        </a>

                        <span className="divider" aria-hidden="true" />

                        <div className="socials">
                            {SOCIALS.map((social) => (
                                <a key={social.name} href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.name}>
                                    <Image src={social.icon} alt="" width={28} height={28} />
                                </a>
                            ))}
                        </div>
                    </div>

                    <span className="rule" aria-hidden="true" />
                    <p className="copyright">© {year}. All Rights Reserved</p>
                </div>
            </div>
        </footer>
    );
}
