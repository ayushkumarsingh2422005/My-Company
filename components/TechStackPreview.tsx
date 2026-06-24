"use client";

import TechIcon from "@/components/TechIcon";
import { TECH_STACK, TECH_STACK_STATS } from "@/data/techStack";
import { motion } from "framer-motion";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";

/** Curated highlights for the home page — two per major domain. */
const PREVIEW_TECH = TECH_STACK.flatMap((category) =>
    category.techs.slice(0, 2).map((tech) => ({
        ...tech,
        categoryId: category.id,
    }))
).slice(0, 16);

const TechStackPreview = () => {
    return (
        <section className="relative overflow-hidden px-4 py-20">
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/10 to-transparent" />

            <div className="relative mx-auto max-w-7xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="mb-10 text-center"
                >
                    <h2 className="mb-4 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-3xl font-bold text-transparent md:text-4xl">
                        Our Tech Stack
                    </h2>
                    <p className="mx-auto mb-6 max-w-2xl text-gray-400">
                        AI, mobile, data, cloud, and full-stack web — we work
                        across {TECH_STACK_STATS.domains} technology domains and{" "}
                        {TECH_STACK_STATS.technologies}+ tools.
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-2">
                        {TECH_STACK.map((category) => (
                            <Link
                                key={category.id}
                                href={`/tech-stack#${category.id}`}
                                className="rounded-full border border-white/10 px-3 py-1 text-xs text-gray-400 transition-colors hover:border-purple-500/50 hover:text-white"
                            >
                                {category.category}
                            </Link>
                        ))}
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    viewport={{ once: true }}
                    className="mb-10 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8"
                >
                    {PREVIEW_TECH.map((tech) => (
                        <div
                            key={tech.name}
                            className="flex flex-col items-center gap-2 rounded-xl border border-white/10 bg-white/5 p-4 text-center transition-colors hover:border-purple-500/30"
                        >
                            <TechIcon name={tech.name} icon={tech.icon} size={36} />
                            <span className="text-xs font-medium text-gray-300">
                                {tech.name}
                            </span>
                        </div>
                    ))}
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.15 }}
                    viewport={{ once: true }}
                    className="text-center"
                >
                    <p className="mb-6 text-sm text-gray-500">
                        See proficiency levels, descriptions, and the complete
                        stack on our dedicated technology page.
                    </p>
                    <Link
                        href="/tech-stack"
                        className="inline-flex items-center rounded-full bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-3 font-semibold text-white transition-all hover:shadow-lg hover:shadow-purple-500/25"
                    >
                        Explore full tech stack
                        <FiArrowRight className="ml-2" />
                    </Link>
                </motion.div>
            </div>
        </section>
    );
};

export default TechStackPreview;
