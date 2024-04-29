import { Field, InputType } from "type-graphql";

@InputType()
export class TaskInput {
  id: number;

  @Field()
  taskTitle: string;

  @Field({defaultValue:false})
  isDone: boolean;

  @Field()
  reminder: string;

  @Field()
  date: string;

  @Field({ nullable: true })
  note?: string;

  @Field({defaultValue:1, nullable:true})
  priority?: number;

  @Field()
  category: string;
}

@InputType()
export class editTaskInput {
  @Field()
  id: number;

  @Field()
  taskTitle: string;

  @Field({defaultValue:false})
  isDone: boolean;

  @Field()
  reminder: string;

  @Field()
  date: string;

  @Field({ nullable: true })
  note?: string;

  @Field({defaultValue:1,nullable:true})
  priority?: number;

  @Field()
  category: string;
}
