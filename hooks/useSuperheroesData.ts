import axios, { AxiosResponse } from "axios";
import { useQuery } from "react-query";

import type { Superhero } from "../types";

type ShortSuperhero = Omit<Superhero, "alterEgo">;

const fetchSuperheroes = () => {
  return axios.get<ShortSuperhero[]>("http://localhost:3000/api/superheroes");
};

export const useSuperheroesData = ({
  onSuccess,
  onError,
}: {
  onSuccess: (data: AxiosResponse<ShortSuperhero[], any> | undefined) => void;
  onError: (err: Error) => void;
}) => {
  return useQuery("superheroes", fetchSuperheroes, {
    // update cache time, default: 5000
    cacheTime: 3000,

    // data will be considered fresh for 3500.
    // That means, request will not sent for 3500.
    // Default stale time 0.
    staleTime: 3500,

    // Default is false
    // true will refetch on mount if data is stale
    // always will refetch on mount even if data is fresh
    refetchOnMount: false,

    // Default is true
    refetchOnWindowFocus: true,

    // Default is false
    // if 2000, refetching after every 2000 seconds
    refetchInterval: false,

    // Default is false
    // continue refetching if browser is not in focus
    refetchIntervalInBackground: false,

    // Default is true
    // if false, data will not fetch after mount.
    // usually data is fetched on click or conditionally
    enabled: false,

    onSuccess,
    onError,

    // Transforming data
    select: (data) => {
      const shortSuperheroes = data.data.map(({ id, name }) => ({
        id,
        name,
      }));
      return { ...data, data: shortSuperheroes };
    },
  });
};
