import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function UseCasesSection() {
  const [activeTab, setActiveTab] = useState("households");
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const useCases = {
    households: {
      title: "Smart Home Management",
      description: "Families waste an average of $1,600 on expired food each year. ExpiTrackAI helps you track everything in your kitchen, medicine cabinet, and pantry.",
      features: [
        "Track refrigerator, pantry, and medicine cabinet items",
        "Family sharing with permission controls",
        "Shopping list integration and reminders"
      ],
      image: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    },
    restaurants: {
      title: "Restaurant & Food Service",
      description: "Reduce food waste costs, ensure food safety compliance, and optimize inventory with our restaurant-specific features.",
      features: [
        "FIFO inventory management automation",
        "Health department compliance reporting",
        "Staff training and assignment features"
      ],
      image: "https://images.unsplash.com/photo-1572715376701-98568319fd0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80"
    },
    retailers: {
      title: "Retail & Grocery",
      description: "Manage thousands of SKUs efficiently, reduce shrinkage, and enhance customer satisfaction with fresh products.",
      features: [
        "Bulk scanning and inventory updates",
        "Automatic markdown scheduling for aging stock",
        "Integration with POS and inventory systems"
      ],
      image: "https://images.unsplash.com/photo-1534723452862-4c874018d66d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    },
    healthcare: {
      title: "Healthcare & Pharmacies",
      description: "Ensure medication safety, comply with regulations, and optimize inventory with our healthcare-specific solution.",
      features: [
        "Compliant with healthcare regulations",
        "Secure patient medication tracking",
        "Lot and batch control tracking"
      ],
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    }
  };

  return (
    <section id="use-cases" className="py-24 relative bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -right-40 top-10 w-80 h-80 bg-blue-500/5 dark:bg-blue-600/10 rounded-full blur-3xl"></div>
        <div className="absolute -left-20 bottom-10 w-96 h-96 bg-purple-500/5 dark:bg-purple-600/10 rounded-full blur-3xl"></div>

        {/* Fine grid pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] dark:opacity-[0.03] bg-[length:20px_20px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
          ref={ref}
        >
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight text-gray-900 dark:text-white">
          ExpiTrack AI for <span className="gradient-text">Every Need</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Discover how our solution adapts to different environments and requirements.
          </p>
        </motion.div>

        {/* Enhanced Tabs navigation */}
        <div className="flex justify-center flex-wrap mb-12 border-b border-gray-200 dark:border-gray-700 overflow-x-auto">
          {Object.keys(useCases).map((tab) => (
            <motion.button
              key={tab}
              onClick={() => setActiveTab(tab)}
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ y: 0, scale: 0.98 }}
              className={`px-8 py-4 font-medium border-b-2 transition-all duration-300 relative ${
                activeTab === tab
                  ? "text-blue-600 dark:text-blue-400 border-blue-600 dark:border-blue-400 font-bold"
                  : "text-gray-600 dark:text-gray-400 border-transparent hover:text-blue-500 dark:hover:text-blue-300"
              }`}
            >
              {activeTab === tab && (
                <motion.div
                  layoutId="activeTabHighlight"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <span className="relative z-10">
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </span>
            </motion.button>
          ))}
        </div>

        {/* Enhanced Tab content */}
        <div className="tab-content-container py-4">
          <AnimatePresence mode="wait">
            {Object.keys(useCases).map((tab) => (
              activeTab === tab && (
                <motion.div
                  key={tab}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{
                    duration: 0.5,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                  className="glassmorphism-light dark:glassmorphism-dark rounded-2xl overflow-hidden border border-white/20 dark:border-white/5"
                >
                  <div className="flex flex-col md:flex-row items-center p-6 md:p-8 backdrop-blur-md">
                    <div className="w-full md:w-1/2 md:pr-10 mb-10 md:mb-0">
                      {/* Enhanced title with glow effect and better contrast */}
                      <h3 className="text-2xl md:text-3xl font-bold mb-5 text-gray-900 dark:text-white text-shadow-sm dark:text-shadow-glow">
                        {useCases[tab as keyof typeof useCases].title}
                      </h3>

                      {/* Enhanced description with better contrast */}
                      <p className="text-gray-700 dark:text-gray-200 mb-8 text-lg leading-relaxed">
                        {useCases[tab as keyof typeof useCases].description}
                      </p>

                      {/* Enhanced feature list */}
                      <ul className="space-y-5">
                        {useCases[tab as keyof typeof useCases].features.map((feature, index) => (
                          <motion.li
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.15, duration: 0.5 }}
                            className="flex items-start"
                          >
                            {/* Enhanced checkmark icon with glow */}
                            <div className="flex-shrink-0 mr-3">
                              <div className="w-6 h-6 rounded-full bg-blue-600 dark:bg-blue-500 flex items-center justify-center shadow-glow">
                                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                              </div>
                            </div>

                            {/* Enhanced feature text with better contrast */}
                            <span className="text-gray-800 dark:text-gray-100 font-medium">{feature}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>

                    {/* Enhanced image container with shadow and glow effects */}
                    <motion.div
                      className="w-full md:w-1/2 p-2"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.7, delay: 0.2 }}
                      whileHover={{
                        scale: 1.02,
                        transition: { duration: 0.3 }
                      }}
                    >
                      <div className="relative rounded-xl overflow-hidden shadow-2xl dark:shadow-[0_0_25px_rgba(59,130,246,0.2)] border border-white/20 dark:border-white/5">
                        {/* Overlay glow effect */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 to-purple-500/10 mix-blend-overlay"></div>

                        <img
                          src={useCases[tab as keyof typeof useCases].image}
                          alt={`${tab} using ExpiTrackAI`}
                          className="w-full h-full object-cover object-center"
                        />

                        {/* Bottom gradient overlay for text readability */}
                        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/50 to-transparent"></div>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              )
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
