import React, { useState, useRef } from 'react';
import { Command, CommandEmpty, CommandInput, CommandItem, CommandList } from "@/components/ui/command";

const SearchBar: React.FC = () => {
    const [inputText, setInputText] = useState<string>("");
    const [selected, setSelected] = useState<string | undefined>('undefined');
    const [open, setOpen] = useState<boolean>(false);
    const [searchResults, setSearchResults] = useState<string[]>([]);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter' && inputText) {
            performSearch(inputText);
        }
    };

    const performSearch = async (query: string) => {
        const searchUrl = `/introduction?query=${encodeURIComponent(query)}`;
        window.open(searchUrl, '_blank');
    };

    return (
        <div className='flex items-center size-full justify-center p-10'>
            <Command shouldFilter={false} onKeyDown={handleKeyDown} value={selected} className='overflow-visible w-[512px]'>
                <CommandInput
                    value={inputText}
                    ref={inputRef}
                    placeholder='検索'
                    onValueChange={(text) => {
                        setInputText(text);
                        if (selected) {
                            setSelected(undefined);
                        }
                    }}
                    onBlur={() => setOpen(false)}
                    onFocus={() => {
                        setOpen(true);
                        if (selected) {
                            inputRef.current?.select();
                        }
                    }}
                />
                <div className="relative mt-2">
                    {!selected && open && (
                        <CommandList className="absolute left-0 top-0 w-full rounded bg-background shadow-md">
                            {searchResults?.map((v, index) => (
                                <CommandItem
                                    className="flex items-center gap-2"
                                    onSelect={() => {
                                        setSelected(v);
                                        setInputText(v);
                                    }}
                                    value={v}
                                    key={index}
                                >
                                    {v}
                                </CommandItem>
                            ))}
                        </CommandList>
                    )}
                </div>
            </Command>
        </div>
    );
};

export default SearchBar;
