// import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";

import type { Superhero } from "../types";
import { request } from "../utils/axios";
import { RQ_KEYS } from "../utils/constants";

export type ShortSuperhero = Omit<Superhero, "alterEgo">;

const fetchSuperheroes = async (): Promise<ShortSuperhero[]> => {
  // const { data } = await axios.get<ShortSuperhero[]>(
  //   "http://localhost:3000/api/superheroes"
  // );
  const { data } = await request({ url: "/api/superheroes" });
  return data;
};

const addSuperHero = async (hero: {
  name: string;
  alterEgo: string;
}): Promise<Superhero> => {
  // const { data } = await axios.post<Superhero>(
  //   "http://localhost:3000/api/superheroes",
  //   hero
  // );
  const { data } = await request({
    url: "/api/superheroes",
    method: "POST",
    data: hero,
  });
  return data;
};

export const useSuperheroesData = ({
  onSuccess,
  onError,
}: {
  onSuccess: (data: ShortSuperhero[]) => void;
  onError: (err: Error) => void;
}) => {
  return useQuery(RQ_KEYS.superheroes, fetchSuperheroes, {
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
    // enabled: false,

    onSuccess,
    onError,

    // Transforming data
    select: (data) => {
      const shortSuperheroes = data.map(({ id, name }) => ({
        id,
        name,
      }));
      return shortSuperheroes;
    },
  });
};

export const useAddSuperHeroData = () => {
  const queryClient = useQueryClient();
  return useMutation(addSuperHero, {
    // onSuccess: (data) => {
    //   // // need to enabled true in useQuery
    //   // queryClient.invalidateQueries(RQ_KEYS.superheroes);

    //   queryClient.setQueriesData<ShortSuperhero[] | undefined>(
    //     RQ_KEYS.superheroes,
    //     (oldQueryData) => {
    //       return oldQueryData && [data, ...oldQueryData];
    //     }
    //   );
    // },

    onMutate: async (newHero): Promise<ShortSuperhero[] | undefined> => {
      await queryClient.cancelQueries(RQ_KEYS.superheroes);
      const prevHeroData = queryClient.getQueryData<ShortSuperhero[]>(
        RQ_KEYS.superheroes
      );
      queryClient.setQueryData<ShortSuperhero[] | undefined>(
        RQ_KEYS.superheroes,
        (oldQueryData) => {
          return (
            oldQueryData && [{ id: Date.now(), ...newHero }, ...oldQueryData]
          );
        }
      );
      return prevHeroData;
    },
    onError: (_error, _hero, prevHeroData) => {
      if (prevHeroData) {
        queryClient.setQueryData(RQ_KEYS.superheroes, prevHeroData);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries(RQ_KEYS.superheroes);
    },
  });
};
