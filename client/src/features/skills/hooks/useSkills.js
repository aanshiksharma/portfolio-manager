import { useFetchData } from "../../../shared/hooks/useFetchData";

export const useSkills = () => useFetchData("skills", "Could not fetch skills");
