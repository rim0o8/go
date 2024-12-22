import type { ComponentProps } from "react";
import React from "react";

import { NavigationLink } from "../NavigationLink";

import type { LucideIcon } from "lucide-react";

interface Props<
    T = {
        label: string;
        href: ComponentProps<typeof NavigationLink>['href'];
        icon: React.FC<{ className: string }> | LucideIcon;
    }
> {
    title: string;
    items: T[];
}

export const SectionItem: React.FC<Props> = ({ title, items }) => {
    return (
        <>
            <h5 className="py-2 pl-4 text-xs text-slate-500">{title}</h5>
            <ul className="mt-3 grid gap-1">
                {items.map((item) => (
                    <li className="overflow-hidden" key={item.label}>
                        <NavigationLink href={item.href}>
                            {item.icon && <item.icon className="size-6" />}
                            <p className="truncate">{item.label}</p>
                        </NavigationLink>
                    </li>
                ))}
            </ul>
        </>
    )
}