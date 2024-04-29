import { Field, ID, ObjectType } from "type-graphql";
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@ObjectType()
@Entity()
export class Task extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: number;

    @Field({defaultValue:false})
    @Column({default:false})
    isDone:boolean

    @Field()
    @Column()
    taskTitle: string;

    @Field()
    @Column()
    reminder: string;

    @Field()
    @Column()
    date:string; 

    @Field({defaultValue:1})
    @Column({default:1})
    priority: number; 

    @Field({nullable:true})
    @Column({nullable:true})
    note: string;

    @Field()
    @Column()
    category: string;
}
