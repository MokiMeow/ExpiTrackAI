import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import * as THREE from "three";

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const threeJsContainerRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  const [threeJsLoaded, setThreeJsLoaded] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  
  // Text animations
  useEffect(() => {
    if (headingRef.current) {
      const spans = headingRef.current.querySelectorAll('span');
      
      gsap.fromTo(spans, {
        opacity: 0,
        y: 30,
        skewY: 5
      }, {
        opacity: 1,
        y: 0,
        skewY: 0,
        stagger: 0.2,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.5
      });
    }
    
    // Floating elements animation with more dynamic movement
    if (imageContainerRef.current) {
      const floatingElements = imageContainerRef.current.querySelectorAll('.floating');
      
      floatingElements.forEach((el, index) => {
        // Create more complex animation patterns with slight rotation
        gsap.to(el, {
          y: index % 2 === 0 ? -15 : 15,
          x: index % 3 === 0 ? 8 : -8,
          rotation: index % 2 === 0 ? 2 : -2,
          duration: 2 + (index * 0.3),
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: index * 0.2
        });
      });
    }
    
    // Particle animation setup
    if (particlesRef.current) {
      const particleCount = 100;
      const particles = [];
      
      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.position = 'absolute';
        particle.style.width = `${Math.random() * 3 + 1}px`;
        particle.style.height = particle.style.width;
        particle.style.background = `rgba(${Math.random() * 100 + 155}, ${Math.random() * 100 + 155}, 255, ${Math.random() * 0.4 + 0.1})`;
        particle.style.borderRadius = '50%';
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.left = `${Math.random() * 100}%`;
        
        particles.push(particle);
        particlesRef.current.appendChild(particle);
      }
      
      // Animate particles
      particles.forEach((particle) => {
        const speedX = (Math.random() - 0.5) * 0.3;
        const speedY = (Math.random() - 0.5) * 0.3;
        const opacity = Math.random() * 0.5 + 0.3;
        
        gsap.to(particle, {
          x: `${Math.random() * 100 - 50}`,
          y: `${Math.random() * 100 - 50}`,
          opacity: opacity,
          duration: Math.random() * 20 + 10,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: Math.random() * 5
        });
      });
    }
  }, []);
  
  // Three.js floating mockup
  useEffect(() => {
    if (!threeJsContainerRef.current || threeJsLoaded) return;
    
    let scene: THREE.Scene, 
        camera: THREE.PerspectiveCamera, 
        renderer: THREE.WebGLRenderer, 
        mockup: THREE.Group;
    
    const init = () => {
      // Create scene
      scene = new THREE.Scene();
      
      // Create camera
      camera = new THREE.PerspectiveCamera(
        45, 
        threeJsContainerRef.current!.clientWidth / threeJsContainerRef.current!.clientHeight, 
        0.1, 
        1000
      );
      camera.position.z = 5;
      
      // Create renderer
      renderer = new THREE.WebGLRenderer({ 
        alpha: true,
        antialias: true
      });
      renderer.setSize(
        threeJsContainerRef.current!.clientWidth, 
        threeJsContainerRef.current!.clientHeight
      );
      renderer.setPixelRatio(window.devicePixelRatio);
      
      // Clear container and append renderer
      if (threeJsContainerRef.current!.firstChild) {
        threeJsContainerRef.current!.removeChild(threeJsContainerRef.current!.firstChild);
      }
      threeJsContainerRef.current!.appendChild(renderer.domElement);
      
      // Create mockup
      mockup = new THREE.Group();
      
      // Create lighting
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
      scene.add(ambientLight);
      
      const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
      directionalLight.position.set(1, 1, 1);
      scene.add(directionalLight);
      
      scene.add(mockup);
      
      animate();
      setThreeJsLoaded(true);
      
      // Add resize listener
      window.addEventListener('resize', onWindowResize);
    };
    
    const animate = () => {
      requestAnimationFrame(animate);
      
      // Add subtle floating animation
      if (mockup) {
        mockup.rotation.x = Math.sin(Date.now() * 0.0005) * 0.1;
        mockup.rotation.y = Math.sin(Date.now() * 0.0003) * 0.1;
        mockup.position.y = Math.sin(Date.now() * 0.001) * 0.1;
      }
      
      renderer.render(scene, camera);
    };
    
    const onWindowResize = () => {
      if (!threeJsContainerRef.current) return;
      
      camera.aspect = threeJsContainerRef.current.clientWidth / threeJsContainerRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(threeJsContainerRef.current.clientWidth, threeJsContainerRef.current.clientHeight);
    };
    
    // Initialize scene
    init();
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', onWindowResize);
      if (renderer) {
        renderer.dispose();
      }
    };
  }, [threeJsLoaded]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
    }
  };
  
  // CTA button hover effects
  const buttonHoverVariants = {
    initial: { 
      scale: 1, 
      boxShadow: "0px 0px 0px rgba(99, 102, 241, 0)" 
    },
    hover: { 
      scale: 1.05, 
      boxShadow: "0px 0px 20px rgba(99, 102, 241, 0.7)",
      transition: { 
        type: "spring", 
        stiffness: 500, 
        damping: 17 
      }
    },
    tap: { 
      scale: 0.98,
      boxShadow: "0px 0px 0px rgba(99, 102, 241, 0)"
    }
  };
  
  // Watch Demo button hover effects
  const secondaryButtonHoverVariants = {
    initial: { 
      scale: 1, 
      backgroundColor: "rgba(255, 255, 255, 0.08)" 
    },
    hover: { 
      scale: 1.05, 
      backgroundColor: "rgba(255, 255, 255, 0.15)", 
      transition: { 
        type: "spring", 
        stiffness: 500, 
        damping: 17 
      }
    },
    tap: { 
      scale: 0.98,
      backgroundColor: "rgba(255, 255, 255, 0.05)"
    }
  };

  return (
    <section id="hero" ref={sectionRef} className="relative overflow-hidden pt-32 md:pt-24 pb-16 md:pb-20 min-h-screen">
      {/* Animated background particles */}
      <div ref={particlesRef} className="particles-container absolute inset-0 -z-10 overflow-hidden opacity-40 pointer-events-none"></div>
      
      {/* Gradient backgrounds */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-100/40 via-transparent to-transparent dark:from-blue-900/30 dark:via-transparent dark:to-transparent"></div>
      <div className="absolute inset-0 -z-10 bg-[conic-gradient(at_top_right,_var(--tw-gradient-stops))] from-blue-500/20 via-transparent to-transparent dark:from-blue-600/20"></div>
      
      {/* Glowing orbs */}
      <div className="absolute inset-0 -z-5 opacity-30">
        <div className="absolute h-40 w-40 rounded-full bg-blue-600/40 blur-3xl top-1/4 left-1/4 animate-pulse-slow"></div>
        <div className="absolute h-56 w-56 rounded-full bg-indigo-600/30 blur-3xl bottom-1/3 right-1/4 animate-pulse-slow animation-delay-2000"></div>
        <div className="absolute h-36 w-36 rounded-full bg-purple-600/30 blur-3xl top-1/3 right-1/3 animate-pulse-slow animation-delay-4000"></div>
      </div>
      
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 bg-grid-pattern bg-[length:50px_50px] opacity-[0.03] pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center min-h-[70vh]">
          {/* Text content */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="pt-8 md:pt-0 md:pr-8 order-2 md:order-1"
          >
            <motion.h1 
              ref={headingRef}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 leading-tight"
            >
              <span className="block mb-1 dark:text-white text-shadow-sm">Stop Wasting.</span>
              <span className="block mb-1 dark:text-white text-shadow-sm">Start Tracking.</span>
              <span className="gradient-text text-shadow-glow">Save the Planet.</span>
            </motion.h1>
            
            <motion.p 
              variants={itemVariants}
              className="text-base md:text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-xl"
            >
              AI-powered expiry tracking for homes, restaurants, and retailers. 
              Reduce waste, save money, and protect health with intelligent alerts.
            </motion.p>
            
            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-5"
            >
              <motion.a
                href="#cta"
                initial="initial"
                whileHover="hover"
                whileTap="tap"
                variants={buttonHoverVariants}
                className="relative inline-flex items-center justify-center px-8 py-3.5 font-semibold text-white rounded-full bg-gradient-to-r from-indigo-600 to-blue-600 shadow-xl shadow-indigo-600/20 transform transition-all duration-300"
              >
                {/* Subtle glow effect */}
                <span className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-600 to-blue-500 blur-md opacity-70 group-hover:opacity-100 animate-pulse-slow"></span>
                <span className="relative flex items-center">
                  Get Started Free
                  <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                  </svg>
                </span>
              </motion.a>
              
              <motion.a
                href="#how-it-works"
                initial="initial"
                whileHover="hover"
                whileTap="tap"
                variants={secondaryButtonHoverVariants}
                className="inline-flex justify-center items-center px-6 py-3.5 font-medium rounded-full text-white bg-white/10 backdrop-blur-sm border border-white/20 shadow-sm transition-all duration-300 glassmorphism"
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
              className="mt-8 flex items-center gap-3"
            >
              <div className="flex -space-x-2">
                {[...Array(4)].map((_, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 1.2 + (i * 0.1), duration: 0.5, type: "spring" }}
                    className={`w-8 h-8 rounded-full border-2 border-white dark:border-gray-800 ${
                      i === 0 ? 'bg-blue-500' : 
                      i === 1 ? 'bg-green-500' : 
                      i === 2 ? 'bg-purple-500' : 'bg-pink-500'
                    } shadow-md`}
                  ></motion.div>
                ))}
              </div>
              <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold text-gray-700 dark:text-gray-200">2,500+</span> happy users already tracking their products
              </p>
            </motion.div>
          </motion.div>
          
          {/* Dashboard visualization with 3D effects */}
          <motion.div 
            variants={itemVariants}
            className="order-1 md:order-2 mt-0 md:mt-0 relative"
            style={{ y, opacity }}
            ref={imageContainerRef}
          >
            {/* ThreeJS container for advanced 3D effects */}
            <div ref={threeJsContainerRef} className="absolute inset-0 z-10 opacity-70 pointer-events-none"></div>
            
            <div className="relative mx-auto w-full max-w-md perspective">
              {/* Main dashboard mockup with improved 3D effect */}
              <motion.div
                initial={{ y: 30, opacity: 0, rotateX: 15, rotateY: 15 }}
                animate={{ y: 0, opacity: 1, rotateX: 5, rotateY: 5 }}
                transition={{ 
                  duration: 0.8, 
                  delay: 0.5,
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{ 
                  rotateX: 0, 
                  rotateY: 0,
                  transition: { duration: 0.3 } 
                }}
                className="relative z-20 glassmorphism bg-black/80 dark:bg-gray-900/90 rounded-2xl shadow-2xl transform-style-3d p-4 border border-white/10"
              >
                <div className="rounded-lg overflow-hidden relative">
                  <img 
                    src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop"
                    alt="ExpiTrackAI Dashboard" 
                    className="w-full rounded-lg shadow-inner"
                  />
                  
                  {/* Dashboard overlay UI elements */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent rounded-lg">
                    <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                      <div className="text-white text-xs">
                        <div className="font-semibold">Dashboard</div>
                        <div className="opacity-70">12 items tracked</div>
                      </div>
                      <div className="bg-blue-500/20 backdrop-blur-md px-2 py-1 rounded text-xs text-blue-100 font-medium">
                        LIVE
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Floating UI elements with enhanced effects */}
                <motion.div 
                  className="absolute -top-6 -right-6 p-3 glassmorphism bg-black/70 dark:bg-gray-900/80 rounded-lg shadow-xl floating border border-blue-500/20"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8, type: "spring" }}
                >
                  <div className="text-xs font-semibold text-blue-400">AI SCANNING COMPLETE</div>
                  <div className="text-sm font-bold text-white">12 items scanned</div>
                </motion.div>
                
                <motion.div 
                  className="absolute -bottom-4 -left-6 p-3 glassmorphism bg-black/70 dark:bg-gray-900/80 rounded-lg shadow-xl floating border border-red-500/20"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1, type: "spring" }}
                >
                  <div className="flex items-center">
                    <div className="p-1.5 bg-red-900/30 rounded-full mr-2">
                      <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-red-400">EXPIRING SOON</div>
                      <div className="text-sm font-bold text-white">Milk - 2 days left</div>
                    </div>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="absolute top-1/4 -right-10 p-3 glassmorphism bg-black/70 dark:bg-gray-900/80 rounded-lg shadow-xl floating border border-green-500/20"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.2, type: "spring" }}
                >
                  <div className="flex items-center">
                    <div className="p-1.5 bg-green-900/30 rounded-full mr-2">
                      <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse-slow"></div>
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-green-400">RECOMMENDATIONS</div>
                      <div className="text-sm font-bold text-white">3 recipes found</div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
              
              {/* Enhanced glow effect behind dashboard */}
              <div className="absolute top-10 -left-6 -right-6 bottom-0 bg-gradient-to-r from-blue-600/30 via-indigo-600/30 to-purple-600/30 rounded-full blur-[50px] z-10 animate-pulse-slow"></div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Enhanced wave separator with parallax effect */}
      <motion.div 
        className="absolute bottom-0 left-0 right-0 h-24 z-10 overflow-hidden"
        style={{ y: useTransform(scrollYProgress, [0, 0.5], [0, 50]) }}
      >
        <svg className="absolute bottom-0 w-full h-24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path 
            className="fill-white/30 dark:fill-gray-900/30 backdrop-blur-md"
            fillOpacity="1" 
            d="M0,128L40,122.7C80,117,160,107,240,122.7C320,139,400,181,480,186.7C560,192,640,160,720,138.7C800,117,880,107,960,112C1040,117,1120,139,1200,149.3C1280,160,1360,160,1400,160L1440,160L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z">
          </path>
        </svg>
      </motion.div>
      
      {/* Custom styling for enhanced effects */}
      <style dangerouslySetInnerHTML={{
        __html: `
        .perspective {
          perspective: 2000px;
        }
        
        .transform-style-3d {
          transform-style: preserve-3d;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        
        .animate-pulse-slow {
          animation: pulseSlow 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        
        @keyframes pulseSlow {
          0%, 100% {
            opacity: 0.5;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.05);
          }
        }
        
        .text-shadow-sm {
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }
        
        .text-shadow-glow {
          text-shadow: 0 0 10px rgba(99, 102, 241, 0.5);
        }
        
        .bg-grid-pattern {
          background-image: linear-gradient(to right, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
                           linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 1px, transparent 1px);
        }
        
        .particle {
          position: absolute;
          pointer-events: none;
        }
        `
      }} />
    </section>
  );
}
