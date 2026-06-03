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

export const ProfileProjectCardSkeleton = () => {
  return <Item></Item>;
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
            <Link to={`/projects/${project._id}`}>
              <ArrowRight />
            </Link>
          </Button>
        </div>
      </ItemFooter>
    </Item>
  );
};

export default ProfileProjectCard;
