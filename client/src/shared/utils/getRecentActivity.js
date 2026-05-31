export function getRecentActivity({ projects, skills, categories, admin }) {
  const activities = [];

  projects.forEach((project) => {
    activities.push({
      id: project._id,
      title: project.title,
      type: "project",
      action:
        Math.abs(new Date(project.updatedAt) - new Date(project.createdAt)) >
        1000
          ? "updated"
          : "created",
      timestamp:
        Math.abs(new Date(project.updatedAt) - new Date(project.createdAt)) >
        1000
          ? project.updatedAt
          : project.createdAt,
    });
  });

  skills.forEach((skill) => {
    activities.push({
      id: skill._id,
      title: skill.name,
      type: "skill",
      action:
        Math.abs(new Date(skill.updatedAt) - new Date(skill.createdAt)) > 1000
          ? "updated"
          : "created",
      timestamp:
        Math.abs(new Date(skill.updatedAt) - new Date(skill.createdAt)) > 1000
          ? skill.updatedAt
          : skill.createdAt,
    });
  });

  activities.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

  return activities;
}
