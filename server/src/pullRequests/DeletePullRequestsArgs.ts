import { ArgsType, Field } from "@nestjs/graphql";
import { PullRequestsWhereUniqueInput } from "./PullRequestsWhereUniqueInput";

@ArgsType()
class DeletePullRequestsArgs {
  @Field(() => PullRequestsWhereUniqueInput, { nullable: false })
  where!: PullRequestsWhereUniqueInput;
}

export { DeletePullRequestsArgs };
