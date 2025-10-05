import { useNavigate } from "react-router-dom";

import Button from "../Button";
import Icon from "../Icon";

function ProjectCard({ id, title, projectLink, imageUrl }) {
  const navigate = useNavigate();

  return (
    <>
      <div className="flex-1 flex flex-col gap-4 border-1 py-3 px-4 min-w-70 max-w-85 bg-bg-surface-dark/20 border-border rounded-lg justify-between">
        <div className="flex items-center justify-center overflow-hidden rounded-sm shadow-md shadow-bg-base">
          <img src={imageUrl} alt="" />
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <h4 className="font-semibold text-text-primary">{title}</h4>
            <a
              href={projectLink}
              target="_blank"
              className="text-xs flex items-center gap-1 hover:text-text-secondary transition ease-out"
            >
              <Icon size={12} icon={"link"} />
              {projectLink}
            </a>
          </div>

          <div className="flex items-center gap-2 w-full">
            <Button
              type={"button"}
              label={"View"}
              variant={"primary"}
              className={"w-full"}
              onClick={() => navigate(`/projects/${id}`)}
            />

            <Button
              type={"button"}
              label={"Edit"}
              variant={"accent"}
              className={"w-full"}
              onClick={() => navigate(`/projects/edit/${id}`)}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default ProjectCard;
