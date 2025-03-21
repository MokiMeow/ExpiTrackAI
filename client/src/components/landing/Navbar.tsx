import { useState, useEffect, useContext, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeContext } from "../../App";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const navRef = useRef<HTMLElement>(null);
  const [prevScrollY, setPrevScrollY] = useState(0);
  const [navVisible, setNavVisible] = useState(true);

  // Enhanced scroll behavior for hiding/showing navbar on scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Auto-hide the navbar when scrolling down and show when scrolling up
      if (currentScrollY > 300) {
        setNavVisible(prevScrollY > currentScrollY || currentScrollY < 300);
      } else {
        setNavVisible(true);
      }
      
      // Set the scrolled state for styling changes
      setIsScrolled(currentScrollY > 10);
      setPrevScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollY]);

  const navItems = ["problem", "solution", "how-it-works", "benefits", "use-cases"];

  // Variants for animations
  const navbarVariants = {
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 200, 
        damping: 20
      }
    },
    hidden: { 
      y: -100, 
      opacity: 0,
      transition: {
        type: "spring",
        stiffness: 200, 
        damping: 25
      }
    }
  };
  
  // Special hover effect for nav links
  const navLinkVariants = {
    hover: {
      scale: 1.05,
      y: -2,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }
  };
  
  // Variants for the sun/moon icon rotation animation
  const iconVariants = {
    initial: { rotate: -90, opacity: 0 },
    animate: { rotate: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
    exit: { rotate: 90, opacity: 0, transition: { duration: 0.3, ease: "easeIn" } }
  };
  
  // Staggered children animation for the navbar items
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24
      }
    }
  };

  return (
    <motion.nav 
      ref={navRef}
      variants={navbarVariants}
      initial="visible"
      animate={navVisible ? "visible" : "hidden"}
      className={`fixed w-full z-50 transition-all duration-500 ${
        isScrolled 
          ? "glassmorphism-dark backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.3)] py-2" 
          : "bg-gray-900/30 backdrop-blur-sm py-4"
      }`}
    >
      {/* Glowing border effect at the bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-blue-600/0 via-blue-600/50 to-blue-600/0"></div>
      
      {/* Moving particle effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute w-1 h-1 rounded-full bg-blue-400/60 blur-sm"
          animate={{ 
            x: ["-10%", "110%"],
            y: ["10%", "60%", "20%"],
            opacity: [0, 1, 0]
          }} 
          transition={{ 
            duration: 15,
            repeat: Infinity,
            ease: "linear",
            times: [0, 0.5, 1]
          }}
        />
        <motion.div 
          className="absolute w-1 h-1 rounded-full bg-purple-400/60 blur-sm"
          animate={{ 
            x: ["110%", "-10%"],
            y: ["70%", "30%", "50%"],
            opacity: [0, 1, 0]
          }} 
          transition={{ 
            duration: 18,
            repeat: Infinity,
            ease: "linear",
            times: [0, 0.5, 1]
          }}
        />
        <motion.div 
          className="absolute w-[2px] h-[2px] rounded-full bg-indigo-400/60 blur-sm"
          animate={{ 
            x: ["30%", "70%"],
            y: ["20%", "80%", "40%"],
            opacity: [0, 1, 0]
          }} 
          transition={{ 
            duration: 12,
            repeat: Infinity,
            ease: "linear",
            times: [0, 0.5, 1]
          }}
        />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex-shrink-0 flex items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ 
                duration: 0.6, 
                type: "spring",
                stiffness: 150 
              }}
              className="flex items-center"
            >
              <motion.span 
                className="font-bold text-2xl tracking-tight relative overflow-hidden"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <span className="gradient-text font-extrabold text-shadow-glow">
                  Expi<span className="text-blue-400">Track</span>AI
                </span>
                {/* Enhanced glowing line with particle effects */}
                <motion.span 
                  className="absolute -bottom-2 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-600/0 via-blue-400 to-indigo-600/0 rounded-full shadow-glow"
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={{ 
                    scaleX: [0, 1, 1, 0], 
                    opacity: [0, 0.9, 0.9, 0],
                    x: ["-100%", "0%", "0%", "100%"]
                  }}
                  transition={{ 
                    duration: 3, 
                    repeat: Infinity, 
                    repeatDelay: 2
                  }}
                />
                
                {/* Particle effect */}
                <motion.div
                  className="absolute -bottom-1 left-1/2 w-1 h-1 rounded-full bg-blue-400 shadow-glow-blue"
                  animate={{
                    x: ['-50%', '-30%', '-70%', '-50%'],
                    y: [0, -10, 0, -5, 0],
                    opacity: [0, 1, 1, 0]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    repeatDelay: 1
                  }}
                />
              </motion.span>
            </motion.div>
          </div>
          
          {/* Enhanced Desktop navigation menu with futuristic look */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="hidden md:ml-6 md:flex md:items-center md:space-x-6"
          >
            {navItems.map((item, index) => (
              <motion.a
                key={item}
                href={`#${item}`}
                variants={itemVariants}
                whileHover="hover"
                whileTap={{ scale: 0.95 }}
                custom={index}
                className="relative group text-gray-200 hover:text-blue-400 px-3 py-2 text-sm font-medium transition-all duration-200"
              >
                {item.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                
                {/* Enhanced animated underline effect with glow */}
                <span className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-blue-400/0 via-blue-400 to-blue-400/0 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center shadow-glow" />
              </motion.a>
            ))}
          </motion.div>
          
          <div className="flex items-center space-x-5">
            {/* Enhanced CTA button with more futuristic styling */}
            <motion.a
              href="#cta"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0px 0px 8px rgba(79, 70, 229, 0.5), 0px 0px 20px rgba(79, 70, 229, 0.3)"
              }}
              whileTap={{ scale: 0.95 }}
              className="hidden md:inline-flex items-center px-5 py-2.5 text-sm font-medium rounded-full text-white bg-gradient-to-r from-indigo-600 to-blue-500 shadow-lg shadow-indigo-600/20 transform transition-all duration-300"
            >
              <span className="relative z-10 flex items-center">
                Get Started Free
                <svg className="ml-1.5 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </span>
            </motion.a>
            
            {/* Enhanced Mobile menu button */}
            <motion.button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="md:hidden inline-flex items-center justify-center p-2.5 rounded-full glassmorphism text-gray-700 dark:text-gray-200 focus:outline-none"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              <span className="sr-only">{mobileMenuOpen ? "Close menu" : "Open menu"}</span>
              <div className="relative w-5 h-5">
                <motion.span
                  animate={{
                    rotate: mobileMenuOpen ? 45 : 0,
                    y: mobileMenuOpen ? 8 : 0
                  }}
                  className="absolute top-0 left-0 w-5 h-0.5 bg-current rounded-full"
                  transition={{ duration: 0.3 }}
                />
                <motion.span
                  animate={{
                    opacity: mobileMenuOpen ? 0 : 1,
                    x: mobileMenuOpen ? -10 : 0
                  }}
                  className="absolute top-2 left-0 w-5 h-0.5 bg-current rounded-full"
                  transition={{ duration: 0.3 }}
                />
                <motion.span
                  animate={{
                    rotate: mobileMenuOpen ? -45 : 0,
                    y: mobileMenuOpen ? -8 : 0
                  }}
                  className="absolute top-4 left-0 w-5 h-0.5 bg-current rounded-full"
                  transition={{ duration: 0.3 }}
                />
              </div>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Enhanced Mobile menu with improved animations */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="md:hidden glassmorphism bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl shadow-xl border-t border-gray-200 dark:border-gray-800"
          >
            <div className="px-5 pt-4 pb-6 space-y-3">
              {navItems.map((item, i) => (
                <motion.a
                  key={item}
                  href={`#${item}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2, delay: i * 0.06, type: "spring" }}
                  whileHover={{ x: 5 }}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 block px-3 py-2.5 text-base font-medium border-b border-gray-100 dark:border-gray-800 transition-all duration-200"
                >
                  <div className="flex items-center">
                    <span className="w-2 h-2 rounded-full bg-blue-500 mr-3 opacity-75"></span>
                    {item.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                  </div>
                </motion.a>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.3 }}
                className="pt-4"
              >
                <motion.a
                  href="#cta"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full flex justify-center items-center px-6 py-3.5 text-base font-medium rounded-xl text-white bg-gradient-to-r from-indigo-600 to-blue-500 shadow-lg hover:shadow-indigo-500/50 transition-all duration-300"
                >
                  <span className="flex items-center">
                    Get Started Free
                    <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </span>
                </motion.a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
