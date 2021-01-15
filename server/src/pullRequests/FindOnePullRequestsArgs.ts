import { ArgsType, Field } from "@nestjs/graphql";
import { PullRequestsWhereUniqueInput } from "./PullRequestsWhereUniqueInput";

@ArgsType()
class FindOnePullRequestsArgs {
  @Field(() => PullRequestsWhereUniqueInput, { nullable: false })
  where!: PullRequestsWhereUniqueInput;
}

export { FindOnePullRequestsArgs };
