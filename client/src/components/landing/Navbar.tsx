import { useState, useEffect, useContext } from "react";
import { motion } from "framer-motion";
import { ThemeContext } from "../../App";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useContext(ThemeContext);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? "glassmorphism bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-md" 
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex-shrink-0 flex items-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="flex items-center"
            >
              <span className="gradient-text font-bold text-2xl tracking-tight">
                Expi<span className="text-blue-600 dark:text-blue-400">Track</span>AI
              </span>
            </motion.div>
          </div>
          <div className="hidden md:ml-6 md:flex md:items-center md:space-x-8">
            {["problem", "solution", "how-it-works", "benefits", "use-cases"].map((item, index) => (
              <motion.a
                key={item}
                href={`#${item}`}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 text-sm font-medium transition duration-150"
              >
                {item.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
              </motion.a>
            ))}
          </div>
          <div className="flex items-center space-x-4">
            {/* Theme toggle button */}
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              onClick={toggleTheme}
              className="p-2 rounded-full neumorphism text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 focus:outline-none"
              aria-label="Toggle dark mode"
            >
              {theme === "light" ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                </svg>
              )}
            </motion.button>
            
            {/* CTA button */}
            <motion.a
              href="#cta"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
              className="hidden md:inline-flex items-center px-5 py-2.5 text-sm font-medium rounded-full neon-button"
            >
              Get Started Free
            </motion.a>
            
            {/* Mobile menu button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 focus:outline-none"
            >
              <span className="sr-only">Open main menu</span>
              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          transition={{ duration: 0.2 }}
          className="md:hidden glassmorphism bg-white/95 dark:bg-gray-900/95 shadow-lg"
        >
          <div className="px-4 pt-3 pb-4 space-y-2">
            {["problem", "solution", "how-it-works", "benefits", "use-cases"].map((item, i) => (
              <motion.a
                key={item}
                href={`#${item}`}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2, delay: i * 0.05 }}
                onClick={() => setMobileMenuOpen(false)}
                className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 block px-3 py-2 text-base font-medium"
              >
                {item.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
              </motion.a>
            ))}
            <motion.a
              href="#cta"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2, delay: 0.25 }}
              onClick={() => setMobileMenuOpen(false)}
              className="mt-3 block w-full text-center px-5 py-3 border border-transparent text-base font-medium rounded-full neon-button"
            >
              Get Started Free
            </motion.a>
          </div>
        </motion.div>
      )}
    </nav>
  );
}
