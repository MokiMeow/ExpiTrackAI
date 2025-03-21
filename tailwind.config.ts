import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./client/index.html", "./client/src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
          "Apple Color Emoji",
          "Segoe UI Emoji",
          "Segoe UI Symbol",
          "Noto Color Emoji",
        ],
      },
      fontSize: {
        "2xs": ["0.625rem", { lineHeight: "0.75rem" }],
        "hero": ["4rem", { lineHeight: "1" }],
        "hero-mobile": ["3rem", { lineHeight: "1" }],
      },
      boxShadow: {
        'glow-sm': '0 0 10px -1px rgba(79, 70, 229, 0.2)',
        'glow': '0 0 20px -2px rgba(79, 70, 229, 0.3)',
        'glow-lg': '0 0 30px -2px rgba(79, 70, 229, 0.4)',
        'glow-xl': '0 0 50px -5px rgba(79, 70, 229, 0.5)',
        'inner-glow': 'inset 0 0 20px 0 rgba(79, 70, 229, 0.3)',
        'glass': '0 4px 30px rgba(0, 0, 0, 0.1)',
        'glass-lg': '0 8px 40px rgba(0, 0, 0, 0.15)',
        'glass-dark': '0 4px 30px rgba(0, 0, 0, 0.3)',
        'glass-dark-lg': '0 8px 40px rgba(0, 0, 0, 0.4)',
        'neo-light': '10px 10px 20px rgba(0, 0, 0, 0.05), -10px -10px 20px rgba(255, 255, 255, 0.8)',
        'neo-dark': '10px 10px 20px rgba(0, 0, 0, 0.3), -10px -10px 20px rgba(255, 255, 255, 0.04)',
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          50: "#eef2ff",
          100: "#e0e7ff",
          200: "#c7d2fe",
          300: "#a5b4fc",
          400: "#818cf8",
          500: "#6366f1",
          600: "#4f46e5",
          700: "#4338ca",
          800: "#3730a3",
          900: "#312e81",
          950: "#1e1b4b",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      textShadow: {
        sm: '0 1px 2px rgba(0, 0, 0, 0.1)',
        DEFAULT: '0 2px 4px rgba(0, 0, 0, 0.1)',
        lg: '0 8px 16px rgba(0, 0, 0, 0.1)',
        glow: '0 0 8px rgba(79, 70, 229, 0.4)',
        'glow-lg': '0 0 12px rgba(79, 70, 229, 0.6)',
      },
      transitionTimingFunction: {
        'spring': 'cubic-bezier(0.22, 1, 0.36, 1)',
        'bounce-in': 'cubic-bezier(0.16, 1.36, 0.5, 1)',
        'bounce-out': 'cubic-bezier(0.5, 0, 0.84, -0.36)',
      },
      blur: {
        xs: '2px',
      },
      dropShadow: {
        'glow': '0 0 8px rgba(79, 70, 229, 0.3)',
        'glow-lg': '0 0 12px rgba(79, 70, 229, 0.5)',
        'text': '0 2px 4px rgba(0, 0, 0, 0.1)',
        'text-dark': '0 2px 2px rgba(0, 0, 0, 0.5)',
      },
      backdropBlur: {
        xs: '2px',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-mesh': 'linear-gradient(217deg, rgba(79, 70, 229, 0.1), rgba(17, 24, 39, 0) 70%), linear-gradient(127deg, rgba(99, 102, 241, 0.1), rgba(17, 24, 39, 0) 70%), linear-gradient(336deg, rgba(139, 92, 246, 0.1), rgba(17, 24, 39, 0) 70%)',
        'grid-pattern': 'linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px)',
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "float": {
          "0%, 100%": {
            transform: "translateY(0)",
          },
          "50%": {
            transform: "translateY(-10px)",
          },
        },
        "float-complex": {
          "0%": {
            transform: "translateY(0px) translateX(0px) rotate(0deg)",
          },
          "25%": {
            transform: "translateY(-10px) translateX(5px) rotate(1deg)",
          },
          "50%": {
            transform: "translateY(-20px) translateX(0px) rotate(0deg)",
          },
          "75%": {
            transform: "translateY(-10px) translateX(-5px) rotate(-1deg)",
          },
          "100%": {
            transform: "translateY(0px) translateX(0px) rotate(0deg)",
          },
        },
        "pulse-glow": {
          "0%, 100%": {
            opacity: "1",
            filter: "brightness(1)",
          },
          "50%": {
            opacity: "0.8",
            filter: "brightness(1.2)",
          },
        },
        "pulse-glow-strong": {
          "0%, 100%": {
            opacity: "0.5",
            filter: "brightness(1) blur(3px)",
            transform: "scale(0.95)",
          },
          "50%": {
            opacity: "1",
            filter: "brightness(1.1) blur(5px)",
            transform: "scale(1.05)",
          },
        },
        "float-rotate": {
          "0%": {
            transform: "translateY(0px) rotate(0deg)",
          },
          "50%": {
            transform: "translateY(-10px) rotate(4deg)",
          },
          "100%": {
            transform: "translateY(0px) rotate(0deg)",
          },
        },
        "ripple": {
          "0%": {
            transform: "scale(0.8)",
            opacity: "1",
          },
          "100%": {
            transform: "scale(2.4)",
            opacity: "0",
          },
        },
        "morph": {
          "0%, 100%": {
            borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%",
          },
          "25%": {
            borderRadius: "30% 60% 70% 40% / 50% 60% 30% 60%",
          },
          "50%": {
            borderRadius: "50% 60% 30% 60% / 40% 30% 70% 50%",
          },
          "75%": {
            borderRadius: "60% 40% 50% 40% / 30% 50% 40% 70%",
          },
        },
        "glow-pulse": {
          "0%, 100%": {
            boxShadow: "0 0 10px rgba(79, 70, 229, 0.3)",
            opacity: "0.8"
          },
          "50%": {
            boxShadow: "0 0 30px rgba(79, 70, 229, 0.6)",
            opacity: "1"
          }
        },
        "shimmer": {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" }
        },
        "rotate-slow": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" }
        },
        "rotate-glow": {
          "0%": { 
            transform: "rotate(0deg)",
            filter: "brightness(1) blur(3px)",
          },
          "50%": { 
            transform: "rotate(180deg)",
            filter: "brightness(1.2) blur(4px)",
          },
          "100%": { 
            transform: "rotate(360deg)",
            filter: "brightness(1) blur(3px)",
          }
        },
        "float-orbit": {
          "0%": { 
            transform: "translate(0, 0) rotate(0deg) translateX(10px) rotate(0deg)" 
          },
          "100%": { 
            transform: "translate(0, 0) rotate(360deg) translateX(10px) rotate(-360deg)" 
          }
        },
        "scale-pulse": {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.05)" }
        },
        "text-gradient": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" }
        },
        "particle-float": {
          "0%, 100%": { 
            transform: "translateY(0) translateX(0)",
            opacity: "0.3"
          },
          "50%": { 
            transform: "translateY(-20px) translateX(10px)",
            opacity: "0.8"
          }
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "float": "float 5s ease-in-out infinite",
        "float-complex": "float-complex 10s ease-in-out infinite",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        "pulse-glow-strong": "pulse-glow-strong 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float-rotate": "float-rotate 6s ease-in-out infinite",
        "ripple": "ripple 3s linear infinite",
        "morph": "morph 8s ease-in-out infinite",
        "glow-pulse": "glow-pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "shimmer": "shimmer 8s ease-in-out infinite",
        "rotate-slow": "rotate-slow 12s linear infinite",
        "rotate-glow": "rotate-glow 10s ease-in-out infinite",
        "float-orbit": "float-orbit 12s linear infinite",
        "scale-pulse": "scale-pulse 3s ease-in-out infinite",
        "text-gradient": "text-gradient 3s linear infinite",
        "particle-float": "particle-float 10s ease-in-out infinite",
      },
      transitionProperty: {
        'height': 'height',
        'spacing': 'margin, padding',
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"), 
    require("@tailwindcss/typography"),
    function ({ addUtilities }) {
      const newUtilities = {
        '.text-shadow-sm': {
          textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
        },
        '.text-shadow': {
          textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        },
        '.text-shadow-lg': {
          textShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
        },
        '.text-shadow-glow': {
          textShadow: '0 0 8px rgba(79, 70, 229, 0.4)',
        },
        '.text-shadow-glow-lg': {
          textShadow: '0 0 12px rgba(79, 70, 229, 0.6)',
        },
        '.text-gradient': {
          background: 'linear-gradient(to right, #4f46e5, #0ea5e9)',
          '-webkit-background-clip': 'text',
          '-webkit-text-fill-color': 'transparent',
        },
        '.text-gradient-moving': {
          background: 'linear-gradient(to right, #4f46e5, #0ea5e9, #8b5cf6, #4f46e5)',
          backgroundSize: '300% 100%',
          '-webkit-background-clip': 'text',
          '-webkit-text-fill-color': 'transparent',
          animation: 'text-gradient 8s linear infinite',
        },
        '.scrollbar-hide': {
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        },
        '.backdrop-blur-2xs': {
          'backdrop-filter': 'blur(1px)',
        },
        '.backdrop-blur-xs': {
          'backdrop-filter': 'blur(2px)',
        },
      }
      addUtilities(newUtilities)
    },
  ],
} satisfies Config;
