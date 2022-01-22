import axios from "axios";
import type { NextPage } from "next";
import { useQuery } from "react-query";

const fetchUserByEmail = ({ queryKey }: { queryKey: any }) => {
  const email = queryKey[1];
  return axios.get(`http://localhost:3000/api/users/${email}`);
};

const fetchCoursesByChannelId = ({ queryKey }: { queryKey: any }) => {
  const channelId = queryKey[1];
  return axios.get(`http://localhost:3000/api/channels/${channelId}`);
};

const RQDependentQueries: NextPage = () => {
  const email = "user@email.com";
  const { data: user } = useQuery(["user", email], fetchUserByEmail);
  const channelId = user?.data.channelId;
  const { data: channel } = useQuery(
    ["courses", channelId],
    fetchCoursesByChannelId,
    { enabled: !!channelId }
  );

  return <div>RQDependentQueries page</div>;
};

export default RQDependentQueries;
