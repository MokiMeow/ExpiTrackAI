import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  
  useEffect(() => {
    if (headingRef.current) {
      const spans = headingRef.current.querySelectorAll('span');
      
      gsap.fromTo(spans, {
        opacity: 0,
        y: 30,
        skewY: 10
      }, {
        opacity: 1,
        y: 0,
        skewY: 0,
        stagger: 0.2,
        duration: 1,
        ease: "power3.out",
        delay: 0.5
      });
    }
    
    // Floating elements animation
    if (imageContainerRef.current) {
      const floatingElements = imageContainerRef.current.querySelectorAll('.floating');
      
      floatingElements.forEach((el, index) => {
        gsap.to(el, {
          y: index % 2 === 0 ? -15 : 15,
          duration: 2 + (index * 0.2),
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: index * 0.1
        });
      });
    }
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <section id="hero" ref={sectionRef} className="relative overflow-hidden pt-24 md:pt-10 pb-16 md:pb-20 min-h-screen">
      {/* Animated background */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-100/30 via-transparent to-transparent dark:from-blue-900/20 dark:via-transparent dark:to-transparent"></div>
      <div className="absolute inset-0 -z-10 bg-[conic-gradient(at_top_right,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent dark:from-blue-600/20"></div>
      
      {/* Network particle graphics */}
      <div className="absolute inset-0 -z-5 opacity-20">
        <div className="absolute h-40 w-40 rounded-full bg-blue-600/30 blur-3xl top-1/4 left-1/4 animate-pulse"></div>
        <div className="absolute h-56 w-56 rounded-full bg-indigo-600/20 blur-3xl bottom-1/3 right-1/4 animate-pulse animation-delay-2000"></div>
        <div className="absolute h-36 w-36 rounded-full bg-purple-600/20 blur-3xl top-1/3 right-1/3 animate-pulse animation-delay-4000"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center min-h-[80vh]">
          {/* Text content */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="pt-10 md:pt-0 md:pr-8 order-2 md:order-1"
          >
            <motion.h1 
              ref={headingRef}
              className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight mb-8"
            >
              <span className="block mb-2 dark:text-white">Stop Wasting.</span>
              <span className="block mb-2 dark:text-white">Start Tracking.</span>
              <span className="gradient-text">Save the Planet.</span>
            </motion.h1>
            
            <motion.p 
              variants={itemVariants}
              className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-10"
            >
              AI-powered expiry tracking for homes, restaurants, and retailers. 
              Reduce waste, save money, and protect health with intelligent alerts.
            </motion.p>
            
            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 sm:gap-6"
            >
              <a href="#cta" className="group glow-effect">
                <span className="relative inline-flex items-center justify-center px-8 py-3.5 font-semibold text-white rounded-full neon-button">
                  Get Started Free
                </span>
              </a>
              
              <motion.a
                href="#how-it-works"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex justify-center items-center px-8 py-3.5 font-semibold rounded-full text-gray-700 dark:text-white bg-white/80 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700 shadow-sm hover:bg-white dark:hover:bg-gray-800/80 transition-all duration-300 glassmorphism"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                Watch Demo
              </motion.a>
            </motion.div>
            
            <motion.div 
              variants={itemVariants}
              className="mt-10 flex items-center gap-3"
            >
              <div className="flex -space-x-2">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className={`w-10 h-10 rounded-full border-2 border-white dark:border-gray-800 ${i === 0 ? 'bg-blue-500' : i === 1 ? 'bg-green-500' : i === 2 ? 'bg-purple-500' : 'bg-pink-500'}`}></div>
                ))}
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                <span className="font-semibold">2,500+</span> happy users already tracking their products
              </p>
            </motion.div>
          </motion.div>
          
          {/* 3D visualization */}
          <motion.div 
            variants={itemVariants}
            className="order-1 md:order-2 mt-0 md:mt-0 relative"
            style={{ y, opacity }}
            ref={imageContainerRef}
          >
            <div className="relative mx-auto w-full max-w-md perspective">
              {/* Main dashboard mockup */}
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="relative z-20 glassmorphism bg-white/80 dark:bg-gray-900/80 rounded-xl shadow-2xl rotate-x-5 rotate-y-5 transform-style-3d p-4"
              >
                <div className="rounded-lg overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1599658880769-4b76079df00d?q=80&w=2070&auto=format&fit=crop"
                    alt="ExpiTrackAI Dashboard" 
                    className="w-full rounded-lg shadow-md"
                  />
                </div>
                
                {/* Floating elements */}
                <motion.div 
                  className="absolute -top-6 -right-6 p-3 glassmorphism bg-white/90 dark:bg-gray-800/90 rounded-lg shadow-lg floating"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  <div className="text-xs font-semibold text-blue-500 dark:text-blue-400">AI SCANNING COMPLETE</div>
                  <div className="text-sm font-bold">12 items scanned</div>
                </motion.div>
                
                <motion.div 
                  className="absolute -bottom-4 -left-6 p-3 glassmorphism bg-white/90 dark:bg-gray-800/90 rounded-lg shadow-lg floating"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1 }}
                >
                  <div className="flex items-center">
                    <div className="p-1.5 bg-red-100 dark:bg-red-900/30 rounded-full mr-2">
                      <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-red-500">EXPIRING SOON</div>
                      <div className="text-sm font-bold">Milk - 2 days left</div>
                    </div>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="absolute top-1/4 -right-10 p-3 glassmorphism bg-white/90 dark:bg-gray-800/90 rounded-lg shadow-lg floating"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.2 }}
                >
                  <div className="flex items-center">
                    <div className="p-1.5 bg-green-100 dark:bg-green-900/30 rounded-full mr-2">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-green-500">RECOMMENDATIONS</div>
                      <div className="text-sm font-bold">3 recipes found</div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
              
              {/* Background element */}
              <div className="absolute top-10 -left-6 -right-6 bottom-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl blur-xl z-10 animate-pulse"></div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Wave separator */}
      <div className="absolute bottom-0 left-0 right-0 h-20 z-10">
        <svg className="absolute bottom-0 w-full h-20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path 
            className="fill-white/50 dark:fill-gray-900/50 backdrop-blur-md"
            fillOpacity="1" 
            d="M0,128L48,144C96,160,192,192,288,181.3C384,171,480,117,576,117.3C672,117,768,171,864,176C960,181,1056,139,1152,133.3C1248,128,1344,160,1392,176L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z">
          </path>
        </svg>
      </div>
      
      {/* Add custom styling for 3D effect */}
      <style dangerouslySetInnerHTML={{
        __html: `
        .perspective {
          perspective: 1000px;
        }
        
        .transform-style-3d {
          transform-style: preserve-3d;
        }
        
        .rotate-x-5 {
          transform: rotateX(5deg);
        }
        
        .rotate-y-5 {
          transform: rotateY(5deg);
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        `
      }} />
    </section>
  );
}
