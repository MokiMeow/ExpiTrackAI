import { useEffect, useContext } from "react";
import { ThemeContext } from "../App";
import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import ProblemSection from "@/components/landing/ProblemSection";
import SolutionSection from "@/components/landing/SolutionSection";
import HowItWorksSection from "@/components/landing/HowItWorksSection";
import BenefitsSection from "@/components/landing/BenefitsSection";
import TestimonialsSection from "@/components/landing/TestimonialsSection";
import UseCasesSection from "@/components/landing/UseCasesSection";
import CTASection from "@/components/landing/CTASection";
import Footer from "@/components/landing/Footer";

export default function Home() {
  const { theme } = useContext(ThemeContext);
  
  useEffect(() => {
    // Smooth scrolling for anchor links
    const handleAnchorClick = (e: Event) => {
      e.preventDefault();
      const target = e.currentTarget as HTMLAnchorElement;
      const href = target.getAttribute('href');
      if (!href) return;
      
      const element = document.querySelector(href);
      if (!element) return;
      
      const offsetTop = element.getBoundingClientRect().top + window.pageYOffset;
      
      window.scrollTo({
        top: offsetTop - 80, // Account for fixed header
        behavior: 'smooth'
      });
    };
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', handleAnchorClick);
    });
    
    // Add scroll reveal effect
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealOnScroll = () => {
      for (let i = 0; i < revealElements.length; i++) {
        const elementTop = revealElements[i].getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
          revealElements[i].classList.add('active');
        }
      }
    };
    
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Check initial state
    
    // Cleanup event listeners on unmount
    return () => {
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.removeEventListener('click', handleAnchorClick);
      });
      window.removeEventListener('scroll', revealOnScroll);
    };
  }, []);
  
  return (
    <div className={`font-sans min-h-screen transition-colors duration-300 bg-background dark:bg-gray-950 text-foreground dark:text-gray-100`}>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-100/40 via-transparent to-transparent dark:from-blue-900/20 dark:via-transparent dark:to-transparent pointer-events-none"></div>
      <Navbar />
      <main>
        <HeroSection />
        <ProblemSection />
        <SolutionSection />
        <HowItWorksSection />
        <BenefitsSection />
        <TestimonialsSection />
        <UseCasesSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
