import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";


interface ItemCardProps {
    user_name: string;
    index: number;
}

const ItemCard: React.FC<ItemCardProps> = ({ user_name, index }) => {
    return (
        <Card key={index} className="shadow-lg rounded-lg overflow-hidden bg-white">
            <CardHeader className="h-56 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white flex flex-col items-center justify-center p-4">
                <Avatar className="mb-4 w-24 h-24 border-4 border-white">
                    <AvatarImage src="https://via.placeholder.com/150" alt={`${user_name}'s Avatar`} />
                    <AvatarFallback>{user_name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="text-center">
                    <CardTitle className="text-2xl font-bold">{user_name}</CardTitle>
                    <CardDescription className="italic text-yellow-300">Genius Hacker</CardDescription>
                </div>
            </CardHeader>
            <CardContent className="p-6 text-gray-700">
                <p className="mb-4">
                    <strong>Department:</strong> Security
                </p>
                <p className="mb-4">
                    <strong>Technologies:</strong> React, Node.js, Python
                </p>
                <p className="mb-6">
                    <strong>Bio:</strong> Always ready to tackle the toughest security challenges!
                </p>
                <Button variant="outline" className="border-solid border-2 border-gray-700 w-full text-gray-700 hover:bg-gray-700 hover:text-white transition-colors">
                    <a href="https://rim0o8.com" target="_blank" rel="noopener noreferrer">
                        Usage Card Title
                    </a>
                </Button>
            </CardContent>
            <CardFooter className="bg-gray-100 text-center p-4">
                <p className="text-sm text-gray-600">Card Footer</p>
            </CardFooter>
        </Card >
    )
}

export default ItemCard;