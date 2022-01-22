import type { NextApiRequest, NextApiResponse } from "next";
import data from "../data.json";

type Data = {
  id: number;
  name: string;
  alterEgo: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | undefined>
) {
  const id = req.query.heroId;
  const hero = data.superheroes.find((hero) => hero.id === Number(id));

  res.status(200).json(hero);
}
