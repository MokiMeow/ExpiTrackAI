import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function HowItWorksSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const steps = [
    {
      number: 1,
      title: "Scan Items",
      description: "Use your camera to scan barcodes or product labels. Our AI recognizes nearly any format of expiration data.",
      image: "https://images.unsplash.com/photo-1579113800032-c38bd7635818?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80",
      alt: "Scanning items with phone",
      borderColor: "primary"
    },
    {
      number: 2,
      title: "Get Notified",
      description: "Receive smart notifications before items expire. Customize timing based on product type and your preferences.",
      image: "https://images.unsplash.com/photo-1621916805571-ee10ae9e8a4c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80",
      alt: "Phone notification",
      borderColor: "blue"
    },
    {
      number: 3,
      title: "Act Smart",
      description: "Get suggestions for using items before they expire. Find recipes, donation options, or proper disposal methods.",
      image: "https://images.unsplash.com/photo-1505576399279-565b52d4ac71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80",
      alt: "Smart suggestions",
      borderColor: "purple"
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
          ref={ref}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">How It Works</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            ExpiScan AI makes tracking expiration dates effortless with these simple steps.
          </p>
        </motion.div>
        
        <div className="relative">
          {/* Step line */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-gray-200 -mt-px"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="relative"
              >
                <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 mb-6 h-full">
                  <motion.div 
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={inView ? { scale: 1, opacity: 1 } : {}}
                    transition={{ duration: 0.5, delay: index * 0.3 }}
                    className={`flex items-center justify-center w-16 h-16 mx-auto mb-6 rounded-full bg-white border-4 border-${step.borderColor}-500 text-${step.borderColor}-600 z-10 relative`}
                  >
                    <span className="text-xl font-bold">{step.number}</span>
                  </motion.div>
                  
                  <h3 className="text-xl font-bold mb-3 text-center">{step.title}</h3>
                  <p className="text-gray-600 text-center mb-4">
                    {step.description}
                  </p>
                  
                  <motion.div 
                    whileHover={{ scale: 1.05 }}
                    className="flex justify-center"
                  >
                    <img 
                      src={step.image} 
                      alt={step.alt} 
                      className="rounded-lg h-40 object-cover shadow"
                    />
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
