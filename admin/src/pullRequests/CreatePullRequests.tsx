import * as React from "react";
import { useMutation } from "react-query";
import { useHistory } from "react-router-dom";
import { AxiosError } from "axios";
import { Formik } from "formik";
import {
  Form,
  EnumFormStyle,
  Button,
  FormHeader,
  Snackbar,
} from "@amplication/design-system";
import { api } from "../api";
import useBreadcrumbs from "../components/breadcrumbs/use-breadcrumbs";
import { PullRequests } from "../api/pullRequests/PullRequests";
import { PullRequestsCreateInput } from "../api/pullRequests/PullRequestsCreateInput";

const INITIAL_VALUES = {} as PullRequestsCreateInput;

export const CreatePullRequests = (): React.ReactElement => {
  useBreadcrumbs("/pull-requests/new", "Create Pull Requests");
  const history = useHistory();

  const [create, { error, isError, isLoading }] = useMutation<
    PullRequests,
    AxiosError,
    PullRequestsCreateInput
  >(
    async (data) => {
      const response = await api.post("/api/pull-requests", data);
      return response.data;
    },
    {
      onSuccess: (data, variables) => {
        history.push(`${"/pull-requests"}/${data.id}`);
      },
    }
  );
  const handleSubmit = React.useCallback(
    (values: PullRequestsCreateInput) => {
      void create(values);
    },
    [create]
  );
  return (
    <>
      <Formik initialValues={INITIAL_VALUES} onSubmit={handleSubmit}>
        <Form
          formStyle={EnumFormStyle.Horizontal}
          formHeaderContent={
            <FormHeader title={"Create Pull Requests"}>
              <Button type="submit" disabled={isLoading}>
                Save
              </Button>
            </FormHeader>
          }
        ></Form>
      </Formik>
      <Snackbar open={isError} message={error?.response?.data?.message} />
    </>
  );
};
