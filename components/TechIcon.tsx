"use client";

import { useState } from "react";
import Image from "next/image";

interface TechIconProps {
    name: string;
    icon: string;
    size?: number;
}

export default function TechIcon({ name, icon, size = 40 }: TechIconProps) {
    const [failed, setFailed] = useState(false);

    if (failed) {
        return (
            <div
                className="flex items-center justify-center rounded-lg border border-purple-500/30 bg-purple-500/10 text-xs font-semibold uppercase text-purple-200"
                style={{ width: size, height: size }}
                title={`${name} — add icon at ${icon}`}
            >
                {name.slice(0, 2)}
            </div>
        );
    }

    return (
        <div className="relative shrink-0" style={{ width: size, height: size }}>
            <Image
                src={icon}
                alt={name}
                fill
                className="object-contain"
                onError={() => setFailed(true)}
            />
        </div>
    );
}
