import { useRef, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function CTASection() {
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.3,
  });
  
  const controls = useAnimation();
  const svgControls = useAnimation();
  const buttonControls = useAnimation();
  const backgroundRef = useRef<HTMLDivElement>(null);
  
  // Animate controls based on scroll
  useEffect(() => {
    if (inView) {
      controls.start("visible");
      svgControls.start("animate");
      buttonControls.start("visible");
    }
  }, [controls, svgControls, buttonControls, inView]);
  
  // Parallax effect on background
  useEffect(() => {
    if (!backgroundRef.current) return;
    
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (backgroundRef.current) {
        backgroundRef.current.style.transform = `translateY(${scrollPosition * 0.1}px)`;
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Staggered animation for heading text
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    }
  };
  
  // SVG path animation
  const svgVariants = {
    initial: { pathLength: 0, opacity: 0 },
    animate: { 
      pathLength: 1, 
      opacity: 1,
      transition: { 
        duration: 2,
        ease: "easeInOut",
      }
    }
  };
  
  // Button animation variants
  const buttonVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: {
        duration: 0.5,
        delay: 0.8
      }
    }
  };

  return (
    <section id="cta" className="relative py-20 overflow-hidden bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900">
      {/* Background overlay with subtle pattern and parallax effect */}
      <div ref={backgroundRef} className="absolute inset-0 z-0">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-700/90 via-indigo-600/80 to-violet-700/80 mix-blend-multiply"></div>
        
        {/* Radial gradient for spotlight effect */}
        <div className="absolute inset-0 bg-radial-gradient opacity-70"></div>
        
        {/* Abstract shapes */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Floating bubbles */}
          <div className="absolute top-20 left-10 w-40 h-40 rounded-full bg-blue-400/10 blur-xl animate-float"></div>
          <div className="absolute bottom-20 right-20 w-60 h-60 rounded-full bg-purple-400/10 blur-xl animate-float-slow"></div>
          <div className="absolute top-1/2 left-1/3 w-80 h-80 rounded-full bg-indigo-400/10 blur-xl animate-float-reverse"></div>
          
          {/* Geometric shapes */}
          <div className="absolute top-10 right-10 w-20 h-20 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rotate-45 blur-sm"></div>
          <div className="absolute bottom-10 left-20 w-32 h-32 bg-gradient-to-br from-indigo-500/20 to-violet-500/20 rounded-lg blur-sm"></div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left column with text content */}
          <div className="lg:col-span-7" ref={ref}>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={controls}
              className="space-y-6"
            >
              <motion.div variants={itemVariants} className="inline-block px-4 py-1 bg-white/10 backdrop-blur-md rounded-full text-sm font-medium text-blue-100 mb-2">
                <span className="inline-block w-2 h-2 bg-blue-300 rounded-full mr-2 animate-pulse"></span>
                AI-Powered Expiry Tracking System
              </motion.div>
              
              <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
                Stop Wasting, <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-indigo-200 to-purple-300">
                  Start Saving.
                </span>
              </motion.h2>
              
              <motion.p variants={itemVariants} className="text-xl text-blue-100/90 max-w-3xl">
                Join thousands of conscious consumers and businesses who have reduced waste by up to 40% and saved hundreds on grocery bills.
              </motion.p>
              
              <motion.div variants={itemVariants} className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 pt-4">
                <motion.a
                  href="#signup"
                  variants={buttonVariants}
                  initial="hidden"
                  animate={controls}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex justify-center items-center px-8 py-4 text-base md:text-lg font-bold rounded-xl text-indigo-900 bg-white shadow-xl transition-all duration-300"
                >
                  Start Free Trial
                  <svg className="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                  </svg>
                </motion.a>
                
                <motion.a
                  href="#demo"
                  variants={itemVariants}
                  className="inline-flex justify-center items-center px-6 py-4 border border-blue-300/30 text-base font-medium rounded-xl text-blue-100 bg-blue-600/10 hover:bg-blue-500/20 transition-all duration-300 backdrop-blur-sm"
                >
                  <svg className="mr-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  Watch Demo
                </motion.a>
              </motion.div>
              
              <motion.div variants={itemVariants} className="flex items-center space-x-4 text-sm text-blue-100/70 pt-2">
                <span className="flex items-center">
                  <svg className="mr-1.5 w-5 h-5 text-blue-200" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                  </svg>
                  No credit card required
                </span>
                <span className="flex items-center">
                  <svg className="mr-1.5 w-5 h-5 text-blue-200" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                  </svg>
                  14-day free trial
                </span>
                <span className="flex items-center">
                  <svg className="mr-1.5 w-5 h-5 text-blue-200" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                  </svg>
                  Cancel anytime
                </span>
              </motion.div>
            </motion.div>
          </div>
          
          {/* Right column with illustration */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 1, delay: 0.4 }}
              className="relative"
            >
              {/* Phone illustration with app mockup */}
              <div className="relative flex justify-center items-center">
                {/* Glowing ring */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full blur-3xl opacity-20 animate-pulse-slow transform scale-110"></div>
                
                {/* Phone device */}
                <div className="relative w-64 md:w-80 h-[500px] md:h-[600px] bg-gray-900 rounded-[40px] overflow-hidden border-4 border-gray-800 shadow-2xl">
                  {/* Phone screen */}
                  <div className="absolute inset-2 rounded-[32px] overflow-hidden bg-gradient-to-b from-blue-900 to-indigo-900">
                    {/* Status bar */}
                    <div className="w-full h-8 bg-black/20 flex items-center justify-between px-6">
                      <div className="text-xs text-white font-medium">9:41</div>
                      <div className="flex items-center space-x-2">
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8z"></path>
                        </svg>
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M17 6h-2V5c0-.55-.45-1-1-1h-4c-.55 0-1 .45-1 1v1H7c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-3 12h-4v-1h4v1zm2-3H8v-1h8v1zm0-3H8v-1h8v1z"></path>
                        </svg>
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M7 19h10V5H7v14zm2-9h2V8H9v2zm0 4h2v-2H9v2zm4-4h2V8h-2v2zm0 4h2v-2h-2v2z"></path>
                        </svg>
                      </div>
                    </div>
                    
                    {/* App content */}
                    <div className="flex flex-col h-full pt-4 px-4">
                      {/* App header */}
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg mr-2 flex items-center justify-center">
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                          </div>
                          <div className="font-bold text-white">ExpiTrackAI</div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center">
                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0018 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
                            </svg>
                          </div>
                          <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center">
                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                            </svg>
                          </div>
                        </div>
                      </div>
                      
                      {/* Dashboard stats */}
                      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 mb-4">
                        <div className="text-xs text-blue-100 mb-2">Your Impact</div>
                        <div className="flex justify-between items-end">
                          <div>
                            <div className="text-2xl font-bold text-white">$247</div>
                            <div className="text-xs text-blue-200">Saved this month</div>
                          </div>
                          <motion.svg 
                            width="100" 
                            height="40" 
                            viewBox="0 0 100 40" 
                            fill="none" 
                            stroke="currentColor" 
                            className="text-green-400"
                            initial="initial"
                            animate={svgControls}
                          >
                            <motion.path 
                              variants={svgVariants}
                              d="M0 30L5 28L10 32L15 25L20 28L25 20L30 22L35 18L40 15L45 20L50 15L55 18L60 12L65 15L70 8L75 10L80 5L85 8L90 2L95 5L100 10" 
                              strokeWidth="2" 
                              strokeLinecap="round" 
                              strokeLinejoin="round"
                            />
                          </motion.svg>
                        </div>
                      </div>
                      
                      {/* Expiring items */}
                      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 mb-4">
                        <div className="flex justify-between items-center mb-3">
                          <div className="text-xs text-blue-100">Expiring Soon</div>
                          <div className="text-xs text-blue-300">View All</div>
                        </div>
                        
                        <div className="space-y-3">
                          <div className="flex items-center justify-between bg-white/5 p-2 rounded-lg">
                            <div className="flex items-center">
                              <div className="w-8 h-8 bg-red-500/20 rounded-md flex items-center justify-center mr-2">
                                <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                                </svg>
                              </div>
                              <div>
                                <div className="text-xs font-semibold text-white">Milk</div>
                                <div className="text-[10px] text-red-300">Expires Tomorrow</div>
                              </div>
                            </div>
                            <div className="w-6 h-6 bg-white/10 rounded-full flex items-center justify-center">
                              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                              </svg>
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between bg-white/5 p-2 rounded-lg">
                            <div className="flex items-center">
                              <div className="w-8 h-8 bg-yellow-500/20 rounded-md flex items-center justify-center mr-2">
                                <svg className="w-5 h-5 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"></path>
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"></path>
                                </svg>
                              </div>
                              <div>
                                <div className="text-xs font-semibold text-white">Yogurt</div>
                                <div className="text-[10px] text-yellow-300">Expires in 3 days</div>
                              </div>
                            </div>
                            <div className="w-6 h-6 bg-white/10 rounded-full flex items-center justify-center">
                              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Action buttons */}
                      <div className="flex justify-center mt-4">
                        <motion.div 
                          className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg shadow-blue-500/30"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          animate={{ y: [0, -8, 0] }}
                          transition={{ 
                            duration: 2,
                            repeat: Infinity,
                            repeatType: "loop",
                            ease: "easeInOut"
                          }}
                        >
                          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
                          </svg>
                        </motion.div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Notch */}
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-gray-900 rounded-b-2xl"></div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
