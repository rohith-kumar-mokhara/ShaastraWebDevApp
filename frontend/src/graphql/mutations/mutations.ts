import { gql } from "@apollo/client";

export const CREATE_TASK = gql`
  mutation ($data: TaskInput!) {
    createTask(data: $data) {
      taskTitle
      category
      priority
      note
      date
      reminder
    }
  }
`;

export const UPDATE_TASK = gql`
  mutation ($data: editTaskInput!) {
    editTask(data: $data) {
      id
      taskTitle
      category
      reminder
      note
      date
    }
  }
`;

export const DELETE_UNDONE_TASK = gql`
  mutation ($deleteTaskUndoneId: Float!) {
    deleteTaskUndone(id: $deleteTaskUndoneId) {
      category
      taskTitle
      note
      reminder
      date
    }
  }
`;

export const DELETE_DONE_TASK = gql`
  mutation($deleteTaskId: Float!) {
    deleteTask(id: $deleteTaskId) {
      category
      taskTitle
      note
      reminder
      date
      priority
    }
  }
`;
