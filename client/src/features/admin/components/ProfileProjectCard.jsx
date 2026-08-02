import { Link } from "react-router-dom";

import {
  Item,
  ItemContent,
  ItemDescription,
  ItemFooter,
  ItemHeader,
  ItemTitle,
} from "@/components/ui/item";

import { Button } from "@/components/ui/button";
import { ArrowRight, ExternalLink } from "lucide-react";
import { timeDiffFormatter } from "@/shared/utils/timeDiffFormatter";
import { Skeleton } from "@/components/ui/skeleton";

export const ProfileProjectCardSkeleton = () => {
  return (
    <div>
      <Skeleton className="w-full aspect-video" />

      <div>
        <Skeleton className="w-40 h-4 mt-3" />
        <Skeleton className="w-full h-3 mt-2" />
        <Skeleton className="w-full h-3 mt-1" />
      </div>

      <div className="flex items-center justify-between mt-3">
        <Skeleton className="w-17 h-2" />
        <div className="flex gap-2">
          <Button variant="outline" size="icon"></Button>
          <Button variant="secondary" size="icon"></Button>
        </div>
      </div>
    </div>
  );
};

export const ProfileProjectCard = ({ project }) => {
  return (
    <Item>
      <ItemHeader>
        <div className="overflow-hidden rounded-xl">
          <img src={project.coverImage.url} alt="" />
        </div>
      </ItemHeader>
      <ItemContent>
        <ItemTitle className="text-base">{project.title}</ItemTitle>
        <ItemDescription className="text-sm">
          {project.description}
        </ItemDescription>
      </ItemContent>
      <ItemFooter className="justify-between">
        <div>
          <p className="text-xs text-muted-foreground">
            Updated {timeDiffFormatter(project.updatedAt)}
          </p>
        </div>

        <div className="space-x-2">
          <Button variant="outline" size="icon" asChild>
            <a href={project.projectLink} target="_blank">
              <ExternalLink />
            </a>
          </Button>
          <Button variant="secondary" size="icon" asChild>
            <Link to={`/projects/${project.slug}`}>
              <ArrowRight />
            </Link>
          </Button>
        </div>
      </ItemFooter>
    </Item>
  );
};

export default ProfileProjectCard;
