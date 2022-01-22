import type { NextApiRequest, NextApiResponse } from "next";
import data from "../data.json";

type Data = {
  id: string;
  channelId: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | undefined>
) {
  const email = req.query.email;
  const user = data.users.find((user) => user.id === email);

  res.status(200).json(user);
}
