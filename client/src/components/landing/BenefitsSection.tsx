import { motion, useScroll, useTransform, useMotionTemplate } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useRef, useEffect, useState } from "react";

// Custom hook for parallax mouse movement effect
const useParallaxEffect = (ref: React.RefObject<HTMLElement>, strength: number = 20) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!ref.current) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current) return;

      const { left, top, width, height } = ref.current.getBoundingClientRect();
      const x = (e.clientX - left) / width;
      const y = (e.clientY - top) / height;

      // Calculate position relative to the center (0.5, 0.5)
      setPosition({
        x: parseFloat(((x - 0.5) * strength).toFixed(2)),
        y: parseFloat(((y - 0.5) * strength).toFixed(2)),
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [ref, strength]);

  return position;
};

export default function BenefitsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mockupRef = useRef<HTMLDivElement>(null);

  // Parallax effect for mouse movement
  const { x, y: mouseY } = useParallaxEffect(mockupRef, 15);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [50, 0, 0, -50]);

  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  const benefits = [
    {
      title: "Reduce Waste",
      description: "Stop throwing away forgotten food and medicine. Our system ensures you use items before they expire.",
      icon: (
        <motion.svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          animate={{
            pathLength: inView ? 1 : 0,
          }}
          transition={{
            duration: 1.5,
            ease: "easeInOut",
            delay: 0.2
          }}
        >
          <motion.path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 13l4 4L19 7"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: inView ? 1 : 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
          />
        </motion.svg>
      ),
      bgGradient: "from-blue-700/20 to-blue-900/20",
      borderGradient: "from-blue-600/50 via-blue-400/30 to-blue-600/50",
      iconGradient: "from-blue-400 to-blue-600",
      hoverGlow: "shadow-[0_0_20px_rgba(59,130,246,0.5)]"
    },
    {
      title: "Save Money",
      description: "The average household can save over $500 annually by preventing food waste alone. Track everything, waste nothing.",
      icon: (
        <motion.svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <motion.path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: inView ? 1 : 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          />
        </motion.svg>
      ),
      bgGradient: "from-green-700/20 to-emerald-900/20",
      borderGradient: "from-green-600/50 via-emerald-400/30 to-green-600/50",
      iconGradient: "from-green-400 to-emerald-600",
      hoverGlow: "shadow-[0_0_20px_rgba(16,185,129,0.5)]"
    },
    {
      title: "Stay Healthy",
      description: "Avoid consuming expired products that may cause illness. Get alerts for medication refills before you run out.",
      icon: (
        <motion.svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <motion.path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: inView ? 1 : 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          />
        </motion.svg>
      ),
      bgGradient: "from-purple-700/20 to-violet-900/20",
      borderGradient: "from-purple-600/50 via-violet-400/30 to-purple-600/50",
      iconGradient: "from-purple-400 to-violet-600",
      hoverGlow: "shadow-[0_0_20px_rgba(147,51,234,0.5)]"
    },
    {
      title: "Track Anywhere",
      description: "Access your inventory from any device. Perfect for shopping trips, multi-person households, or business settings.",
      icon: (
        <motion.svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <motion.path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h.5A2.5 2.5 0 0020 5.5v-1.65M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h.5A2.5 2.5 0 0020 5.5v-1.65"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: inView ? 1 : 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          />
        </motion.svg>
      ),
      bgGradient: "from-indigo-700/20 to-indigo-900/20",
      borderGradient: "from-indigo-600/50 via-indigo-400/30 to-indigo-600/50",
      iconGradient: "from-indigo-400 to-indigo-600",
      hoverGlow: "shadow-[0_0_20px_rgba(99,102,241,0.5)]"
    }
  ];

  return (
    <section
      id="benefits"
      className="py-24 bg-gray-900 relative overflow-hidden"
      ref={containerRef}
    >
      {/* Futuristic background elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] bg-[length:50px_50px]"></div>

        {/* Glowing orbs */}
        <div className="absolute top-0 -right-40 w-96 h-96 bg-blue-900/20 rounded-full blur-3xl opacity-40 animate-pulse-glow-strong"></div>
        <div className="absolute bottom-0 -left-40 w-96 h-96 bg-purple-900/20 rounded-full blur-3xl opacity-30 animate-pulse-glow-strong animation-delay-1000"></div>

        {/* Futuristic circuit line patterns */}
        <div className="absolute top-20 left-0 right-0 h-px bg-gradient-to-r from-blue-600/0 via-blue-600/30 to-blue-600/0"></div>
        <div className="absolute bottom-20 left-0 right-0 h-px bg-gradient-to-r from-purple-600/0 via-purple-600/30 to-purple-600/0"></div>
        <div className="absolute left-20 top-0 bottom-0 w-px bg-gradient-to-b from-indigo-600/0 via-indigo-600/30 to-indigo-600/0"></div>
        <div className="absolute right-20 top-0 bottom-0 w-px bg-gradient-to-b from-indigo-600/0 via-indigo-600/30 to-indigo-600/0"></div>

        {/* Moving particles */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute w-1 h-1 rounded-full bg-blue-400 blur-sm"
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
            className="absolute w-1 h-1 rounded-full bg-purple-400 blur-sm"
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
        </div>
      </div>

      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
        style={{ opacity, y }}
        ref={ref}
      >
        <div className="flex flex-col md:flex-row items-center md:space-x-12">
          {/* Left: App Mockup with holographic effect */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="w-full md:w-1/2 mb-12 md:mb-0"
          >
            <div className="relative perspective">
              {/* Holographic glow behind phone */}
              <div className="absolute inset-0 bg-gradient-radial opacity-70 rounded-2xl blur-2xl transform-style-3d"></div>

              {/* Animated border */}
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/30 via-purple-600/30 to-indigo-600/30 rounded-2xl blur-xl opacity-70 animate-pulse-glow"></div>

              <div className="relative transform-style-3d" ref={mockupRef}>
                <motion.div
                  initial={{ rotateY: 10, rotateX: 10 }}
                  animate={{ rotateY: [-5, 5, -5], rotateX: [5, -5, 5] }}
                  style={{
                    rotateY: x,
                    rotateX: mouseY,
                  }}
                  transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                  className="relative glassmorphism-premium rounded-2xl overflow-hidden shadow-2xl border border-white/10"
                >
                  {/* Phone mockup */}
                  <div className="relative">
                    <img
                      src="https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80"
                      alt="ExpiTrackAI App Dashboard"
                      className="w-full rounded-xl"
                    />

                    {/* Holographic overlay */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 via-transparent to-purple-500/10 mix-blend-overlay"></div>

                    {/* Scan line effect */}
                    <motion.div
                      className="absolute left-0 right-0 h-10 bg-gradient-to-b from-blue-400/0 via-blue-400/20 to-blue-400/0 blur-sm"
                      animate={{ y: ['-100%', '200%'] }}
                      transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                    />

                    {/* Enhanced Futuristic Floating Notifications */}
                    <motion.div
                      initial={{ opacity: 0, y: 20, x: 20 }}
                      animate={inView ? { opacity: 1, y: 0, x: 0 } : {}}
                      transition={{ delay: 0.5, duration: 0.7 }}
                      className="absolute top-10 -right-5 glassmorphism-dark border border-red-500/30 p-4 rounded-xl shadow-lg backdrop-blur-lg"
                    >
                      <motion.div
                        animate={{ y: [0, -5, 0] }}
                        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                        className="flex items-center space-x-3"
                      >
                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-red-500/20 to-red-700/20 text-red-400 shadow-[0_0_15px_rgba(239,68,68,0.5)]">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path>
                          </svg>
                        </div>
                        <div>
                          <div className="text-xs font-medium text-red-300">Expires Soon</div>
                          <div className="text-sm font-semibold text-white">Yogurt (2 days left)</div>
                        </div>
                      </motion.div>

                      {/* Pulsing ring effect */}
                      <motion.div
                        className="absolute -inset-0.5 rounded-xl"
                        animate={{
                          boxShadow: ["0 0 0px rgba(239,68,68,0)", "0 0 8px rgba(239,68,68,0.5)", "0 0 0px rgba(239,68,68,0)"]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    </motion.div>

                    {/* Enhanced futuristic statistical popup */}
                    <motion.div
                      initial={{ opacity: 0, y: 20, x: -20 }}
                      animate={inView ? { opacity: 1, y: 0, x: 0 } : {}}
                      transition={{ delay: 0.8, duration: 0.7 }}
                      className="absolute bottom-10 -left-5 glassmorphism-dark border border-blue-500/30 p-4 rounded-xl shadow-lg backdrop-blur-lg"
                    >
                      <motion.div
                        animate={{ y: [0, -5, 0] }}
                        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut", delay: 0.5 }}
                        className="flex items-center space-x-3"
                      >
                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-blue-500/20 to-blue-700/20 text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                            <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
                          </svg>
                        </div>
                        <div>
                          <div className="text-xs font-medium text-blue-300">Monthly Savings</div>
                          <div className="text-sm font-semibold text-white">$42.78</div>
                        </div>
                      </motion.div>

                      {/* Pulsing ring effect */}
                      <motion.div
                        className="absolute -inset-0.5 rounded-xl"
                        animate={{
                          boxShadow: ["0 0 0px rgba(59,130,246,0)", "0 0 8px rgba(59,130,246,0.5)", "0 0 0px rgba(59,130,246,0)"]
                        }}
                        transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                      />
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Right: Benefits List with futuristic design */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="w-full md:w-1/2"
          >
            <h2 className="text-4xl md:text-5xl font-extrabold mb-8 text-white text-shadow-glow">
              Your Home, <span className="gradient-text">Only Smarter</span>
            </h2>

            <div className="space-y-6">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    duration: 0.7,
                    delay: index * 0.15,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                  whileHover={{
                    scale: 1.02,
                    transition: { duration: 0.2 }
                  }}
                  className="flex items-start group"
                >
                  {/* Futuristic icon container with gradient and glow */}
                  <div className={`flex-shrink-0 flex items-center justify-center w-14 h-14 mr-5 rounded-lg
                    bg-gradient-to-br ${benefit.bgGradient}
                    border border-gradient-to-r ${benefit.borderGradient}
                    group-hover:${benefit.hoverGlow} transition-all duration-300
                    backdrop-blur-md`}
                  >
                    {/* Add subtle animation to the icon */}
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className={`bg-gradient-to-br ${benefit.iconGradient} rounded-md p-2 text-white`}
                    >
                      {benefit.icon}
                    </motion.div>
                  </div>

                  {/* Benefit content with enhanced text */}
                  <div className="pt-1">
                    <h3 className="text-xl font-bold mb-2 text-white group-hover:text-blue-300 transition-colors duration-300">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-300 group-hover:text-gray-200 transition-colors duration-300">
                      {benefit.description}
                    </p>

                    {/* Animated arrow that appears on hover */}
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      whileHover={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2 }}
                      className="mt-2 text-blue-400 flex items-center text-sm font-medium opacity-0 group-hover:opacity-100"
                    >
                      Learn more
                      <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
