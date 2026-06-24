"use client";

import TechIcon from "@/components/TechIcon";
import { TECH_STACK, TECH_STACK_STATS } from "@/data/techStack";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

const TechCard = ({
    name,
    icon,
    level,
    description,
}: {
    name: string;
    icon: string;
    level: number;
    description?: string;
}) => (
    <motion.div
        whileHover={{ y: -4 }}
        className="rounded-xl border border-purple-500/20 bg-gradient-to-br from-purple-900/30 to-transparent p-4 backdrop-blur-sm"
    >
        <div className="mb-3 flex items-start gap-3">
            <TechIcon name={name} icon={icon} />
            <div className="min-w-0 flex-1">
                <h4 className="font-semibold text-white">{name}</h4>
                {description && (
                    <p className="mt-0.5 text-xs leading-relaxed text-gray-400">
                        {description}
                    </p>
                )}
            </div>
        </div>
        <div className="h-1.5 overflow-hidden rounded-full bg-gray-700">
            <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${level}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                viewport={{ once: true }}
                className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
            />
        </div>
        <span className="mt-1.5 block text-xs text-gray-500">
            {level}% proficiency
        </span>
    </motion.div>
);

const TechStack = ({ showPageHeader = true }: { showPageHeader?: boolean }) => {
    const [activeCategory, setActiveCategory] = useState<string>("all");

    useEffect(() => {
        const hash = window.location.hash.replace("#", "");
        if (hash && TECH_STACK.some((cat) => cat.id === hash)) {
            setActiveCategory(hash);
            window.setTimeout(() => {
                document
                    .getElementById(`tech-${hash}`)
                    ?.scrollIntoView({ behavior: "smooth", block: "start" });
            }, 100);
        }
    }, []);

    const visibleCategories = useMemo(() => {
        if (activeCategory === "all") return TECH_STACK;
        return TECH_STACK.filter((cat) => cat.id === activeCategory);
    }, [activeCategory]);

    return (
        <section className="relative overflow-hidden px-4 py-20">
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black to-purple-900/20" />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(123,49,255,0.05)_0%,transparent_100%)]" />

            <div className="relative mx-auto max-w-7xl">
                {showPageHeader && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                        className="mb-12 text-center"
                    >
                        <h2 className="mb-4 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-3xl font-bold text-transparent md:text-4xl">
                            Our Tech Stack
                        </h2>
                        <p className="mx-auto mb-6 max-w-3xl text-gray-400">
                            From AI and data science to mobile apps, cloud
                            infrastructure, and production web platforms — we
                            build across the full modern technology spectrum.
                        </p>
                        <div className="flex flex-wrap items-center justify-center gap-3 text-sm">
                            <span className="rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-1.5 text-purple-200">
                                {TECH_STACK_STATS.domains} domains
                            </span>
                            <span className="rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-1.5 text-purple-200">
                                {TECH_STACK_STATS.technologies}+ technologies
                            </span>
                            <span className="rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-1.5 text-purple-200">
                                AI · Apps · Data · Cloud · Web3
                            </span>
                        </div>
                    </motion.div>
                )}

                <div className="mb-12 flex flex-wrap justify-center gap-2 px-1">
                        <button
                            type="button"
                            onClick={() => setActiveCategory("all")}
                            className={`shrink-0 rounded-full border px-4 py-2 text-sm transition-all ${
                                activeCategory === "all"
                                    ? "border-purple-500 bg-purple-500/20 text-white"
                                    : "border-white/10 text-gray-400 hover:border-purple-500/50 hover:text-white"
                            }`}
                        >
                            All domains
                        </button>
                        {TECH_STACK.map((category) => (
                            <button
                                key={category.id}
                                type="button"
                                onClick={() => setActiveCategory(category.id)}
                                className={`shrink-0 rounded-full border px-4 py-2 text-sm transition-all ${
                                    activeCategory === category.id
                                        ? "border-purple-500 bg-purple-500/20 text-white"
                                        : "border-white/10 text-gray-400 hover:border-purple-500/50 hover:text-white"
                                }`}
                            >
                                {category.category}
                            </button>
                        ))}
                </div>

                <div className="space-y-16">
                    {visibleCategories.map((category, categoryIndex) => (
                        <motion.div
                            key={category.id}
                            id={`tech-${category.id}`}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{
                                duration: 0.5,
                                delay: categoryIndex * 0.05,
                            }}
                            viewport={{ once: true }}
                        >
                            <div className="mb-6 md:text-left">
                                <h3 className="mb-2 text-center text-2xl font-semibold md:text-left">
                                    <span className="text-purple-500">/</span>{" "}
                                    {category.category}
                                </h3>
                                <p className="text-center text-sm text-gray-400 md:text-left">
                                    {category.description}
                                </p>
                            </div>
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                                {category.techs.map((tech) => (
                                    <TechCard key={tech.name} {...tech} />
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="mt-16 text-center"
                >
                    <p className="mb-2 text-gray-400">
                        Need a custom stack across AI, mobile, data, or cloud?
                    </p>
                    <p className="mb-8 text-sm text-gray-500">
                        We architect end-to-end solutions — not just single-layer
                        implementations.
                    </p>
                    <Link
                        href="/contact"
                        className="rounded-full bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-4 font-semibold text-white transition-all hover:shadow-lg hover:shadow-purple-500/25"
                    >
                        Let&apos;s Discuss Your Requirements
                    </Link>
                </motion.div>
            </div>
        </section>
    );
};

export default TechStack;
