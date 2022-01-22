import type { NextApiRequest, NextApiResponse } from "next";
import superheroes from "./data.json";

type Data = {
  id: number;
  name: string;
  alterEgo: string;
};

const typeCheck = (data: unknown) => data as Data[];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data[]>
) {
  const { method } = req;

  if (method === "GET") {
    res.status(200).json(typeCheck(superheroes));
  } else if (method === "POST") {
  }
}
