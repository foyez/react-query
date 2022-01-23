import axios from "axios";
import { useQuery, useQueryClient } from "react-query";
import { Superhero } from "../types";
import { ShortSuperhero } from "./useSuperheroesData";

const fetchSuperhero = async ({ queryKey }: { queryKey: any }) => {
  const heroId = queryKey[1];
  const { data } = await axios.get<Superhero | undefined>(
    `http://localhost:3000/api/superheroes/${heroId}`
  );
  return data;
};

export const useSuperheroData = (heroId: number | null) => {
  const queryClient = useQueryClient();
  return useQuery(["superhero", heroId], fetchSuperhero, {
    enabled: !!heroId,
    initialData: () => {
      const hero = queryClient
        .getQueryData<ShortSuperhero[]>("superheroes")
        ?.find((hero) => hero.id === heroId);

      if (!hero) {
        return undefined;
      }

      return hero;
    },
  });
};
