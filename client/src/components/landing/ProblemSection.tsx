import { useEffect, useState, useRef } from "react";
import { motion, useInView as framerUseInView } from "framer-motion";
import { useInView } from "react-intersection-observer";
import gsap from "gsap";

// Component for number counter animation
const CounterAnimation = ({
  value,
  suffix = "",
  prefix = "",
  decimals = 0,
  duration = 2.5
}: {
  value: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  duration?: number;
}) => {
  const [count, setCount] = useState(0);
  const nodeRef = useRef(null);
  const inView = framerUseInView(nodeRef);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    if (inView) {
      let start = 0;
      const end = parseInt(value.toString(), 10);
      const stepTime = Math.abs(Math.floor(duration * 1000 / end));
      const counter = () => {
        start += 1;
        setCount(start);
        if (start < end) {
          timeout = setTimeout(counter, stepTime);
        }
      };

      timeout = setTimeout(counter, stepTime);
    }

    return () => clearTimeout(timeout);
  }, [inView, value, duration]);

  return (
    <span ref={nodeRef} className="font-bold tabular-nums">
      {prefix}{count}{suffix}
    </span>
  );
};

export default function ProblemSection() {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.2,
  });

  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (inView && sectionRef.current) {
      // Animate the gradient background
      gsap.fromTo(
        sectionRef.current.querySelector('.gradient-bg'),
        {
          opacity: 0.3,
          backgroundPosition: '0% 50%'
        },
        {
          opacity: 0.7,
          backgroundPosition: '100% 50%',
          duration: 15,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        }
      );

      // Floating particles
      const particles = sectionRef.current.querySelectorAll('.particle');
      particles.forEach((particle, i) => {
        gsap.to(particle, {
          y: "random(-40, 40)",
          x: "random(-20, 20)",
          rotation: "random(-30, 30)",
          duration: "random(3, 6)",
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: i * 0.1
        });
      });
    }
  }, [inView]);

  const stats = [
    {
      value: 30,
      suffix: "%",
      description: "of food is wasted globally.",
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
      ),
      delay: 0.1,
      color: "bg-gradient-to-br from-blue-500 to-indigo-600",
      glowColor: "blue",
    },
    {
      value: 1.2,
      suffix: "B",
      prefix: "$",
      description: "lost in expired medicine annually.",
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
      ),
      delay: 0.2,
      color: "bg-gradient-to-br from-purple-500 to-pink-600",
      glowColor: "purple",
    },
    {
      value: 10,
      suffix: "M+ tons",
      description: "of waste harming the planet.",
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h.5A2.5 2.5 0 0020 5.5v-1.65"></path>
        </svg>
      ),
      delay: 0.3,
      color: "bg-gradient-to-br from-red-500 to-orange-600",
      glowColor: "red",
    }
  ];

  return (
    <section
      id="problem"
      ref={sectionRef}
      className="relative section-padding overflow-hidden bg-gradient-to-b from-gray-950 to-gray-900 text-white"
    >
      {/* Animated gradient background */}
      <div className="gradient-bg absolute inset-0 opacity-50 bg-gradient-to-tr from-blue-900/30 via-purple-900/30 to-gray-900/30 bg-[length:200%_200%]"></div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className={`particle absolute w-${Math.random() > 0.5 ? '3' : '2'} h-${Math.random() > 0.5 ? '3' : '2'} rounded-full
            ${i % 3 === 0 ? 'bg-blue-500/30' : i % 3 === 1 ? 'bg-purple-500/30' : 'bg-indigo-500/30'}`}
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.4 + 0.1,
              filter: `blur(${Math.random() * 2}px)`
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div ref={ref} className="reveal">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">
              We're <span className="text-red-500">Throwing Away</span> the Future.
            </h2>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Every day, we discard valuable resources that could be saved with better management.
              The cost isn't just financial it's environmental and ethical.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: stat.delay }}
                whileHover={{ scale: 1.03, y: -5 }}
                className="glassmorphism bg-gray-900/60 dark:bg-gray-900/60 rounded-xl p-8 relative group"
              >
                {/* Animated glow effect */}
                <div className={`absolute inset-0 rounded-xl bg-${stat.glowColor}-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-xl`}></div>

                {/* Icon with gradient background */}
                <div className="relative mb-6">
                  <div className={`flex items-center justify-center w-20 h-20 mx-auto rounded-xl ${stat.color} shadow-lg border border-white/10`}>
                    <div className="text-white">
                      {stat.icon}
                    </div>
                  </div>
                  <div className="absolute -inset-1 rounded-xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-700 -z-10 bg-gradient-to-tr from-white/10 via-white/5 to-transparent"></div>
                </div>

                {/* Animated counter */}
                <motion.h3
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={inView ? { scale: 1, opacity: 1 } : {}}
                  transition={{ duration: 0.7, delay: stat.delay + 0.3 }}
                  className="text-3xl md:text-4xl font-extrabold mb-3 text-center"
                >
                  {inView ? (
                    <CounterAnimation
                      value={stat.value}
                      prefix={stat.prefix}
                      suffix={stat.suffix}
                      decimals={stat.suffix === "B" ? 1 : 0}
                    />
                  ) : (
                    <span>{stat.prefix}{stat.value}{stat.suffix}</span>
                  )}
                </motion.h3>

                <p className="text-gray-300 text-center text-lg">{stat.description}</p>

                {/* Decorative line */}
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
                  <div className={`h-1 w-16 rounded-full bg-gradient-to-r from-transparent via-${stat.glowColor}-500/70 to-transparent`}></div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
