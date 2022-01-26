import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs/promises";
import path from "path";
import data from "../data.json";

type Data = {
  id: number;
  name: string;
  alterEgo: string;
};

let superheroes = data.superheroes;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data[] | Data>
) {
  const { method } = req;

  if (method === "GET") {
    res.status(200).json(data.superheroes);
  } else if (method === "POST") {
    const body = req.body;
    const { name, alterEgo } = body || {};
    const newHero = {
      id: Date.now(),
      name,
      alterEgo,
    };

    const filePath = path.join(process.cwd(), "pages/api/data.json");
    const data = await fs.readFile(filePath, "utf-8");
    const parsedData = JSON.parse(data);
    parsedData.superheroes = [newHero, ...parsedData.superheroes];
    await fs.writeFile(filePath, JSON.stringify(parsedData, null, 2));

    res.status(201).json(newHero);
  }
}
