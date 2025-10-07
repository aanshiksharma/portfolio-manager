import { useFetchData } from "./useFetchData";

export const useProjects = () =>
  useFetchData("projects", "Could not fetch projects");
