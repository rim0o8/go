import { Bot } from 'lucide-react';
import type { ComponentProps } from 'react';

import { SectionItem } from "@/components/layout/Sidebar/SectionItem";

export const routes: ComponentProps<typeof SectionItem>[] = [
    {
        title: 'Dashboard',
        items: [
            {
                label: 'Home',
                icon: Bot,
                href: '/',
            }
        ]
    },
    {
        title: 'Settings',
        items: [
            {
                label: 'Profile',
                icon: Bot,
                href: '/',
            },
            {
                label: 'Account',
                icon: Bot,
                href: '/',
            },
            {
                label: 'Billing',
                icon: Bot,
                href: '/',
            }
        ]
    }
] as const;