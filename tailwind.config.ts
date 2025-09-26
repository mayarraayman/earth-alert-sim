import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        
        // Space Theme Colors
        space: {
          deep: "hsl(var(--space-deep))",
          medium: "hsl(var(--space-medium))",
          light: "hsl(var(--space-light))",
        },
        
        // NASA Brand Colors
        nasa: {
          blue: "hsl(var(--nasa-blue))",
          red: "hsl(var(--nasa-red))",
          white: "hsl(var(--nasa-white))",
        },
        
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          glow: "hsl(var(--primary-glow))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
          glow: "hsl(var(--destructive-glow))",
        },
        warning: {
          DEFAULT: "hsl(var(--warning))",
          foreground: "hsl(var(--warning-foreground))",
          glow: "hsl(var(--warning-glow))",
        },
        success: {
          DEFAULT: "hsl(var(--success))",
          foreground: "hsl(var(--success-foreground))",
          glow: "hsl(var(--success-glow))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
          glow: "hsl(var(--accent-glow))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
          border: "hsl(var(--card-border))",
        },
      },
      
      // Space-themed gradients
      backgroundImage: {
        'gradient-primary': 'var(--gradient-primary)',
        'gradient-space': 'var(--gradient-space)',
        'gradient-earth': 'var(--gradient-earth)',
        'gradient-asteroid': 'var(--gradient-asteroid)',
        'gradient-alert': 'var(--gradient-alert)',
        'gradient-success': 'var(--gradient-success)',
      },
      
      // Space-themed box shadows
      boxShadow: {
        'space': 'var(--shadow-space)',
        'primary-glow': 'var(--shadow-primary), var(--glow-primary)',
        'destructive-glow': 'var(--shadow-destructive), var(--glow-destructive)',
        'accent-glow': 'var(--glow-accent)',
      },
      
      // Animation easings
      transitionTimingFunction: {
        'space': 'var(--ease-space)',
        'impact': 'var(--ease-impact)',
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
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
        "pulse-alert": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.7" }
        },
        "trajectory-flow": {
          "0%": { "stroke-dashoffset": "0" },
          "100%": { "stroke-dashoffset": "20" }
        },
        "glow": {
          "0%, 100%": { "box-shadow": "0 0 20px hsl(var(--primary) / 0.4)" },
          "50%": { "box-shadow": "0 0 40px hsl(var(--primary) / 0.8)" }
        }
      },
      
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "pulse-alert": "pulse-alert 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "trajectory-flow": "trajectory-flow 2s linear infinite",
        "glow": "glow 3s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
