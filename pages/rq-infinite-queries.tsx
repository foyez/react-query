import { Fragment, useState } from "react";
import axios from "axios";
import type { NextPage } from "next";
import { useInfiniteQuery } from "react-query";

import { formatErrorMessage } from "../utils";
import type { Color } from "../types";
import { RQ_KEYS } from "../utils/constants";

const fetchColors = async ({ pageParam = 1 }): Promise<Color[]> => {
  const { data } = await axios.get(
    `http://localhost:3000/api/colors?limit=2&page=${pageParam}`
  );
  return data;
};

const RQInfiniteQueries: NextPage = () => {
  const {
    isLoading,
    isError,
    error,
    data,
    hasNextPage,
    fetchNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery([RQ_KEYS.colors], fetchColors, {
    getNextPageParam: (_lastPage, pages) => {
      return pages.length < 4 ? pages.length + 1 : undefined;
    },
  });

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (isError) {
    return <h2>{formatErrorMessage(error)}</h2>;
  }

  return (
    <>
      {data?.pages.map((group, i) => (
        <Fragment key={i}>
          {group.map((color) => (
            <h2 key={color.id}>
              {color.id}. {color.label}
            </h2>
          ))}
        </Fragment>
      ))}
      <div>
        <button onClick={() => fetchNextPage()} disabled={!hasNextPage}>
          Load more
        </button>
      </div>
      <div>{isFetching && !isFetchingNextPage ? "Fetching..." : null}</div>
    </>
  );
};

export default RQInfiniteQueries;
