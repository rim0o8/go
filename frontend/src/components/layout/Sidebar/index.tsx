import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";

import { ModeToggle } from "./ModeToggle";
import { Navigation } from "./Navigation/index";

export const Sidebar: React.FC = () => {
    return (
        <Sheet key="menu">
            <SheetTrigger asChild>
                <Button variant="outline">menu</Button>
            </SheetTrigger>
            <SheetContent side="left">
                <SheetHeader>
                    <SheetTitle>ers</SheetTitle>
                    <SheetDescription></SheetDescription>
                </SheetHeader>
                <div>
                    <Navigation />
                    <ModeToggle></ModeToggle>
                </div>
                <SheetFooter></SheetFooter>
            </SheetContent>
        </Sheet>
    )
}