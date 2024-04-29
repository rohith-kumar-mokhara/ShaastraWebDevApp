import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Task } from "../entity/Task";
import { TaskInput, editTaskInput } from "../types/TaskInput";

@Resolver()
export class TaskResolver {
  @Query(() => [Task])
  async getTasks(
    @Arg("isDone") isDone: boolean, 
    @Arg("date") date: string
  ): Promise<Task[]> {
    try {
      let tasks;
      console.log("date is ",date)
      if (date != "no") {
        tasks = Task.find({ where: { isDone, date },order: { priority: "DESC" }, });
      } else {
        tasks = Task.find({ where: { isDone },order: { priority: "DESC" }, });
      }
  
      return tasks;
    } catch (err) {
      throw new Error("Unable to fetch the tasks");
    }
  }

  @Query(() => Task)
  async getTask(@Arg("id") id: number): Promise<Task> {
    try {
      const task = await Task.findOne({ where: { id } });
      if (!task) {
        throw new Error("No valid task with the given id, cannot get the task");
      }
      return task;
    } catch (error) {
      throw new Error("Failed to fetch the task");
    }
  }

  

  @Mutation(() => Task)
  async createTask(
    @Arg("data")
    { taskTitle, reminder, date, note, priority, category }: TaskInput
  ): Promise<Task> {
    try {
      const task = await Task.create({
        taskTitle,
        reminder,
        date,
        note,
        priority,
        category,
      }).save();

      return task;
    } catch (error) {
      throw new Error("Failed to register task");
    }
  }
  @Mutation(() => Task)
  async editTask(
    @Arg("data")
    { id, taskTitle, reminder, date, note, priority, category }: editTaskInput
  ): Promise<Task> {
    try {
      let task = await Task.findOne({ where: { id } });
      if (!task) {
        throw new Error("No valid task with the given id, cannot edit");
      }

      if (taskTitle !== undefined) task.taskTitle = taskTitle;
      if (reminder !== undefined) task.reminder = reminder;
      if (date !== undefined) task.date = date;
      if (note !== undefined) task.note = note;
      if (priority !== undefined) task.priority = priority;
      if (category !== undefined) task.category = category;

      await task.save();
      return task;
    } catch (err) {
      throw new Error(`Failed to edit the task: ${err}`);
    }
  }

  @Mutation(() => Task)
  async deleteTask(@Arg("id") id: number): Promise<Task> {
    try {
      const task = await Task.findOne({ where: { id } });
      if (!task) {
        throw new Error("No valid task with the given id, cannot delete");
      }
      task.isDone = true;
      await task.save();
      return task;
    } catch (err) {
      throw new Error(`Failed to delete the task ${err}`);
    }
  }
  @Mutation(() => Task)
  async deleteTaskUndone(@Arg("id") id: number): Promise<Task> {
    try {
      const task = await Task.findOne({ where: { id } });
      if (!task) {
        throw new Error("No valid task with the given id, cannot delete");
      }
      const deletedTask = await task.remove();
      return deletedTask;
    } catch (err) {
      console.error("Cannot delete the task with the given Id ", err);
      throw err; // Rethrow the caught error for handling in calling code
    }
  }
}
