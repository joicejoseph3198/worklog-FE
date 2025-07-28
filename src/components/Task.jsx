import React, { useEffect, useState } from "react";
import { TaskModal } from "./TaskModal";
import { Reveal } from "../util/Reveal";
import { useAxios } from "../util/useAxios";
import { useTaskStore } from "../store/useTaskStore";
import { TaskSetting } from "./TaskSetting";
import { useModalStore } from "../store/useModalStore";
import { useParams } from "react-router";
import { StatusIndicator, StatusSelector } from "./StatusSelector";

export const Task = () => {
  // axios
  const axiosInstance = useAxios();

  // store Related
  const tasks = useTaskStore((state) => state.tasks);
  const fetchTasks = useTaskStore((state) => state.fetchTasks);
  const deleteTask = useTaskStore((state) => state.deleteTask);
  const updateTaskStatus = useTaskStore((state) => state.updateTaskStatus);
  const showModal = useModalStore((state) => state.showModal);
  const changeTag = useModalStore((state) => state.changeTag);
  const changeTitle = useModalStore((state) => state.changeTitle);
  const changeDescription = useModalStore((state) => state.changeDescription);
  const setModalHeading = useModalStore((state) => state.setModalHeading);
  const setCurrentTaskId = useModalStore((state) => state.setCurrentTaskId);
  const updateTask = useTaskStore((state) => state.updateTask);
  const copyTasksFromDate = useTaskStore((state) => state.copyTasksFromDate);

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

  const handleStatusChange = (taskId, newStatus) => {
    updateTaskStatus(axiosInstance, taskId, newStatus);
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

  const [showCopyModal, setShowCopyModal] = useState(false);
  const [sourceDate, setSourceDate] = useState("");
  const [isCopying, setIsCopying] = useState(false);

  const handleCopyTasks = async () => {
    if (!sourceDate) {
      alert("Please enter a source date");
      return;
    }
    
    setIsCopying(true);
    try {
      await copyTasksFromDate(axiosInstance, sourceDate, formattedDate);
      setShowCopyModal(false);
      setSourceDate("");
      alert("Tasks copied successfully!");
    } catch (error) {
      alert("Failed to copy tasks: " + error.message);
    } finally {
      setIsCopying(false);
    }
  };

  return (
    <div className="flex-shrink-0 w-1/2 p-4">
      <div>
        <div className="flex justify-between items-center mb-4">
          <Reveal>
            <h2 className="text-3xl mb-2 font-[NeueBit]">Tasks</h2>
          </Reveal>
          <div className="flex gap-6">
            <button
              onClick={() => setShowCopyModal(true)}
              className="font-bold hover:cursor-pointer text-[#ff4500]"
            >
              📋 Copy Tasks
            </button>
            <button
              onClick={handleAddTask}
              className="font-bold hover:cursor-pointer text-[#ff4500]"
            >
              + Add Task
            </button>
          </div>
        </div>

        <div className="rounded-full">
          {tasks
            .sort((a, b) => {
              // Sort by tag, then by title
              const tagA = a.tag || '';
              const tagB = b.tag || '';
              if (tagA !== tagB) {
                return tagA.localeCompare(tagB);
              }
              return (a.title || '').localeCompare(b.title || '');
            })
            .map((task) => (
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
                    <div className="flex items-center gap-2 text-md">
                      {task.tag && (
                        <span className="px-2 py-0.5 rounded-full border border-[#ff4500] text-sm font-bold whitespace-nowrap">
                          {task.tag}
                        </span>
                      )}
                      <p className="truncate flex-1">
                        {task.title || "Untitled Task"}
                      </p>
                      <StatusSelector
                        value={task.status || 'not-started'}
                        onChange={(newStatus) => handleStatusChange(task.id, newStatus)}
                        size="sm"
                        showLabel={false}
                        className="w-28 flex-shrink-0"
                      />
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

      {/* Copy Tasks Modal */}
      {showCopyModal && (
        <div className="fixed inset-0 bg-black/10 backdrop-blur-sm flex flex-row justify-center items-center z-50">
          <div className="flex flex-col justify-center bg-white w-full lg:w-1/3 rounded-md border-2 border-slate-500 mx-2 p-2 lg:p-5 text-slate-700">
            <h3 className="text-3xl text-black pb-4 font-[NeueBit]">Copy Tasks</h3>
            <p className="text-sm text-gray-600 mb-4">
              Enter the date (YYYY-MM-DD) to copy tasks from:
            </p>
            <input
              type="date"
              value={sourceDate}
              onChange={(e) => setSourceDate(e.target.value)}
              className="bg-transparent text-slate-600 w-full focus:outline-none px-6 py-2 
              text-sm border-slate-700 border-2 rounded-md text-sm font-semibold mb-4"
            />
            <div className="flex flex-row justify-end gap-5 py-5 px-2">
              <button
                onClick={handleCopyTasks}
                disabled={isCopying}
                className="bg-[#ff4500] hover:bg-[#ff4500]/70 text-white px-4 py-2 rounded-md font-bold disabled:opacity-50"
              >
                {isCopying ? "Copying..." : "Copy Tasks"}
              </button>
              <button
                onClick={() => {
                  setShowCopyModal(false);
                  setSourceDate("");
                }}
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md font-bold"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
