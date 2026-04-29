import TableRow from "../../../shared/components/ui/TableRow";

function ProjectDetails({ project }) {
  return (
    <section>
      <TableRow heading={"Title"} value={project.title} background={true} />

      <TableRow
        heading={"Skills"}
        value={
          project.skills.length === 0 ? ["Skills not set."] : project.skills
        }
        type="pills"
      />

      <TableRow
        heading={"Description"}
        value={
          project.description ? project.description : "Description not set."
        }
        background={true}
      />

      <TableRow
        heading={"Project Link"}
        value={project.projectLink}
        type="link"
      />

      <TableRow
        heading={"GitHub Link"}
        value={project.githubLink ? project.githubLink : "Github Link not set"}
        type={project.githubLink ? "link" : "text"}
        background={true}
        last={true}
      />
    </section>
  );
}

export default ProjectDetails;
