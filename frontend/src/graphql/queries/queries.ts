import { gql } from "@apollo/client";

export const GET_TASKS = gql`
  query($date: String!,
    $isDone: Boolean!){
    getTasks(date: $date,isDone: $isDone) {
      id
      taskTitle
      category
      priority
      note
      date
      reminder
      isDone
    }
  }
`;

export const GET_TASK = gql`
  query ($getTaskId: Float!) {
    getTask(id: $getTaskId) {
      taskTitle
      note
      priority
      reminder
      date
      category
    }
  }
  
`;

