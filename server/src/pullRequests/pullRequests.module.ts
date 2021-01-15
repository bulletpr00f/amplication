import { Module, forwardRef } from "@nestjs/common";
import { MorganModule } from "nest-morgan";
import { PrismaModule } from "nestjs-prisma";
import { ACLModule } from "../auth/acl.module";
import { AuthModule } from "../auth/auth.module";
import { PullRequestsService } from "./pullRequests.service";
import { PullRequestsController } from "./pullRequests.controller";
import { PullRequestsResolver } from "./pullRequests.resolver";

@Module({
  imports: [
    ACLModule,
    forwardRef(() => AuthModule),
    MorganModule,
    PrismaModule,
  ],
  controllers: [PullRequestsController],
  providers: [PullRequestsService, PullRequestsResolver],
  exports: [PullRequestsService],
})
export class PullRequestsModule {}
