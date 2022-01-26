import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

const client = axios.create({ baseURL: "http://localhost:3000" });

export const request = ({
  ...options
}: AxiosRequestConfig<any> | undefined): Promise<AxiosResponse<any, any>> => {
  client.defaults.headers.common["Authorization"] = `Brearer token`;

  const onSuccess = (response: any) => response;
  const onError = (error: any) => {
    // optionally catch errors and
    // add additional logging here
    return error;
  };

  return client(options).then(onSuccess).catch(onError);
};
