import * as React from "react";
import "./EditTask.scss";
import Delete from "../../assets/categoryImages/Delete.svg";
import { useQuery } from "@apollo/client";
import { GET_TASK } from "../../graphql/queries/queries.ts";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { UPDATE_TASK } from "../../graphql/mutations/mutations.ts";
import { DELETE_UNDONE_TASK } from "../../graphql/mutations/mutations.ts";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export interface EditTaskProps {}

export default function EditTask(props: EditTaskProps) {
  const { taskId } = useParams();
  console.log(" type of task id is ", typeof taskId);
  const { loading, error, data, refetch } = useQuery(GET_TASK, {
    variables: { getTaskId: taskId && parseInt(taskId) },
  });

  const [editTask] = useMutation(UPDATE_TASK);
  const [deleteTask] = useMutation(DELETE_UNDONE_TASK);
  const navigate = useNavigate();

  useEffect(() => {
    refetch();
  }, []);

  const [task, setTask] = useState({
    id: taskId && parseInt(taskId),
    taskTitle: "",
    date: "",
    category: "",
    note: "",
    reminder: "",
    priority: "",
  });

  useEffect(() => {
    if (data && data.getTask) {
      setTask({
        id: taskId && parseInt(taskId),
        taskTitle: data.getTask.taskTitle,
        date: data.getTask.date,
        category: data.getTask.category,
        note: data.getTask.note,
        reminder: data.getTask.reminder,
        priority: data.getTask.priority,
      });
    }
  }, [data]);

  const handleDelete = () => {
    try {
      const data = deleteTask({
        variables: {
          deleteTaskUndoneId: taskId && parseInt(taskId),
        },
      });
      console.log("Deleted the task ", data);
      toast.success("Task deleted successfully", { autoClose: 1500 });
      navigate("/");
    } catch (err) {
      console.log(`Cannot delete the task ${err}`);
      toast.error("Error deleting the task", { autoClose: 1500 });
    }
  };

  // Function to update task state
  const updateTask = (fieldName, value) => {
    setTask({
      ...task,
      [fieldName]: value,
    });
  };

  console.log("Corresponding task is ", data);

  const handleSubmit = async () => {
    if (
      task.taskTitle === "" ||
      task.taskTitle === null ||
      task.taskTitle === undefined
    ) {
      console.log("task title is not entered");
      toast.error("Please Enter Task Title", { autoClose: 1500 });
      return;
    }
    if (task.date === "" || task.date === null || task.date === undefined) {
      toast.error("Please Enter Date", { autoClose: 1500 });
      return;
    }
    if (
      task.category === "" ||
      task.category === null ||
      task.category === undefined
    ) {
      toast.error("Please Enter Category", { autoClose: 1500 });
      return;
    }
    if (
      task.reminder === "" ||
      task.reminder === null ||
      task.reminder === undefined
    ) {
      toast.error("Please Enter Reminder", { autoClose: 1500 });
      return;
    }

    if (
      task.priority === "" ||
      task.priority === null ||
      task.priority === undefined
    ) {
      task.priority = "1";
    }

    try {
      const data = await editTask({
        variables: {
          data: task,
        },
      });
      console.log("Edited the task ", data);
      toast.success("Task updated successfully", { autoClose: 1500 });
      navigate("/");
    } catch (err) {
      console.log(`Cannot edit the task ${err}`);
      toast.error("Error updating the task", { autoClose: 1500 });
    }
  };

  return (
    <div className="Addtask-page">
      {data && (
        <div className="Addtask-container-wrapper">
          <div className="Addtask-container">
            <div className="Addtask-form">
              <div className="addtask-label">
                <label htmlFor="title-label">Task Title</label>
              </div>
              <div className="addtask-title">
                <input
                  className="task-input"
                  placeholder="Task Title"
                  id="title-label"
                  type="text"
                  name="task-title"
                  value={task.taskTitle}
                  onChange={(e) => updateTask("taskTitle", e.target.value)}
                />
              </div>
              <div className="addtask-label">
                <label htmlFor="date-label">Date:</label>
              </div>
              <div className="addtask-date">
                <input
                  className="task-input"
                  type="date"
                  name="task-date"
                  id="date-label"
                  value={task.date}
                  onChange={(e) => updateTask("date", e.target.value)}
                />
              </div>
              <div className="addtask-label">
                <label htmlFor="category-label">Category:</label>
              </div>
              <select
                id="category-label"
                className="addtask-category"
                value={task.category}
                onChange={(e) => updateTask("category", e.target.value)}
              >
                <option className="category-option" value="">
                  Select Category
                </option>
                <option className="category-option" value="Task">
                  Task
                </option>
                <option className="category-option" value="Study">
                  Study
                </option>
                <option className="category-option" value="Sports">
                  Sports
                </option>
                <option className="category-option" value="Homework">
                  Homework
                </option>
                <option className="category-option" value="Entertainment">
                  Entertainment
                </option>
                <option className="category-option" value="Finance">
                  Finance
                </option>

                <option className="category-option" value="Health">
                  Health
                </option>

                <option className="category-option" value="Home">
                  Home
                </option>

                <option className="category-option" value="Nutrition">
                  Nutrition
                </option>

                <option className="category-option" value="Social">
                  Social
                </option>

                <option className="category-option" value="Art">
                  Art
                </option>
              </select>
              <div className="addtask-label">
                <label htmlFor="note-label">Note:</label>
              </div>
              <div className="addtask-note">
                <textarea
                  value={task.note}
                  className="note-textarea"
                  id="note-label"
                  placeholder="Add note"
                  name=""
                  cols={30}
                  rows={10}
                  onChange={(e) => updateTask("note", e.target.value)}
                />
              </div>
              <div className="addtask-label">
                <label htmlFor="reminder-label">Deadline:</label>
              </div>
              <div className="addtask-reminder">
                <input
                  className="task-input"
                  id="reminder-label"
                  type="time"
                  placeholder="Select reminder"
                  value={task.reminder}
                  onChange={(e) => updateTask("reminder", e.target.value)}
                />
              </div>
              <div className="addtask-label">
                <label htmlFor="priority-label">Priority:</label>
              </div>
              <div className="addtask-priority">
                <input
                  className="task-input"
                  id="priority-label"
                  type="number"
                  value={task.priority}
                  onChange={(e) =>
                    updateTask("priority", parseInt(e.target.value))
                  }
                />
              </div>
            </div>
            <div className="buttons-addtask">
              <div className="task-delete">
                <button
                  className="addtask-delete-button"
                  onClick={handleDelete}
                >
                  Delete
                </button>
              </div>
              <div className="task-submit" onClick={handleSubmit}>
                <button className="addtask-submit-button">Submit</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
