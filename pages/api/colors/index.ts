import type { NextApiRequest, NextApiResponse } from "next";
import data from "../data.json";

type Data = {
  id: number;
  label: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data[]>
) {
  const { limit, page } = req.query;
  let colors: Data[] = [];

  if (limit && typeof limit === "string") {
    const parsedPage = typeof page === "string" ? parseInt(page) : 1;
    const parsedLimit = parseInt(limit);
    const start = parsedLimit * (parsedPage - 1);
    const end = start + parsedLimit;

    colors = data.colors.slice(start, end);
  } else {
    colors = data.colors;
  }

  res.status(200).json(colors);
}
