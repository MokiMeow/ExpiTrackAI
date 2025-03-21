import { useState, useEffect, useRef } from "react";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.2,
  });
  
  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const testimonials = [
    {
      name: "Sarah J.",
      role: "Health-conscious parent",
      company: "Mother of 3",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1061&q=80",
      text: "ExpiTrackAI saves our family at least $250 a month by preventing waste. I'm amazed at how the AI can read even the most faded expiration dates on our groceries!",
      tags: ["Reduced Waste", "Saved Money"],
      verified: "VERIFIED USER",
      stars: 5
    },
    {
      name: "Marco L.",
      role: "Restaurant Owner",
      company: "Bella Cucina",
      image: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
      text: "Implementing ExpiTrackAI has cut our food waste by 34% and improved our profit margins significantly. My staff needed almost no training - it's that intuitive.",
      tags: ["Increased Profits", "Easy Implementation"],
      verified: "VERIFIED BUSINESS",
      stars: 5
    },
    {
      name: "Priya K.",
      role: "Pharmacy Manager",
      company: "MedPlus Healthcare",
      image: "https://images.unsplash.com/photo-1573497019418-b400bb3ab074?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80",
      text: "The medicine tracking feature has revolutionized our inventory management. Our regulatory compliance has improved dramatically, and we've reduced expired medication waste by 28%.",
      tags: ["Regulatory Compliance", "Inventory Control"],
      verified: "VERIFIED BUSINESS",
      stars: 5
    },
    {
      name: "Jason T.",
      role: "Sustainability Officer",
      company: "GreenLife Corp",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80",
      text: "We've been able to meet our corporate sustainability goals ahead of schedule thanks to ExpiTrackAI. The analytics have given us insights that would have been impossible to gather manually.",
      tags: ["ESG Goals", "Data Analytics"],
      verified: "VERIFIED BUSINESS",
      stars: 5
    }
  ];

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  const goToTestimonial = (index: number) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextTestimonial();
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  const cardVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.85,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.4 },
        scale: { duration: 0.4 }
      }
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.85,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.4 },
        scale: { duration: 0.2 }
      }
    })
  };

  // Animation for testimonial quote marks
  const quoteVariants = {
    hidden: { opacity: 0, scale: 0.2 },
    visible: {
      opacity: 0.1,
      scale: 1,
      transition: { duration: 1, ease: "easeOut" }
    }
  };

  // Direction of swipe
  const [[page, direction], setPage] = useState([0, 0]);

  return (
    <section id="testimonials" className="section-padding relative overflow-hidden bg-white dark:bg-gray-900">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -right-10 top-20 w-72 h-72 bg-purple-100 dark:bg-purple-900/20 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute -left-16 bottom-20 w-80 h-80 bg-blue-100 dark:bg-blue-900/20 rounded-full blur-3xl opacity-40"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div ref={ref} className="reveal">
          <motion.div 
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
            initial="hidden"
            animate={controls}
            transition={{ duration: 0.7 }}
            className="text-center mb-16 md:mb-24"
          >
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight dark:text-white">
              What Our <span className="gradient-text">Users</span> Say
            </h2>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Discover how ExpiTrackAI is transforming food management and waste reduction for people and businesses worldwide.
            </p>
          </motion.div>
          
          {/* Testimonial Carousel */}
          <div className="relative" ref={carouselRef}>
            {/* Large quote symbol decoration */}
            <motion.div
              variants={quoteVariants}
              initial="hidden"
              animate="visible"
              className="absolute -left-5 -top-10 text-9xl opacity-10 text-primary-500 dark:text-primary-400 z-0"
            >
              "
            </motion.div>
            
            <motion.div
              variants={quoteVariants}
              initial="hidden"
              animate="visible" 
              className="absolute -right-5 bottom-0 text-9xl opacity-10 text-primary-500 dark:text-primary-400 transform rotate-180 z-0"
            >
              "
            </motion.div>
            
            <div className="relative overflow-hidden h-[450px] md:h-[350px]">
              <AnimatePresence initial={false} custom={direction}>
                <motion.div
                  key={currentIndex}
                  custom={direction}
                  variants={cardVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="absolute inset-0 flex items-center justify-center p-4"
                >
                  <div className="w-full max-w-4xl bg-white/90 dark:bg-gray-800/90 rounded-2xl shadow-xl overflow-hidden glassmorphism border border-gray-100 dark:border-gray-700">
                    <div className="grid grid-cols-1 md:grid-cols-5 h-full">
                      {/* Left panel with photo and info */}
                      <div className="md:col-span-2 p-8 bg-gradient-to-br from-blue-500/10 to-purple-500/10 dark:from-blue-900/30 dark:to-purple-900/30 flex flex-col justify-between relative">
                        <div className="flex flex-col items-center md:items-start">
                          <div className="h-20 w-20 md:h-24 md:w-24 relative mb-4">
                            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 animate-pulse-slow blur-md opacity-70"></div>
                            <img 
                              src={testimonials[currentIndex].image} 
                              alt={testimonials[currentIndex].name}
                              className="h-20 w-20 md:h-24 md:w-24 rounded-full object-cover border-4 border-white dark:border-gray-800 relative z-10"
                            />
                          </div>
                          
                          <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">{testimonials[currentIndex].name}</h3>
                          <p className="text-gray-600 dark:text-gray-300 text-sm">{testimonials[currentIndex].role}</p>
                          <p className="text-gray-500 dark:text-gray-400 text-xs">{testimonials[currentIndex].company}</p>
                        </div>
                        
                        <div className="mt-6 flex flex-wrap gap-2 justify-center md:justify-start">
                          {testimonials[currentIndex].tags.map((tag, i) => (
                            <span 
                              key={i} 
                              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-200"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        
                        <div className="absolute bottom-3 right-3 flex items-center">
                          <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 mr-1">{testimonials[currentIndex].verified}</span>
                          <svg className="w-4 h-4 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                          </svg>
                        </div>
                      </div>
                      
                      {/* Right panel with testimonial text */}
                      <div className="md:col-span-3 p-8 flex flex-col justify-center">
                        <div className="flex mb-4">
                          {[...Array(testimonials[currentIndex].stars)].map((_, i) => (
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
                        
                        <blockquote className="relative">
                          <p className="text-lg md:text-xl italic text-gray-700 dark:text-gray-200 leading-relaxed">
                            "{testimonials[currentIndex].text}"
                          </p>
                        </blockquote>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
            
            {/* Navigation arrows */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 md:translate-x-0">
              <button 
                onClick={prevTestimonial}
                className="bg-white dark:bg-gray-800 h-10 w-10 rounded-full shadow-lg flex items-center justify-center text-gray-800 dark:text-gray-200 transform transition hover:scale-110 focus:outline-none"
                aria-label="Previous testimonial"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                </svg>
              </button>
            </div>
            
            <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 md:translate-x-0">
              <button 
                onClick={nextTestimonial}
                className="bg-white dark:bg-gray-800 h-10 w-10 rounded-full shadow-lg flex items-center justify-center text-gray-800 dark:text-gray-200 transform transition hover:scale-110 focus:outline-none"
                aria-label="Next testimonial"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </button>
            </div>
          </div>
          
          {/* Pagination dots */}
          <div className="mt-10 flex justify-center space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToTestimonial(index)}
                className={`h-2 rounded-full transition-all focus:outline-none ${
                  currentIndex === index 
                    ? "w-8 bg-blue-600 dark:bg-blue-500" 
                    : "w-2 bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              ></button>
            ))}
          </div>
          
          {/* Call to action */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
            initial="hidden"
            animate={controls}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-16 text-center"
          >
            <p className="text-lg font-medium text-gray-900 dark:text-white mb-6">
              Join thousands of satisfied users and experience the difference
            </p>
            <a 
              href="#" 
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-lg transform transition hover:-translate-y-1"
            >
              Start Free Trial
              <svg className="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
              </svg>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
