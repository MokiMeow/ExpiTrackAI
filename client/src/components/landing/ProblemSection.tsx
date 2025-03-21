import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function ProblemSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const stats = [
    {
      percentage: "30%",
      description: "of food is wasted globally.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
      ),
      delay: 0.1,
      color: "primary",
    },
    {
      percentage: "$1.2B",
      description: "lost in expired medicine annually.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
      ),
      delay: 0.2,
      color: "blue",
    },
    {
      percentage: "10M+ tons",
      description: "of waste harming the planet.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h.5A2.5 2.5 0 0020 5.5v-1.65"></path>
        </svg>
      ),
      delay: 0.3,
      color: "purple",
    }
  ];

  return (
    <section id="problem" className="bg-gray-900 text-white py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
          ref={ref}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">We're Throwing Away the Future.</h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Every day, we discard resources that could be saved with better management. The cost isn't just financial—it's environmental and ethical.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: stat.delay }}
              whileHover={{ 
                scale: 1.05, 
                backgroundColor: 'rgba(45, 55, 72, 0.8)',
              }}
              className="bg-gray-800 rounded-xl p-6 transform transition duration-300 border border-gray-700"
            >
              <div className={`flex items-center justify-center w-16 h-16 mx-auto mb-6 rounded-full bg-${stat.color}-500/20 text-${stat.color}-400`}>
                {stat.icon}
              </div>
              <motion.h3 
                initial={{ scale: 0.5, opacity: 0 }}
                animate={inView ? { scale: 1, opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: stat.delay + 0.3 }}
                className="text-2xl font-bold mb-2 text-center"
              >
                {stat.percentage}
              </motion.h3>
              <p className="text-gray-300 text-center">{stat.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
