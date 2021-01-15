import React, { useMemo } from "react";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { api } from "../api";
import { SelectField, SelectFieldProps } from "@amplication/design-system";
import { PullRequests } from "../api/pullRequests/PullRequests";

type Data = PullRequests[];

type Props = Omit<SelectFieldProps, "options">;

export const PullRequestsSelect = (props: Props) => {
  const { data } = useQuery<Data, AxiosError>(
    "select-/api/pull-requests",
    async () => {
      const response = await api.get("/api/pull-requests");
      return response.data;
    }
  );

  const options = useMemo(() => {
    return data
      ? data.map((item) => ({
          value: item.id,
          label: item.id && item.id.length ? item.id : item.id,
        }))
      : [];
  }, [data]);

  return <SelectField {...props} options={options} />;
};
