import { Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import {
  FindOnePullRequestsArgs,
  FindManyPullRequestsArgs,
  PullRequestsCreateArgs,
  PullRequestsUpdateArgs,
  PullRequestsDeleteArgs,
  Subset,
} from "@prisma/client";

@Injectable()
export class PullRequestsService {
  constructor(private readonly prisma: PrismaService) {}
  findMany<T extends FindManyPullRequestsArgs>(
    args: Subset<T, FindManyPullRequestsArgs>
  ) {
    return this.prisma.pullRequests.findMany(args);
  }
  findOne<T extends FindOnePullRequestsArgs>(
    args: Subset<T, FindOnePullRequestsArgs>
  ) {
    return this.prisma.pullRequests.findOne(args);
  }
  create<T extends PullRequestsCreateArgs>(
    args: Subset<T, PullRequestsCreateArgs>
  ) {
    return this.prisma.pullRequests.create<T>(args);
  }
  update<T extends PullRequestsUpdateArgs>(
    args: Subset<T, PullRequestsUpdateArgs>
  ) {
    return this.prisma.pullRequests.update<T>(args);
  }
  delete<T extends PullRequestsDeleteArgs>(
    args: Subset<T, PullRequestsDeleteArgs>
  ) {
    return this.prisma.pullRequests.delete(args);
  }
}
