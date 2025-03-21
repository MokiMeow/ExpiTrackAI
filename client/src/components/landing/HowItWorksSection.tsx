import { useRef, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Initialize GSAP ScrollTrigger
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function HowItWorksSection() {
  const { ref, inView: inViewSection } = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  const sectionRef = useRef<HTMLDivElement>(null);
  const stepsContainerRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  
  useEffect(() => {
    if (inViewSection) {
      controls.start("visible");
    }
  }, [controls, inViewSection]);
  
  useEffect(() => {
    if (stepsContainerRef.current && sectionRef.current) {
      // Create horizontal scroll effect
      const stepItems = stepsContainerRef.current.querySelectorAll('.step-item');
      
      // Set up ScrollTrigger for each step with different animations
      stepItems.forEach((item, index) => {
        const stepContent = item.querySelector('.step-content');
        const stepImage = item.querySelector('.step-image');
        const stepNumber = item.querySelector('.step-number');
        
        if (stepContent && stepImage && stepNumber) {
          // Create scrolltrigger for each step
          gsap.timeline({
            scrollTrigger: {
              trigger: item,
              start: "top 70%",
              end: "center 30%",
              toggleActions: "play none none reverse",
              // markers: true, // Debug only
            }
          })
          .fromTo(stepNumber, 
            { 
              scale: 0.5, 
              opacity: 0.5 
            }, 
            { 
              scale: 1, 
              opacity: 1, 
              duration: 0.6, 
              ease: "back.out(1.7)"
            }
          )
          .fromTo(stepContent, 
            { 
              y: 30, 
              opacity: 0 
            }, 
            { 
              y: 0, 
              opacity: 1, 
              duration: 0.5 
            }, 
            "-=0.3"
          )
          .fromTo(stepImage, 
            { 
              y: 50, 
              opacity: 0, 
              scale: 0.8 
            }, 
            { 
              y: 0, 
              opacity: 1, 
              scale: 1, 
              duration: 0.7, 
              ease: "power2.out" 
            }, 
            "-=0.2"
          );
        }
      });
      
      // Animate the connection line
      if (window.innerWidth >= 768) { // Only on desktop
        const line = sectionRef.current.querySelector('.connection-line');
        if (line) {
          gsap.fromTo(line, 
            { 
              scaleX: 0,
              transformOrigin: "left center"
            }, 
            { 
              scaleX: 1, 
              duration: 1.5, 
              ease: "power2.inOut",
              scrollTrigger: {
                trigger: stepsContainerRef.current,
                start: "top 60%",
                end: "bottom 60%",
                scrub: 0.5
              }
            }
          );
        }
      }
    }
  }, [inViewSection]);

  const steps = [
    {
      number: 1,
      title: "Scan Items",
      description: "Just point your camera at product barcodes or packaging. Our sophisticated AI instantly recognizes expiration dates, even from difficult-to-read labels.",
      animationDelay: 0.1,
      iconBgColor: "bg-gradient-to-r from-blue-500 to-indigo-600",
      iconImage: (
        <svg className="w-10 h-10 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M15 5V7M15 11V13M15 17V19M5 5H7V19H5M12 5H17V19H12M19 5H21V19H19" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      illustration: (
        <div className="relative w-full h-full">
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Phone outline */}
            <div className="relative w-56 h-80 bg-gray-900 rounded-3xl overflow-hidden border-4 border-gray-800">
              {/* Phone screen */}
              <div className="absolute inset-1 bg-blue-50 dark:bg-gray-800 rounded-2xl overflow-hidden">
                {/* Scanning animation */}
                <div className="absolute inset-0 flex flex-col">
                  <div className="w-full h-8 bg-gray-800 flex items-center px-4">
                    <div className="w-1/2 h-4 bg-gray-700 rounded-full"></div>
                  </div>
                  <div className="flex-1 relative bg-white dark:bg-gray-900 p-2">
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="w-32 h-40 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
                    </div>
                    {/* Scanner line animation */}
                    <div className="absolute inset-x-0 top-1/3 h-1 bg-blue-500/50 animate-pulse-glow"></div>
                    <div className="absolute inset-10 border-2 border-blue-500/50 rounded-lg"></div>
                  </div>
                  <div className="w-full h-16 bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-gray-300 dark:bg-gray-700"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      number: 2,
      title: "Get Notified",
      description: "Receive smart notifications at the perfect time before items expire. Customize alert timing based on product type and your preferences.",
      animationDelay: 0.3,
      iconBgColor: "bg-gradient-to-r from-purple-500 to-pink-600",
      iconImage: (
        <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
        </svg>
      ),
      illustration: (
        <div className="relative w-full h-full">
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Phone outline */}
            <div className="relative w-56 h-80 bg-gray-900 rounded-3xl overflow-hidden border-4 border-gray-800">
              {/* Phone screen */}
              <div className="absolute inset-1 bg-blue-50 dark:bg-gray-800 rounded-2xl overflow-hidden">
                {/* Notification UI */}
                <div className="absolute inset-0 flex flex-col">
                  <div className="w-full h-8 bg-gray-800 flex items-center px-4">
                    <div className="w-1/2 h-4 bg-gray-700 rounded-full"></div>
                  </div>
                  <div className="flex-1 relative bg-white dark:bg-gray-900 p-3">
                    {/* Notification popup */}
                    <motion.div 
                      className="absolute top-4 inset-x-3 bg-white dark:bg-gray-800 rounded-xl p-3 shadow-lg border border-gray-200 dark:border-gray-700"
                      initial={{ y: -20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ 
                        type: "spring", 
                        stiffness: 300, 
                        damping: 20,
                        repeat: Infinity,
                        repeatType: "reverse",
                        repeatDelay: 3
                      }}
                    >
                      <div className="flex items-start">
                        <div className="mr-3 mt-0.5">
                          <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                          </div>
                        </div>
                        <div>
                          <div className="font-semibold text-sm text-gray-900 dark:text-white">ExpiTrack Alert</div>
                          <div className="text-xs text-gray-600 dark:text-gray-300">Milk expires in 2 days</div>
                        </div>
                      </div>
                    </motion.div>
                    
                    {/* Background items */}
                    <div className="absolute bottom-4 inset-x-3 bg-gray-100 dark:bg-gray-800 h-32 rounded-lg"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      number: 3,
      title: "Act Smart",
      description: "Get intelligent suggestions for using items before they expire. Discover recipes that use soon-to-expire ingredients, find donation options, or get proper disposal methods.",
      animationDelay: 0.5,
      iconBgColor: "bg-gradient-to-r from-emerald-500 to-teal-500",
      iconImage: (
        <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
        </svg>
      ),
      illustration: (
        <div className="relative w-full h-full">
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Phone outline */}
            <div className="relative w-56 h-80 bg-gray-900 rounded-3xl overflow-hidden border-4 border-gray-800">
              {/* Phone screen */}
              <div className="absolute inset-1 bg-blue-50 dark:bg-gray-800 rounded-2xl overflow-hidden">
                {/* Suggestion UI */}
                <div className="absolute inset-0 flex flex-col">
                  <div className="w-full h-8 bg-gray-800 flex items-center px-4">
                    <div className="w-1/2 h-4 bg-gray-700 rounded-full"></div>
                  </div>
                  <div className="flex-1 relative bg-white dark:bg-gray-900 p-3 pt-5">
                    <div className="absolute top-3 inset-x-3">
                      <div className="text-xs font-semibold text-center text-gray-800 dark:text-gray-200 mb-2">Smart Suggestions</div>
                      
                      {/* Recipe card */}
                      <motion.div 
                        className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md mb-3 flex flex-col"
                        animate={{ 
                          y: [0, -4, 0],
                        }}
                        transition={{ 
                          repeat: Infinity, 
                          repeatType: "loop",
                          duration: 3,
                          repeatDelay: 1
                        }}
                      >
                        <div className="h-12 bg-green-100 dark:bg-green-900/20 flex items-center px-3">
                          <svg className="w-4 h-4 text-green-600 dark:text-green-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"></path>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"></path>
                          </svg>
                          <div className="text-xxs font-medium text-green-800 dark:text-green-300">Recipe Suggestion</div>
                        </div>
                        <div className="p-2">
                          <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full mb-1"></div>
                          <div className="w-2/3 h-2 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                        </div>
                      </motion.div>
                      
                      {/* Donation card */}
                      <motion.div 
                        className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md flex flex-col"
                        animate={{ 
                          y: [0, -4, 0],
                        }}
                        transition={{ 
                          repeat: Infinity, 
                          repeatType: "loop",
                          duration: 3,
                          delay: 0.5,
                          repeatDelay: 1
                        }}
                      >
                        <div className="h-12 bg-blue-100 dark:bg-blue-900/20 flex items-center px-3">
                          <svg className="w-4 h-4 text-blue-600 dark:text-blue-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"></path>
                          </svg>
                          <div className="text-xxs font-medium text-blue-800 dark:text-blue-300">Donation Options</div>
                        </div>
                        <div className="p-2">
                          <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full mb-1"></div>
                          <div className="w-1/2 h-2 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <section id="how-it-works" ref={sectionRef} className="section-padding relative overflow-hidden dark:bg-gray-800 bg-white">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-10 top-10 w-64 h-64 bg-blue-100 dark:bg-blue-900/20 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute right-0 bottom-10 w-72 h-72 bg-purple-100 dark:bg-purple-900/20 rounded-full blur-3xl opacity-40"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div ref={ref} className="reveal">
          <motion.div 
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
            initial="hidden"
            animate={controls}
            transition={{ duration: 0.7 }}
            className="text-center mb-16 md:mb-24"
          >
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight dark:text-white">
              How It <span className="gradient-text">Works</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              ExpiTrackAI makes tracking expiration dates seamless with these simple steps.
            </p>
          </motion.div>
          
          {/* Steps container */}
          <div ref={stepsContainerRef} className="relative">
            {/* Connection line between steps */}
            <div className="connection-line hidden md:block absolute top-32 left-[10%] right-[10%] h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 rounded-full -z-0"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 lg:gap-12">
              {steps.map((step, index) => (
                <motion.div 
                  key={index}
                  className="step-item"
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: { opacity: 0 },
                    visible: { opacity: 1 }
                  }}
                >
                  {/* Step number */}
                  <div className="flex justify-center">
                    <motion.div 
                      className={`step-number relative z-10 w-16 h-16 md:w-20 md:h-20 ${step.iconBgColor} rounded-full flex items-center justify-center shadow-lg mb-6 md:mb-10`}
                    >
                      <div className="text-white font-bold text-xl md:text-2xl">
                        {step.iconImage}
                      </div>
                      
                      {/* Pulse effect */}
                      <div className="absolute inset-0 rounded-full animate-pulse opacity-70"></div>
                    </motion.div>
                  </div>
                  
                  {/* Step content */}
                  <div className="step-content bg-white/80 dark:bg-gray-800/80 glassmorphism rounded-xl p-6 md:p-8 backdrop-blur-sm">
                    <h3 className="text-xl md:text-2xl font-bold mb-4 text-center dark:text-white">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-center mb-6">
                      {step.description}
                    </p>
                    
                    {/* Step illustration */}
                    <div className="step-image h-64 md:h-80 relative mt-6 rounded-lg overflow-hidden glassmorphism">
                      {step.illustration}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
    </section>
  );
}
