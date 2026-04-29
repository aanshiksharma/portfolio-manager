import { useFetchData } from "../../../shared/hooks/useFetchData";

export const useAdmin = () =>
  useFetchData("admin", "Could not fetch admin data");
