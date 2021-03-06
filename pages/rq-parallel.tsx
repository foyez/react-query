import axios from "axios";
import type { NextPage } from "next";
import { useQuery } from "react-query";
import { RQ_KEYS } from "../utils/constants";

const fetchSuperheroes = () => {
  return axios.get("http://localhost:3000/api/superheroes");
};

const fetchFriends = () => {
  return axios.get("http://localhost:3000/api/friends");
};

const RQParallel: NextPage = () => {
  const { data: superheroes } = useQuery(RQ_KEYS.superheroes, fetchSuperheroes);
  const { data: friends } = useQuery(RQ_KEYS.friends, fetchFriends);

  console.log({ superheroes: superheroes?.data }, { friends: friends?.data });

  return <div>RQParallel page</div>;
};

export default RQParallel;
