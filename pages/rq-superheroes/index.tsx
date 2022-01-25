import type { NextPage } from "next";
import Link from "next/link";

import { formatErrorMessage } from "../../utils";
import {
  useAddSuperHeroData,
  useSuperheroesData,
} from "../../hooks/useSuperheroesData";
import type { Superhero } from "../../types";
import { useState } from "react";

type ShortSuperhero = Omit<Superhero, "alterEgo">;

const RQSuperheroes: NextPage = () => {
  const [name, setName] = useState("");
  const [alterEgo, setAlterEgo] = useState("");

  const onSuccess = (data: ShortSuperhero[]) => {
    console.log("Perform side effect after data fetching", data);
  };

  const onError = (error: Error) => {
    console.log("Perform side effect after encountering error", error);
  };

  const { isLoading, data, isError, error, isFetching, refetch } =
    useSuperheroesData({ onSuccess, onError });
  const { mutate: addHero } = useAddSuperHeroData();

  const handleRefetch = () => refetch();
  const handleClickAddHero = () => {
    const hero = { name, alterEgo };
    addHero(hero);
  };

  if (isLoading || isFetching) {
    return <h2>Loading...</h2>;
  }

  if (isError) {
    return <h2>{formatErrorMessage(error)}</h2>;
  }

  return (
    <>
      <h2>RQ Superheroes</h2>

      <div>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          value={alterEgo}
          onChange={(e) => setAlterEgo(e.target.value)}
        />
        <button onClick={handleClickAddHero}>Add Hero</button>
      </div>

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
