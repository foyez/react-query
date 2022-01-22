import axios from "axios";
import type { NextPage } from "next";
import { useQueries } from "react-query";

const fetchSuperhero = (heroId: number) => {
  return axios.get(`http://localhost:3000/api/superheroes/${heroId}`);
};

const RQDynamicParallel: NextPage = () => {
  const heroIds = [1, 3];
  const queryResults = useQueries(
    heroIds.map((id) => ({
      queryKey: ["superhero", id],
      queryFn: () => fetchSuperhero(id),
    }))
  );
  console.log({ queryResults });

  return <div>RQDynamicParallel page</div>;
};

export default RQDynamicParallel;
