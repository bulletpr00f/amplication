import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as apollo from "apollo-server-express";
import * as nestAccessControl from "nest-access-control";
import * as gqlBasicAuthGuard from "../auth/gqlBasicAuth.guard";
import * as gqlACGuard from "../auth/gqlAC.guard";
import * as gqlUserRoles from "../auth/gqlUserRoles.decorator";
import * as abacUtil from "../auth/abac.util";
import { isRecordNotFoundError } from "../prisma.util";
import { PullRequestsService } from "./pullRequests.service";
import { DeletePullRequestsArgs } from "./DeletePullRequestsArgs";
import { FindManyPullRequestsArgs } from "./FindManyPullRequestsArgs";
import { FindOnePullRequestsArgs } from "./FindOnePullRequestsArgs";
import { PullRequests } from "./PullRequests";

@graphql.Resolver(() => PullRequests)
@common.UseGuards(gqlBasicAuthGuard.GqlBasicAuthGuard, gqlACGuard.GqlACGuard)
export class PullRequestsResolver {
  constructor(
    private readonly service: PullRequestsService,
    @nestAccessControl.InjectRolesBuilder()
    private readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => [PullRequests])
  @nestAccessControl.UseRoles({
    resource: "PullRequests",
    action: "read",
    possession: "any",
  })
  async pullRequests(
    @graphql.Args() args: FindManyPullRequestsArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<PullRequests[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "PullRequests",
    });
    const results = await this.service.findMany(args);
    return results.map((result) => permission.filter(result));
  }

  @graphql.Query(() => PullRequests, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "PullRequests",
    action: "read",
    possession: "own",
  })
  async pullRequests(
    @graphql.Args() args: FindOnePullRequestsArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<PullRequests | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "PullRequests",
    });
    const result = await this.service.findOne(args);
    if (result === null) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.Mutation(() => PullRequests)
  @nestAccessControl.UseRoles({
    resource: "PullRequests",
    action: "delete",
    possession: "any",
  })
  async deletePullRequests(
    @graphql.Args() args: DeletePullRequestsArgs
  ): Promise<PullRequests | null> {
    try {
      // @ts-ignore
      return await this.service.delete(args);
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new apollo.ApolloError(
          `No resource was found for ${JSON.stringify(args.where)}`
        );
      }
      throw error;
    }
  }
}
