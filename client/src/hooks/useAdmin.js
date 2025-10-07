import { useFetchData } from "./useFetchData";

export const useAdmin = () =>
  useFetchData("admin", "Could not fetch admin data");
