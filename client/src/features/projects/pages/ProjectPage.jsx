import { useLocation } from "react-router-dom";

import useProject from "../hooks/useProject";

import { Button } from "@/components/ui/button";
import useImageViewer from "@/shared/image-viewer/useImageViewer";

import { Item, ItemContent, ItemHeader, ItemTitle } from "@/components/ui/item";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";

import { Github } from "react-bootstrap-icons";
import { ExternalLink } from "lucide-react";
import ProjectPageSkeleton from "../components/ProjectPageSkeleton";

function ProjectPage() {
  const location = useLocation();
  const pathname = location.pathname.split("/");
  const slug = pathname[pathname.length - 1];

  const { project, loading } = useProject({ slug });
  const canHover = window.matchMedia("(hover: hover)").matches;
  const { open } = useImageViewer();

  if (loading || !project) return <ProjectPageSkeleton />;

  return (
    <>
      <section className="space-y-4">
        <div
          role="button"
          className="relative rounded-2xl h-[60vh] overflow-hidden"
          onClick={() => {
            open(project.coverImage.url);
          }}
        >
          <img
            src={project.coverImage.url}
            alt={`${project.title} cover image`}
            className="h-full w-full object-cover object-top"
          />

          <div className="absolute inset-0 bg-linear-to-b from-background/10 from-50% to-95% to-background inset-shadow-2xs inset-shadow-accent-foreground/20 rounded-2xl" />
        </div>

        <div className="flex items-center justify-between">
          <h1>{project.title}</h1>

          <div className="flex items-center gap-2 flex-wrap">
            <Tooltip>
              <TooltipTrigger>
                <Button
                  variant="secondary"
                  size={canHover ? "default" : "icon"}
                  asChild
                >
                  <a href={project.projectLink}>
                    <ExternalLink />
                    <span className="[@media(hover:hover)]:inline hidden">
                      Live
                    </span>
                  </a>
                </Button>
              </TooltipTrigger>
              <TooltipContent>{project.projectLink}</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger>
                <Button
                  variant="outline"
                  size={canHover ? "default" : "icon"}
                  asChild
                >
                  <a href={project.githubLink}>
                    <Github />
                    <span className="[@media(hover:hover)]:inline hidden">
                      Github
                    </span>
                  </a>
                </Button>
              </TooltipTrigger>
              <TooltipContent>{project.githubLink}</TooltipContent>
            </Tooltip>
          </div>
        </div>
      </section>

      <p className="text-muted-foreground max-w-2xl">{project.description}</p>

      <div className="border-l-3 border-muted">
        <Item>
          <ItemHeader>
            <ItemTitle>Tech Stack</ItemTitle>
          </ItemHeader>

          <ItemContent>
            <div className="flex gap-2 items-center flex-wrap">
              {project.skills.map((skill, index) => (
                <Badge variant="secondary" key={index}>
                  {skill}
                </Badge>
              ))}
            </div>
          </ItemContent>
        </Item>
      </div>

      <div className="grid md:grid-cols-2 2xl:grid-cols-3 gap-3">
        {project.otherImages.map((image, index) => (
          <div
            key={index}
            className="aspect-video overflow-hidden rounded-2xl"
            onClick={() => open(image.url)}
          >
            <img src={image.url} alt="" />
          </div>
        ))}
      </div>
    </>
  );
}

export default ProjectPage;
