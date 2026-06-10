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
}) {
  return (
    <InputGroup className={`${className}`}>
      <InputGroupInput
        placeholder={placeholder}
        value={searchInput}
        onChange={(e) => {
          setSearchInput(e.target.value);
        }}
      />
      <InputGroupAddon>
        <Search />
      </InputGroupAddon>
    </InputGroup>
  );
}

export default Searchbar;
