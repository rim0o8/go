"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import ItemCard from "@/components/Items/Card";

function App() {
    const [user_names, setUserNames] = useState<string[]>([]);
    const searchParams = useSearchParams();

    const query = searchParams?.get('query');

    useEffect(() => {
        if (query) {
            fetch(`http://127.0.0.1:8000/users/search/${query}`)
                .then(response => response.json())
                .then(data => {
                    const fetchUserNames = data.user_ids.map((user_id: string) =>
                        fetch(`http://127.0.0.1:8000/users/${user_id}`)
                            .then(response => response.json())
                            .then(userData => userData.name)
                    );
                    Promise.all(fetchUserNames)
                        .then(names => setUserNames(names))
                        .catch(error => console.error('Error fetching user_names:', error));
                })
                .catch(error => console.error('Error fetching user_ids:', error));
        }
    }, [query]);

    console.log(user_names);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200">
            <section className="container mx-auto p-8 grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {user_names.map((user_name, index) => (
                    <ItemCard key={index} user_name={user_name} index={index} />
                ))}
            </section>
        </div>
    );
}

export default App;