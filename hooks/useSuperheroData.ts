import axios from "axios";
import { useQuery } from "react-query";

const fetchSuperhero = ({ queryKey }: { queryKey: any }) => {
  const heroId = queryKey[1];
  return axios.get(`http://localhost:3000/api/superheroes/${heroId}`);
};

export const useSuperheroData = (heroId: number | null) => {
  return useQuery(["superhero", heroId], fetchSuperhero, {
    enabled: !!heroId,
  });
};
