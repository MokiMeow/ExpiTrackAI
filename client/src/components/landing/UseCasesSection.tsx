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
      description: "Families waste an average of $1,600 on expired food each year. ExpiScan AI helps you track everything in your kitchen, medicine cabinet, and pantry.",
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
    <section id="use-cases" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
          ref={ref}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">ExpiScan AI for Every Need</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Discover how our solution adapts to different environments and requirements.
          </p>
        </motion.div>
        
        {/* Tabs navigation */}
        <div className="flex justify-center flex-wrap mb-8 border-b overflow-x-auto">
          {Object.keys(useCases).map((tab) => (
            <motion.button
              key={tab}
              onClick={() => setActiveTab(tab)}
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
              className={`px-6 py-3 font-medium border-b-2 transition-colors duration-200 ${
                activeTab === tab 
                  ? "text-primary-500 border-primary-500" 
                  : "text-gray-500 border-transparent hover:text-gray-700"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </motion.button>
          ))}
        </div>
        
        {/* Tab content */}
        <div className="tab-content-container">
          <AnimatePresence mode="wait">
            {Object.keys(useCases).map((tab) => (
              activeTab === tab && (
                <motion.div
                  key={tab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex flex-col md:flex-row items-center">
                    <div className="w-full md:w-1/2 md:pr-8 mb-8 md:mb-0">
                      <h3 className="text-2xl font-bold mb-4">{useCases[tab as keyof typeof useCases].title}</h3>
                      <p className="text-gray-600 mb-6">{useCases[tab as keyof typeof useCases].description}</p>
                      
                      <ul className="space-y-4">
                        {useCases[tab as keyof typeof useCases].features.map((feature, index) => (
                          <motion.li 
                            key={index}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.3 }}
                            className="flex items-start"
                          >
                            <svg className="w-6 h-6 text-primary-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                            <span>{feature}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                    <motion.div 
                      className="w-full md:w-1/2"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <img 
                        src={useCases[tab as keyof typeof useCases].image} 
                        alt={`${tab} using ExpiScan`} 
                        className="rounded-xl shadow-lg w-full"
                      />
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
