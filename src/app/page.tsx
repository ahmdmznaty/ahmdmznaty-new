import NavBar from "@/components/NavBar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Projects from "@/components/Projects";
import TechStack from "@/components/TechStack";
import Experience from "@/components/Experience";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";

export default function HomePage() {
    return (
        <>
            <NavBar />
            <main>
                <Hero />
                <Services />
                <Projects />
                <TechStack />
                <Experience />
                <Testimonials />
            </main>
            <Footer />
        </>
    );
}
