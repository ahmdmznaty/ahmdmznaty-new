import Experience from "@/components/Experience";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import NavBar from "@/components/NavBar";
import Projects from "@/components/Projects";
import Services from "@/components/Services";
import TechStack from "@/components/TechStack";
import Testimonials from "@/components/Testimonials";

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
