import { fetchData } from "../../../shared/utils/fetchData";

export const fetchProjects = () =>
  fetchData("projects", "Could not fetch projects");
