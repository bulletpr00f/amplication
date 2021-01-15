import React from "react";
import { Link } from "react-router-dom";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { api } from "../api";
import { PullRequests } from "../api/pullRequests/PullRequests";

type Props = { id: string };

export const PullRequestsTitle = ({ id }: Props) => {
  const { data, isLoading, isError, error } = useQuery<
    PullRequests,
    AxiosError,
    [string, string]
  >(["get-/api/pull-requests", id], async (key: string, id: string) => {
    const response = await api.get(`${"/api/pull-requests"}/${id}`);
    return response.data;
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error?.message}</span>;
  }

  return (
    <Link to={`${"/api/pull-requests"}/${id}`} className="entity-id">
      {data?.id && data?.id.length ? data.id : data?.id}
    </Link>
  );
};
