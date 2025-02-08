/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useContext, useState, useEffect, useMemo } from "react";
import { useQuery } from "react-query";
import {
  createResponseContext,
  initialQueryResponse,
  initialQueryState,
  PaginationState,
  QUERIES,
  stringifyRequestQuery,
  WithChildren,
} from "../../../../_metronic/helpers";
import { getFiles } from "./_requests";
import { File } from "./_models";
import { useQueryRequest } from "./QueryRequestProvider";
import { useFileManagerModal } from "../useFileManagerModal";

const QueryResponseContext = createResponseContext<File>(initialQueryResponse);
const QueryResponseProvider: FC<WithChildren> = ({ children }) => {
  const { state } = useQueryRequest();
  const [query, setQuery] = useState<string>(stringifyRequestQuery(state));
  const updatedQuery = useMemo(() => stringifyRequestQuery(state), [state]);
  const [isQueryEnabled, setIsQueryEnabled] = useState(false);
  const {setFiles} = useFileManagerModal()

  useEffect(() => {
    if (query !== updatedQuery) {
      setQuery(updatedQuery);
      setIsQueryEnabled(true)
    }
  }, [updatedQuery]);

  const {
    isFetching,
    refetch,
    data: response,
  } = useQuery(
    `${QUERIES.FILES_LIST}-${query}`,
    () => getFiles(query),
    // () => {
    //   return getFiles(query);
    // },
    {
      cacheTime: 0,
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      enabled: isQueryEnabled,
      onSuccess: (data) => {
        setFiles(data?.data || []);
      },
    }
  );
  // const { data: totalFileInfo } = useQuery("total-file-info", () => {
  //   return getTotalFileInfo();
  // });

  return (
    <QueryResponseContext.Provider
      value={{ isLoading: isFetching, refetch, response, query }}
    >
      {children}
    </QueryResponseContext.Provider>
  );
};

const useQueryResponse = () => useContext(QueryResponseContext);

const useQueryResponseData = () => {
  const { response } = useQueryResponse();
  if (!response) {
    return [];
  }

  return response?.data || [];
};

const useQueryResponsePagination = () => {
  const defaultPaginationState: PaginationState = {
    links: [],
    ...initialQueryState,
  };

  const { response } = useQueryResponse();
  if (!response || !response.payload || !response.payload.pagination) {
    return defaultPaginationState;
  }

  return response.payload.pagination;
};

const useQueryResponseLoading = (): boolean => {
  const { isLoading } = useQueryResponse();
  return isLoading;
};

export {
  QueryResponseProvider,
  useQueryResponse,
  useQueryResponseData,
  useQueryResponsePagination,
  useQueryResponseLoading,
};
