import type { NextApiRequest, NextApiResponse } from "next";
import data from "../data.json";

type Data = {
  id: number;
  name: string;
  alterEgo: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data[]>
) {
  const { method } = req;

  if (method === "GET") {
    res.status(200).json(data.superheroes);
  } else if (method === "POST") {
  }
}
