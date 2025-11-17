import { Search } from "lucide-react";
import type { SearchInputProps } from "@/infrastructure/types/table";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";

const SearchInput = ({ search, onChange }: SearchInputProps) => {
  const [inputValue, setInputValue] = useState(search || "");

  useEffect(() => {
    const handler = setTimeout(() => {
      onChange(inputValue);
    }, 300);

    return () => clearTimeout(handler);
  }, [inputValue, onChange]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value); // update local state
  };

  return (
    <div className="relative">
      <Input
        // type="search"
        value={inputValue}
        onChange={handleChange}
        placeholder="Search..."
        className="pl-10 rounded-full w-64 "
      />
      <div className="absolute top-2 left-2 text-primary/80">
        <Search className="size-5" />
      </div>
    </div>
  );
};

export default SearchInput;
