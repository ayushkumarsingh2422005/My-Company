"use client";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import TechStack from "@/components/TechStack";
import { TECH_STACK_STATS } from "@/data/techStack";
import { motion } from "framer-motion";

const GridBackground = () => (
    <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-20">
        <div
            className="absolute inset-0"
            style={{
                backgroundImage: `linear-gradient(90deg, rgba(123,49,255,0.1) 1px, transparent 1px),
                         linear-gradient(rgba(123,49,255,0.1) 1px, transparent 1px)`,
                backgroundSize: "4rem 4rem",
            }}
        />
    </div>
);

export default function TechStackPageContent() {
    return (
        <main className="relative min-h-screen">
            <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_center,rgba(123,49,255,0.05)_0%,transparent_100%)]" />
            <GridBackground />

            <div className="relative">
                <Navbar />

                <section className="border-b border-white/5 px-4 pb-8 pt-28 md:pt-32">
                    <div className="mx-auto max-w-7xl text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <p className="mb-4 font-mono text-sm text-purple-400">
                                Technology
                            </p>
                            <h1 className="mb-6 text-4xl font-bold md:text-5xl lg:text-6xl">
                                <span className="text-gradient">
                                    Full Stack Expertise
                                </span>
                            </h1>
                            <p className="mx-auto max-w-3xl text-lg text-gray-400">
                                Every layer of modern software — from AI models
                                and data pipelines to mobile apps, APIs, cloud
                                infrastructure, and production web platforms.
                            </p>
                            <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-sm">
                                <span className="rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-1.5 text-purple-200">
                                    {TECH_STACK_STATS.domains} domains
                                </span>
                                <span className="rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-1.5 text-purple-200">
                                    {TECH_STACK_STATS.technologies}+ technologies
                                </span>
                            </div>
                        </motion.div>
                    </div>
                </section>

                <TechStack showPageHeader={false} />
                <Footer />
            </div>
        </main>
    );
}
