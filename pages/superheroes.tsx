import type { NextPage } from "next";
import { useEffect, useState } from "react";
import axios from "axios";

import type { Superhero } from "../types";
import { formatErrorMessage } from "../utils";

const Superheroes: NextPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<Superhero[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/superheroes");

        setData(res.data);
        setIsLoading(false);
      } catch (err: unknown) {
        setError(formatErrorMessage(err));
        setIsLoading(false);
      }
    })();
  }, []);

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  return (
    <>
      <h2>Superheroes</h2>
      {data.map((hero) => (
        <div key={hero.id}>{hero.name}</div>
      ))}
    </>
  );
};

export default Superheroes;
