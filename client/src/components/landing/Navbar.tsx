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
          ? "glassmorphism dark:bg-gray-900/80 backdrop-blur-xl shadow-lg py-2" 
          : "bg-transparent py-4"
      }`}
    >
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
                <span className="gradient-text font-extrabold text-glow">
                  Expi<span className="text-blue-600 dark:text-blue-400">Track</span>AI
                </span>
                {/* Subtle animated glow effect under the logo */}
                <motion.span 
                  className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500 rounded-full"
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={{ 
                    scaleX: [0, 1, 1, 0], 
                    opacity: [0, 0.7, 0.7, 0],
                    x: ["-100%", "0%", "0%", "100%"]
                  }}
                  transition={{ 
                    duration: 3, 
                    repeat: Infinity, 
                    repeatDelay: 2
                  }}
                />
              </motion.span>
            </motion.div>
          </div>
          
          {/* Desktop navigation menu */}
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
                className="relative group text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 text-sm font-medium transition-all duration-200"
              >
                {item.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                
                {/* Animated underline effect */}
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </motion.a>
            ))}
          </motion.div>
          
          <div className="flex items-center space-x-5">
            {/* Enhanced Theme toggle button with animation */}
            <div className="relative">
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                onClick={toggleTheme}
                className="w-11 h-6 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center transition-colors duration-300 focus:outline-none shadow-sm"
                aria-label="Toggle dark mode"
              >
                <motion.div 
                  className="w-5 h-5 relative rounded-full transition-all duration-500 transform"
                  animate={{
                    translateX: theme === 'dark' ? 20 : 2,
                    backgroundColor: theme === 'dark' ? 'rgba(56, 189, 248, 0.9)' : 'rgba(255, 255, 255, 1)'
                  }}
                >
                  {/* Sun/Moon icons with rotation animation */}
                  <AnimatePresence mode="wait">
                    {theme === 'light' ? (
                      <motion.svg
                        key="sun"
                        xmlns="http://www.w3.org/2000/svg"
                        className="absolute inset-0 h-full w-full text-yellow-500 transition"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        variants={iconVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                      >
                        <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                      </motion.svg>
                    ) : (
                      <motion.svg
                        key="moon"
                        xmlns="http://www.w3.org/2000/svg"
                        className="absolute inset-0 h-full w-full text-indigo-200 transition"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        variants={iconVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                      >
                        <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                      </motion.svg>
                    )}
                  </AnimatePresence>
                </motion.div>
              </motion.button>
              
              {/* Stars around the moon in dark mode */}
              <AnimatePresence>
                {theme === 'dark' && (
                  <>
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{ delay: 0.2, duration: 0.3 }}
                      className="absolute h-1 w-1 rounded-full bg-blue-200 top-0 right-1"
                    />
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{ delay: 0.3, duration: 0.3 }}
                      className="absolute h-1 w-1 rounded-full bg-blue-200 bottom-1 right-3"
                    />
                  </>
                )}
              </AnimatePresence>
            </div>
            
            {/* Enhanced CTA button */}
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
