import { useState } from "react";
import LoadingScreen from "@/components/LoadingScreen";
import CustomCursor from "@/components/CustomCursor";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import ExperienceSection from "@/components/ExperienceSection";
import ProjectsSection from "@/components/ProjectsSection";
import TechStackSection from "@/components/TechStackSection";
import PhotographySection from "@/components/PhotographySection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import GSAPInitializer from "@/components/GSAPInitializer";

const Index = () => {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
      <CustomCursor />
      <GSAPInitializer />
      <Navbar />
      <main className="overflow-hidden">
        <HeroSection />
        <AboutSection />

        <ExperienceSection />
        <ProjectsSection />
        <SkillsSection />
        {/* <TechStackSection /> */}
        <PhotographySection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
};

export default Index;
