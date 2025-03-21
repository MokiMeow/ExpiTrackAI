import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function CTASection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="cta" className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-600 to-blue-600 opacity-90"></div>
        <img 
          src="https://images.unsplash.com/photo-1587827741444-5582abc966c6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2970&q=80" 
          alt="Nature background" 
          className="object-cover w-full h-full"
        />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="bg-white/10 backdrop-blur-md rounded-2xl p-8 md:p-12 shadow-xl border border-white/20"
          ref={ref}
        >
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-8 md:mb-0 md:mr-8">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="text-3xl md:text-4xl font-bold text-white mb-6"
              >
                Ready to Waste Less and Live Smarter?
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="text-white/80 text-lg mb-0"
              >
                Join thousands of conscious consumers and businesses making a difference. Start your 14-day free trial today.
              </motion.p>
            </div>
            <div className="flex flex-col space-y-4">
              <motion.a 
                href="#signup"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.4, duration: 0.5 }}
                whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex justify-center items-center px-8 py-4 border border-transparent text-base font-medium rounded-md text-primary-600 bg-white hover:bg-gray-100 transition duration-300 shadow-lg"
              >
                Start Free Trial
              </motion.a>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="text-white/70 text-center text-sm"
              >
                No credit card required
              </motion.p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
