import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item";
import { Edit, Trash2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export const SkillCardSkeleton = () => {
  return (
    <Item variant="outline">
      <ItemContent>
        <Skeleton className={"w-15 h-4"} />
        <Skeleton className={"w-40 h-4 mt-1"} />
      </ItemContent>
    </Item>
  );
};

export const SkillCard = ({ skill, handleDeleteSkill }) => {
  const isVertical = document.body.offsetHeight > document.body.offsetWidth;

  return (
    <Item variant="outline" className={"group overflow-hidden"}>
      <ItemContent>
        <ItemTitle>{skill.name}</ItemTitle>
        <ItemDescription>{skill.categoryName}</ItemDescription>
      </ItemContent>

      <ItemActions
        className={`group-hover:translate-x-0 ${!isVertical && "md:translate-x-[125%]"} transition-transform`}
      >
        <Button variant="outline" size="icon" asChild>
          <Link to={`/skills/edit/${skill._id}`}>
            <Edit />
          </Link>
        </Button>

        <Button
          variant="destructive"
          size="icon"
          onClick={() => handleDeleteSkill(skill._id)}
        >
          <Trash2 />
        </Button>
      </ItemActions>
    </Item>
  );
};
