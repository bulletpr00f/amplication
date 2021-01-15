import { ArgsType, Field } from "@nestjs/graphql";
import { PullRequestsWhereUniqueInput } from "./PullRequestsWhereUniqueInput";
import { PullRequestsUpdateInput } from "./PullRequestsUpdateInput";

@ArgsType()
class UpdatePullRequestsArgs {
  @Field(() => PullRequestsWhereUniqueInput, { nullable: false })
  where!: PullRequestsWhereUniqueInput;
  @Field(() => PullRequestsUpdateInput, { nullable: false })
  data!: PullRequestsUpdateInput;
}

export { UpdatePullRequestsArgs };
