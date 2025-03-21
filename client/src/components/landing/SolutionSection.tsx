import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import gsap from "gsap";

export default function SolutionSection() {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.2,
  });
  
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  
  // Set up parallax effect
  useEffect(() => {
    if (inView && sectionRef.current && cardsRef.current) {
      // Create mousemove parallax effect
      const cards = cardsRef.current.querySelectorAll('.feature-card');
      
      const handleMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        const x = (clientX / window.innerWidth) - 0.5;
        const y = (clientY / window.innerHeight) - 0.5;
        
        cards.forEach((card, index) => {
          const depth = 15 + (index * 5); // Different depth for each card
          gsap.to(card, {
            rotateY: x * depth,
            rotateX: -y * depth,
            transformPerspective: 1000,
            duration: 0.5,
            ease: "power2.out"
          });
          
          // Move card glow based on mouse position
          const glow = card.querySelector('.card-glow');
          if (glow) {
            gsap.to(glow, {
              x: x * 50,
              y: y * 50,
              opacity: 0.7,
              duration: 0.5
            });
          }
        });
      };
      
      // Add listener for mousemove
      document.addEventListener('mousemove', handleMouseMove);
      
      // Cleanup function
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
      };
    }
  }, [inView]);

  const features = [
    {
      title: "Scan Products",
      description: "Instantly scan barcodes or take photos of products. Our advanced OCR AI recognizes even the most difficult expiration dates.",
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"></path>
        </svg>
      ),
      delay: 0.1,
      color: "blue",
      gradient: "from-blue-500 to-indigo-600",
      position: "top-6 right-6"
    },
    {
      title: "Get Smart Alerts",
      description: "Receive perfectly timed notifications before items expire. Customize priority levels for different product categories.",
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
        </svg>
      ),
      delay: 0.3,
      color: "purple",
      gradient: "from-purple-500 to-pink-600",
      position: "bottom-6 left-6"
    },
    {
      title: "Optimize Consumption",
      description: "Leverage AI-powered recommendations to reduce waste. Learn from your habits and improve your consumption patterns.",
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
        </svg>
      ),
      delay: 0.5,
      color: "green",
      gradient: "from-emerald-500 to-teal-500",
      position: "top-6 left-6"
    }
  ];

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.7,
        delay: i * 0.2,
        ease: [0.215, 0.61, 0.355, 1]
      }
    })
  };

  return (
    <section 
      id="solution" 
      ref={sectionRef}
      className="section-padding relative overflow-hidden dark:bg-gray-900 bg-gradient-to-b from-white to-blue-50 dark:from-gray-900 dark:to-gray-950 parallax-section"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -right-10 -top-10 w-64 h-64 bg-blue-100 dark:bg-blue-900/20 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute -left-16 bottom-10 w-80 h-80 bg-indigo-100 dark:bg-indigo-900/20 rounded-full blur-3xl opacity-40"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div ref={ref} className="reveal">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight dark:text-white">
              AI-Powered <span className="gradient-text">Solutions</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Our intelligent system takes the guesswork out of expiration tracking, offering a seamless experience from scanning to smart consumption.
            </p>
          </motion.div>
          
          <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-10 perspective">
            {features.map((feature, index) => (
              <motion.div 
                key={index}
                custom={index}
                variants={cardVariants}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                className="feature-card transform-style-3d"
              >
                <div className="relative h-full cursor-pointer">
                  {/* Main card with glassmorphism effect */}
                  <div className="h-full bg-white/90 dark:bg-gray-800/90 rounded-xl overflow-hidden glassmorphism p-8 relative z-20 border border-gray-100 dark:border-gray-700 transform transition-all duration-300">
                    {/* Card glow effect that moves with mouse */}
                    <div className="card-glow absolute -inset-10 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-2xl opacity-0 transition-opacity duration-300 z-10"></div>
                    
                    {/* Icon with gradient */}
                    <div className={`relative w-20 h-20 rounded-xl bg-gradient-to-br ${feature.gradient} p-5 mb-7 mx-auto shadow-lg`}>
                      <div className="text-white">
                        {feature.icon}
                      </div>
                      
                      {/* Decorative elements */}
                      <div className={`absolute ${feature.position} w-3 h-3 rounded-full bg-white/80 opacity-80`}></div>
                    </div>
                    
                    <h3 className="text-2xl font-bold mb-4 text-center dark:text-white">{feature.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-center z-30 relative">
                      {feature.description}
                    </p>
                    
                    {/* Hover reveal button */}
                    <div className="absolute bottom-8 left-0 right-0 flex justify-center opacity-0 transform translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                      <a href="#" className="text-sm font-semibold text-blue-600 dark:text-blue-400 flex items-center space-x-1">
                        <span>Learn more</span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                        </svg>
                      </a>
                    </div>
                  </div>
                  
                  {/* Card shadow */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-20 rounded-xl blur-xl -z-10 transform scale-105 transition-all duration-300`}></div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Wave divider */}
      <div className="absolute bottom-0 left-0 right-0 h-16">
        <svg className="absolute bottom-0 fill-white dark:fill-gray-800" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path fillOpacity="1" d="M0,160L48,154.7C96,149,192,139,288,154.7C384,171,480,213,576,218.7C672,224,768,192,864,170.7C960,149,1056,139,1152,144C1248,149,1344,171,1392,181.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>
    </section>
  );
}
