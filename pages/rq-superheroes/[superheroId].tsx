import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useSuperheroData } from "../../hooks/useSuperheroData";
import { formatErrorMessage } from "../../utils";

const parseId = (id: unknown) => {
  if (typeof id === "string") {
    return Number(id);
  }

  return null;
};

const Superhero: NextPage = () => {
  const router = useRouter();
  const id = parseId(router.query.superheroId);
  const { isLoading, data, isError, error } = useSuperheroData(id);

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (isError) {
    return <h2>{formatErrorMessage(error)}</h2>;
  }

  return (
    <div>
      {data?.data.name} - {data?.data.alterEgo}
    </div>
  );
};

export default Superhero;
