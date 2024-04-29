import * as React from "react";
import "./Tasks.scss";
import Coding from "../../assets/categoryImages/Coding.svg";
import Task from "../../assets/categoryImages/Task.svg";
import Study from "../../assets/categoryImages/Study.svg";
import Sports from "../../assets/categoryImages/Sports.svg";
import Homework from "../../assets/categoryImages/Homework.svg";
import Entertainment from "../../assets/categoryImages/Entertainment.svg";
import Finance from "../../assets/categoryImages/Finance.svg";
import Health from "../../assets/categoryImages/Health.svg";
import Home from "../../assets/categoryImages/Home.svg";
import Nutrition from "../../assets/categoryImages/Nutrition.svg";
import Social from "../../assets/categoryImages/Social.svg";
import Art from "../../assets/categoryImages/Art.svg";

import Edit from "../../assets/categoryImages/Edit.svg";
import Add from "../../assets/categoryImages/Add.svg";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { GET_TASKS, GET_TASK_BY_DATE } from "../../graphql/queries/queries.ts";
import { DELETE_DONE_TASK } from "../../graphql/mutations/mutations.ts";
import Calendar from "../../assets/categoryImages/calendar.svg";
import Clock from "../../assets/categoryImages/clock.svg";
//

// import { useEffect } from "react";

export interface TasksProps {}

export default function Tasks(props: TasksProps) {
  const categoryImages = {
    Coding: Coding,
    Task: Task,
    Study: Study,
    Sports: Sports,
    Entertainment: Entertainment,
    Finance: Finance,
    Health: Health,
    Home: Home,
    Nutrition: Nutrition,
    Social: Social,
    Art: Art,
  };

  const currentDate = new Date();
  // console.log("date is ", new Date().toISOString);
  const formattedDate = `${currentDate.getFullYear()}-${(
    currentDate.getMonth() + 1
  )
    .toString()
    .padStart(2, "0")}-${currentDate.getDate().toString().padStart(2, "0")}`;

  console.log("formatted date is ", formattedDate);
  const [filter, setFilter] = React.useState("myday");

  const { loading, error, data, refetch } = useQuery(GET_TASKS, {
    variables: {
      date: filter === "myday" ? formattedDate : "no",
      isDone: filter === "completed",
    },
  });

  const [isDone, setIsDone] = useState(false);

  const [deleteTask] = useMutation(DELETE_DONE_TASK);

  const fetchAgain = async() => {
    await refetch();
  };

  useEffect(() => {
    if (filter === "completed") {
      const taskContainer = document.querySelector(".task-container");
      if (taskContainer && taskContainer instanceof HTMLElement) {
        taskContainer.style.width = "60%";
        taskContainer.style.marginRight = "160px";
      }
    } else {
      const taskContainer = document.querySelector(".task-container");
      if (taskContainer && taskContainer instanceof HTMLElement) {
        taskContainer.style.width = "100%";
        taskContainer.style.marginRight = "0px";
      }
    }
  }, [filter]);

  const handleDone = async(taskId: number) => {
    try {
      console.log("clicked the task", taskId);
      await deleteTask({
        variables: {
          deleteTaskId: taskId,
        },
      });
      await refetch();
    } catch (err) {
      console.log(`Cannot delete the given task ${err}`);
    }
  };

  const formatTimeToAMPM = (timeString) => {
    const [hours, minutes] = timeString.split(":");
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? "PM" : "AM";
    const formattedHour = hour % 12 || 12;
    const formattedMinutes = minutes.padStart(2, "0");
    return `${formattedHour}:${formattedMinutes} ${ampm}`;
  };

  const formatDate = (dateString) => {
    const [year, month, day] = dateString.split("-");
    return `${day}-${month}-${year}`;
  };

  console.log("filter is ", filter);
  return (
    <div className="taskPage">
      <div className="router-box-wrapper">
        <div className="router-box">
          <a className="router-box-a" onClick={() => {setFilter("myday")
            fetchAgain()
          }}>
            My Day
          </a>
          <a className="router-box-a" onClick={() => {setFilter("tasks")
            fetchAgain()
          }}>
            Tasks
          </a>
          <a className="router-box-a" onClick={() => {setFilter("completed")
            fetchAgain()
          }}>
            Tasks Completed
          </a>
        </div>
      </div>
      <div className="task-container">
        <div className="taskpage-heading">
          <h1 className="taskpage-heading-h1">
            {filter === "myday"
              ? `My Day`
              : filter === "tasks"
              ? "Tasks"
              : "Completed Tasks"}
          </h1>
        </div>
        <div className="task-container-wrapper">
          <div className="task-container">
            {data &&
              data.getTasks.map((elem, id: number) => {
                return (
                  <div className="task-comp-wrapper">
                    <div className="task-comp-primary">
                      <div key={id} className="task-comp">
                        <div className="task-category">
                          <img
                            className="task-image"
                            src={categoryImages[elem.category]}
                            alt={elem.category}
                          />
                        </div>
                        <div className="task-title">
                          <p className="task-title-p1">{elem.taskTitle}</p>
                        </div>
                        {filter !== "completed" && (
                          <div className="task-checkbox">
                            <button className="addtask-submit-button"
                              onClick={() => {
                                handleDone(parseInt(elem.id));
                              }}
                            >
                              Done
                            </button>
                            {/* <input
                            type="checkbox"
                           
                            checked={isDone[id]}
                          /> */}
                          </div>
                        )}
                      </div>
                      {filter !== "completed" && (
                        <div className="task-deadline">
                          <p className="task-deadline-p-time">
                            {" "}
                            <img
                              className="calender-icon"
                              src={Clock}
                            ></img>{" "}
                            {formatTimeToAMPM(elem.reminder)}
                          </p>
                          <p className="task-deadline-p-date">
                            <img className="calender-icon" src={Calendar}></img>{" "}
                            {formatDate(elem.date)}
                          </p>
                        </div>
                      )}
                    </div>
                    <Link to={`/editTask/${elem.id}`}>
                      <div className="task-edit">
                        <img className="task-image" src={Edit} alt={elem} />
                      </div>
                    </Link>
                  </div>
                );
              })}
          </div>
        </div>
        {filter !== "completed" && (
          <div className="add-task">
            <Link to={"/addTask"}>
              <img className="add-task-image" src={Add} alt="" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
