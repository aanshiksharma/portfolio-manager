import { Link } from "react-router-dom";

import { Edit, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import {
  Item,
  ItemHeader,
  ItemTitle,
  ItemContent,
  ItemFooter,
} from "@/components/ui/item";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { timeDiffFormatter } from "@/shared/utils/timeDiffFormatter";

export const ProjectCardSkeleton = () => {
  return (
    <Item variant="outline">
      <ItemHeader>
        <Skeleton className={"w-full aspect-video"} />
      </ItemHeader>
      <ItemContent>
        <Skeleton className={"w-25 h-4"} />
        <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
          <Skeleton className={"w-25 h-3"} />
          <Separator orientation="vertical" />
          <Skeleton className={"w-25 h-3"} />
        </div>
      </ItemContent>
      <ItemFooter className={"flex items-center gap-2"}>
        <Skeleton className={"flex-1 h-7.5"} />
        <Skeleton className={"h-7.5 aspect-square"} />
        <Skeleton className={"h-7.5 aspect-square"} />
      </ItemFooter>
    </Item>
  );
};

export const ProjectCard = ({ project }) => {
  return (
    <>
      <Item variant="outline">
        <ItemHeader>
          <div className="overflow-hidden rounded-xl aspect-video">
            <img
              src={project.coverImage.url}
              alt=""
              className="w-full h-full"
            />
          </div>
        </ItemHeader>

        <ItemContent>
          <ItemTitle>{project.title}</ItemTitle>

          <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
            <p>Added {timeDiffFormatter(project.createdAt)}</p>
            <Separator orientation="vertical" />
            <p>Updated {timeDiffFormatter(project.updatedAt)}</p>
          </div>
        </ItemContent>

        <ItemFooter className={"flex items-center gap-2"}>
          <Button variant="secondary" asChild className={"flex-1"}>
            <Link to={`/projects/${project._id}`}>Open</Link>
          </Button>

          <Tooltip>
            <TooltipTrigger>
              <Button variant="outline" size="icon" asChild>
                <Link to={`/projects/edit/${project._id}`}>
                  <Edit />
                </Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Edit {project.title}</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger>
              <Button variant="outline" size="icon" asChild>
                <a href={project.projectLink} target="_blank">
                  <ExternalLink />
                </a>
              </Button>
            </TooltipTrigger>
            <TooltipContent>View Live</TooltipContent>
          </Tooltip>
        </ItemFooter>
      </Item>
    </>
  );
};
