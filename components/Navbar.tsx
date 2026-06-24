"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { ChevronDownIcon } from "lucide-react";

type NavLink = { name: string; path: string };

type NavDropdown = {
    id: string;
    label: string;
    items: NavLink[];
};

const navLinks: NavLink[] = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: "Pricing", path: "/pricing" },
    { name: "About", path: "/about" },
];

const navDropdowns: NavDropdown[] = [
    {
        id: "work",
        label: "Work",
        items: [
            { name: "Clients", path: "/clients" },
            { name: "Projects", path: "/projects" },
        ],
    },
    {
        id: "services",
        label: "Services",
        items: [
            { name: "All Services", path: "/services" },
            { name: "Tech Stack", path: "/tech-stack" },
        ],
    },
];

const productDropdownItems = [
    {
        name: "Careers",
        href: "https://career.digicraft.one",
        logo: "https://career.digicraft.one/logo.svg",
    },
    {
        name: "Marketplace",
        href: "https://marketplace.digicraft.one",
        logo: "https://marketplace.digicraft.one/logo.svg",
    },
    { name: "Media", href: "https://media.digicraft.one", logo: "https://media.digicraft.one/logo.svg" },
];

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const pathname = usePathname();
    const router = useRouter();
    const [openMenu, setOpenMenu] = useState<string | null>(null);
    const navRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        if (!isMounted) return;

        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [isMounted]);

    useEffect(() => {
        if (!isMounted) return;

        const handleClickOutside = (event: MouseEvent) => {
            if (navRef.current && !navRef.current.contains(event.target as Node)) {
                setOpenMenu(null);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isMounted]);

    const closeMenus = () => {
        setIsOpen(false);
        setOpenMenu(null);
    };

    const isActive = (path: string) => {
        if (path === "/") return pathname === "/";
        return pathname.startsWith(path);
    };

    const isDropdownActive = (items: NavLink[]) =>
        items.some((item) => isActive(item.path));

    const toggleMenu = (id: string) => {
        setOpenMenu((prev) => (prev === id ? null : id));
    };

    const linkClass = (active: boolean) =>
        `relative group transition-colors ${
            active ? "text-purple-500" : "text-gray-300 hover:text-white"
        }`;

    const dropdownButtonClass = (active: boolean) =>
        `flex items-center gap-1 transition-colors ${
            active ? "text-purple-500" : "text-gray-300 hover:text-white"
        }`;

    return (
        <motion.nav
            ref={navRef}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`fixed z-50 w-full transition-all duration-300 ${
                isScrolled
                    ? "bg-black/80 py-2 backdrop-blur-md"
                    : "bg-transparent py-6"
            }`}
        >
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/" className="text-2xl font-bold">
                            <Image
                                src="/logo.svg"
                                alt="DigiCraft"
                                width={60}
                                height={60}
                                className="h-16 w-auto"
                                priority
                            />
                        </Link>
                        <div className="relative hidden md:block">
                            <button
                                type="button"
                                title="DigiCraft ecosystem"
                                onClick={() => toggleMenu("others")}
                                className="flex items-center justify-center gap-1 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-sm text-white backdrop-blur-sm transition-all hover:bg-white/20"
                            >
                                Others
                                <ChevronDownIcon
                                    className={`h-4 w-4 transition-transform duration-300 ${
                                        openMenu === "others" ? "rotate-180" : ""
                                    }`}
                                />
                            </button>

                            {isMounted && openMenu === "others" && (
                                <div className="absolute left-0 z-50 mt-2 w-44 rounded-md border border-white/20 bg-black/90 shadow-lg backdrop-blur-md">
                                    <ul className="py-1">
                                        {productDropdownItems.map((item) => (
                                            <li key={item.name}>
                                                <a
                                                    href={item.href}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="mx-1 flex min-h-[36px] items-center gap-2 rounded px-3 py-1.5 text-sm font-medium text-gray-300 transition-colors hover:bg-white/10 hover:text-white"
                                                    onClick={() => setOpenMenu(null)}
                                                >
                                                    <Image
                                                        src={item.logo}
                                                        alt={`${item.name} logo`}
                                                        width={20}
                                                        height={20}
                                                        className="h-5 w-5 object-contain"
                                                    />
                                                    <span>{item.name}</span>
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden items-center gap-6 lg:flex xl:gap-8">
                        {navLinks.slice(0, 1).map((item) => (
                            <Link
                                key={item.path}
                                href={item.path}
                                className={linkClass(isActive(item.path))}
                            >
                                {item.name}
                            </Link>
                        ))}

                        {navDropdowns.map((dropdown) => (
                            <div key={dropdown.id} className="relative">
                                <button
                                    type="button"
                                    onClick={() => toggleMenu(dropdown.id)}
                                    className={dropdownButtonClass(
                                        isDropdownActive(dropdown.items)
                                    )}
                                >
                                    {dropdown.label}
                                    <ChevronDownIcon
                                        className={`h-4 w-4 transition-transform duration-300 ${
                                            openMenu === dropdown.id
                                                ? "rotate-180"
                                                : ""
                                        }`}
                                    />
                                </button>

                                {isMounted && openMenu === dropdown.id && (
                                    <div className="absolute left-0 top-full z-50 mt-2 min-w-[11rem] rounded-md border border-white/20 bg-black/90 py-1 shadow-lg backdrop-blur-md">
                                        {dropdown.items.map((item) => (
                                            <Link
                                                key={item.path}
                                                href={item.path}
                                                onClick={() => setOpenMenu(null)}
                                                className={`block px-4 py-2 text-sm transition-colors hover:bg-white/10 hover:text-white ${
                                                    isActive(item.path)
                                                        ? "text-purple-400"
                                                        : "text-gray-300"
                                                }`}
                                            >
                                                {item.name}
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}

                        {navLinks.slice(1).map((item) => (
                            <Link
                                key={item.path}
                                href={item.path}
                                className={linkClass(isActive(item.path))}
                            >
                                {item.name}
                            </Link>
                        ))}

                        <button
                            type="button"
                            onClick={() => router.push("/contact")}
                            className="rounded-full bg-gradient-to-r from-purple-600 to-pink-600 px-4 py-2 transition-all hover:shadow-lg hover:shadow-purple-500/25"
                        >
                            Let&apos;s Talk
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        type="button"
                        className="p-2 focus:outline-none lg:hidden"
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label="Toggle menu"
                    >
                        <div
                            className={`mb-1.5 h-0.5 w-6 bg-white transition-all ${
                                isOpen ? "translate-y-2 rotate-45" : ""
                            }`}
                        />
                        <div
                            className={`mb-1.5 h-0.5 w-6 bg-white transition-all ${
                                isOpen ? "opacity-0" : ""
                            }`}
                        />
                        <div
                            className={`h-0.5 w-6 bg-white transition-all ${
                                isOpen ? "-translate-y-2 -rotate-45" : ""
                            }`}
                        />
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="bg-black/90 backdrop-blur-md lg:hidden"
                    >
                        <div className="space-y-1 px-4 py-6">
                            <Link
                                href="/"
                                onClick={closeMenus}
                                className={`block py-2 ${linkClass(isActive("/"))}`}
                            >
                                Home
                            </Link>

                            {navDropdowns.map((dropdown) => (
                                <div key={dropdown.id} className="py-1">
                                    <p className="px-0 py-1 text-xs font-medium uppercase tracking-wider text-gray-500">
                                        {dropdown.label}
                                    </p>
                                    {dropdown.items.map((item) => (
                                        <Link
                                            key={item.path}
                                            href={item.path}
                                            onClick={closeMenus}
                                            className={`block py-2 pl-3 ${linkClass(
                                                isActive(item.path)
                                            )}`}
                                        >
                                            {item.name}
                                        </Link>
                                    ))}
                                </div>
                            ))}

                            {navLinks.slice(1).map((item) => (
                                <Link
                                    key={item.path}
                                    href={item.path}
                                    onClick={closeMenus}
                                    className={`block py-2 ${linkClass(
                                        isActive(item.path)
                                    )}`}
                                >
                                    {item.name}
                                </Link>
                            ))}

                            <div className="border-t border-white/10 pt-3">
                                <p className="py-1 text-xs font-medium uppercase tracking-wider text-gray-500">
                                    Others
                                </p>
                                {productDropdownItems.map((item) => (
                                    <a
                                        key={item.name}
                                        href={item.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={closeMenus}
                                        className="block py-2 pl-3 text-gray-300 hover:text-purple-500"
                                    >
                                        {item.name}
                                    </a>
                                ))}
                            </div>

                            <button
                                type="button"
                                onClick={() => {
                                    closeMenus();
                                    router.push("/contact");
                                }}
                                className="block w-full py-2 text-left text-purple-500 transition-colors hover:text-purple-400"
                            >
                                Let&apos;s Talk
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
};

export default Navbar;
