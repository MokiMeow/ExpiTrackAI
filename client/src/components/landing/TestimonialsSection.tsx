import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const testimonials = [
    {
      name: "Sarah J.",
      role: "Health-conscious parent",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1061&q=80",
      text: "ExpiScan has saved our family at least $200 a month by preventing waste. I no longer find moldy surprises in the back of my fridge!",
      verified: "VERIFIED USER"
    },
    {
      name: "Marco L.",
      role: "Restaurant Owner",
      image: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
      text: "Implementing ExpiScan has cut our food waste by 34% and improved our profit margins significantly. The staff finds it intuitive and easy to use.",
      verified: "VERIFIED BUSINESS"
    },
    {
      name: "Priya K.",
      role: "Pharmacy Manager",
      image: "https://images.unsplash.com/photo-1573497019418-b400bb3ab074?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80",
      text: "The medicine tracking feature has prevented countless medication errors. Our regulatory compliance has improved, and we've reduced inventory waste by 28%.",
      verified: "VERIFIED BUSINESS"
    }
  ];

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    if (trackRef.current) {
      const testimonialWidth = trackRef.current.children[0].clientWidth;
      const margin = 24; // margin-right of each testimonial card
      trackRef.current.style.transform = `translateX(${-(testimonialWidth + margin) * index}px)`;
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const newIndex = (currentIndex + 1) % testimonials.length;
      goToSlide(newIndex);
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex, testimonials.length]);

  return (
    <section id="testimonials" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
          ref={ref}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Trusted by Conscious Consumers & Smart Businesses</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            See how ExpiScan AI is transforming food management and waste reduction for people and businesses worldwide.
          </p>
        </motion.div>
        
        {/* Testimonial Carousel */}
        <div className="testimonial-container relative overflow-hidden">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8 }}
            className="testimonial-track flex space-x-6 pb-8 transition-transform duration-500 ease-in-out"
            ref={trackRef}
          >
            {testimonials.map((testimonial, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="min-w-[350px] flex-shrink-0 bg-white rounded-xl p-6 shadow-lg border border-gray-100"
              >
                <div className="flex items-center mb-4">
                  <div className="flex-shrink-0 mr-4">
                    <img 
                      className="h-12 w-12 rounded-full object-cover" 
                      src={testimonial.image} 
                      alt={testimonial.name} 
                    />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
                <div className="mb-4 flex">
                  {[...Array(5)].map((_, i) => (
                    <svg 
                      key={i} 
                      className="w-5 h-5 text-yellow-400" 
                      fill="currentColor" 
                      viewBox="0 0 20 20" 
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                  ))}
                </div>
                <p className="text-gray-600 mb-4">{testimonial.text}</p>
                <div className="flex items-center">
                  <span className="text-xs font-semibold text-primary-500 mr-2">{testimonial.verified}</span>
                  <svg className="w-4 h-4 text-primary-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                  </svg>
                </div>
              </motion.div>
            ))}
          </motion.div>
          
          {/* Carousel Controls */}
          <div className="flex justify-center mt-6 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full focus:outline-none transition-colors ${
                  currentIndex === index ? "bg-primary-500" : "bg-gray-300"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              ></button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
