import * as React from "react";
import { Switch } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";
import useBreadcrumbs from "../components/breadcrumbs/use-breadcrumbs";
import { PullRequestsList } from "./PullRequestsList";
import { CreatePullRequests } from "./CreatePullRequests";
import { PullRequests } from "./PullRequests";

export const PullRequestsIndex = (): React.ReactElement => {
  useBreadcrumbs("/pull-requests/", "Pull Requests");

  return (
    <Switch>
      <PrivateRoute
        exact
        path={"/pull-requests/"}
        component={PullRequestsList}
      />
      <PrivateRoute
        path={"/pull-requests/new"}
        component={CreatePullRequests}
      />
      <PrivateRoute path={"/pull-requests/:id"} component={PullRequests} />
    </Switch>
  );
};
