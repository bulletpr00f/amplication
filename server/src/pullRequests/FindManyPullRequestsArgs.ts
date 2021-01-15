import { ArgsType, Field } from "@nestjs/graphql";
import { PullRequestsWhereInput } from "./PullRequestsWhereInput";

@ArgsType()
class FindManyPullRequestsArgs {
  @Field(() => PullRequestsWhereInput, { nullable: true })
  where?: PullRequestsWhereInput;
}

export { FindManyPullRequestsArgs };
