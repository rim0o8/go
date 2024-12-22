import { SectionItem } from "@/components/layout/Sidebar/SectionItem";
import { routes } from './routes';

export const Navigation: React.FC = () => {
    return (
        <nav className="no-scrollbar overflow-y-scroll px-4 pb-4">
            <ul className="grid gap-4 [&>li:not(:last-child)]:border-b-2 [&>li:not(:last-child)]:pb-2">
                {routes.map((route) => (
                    <li key={route.title}>
                        <SectionItem items={route.items} title={route.title} />
                    </li>
                ))}
            </ul>
        </nav>
    );
};