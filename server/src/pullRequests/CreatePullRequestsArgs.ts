import { ArgsType, Field } from "@nestjs/graphql";
import { PullRequestsCreateInput } from "./PullRequestsCreateInput";

@ArgsType()
class CreatePullRequestsArgs {
  @Field(() => PullRequestsCreateInput, { nullable: false })
  data!: PullRequestsCreateInput;
}

export { CreatePullRequestsArgs };
