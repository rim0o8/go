"use client";

import SearchBar from "@/components/SearchBar";


export default function Home() {

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex items-center size-full justify-center p-10">
        <SearchBar />
      </div>
    </main>
  );
}
