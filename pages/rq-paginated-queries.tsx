import axios from "axios";
import type { NextPage } from "next";
import { useQuery } from "react-query";

import { formatErrorMessage } from "../utils";
import type { Color } from "../types";
import { useState } from "react";
import { RQ_KEYS } from "../utils/constants";

const fetchColors = async (pageNumber: number): Promise<Color[]> => {
  const { data } = await axios.get(
    `http://localhost:3000/api/colors?limit=2&page=${pageNumber}`
  );
  return data;
};

const RQPaginatedQueries: NextPage = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const { isLoading, isFetching, isError, error, data } = useQuery(
    [RQ_KEYS.colors, pageNumber],
    () => fetchColors(pageNumber),
    { keepPreviousData: true }
  );

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (isError) {
    return <h2>{formatErrorMessage(error)}</h2>;
  }

  return (
    <>
      {data?.map((color) => (
        <div key={color.id}>
          <h2>
            {color.id}. {color.label}
          </h2>
        </div>
      ))}
      <div>
        <button
          onClick={() => setPageNumber((page) => page - 1)}
          disabled={pageNumber === 1}
        >
          Prev Page
        </button>
        <button
          onClick={() => setPageNumber((page) => page + 1)}
          disabled={pageNumber === 4}
        >
          Next Page
        </button>
      </div>
      {isFetching && "Loading"}
    </>
  );
};

export default RQPaginatedQueries;
