import { Search } from "lucide-react";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";

export function Searchbar({
  placeholder = "Search...",
  className,
  searchInput,
  setSearchInput,
  autoFocus = false,
  onClick,
}) {
  return (
    <InputGroup className={`${className}`}>
      <InputGroupInput
        placeholder={placeholder}
        value={searchInput}
        onChange={(e) => {
          setSearchInput(e.target.value);
        }}
        autoFocus={autoFocus}
        onClick={onClick}
      />
      <InputGroupAddon>
        <Search />
      </InputGroupAddon>
    </InputGroup>
  );
}

export default Searchbar;
