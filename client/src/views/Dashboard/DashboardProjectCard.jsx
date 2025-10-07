import Pill from "../../components/Pill";

function DashboardProjectCard({ project, onDoubleClick }) {
  return (
    <div
      className="flex flex-col gap-4 p-4 rounded-lg border-1 border-border basis-100"
      onDoubleClick={onDoubleClick}
    >
      <div className="flex items-center gap-4">
        <div className="flex items-center justify-center">
          <img src={project.coverImage.url} alt="" />
        </div>

        <div className="flex-1 flex flex-col gap-1 basis-[67%] shrink-0">
          <h4 className="font-semibold text-text-primary">{project.title}</h4>

          <a
            href={project.projectLink}
            target="_blank"
            className="text-xs hover:text-text-primary transition ease-out duration-200"
          >
            {project.projectLink}
          </a>
        </div>
      </div>

      <div className="skills flex items-center gap-2 flex-wrap">
        {project.skills.map((skill) => (
          <Pill key={skill} label={skill} />
        ))}
      </div>
    </div>
  );
}

export default DashboardProjectCard;
