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
    fetchSuperheroes
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
