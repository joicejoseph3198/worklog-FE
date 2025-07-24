import React, { useEffect, useState } from "react";
import { TaskModal } from "./TaskModal";
import { Reveal } from "../util/Reveal";
import { useAxios } from "../util/useAxios";
import { useTaskStore } from "../store/useTaskStore";
import { TaskSetting } from "./TaskSetting";
import { useModalStore } from "../store/useModalStore";
import { useParams } from "react-router";

export const Task = () => {
  // axios
  const axiosInstance = useAxios();

  // store Related
  const tasks = useTaskStore((state) => state.tasks);
  const fetchTasks = useTaskStore((state) => state.fetchTasks);
  const deleteTask = useTaskStore((state) => state.deleteTask);
  const showModal = useModalStore((state) => state.showModal);
  const changeTag = useModalStore((state) => state.changeTag);
  const changeTitle = useModalStore((state) => state.changeTitle);
  const changeDescription = useModalStore((state) => state.changeDescription);
  const setModalHeading = useModalStore((state) => state.setModalHeading);
  const setCurrentTaskId = useModalStore((state) => state.setCurrentTaskId);
  const updateTask = useTaskStore((state) => state.updateTask);

  const { dateParam } = useParams();
  // fallback to today's date if param is missing or invalid
  const parsedDate = dateParam ? new Date(dateParam) : new Date();
  const year = parsedDate.getFullYear();
  const month = String(parsedDate.getMonth() + 1).padStart(2, "0");
  const day = String(parsedDate.getDate()).padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}`;

  useEffect(() => {
    fetchTasks(axiosInstance, formattedDate);
  }, [dateParam]);

  // Handler
  const toggleTask = (taskId) => {
    const fetchedTask = tasks.find((t) => t.id == taskId);
    fetchedTask.ticked = !fetchedTask.ticked;
    updateTask(axiosInstance, fetchedTask)
  };

  const handleViewTask = (id) => {
    const fetchedTask = tasks.find((t) => t.id == id);
    changeTag(fetchedTask.tag);
    changeTitle(fetchedTask.title);
    changeDescription(fetchedTask.description);
    setModalHeading("view details")
    showModal();
  };

  const handleAddTask = () => {
    setModalHeading("add task")
    showModal()
  }

  const handleDeleteTask = (id) => {
    deleteTask(axiosInstance, id);
  };

  const handleEditTask = (id) => {
    const fetchedTask = tasks.find((t) => t.id == id);
    changeTag(fetchedTask.tag);
    changeTitle(fetchedTask.title);
    changeDescription(fetchedTask.description);
    setCurrentTaskId(id)
    setModalHeading("edit details")
    showModal();
  };

  return (
    <div className="flex-shrink-0 w-1/2 p-4">
      <div>
        <div className="flex justify-between items-center mb-4">
          <Reveal>
            <h2 className="text-3xl mb-2 font-[NeueBit]">Tasks</h2>
          </Reveal>
          <button
            onClick={handleAddTask}
            className="font-bold hover:cursor-pointer text-[#ff4500]"
          >
            + Add Task
          </button>
        </div>

        <div className="rounded-full">
          {tasks.map((task) => (
            <div key={task.id} className="relative mb-1">

              {/* Task row */}
              <div className="flex items-center bg-gray-50 p-3 rounded">
                <input
                  type="checkbox"
                  checked={task.ticked}
                  onChange={() => toggleTask(task.id)}
                  className="mr-2 w-4 h-4 accent-black"
                />
                <Reveal color="gray" className="flex-1">
                  <span className={`inline-flex gap-2 ${task.ticked ? "line-through text-slate-400" : ""}`}>
                    <div className="flex items-center gap-2 overflow-hidden text-md">
                      {task.tag && (
                        <span className="px-2 py-0.5 rounded-full border border-[#ff4500] text-sm font-bold whitespace-nowrap">
                          {task.tag}
                        </span>
                      )}
                      <p className="truncate">
                        {task.title || "Untitled Task"}
                      </p>
                    </div>
                  </span>
                </Reveal>
                <button className="text-slate-500 font-bold text-sm ml-auto">
                  <TaskSetting
                    handleDelete={handleDeleteTask}
                    handleView={handleViewTask}
                    handleUpdate={handleEditTask}
                    id={task.id}
                  />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
