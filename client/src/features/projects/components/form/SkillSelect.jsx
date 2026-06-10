import { Check, ChevronsUpDown, X } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import useSkill from "@/features/skills/hooks/useSkill";

function SkillSelect({ value = [], onChange }) {
  const [open, setOpen] = useState(false);
  const { skills } = useSkill();

  const toggleOption = (option) => {
    const exists = value.includes(option);

    if (exists) {
      onChange(value.filter((item) => item !== option));
    } else {
      onChange([...value, option]);
    }
  };

  const removeOption = (option) => {
    onChange(value.filter((item) => item !== option));
  };

  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            className="w-full justify-between"
          >
            {value.length > 0
              ? `${value.length} selected`
              : "Select Skills from your Database"}

            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>

        <PopoverContent
          className="w-[var(--radix-popover-trigger-width)] p-0"
          align="start"
        >
          <Command>
            <CommandInput placeholder="Search skills..." />

            <CommandEmpty>No option found.</CommandEmpty>
            <CommandGroup>
              {skills?.map((skill) => (
                <CommandItem
                  key={skill._id}
                  value={skill.name}
                  onSelect={() => toggleOption(skill.name)}
                  className="flex items-center gap-2"
                >
                  <Check
                    className={`${
                      value.includes(skill.name) ? "opacity-100" : "opacity-0"
                    }`}
                  />

                  <span>{skill.name}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>

      {value.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {value.map((option) => (
            <Badge key={option} variant="secondary">
              {option}

              <button
                type="button"
                onClick={() => removeOption(option)}
                className="ml-1"
              >
                <X size={12} />
              </button>
            </Badge>
          ))}
        </div>
      )}
    </>
  );
}

export default SkillSelect;
