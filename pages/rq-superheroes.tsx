import type { NextPage } from "next";
import { useQuery } from "react-query";
import axios from "axios";

import type { Superhero } from "../types";
import { formatErrorMessage } from "../utils";

const fetchSuperheroes = () => {
  return axios.get<Superhero[]>("http://localhost:3000/api/superheroes");
};

const RQSuperheroes: NextPage = () => {
  const { isLoading, data, isError, error } = useQuery(
    "superheroes",
    fetchSuperheroes,
    {
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
    }
  );

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (isError) {
    return <h2>{formatErrorMessage(error)}</h2>;
  }

  return (
    <>
      <h2>RQ Superheroes</h2>
      {data?.data.map((hero) => (
        <div key={hero.id}>{hero.name}</div>
      ))}
    </>
  );
};

export default RQSuperheroes;
