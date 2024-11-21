import type { Config } from "tailwindcss";

const shadcnPreset: Partial<Config> = {
    theme: {
        extend: {
            colors: {
                primary: "hsl(var(--primary))",
                secondary: "hsl(var(--secondary))",
                background: "hsl(var(--background))",
                foreground: "hsl(var(--foreground))",
            },
            borderRadius: {
                lg: "var(--radius-lg)",
                md: "var(--radius-md)",
                sm: "var(--radius-sm)",
            },
        },
    },
    plugins: [require("tailwindcss-animate")],
};

export default shadcnPreset;
