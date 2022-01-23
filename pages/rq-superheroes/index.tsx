import type { NextPage } from "next";
import Link from "next/link";
import { AxiosResponse } from "axios";

import { formatErrorMessage } from "../../utils";
import { useSuperheroesData } from "../../hooks/useSuperheroesData";
import type { Superhero } from "../../types";

type ShortSuperhero = Omit<Superhero, "alterEgo">;

const RQSuperheroes: NextPage = () => {
  const onSuccess = (data: ShortSuperhero[]) => {
    console.log("Perform side effect after data fetching", data);
  };

  const onError = (error: Error) => {
    console.log("Perform side effect after encountering error", error);
  };

  const { isLoading, data, isError, error, isFetching, refetch } =
    useSuperheroesData({ onSuccess, onError });

  const handleRefetch = () => refetch();

  if (isLoading || isFetching) {
    return <h2>Loading...</h2>;
  }

  if (isError) {
    return <h2>{formatErrorMessage(error)}</h2>;
  }

  return (
    <>
      <h2>RQ Superheroes</h2>
      <button onClick={handleRefetch}>Fetch heroes</button>
      {data?.map((hero) => (
        <div key={hero.id}>
          <Link href={`/rq-superheroes/${hero.id}`}>{hero.name}</Link>
        </div>
      ))}
    </>
  );
};

export default RQSuperheroes;
