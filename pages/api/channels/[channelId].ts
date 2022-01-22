import type { NextApiRequest, NextApiResponse } from "next";
import data from "../data.json";

type Data = {
  id: string;
  courses: string[];
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | undefined>
) {
  const channelId = req.query.channelId;
  const channel = data.channels.find((channel) => channel.id === channelId);

  res.status(200).json(channel);
}
