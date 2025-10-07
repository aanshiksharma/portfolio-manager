import { useFetchData } from "./useFetchData";

export const useSkills = () => useFetchData("skills", "Could not fetch skills");
