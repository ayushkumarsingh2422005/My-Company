import type { Metadata } from "next";
import TechStackPageContent from "./TechStackPageContent";

export const metadata: Metadata = {
    title: "Our Tech Stack",
    description:
        "Explore DigiCraft's full technology stack — AI, machine learning, mobile apps, data science, cloud, DevOps, web, and more.",
};

export default function TechStackPage() {
    return <TechStackPageContent />;
}
