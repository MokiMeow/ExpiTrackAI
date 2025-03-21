import { motion } from "framer-motion";

export default function HeroSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <section id="hero" className="relative overflow-hidden pt-16 md:pt-0">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 to-blue-500/10"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="min-h-screen flex flex-col justify-center">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col md:flex-row items-center"
          >
            <motion.div variants={itemVariants} className="w-full md:w-1/2 pt-10 md:pt-0 md:pr-8">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-gray-900 mb-6">
                <span className="block mb-2">Stop Wasting.</span>
                <span className="block mb-2">Start Tracking.</span>
                <span className="block bg-gradient-to-r from-primary-500 to-blue-500 bg-clip-text text-transparent">Save the Planet.</span>
              </h1>
              
              <p className="text-lg md:text-xl text-gray-600 mb-8">
                AI-powered expiry tracking for your home, restaurant, or retail business. Reduce waste, save money, and protect health.
              </p>
              
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <motion.a 
                  href="#cta"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-primary-500 to-blue-500 hover:from-primary-600 hover:to-blue-600 shadow-lg transition-all duration-300"
                >
                  Get Started Free
                </motion.a>
                
                <motion.a
                  href="#how-it-works"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex justify-center items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 shadow-sm transition-all duration-300"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  Watch Demo
                </motion.a>
              </div>
            </motion.div>
            
            <motion.div 
              variants={itemVariants}
              className="w-full md:w-1/2 mt-12 md:mt-0 relative"
            >
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                className="relative"
              >
                <img 
                  src="https://images.unsplash.com/photo-1611746869696-d09bce200020?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80" 
                  alt="AI scanning groceries" 
                  className="rounded-xl shadow-2xl max-w-full mx-auto"
                />
                
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1, duration: 0.5 }}
                  className="absolute -bottom-4 -right-4 bg-white p-3 rounded-lg shadow-lg"
                >
                  <div className="text-xs font-semibold text-primary-500">AI DETECTED</div>
                  <div className="text-sm font-bold">Milk expires in 3 days</div>
                </motion.div>
                
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary-500/20 to-blue-500/20 rounded-xl animate-pulse"></div>
              </motion.div>
              
              <motion.div 
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.5 }}
                className="absolute -bottom-6 -left-6 bg-white p-4 rounded-full shadow-xl"
              >
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                >
                  <svg className="w-10 h-10 text-primary-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                  </svg>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
