import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "#050505",
                foreground: "#ffffff",
                primary: "#8b5cf6", // Violet
                secondary: "#ec4899", // Pink
                "glass-card": "rgba(255, 255, 255, 0.05)",
                "glass-card-strong": "rgba(255, 255, 255, 0.1)",
                "neon-cyan": "#06b6d4",
                "neon-purple": "#a855f7",
                "neon-blue": "#3b82f6",
                "surface-1": "#121212",
                "surface-2": "#1e1e1e",
            },
        },
    },
    plugins: [],
};
export default config;
