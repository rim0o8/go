"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { ComponentProps } from 'react';
import React from 'react';

import { tw } from '@/lib/tailwindcss';

interface Props extends ComponentProps<typeof Link> { }

export const NavigationLink: React.FC<Props> = ({ href, ...props }) => {
    const pathname = usePathname();

    return (
        <Link
            className={tw(
                'flex items-center gap-4 truncate rounded-lg bg-transparent py-3 pl-4 pr-3 text-sm font-semibold transition has=[:checked]:bg-slate-100',
                typeof href === 'string' ? href === pathname : href.pathname === pathname && 'bg-slate-100',
                'hover:bg-slate-100',
            )}
            href={href}
            {...props}
        />
    );
};