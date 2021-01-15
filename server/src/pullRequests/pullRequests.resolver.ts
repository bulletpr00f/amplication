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
import { CreatePullRequestsArgs } from "./CreatePullRequestsArgs";
import { UpdatePullRequestsArgs } from "./UpdatePullRequestsArgs";
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
    action: "create",
    possession: "any",
  })
  async createPullRequests(
    @graphql.Args() args: CreatePullRequestsArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<PullRequests> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "PullRequests",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(
      permission,
      args.data
    );
    if (invalidAttributes.length) {
      const properties = invalidAttributes
        .map((attribute: string) => JSON.stringify(attribute))
        .join(", ");
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new apollo.ApolloError(
        `providing the properties: ${properties} on ${"PullRequests"} creation is forbidden for roles: ${roles}`
      );
    }
    // @ts-ignore
    return await this.service.create({
      ...args,
      data: args.data,
    });
  }

  @graphql.Mutation(() => PullRequests)
  @nestAccessControl.UseRoles({
    resource: "PullRequests",
    action: "update",
    possession: "any",
  })
  async updatePullRequests(
    @graphql.Args() args: UpdatePullRequestsArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<PullRequests | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "PullRequests",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(
      permission,
      args.data
    );
    if (invalidAttributes.length) {
      const properties = invalidAttributes
        .map((attribute: string) => JSON.stringify(attribute))
        .join(", ");
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new apollo.ApolloError(
        `providing the properties: ${properties} on ${"PullRequests"} update is forbidden for roles: ${roles}`
      );
    }
    try {
      // @ts-ignore
      return await this.service.update({
        ...args,
        data: args.data,
      });
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new apollo.ApolloError(
          `No resource was found for ${JSON.stringify(args.where)}`
        );
      }
      throw error;
    }
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
