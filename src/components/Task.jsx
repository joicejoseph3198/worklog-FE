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
    setModalHeading("View Details")
    showModal();
  };

  const handleAddTask = () => {
    setModalHeading("Add Task")
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
    setModalHeading("Edit Details")
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
      console.log("Tasks copied successfully!");
    } catch (error) {
      console.warn("Failed to copy tasks: " + error.message);
    } finally {
      setIsCopying(false);
    }
  };

  return (
    <div className="flex-shrink-0 w-1/2 p-4">
      <div>
        <div className="flex justify-between items-center mb-4">
          <Reveal>
            <h2 className="text-md mb-2 text-[var(--worklog-text-light)] ">Tasks</h2>
          </Reveal>
          <div className="flex gap-6">
            <button
              onClick={() => setShowCopyModal(true)}
              className="font-bold hover:cursor-pointer px-4 bg-[var(--worklog-brand-green)] p-1 rounded-md text-xs
              hover:bg-[var(--worklog-card-hover)] hover:text-[var(--worklog-brand-green)]"
            >
              Copy Tasks
            </button>
            <button
              onClick={handleAddTask}
              className="font-bold hover:cursor-pointer px-4 py-2 bg-[var(--worklog-brand-green)] p-1 rounded-md text-xs
              hover:bg-[var(--worklog-card-hover)] hover:text-[var(--worklog-brand-green)]"
            >
              + Add Task
            </button>
          </div>
        </div>

        <div className="space-y-2">
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
            <div key={task.id} className="relative">

              {/* Task row */}
              <div className="flex items-center bg-[var(--worklog-text-dark)]/50 backdrop-blur-sm hover:bg-[var(--worklog-text-dark)]/70 p-4 rounded-lg border border-[var(--worklog-text-medium)]/20 transition-all duration-200">
                <input
                  type="checkbox"
                  checked={task.ticked}
                  onChange={() => toggleTask(task.id)}
                  className="mr-3 w-4 h-4 accent-[var(--worklog-brand-green)]"
                />
                <Reveal color="gray" className="flex-1">
                  <div className={`flex items-center gap-3 ${task.ticked ? "line-through text-[var(--worklog-text-medium)]" : ""}`}>
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      {task.tag && (
                        <span className="px-2 py-1 rounded-full border border-[#ff4500] text-xs font-semibold whitespace-nowrap flex-shrink-0">
                          {task.tag}
                        </span>
                      )}
                      <p className="truncate text-[var(--worklog-text-light)] font-medium">
                        {task.title || "Untitled Task"}
                      </p>
                    </div>
                    <span className={`text-sm font-semibold flex-shrink-0 px-2 py-1 ${
                      task.status === 'not-started' ? 'text-[var(--worklog-text-medium)]' :
                      task.status === 'initiated' ? 'text-purple-500' :
                      task.status === 'in-progress' ? 'text-blue-500' :
                      task.status === 'blocked' ? 'text-red-500' :
                      task.status === 'done' ? 'text-green-500' :
                      task.status === 'rollover' ? 'text-orange-500' :
                      'text-[var(--worklog-text-medium)]'
                    }`}>
                      {task.status === 'not-started' ? 'Not Started' :
                       task.status === 'initiated' ? 'Initiated' :
                       task.status === 'in-progress' ? 'In Progress' :
                       task.status === 'blocked' ? 'Blocked' :
                       task.status === 'done' ? 'Done' :
                       task.status === 'rollover' ? 'Rollover' :
                       'Not Started'}
                    </span>
                  </div>
                </Reveal>
                
                <button className="text-[var(--worklog-text-medium)] hover:text-[var(--worklog-text-light)] font-semibold text-sm ml-3 flex-shrink-0">
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
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex flex-row justify-center items-center z-50">
          <div className="flex flex-col justify-center bg-[var(--worklog-text-dark)] w-full lg:w-1/3 rounded-md border-1 border-[var(--worklog-text-medium)]/30 mx-2 p-2 lg:p-5 text-slate-700">
            <h3 className="text-xl text-[var(--worklog-brand-green)]  pb-4">Copy Tasks</h3>
            <p className="text-sm text-[var(--worklog-text-light)] mb-4">
              Enter the date (dd-mm-yyyy) to copy tasks from:
            </p>
            <input
              type="date"
              value={sourceDate}
              onChange={(e) => setSourceDate(e.target.value)}
              className="bg-transparent text-[var(--worklog-text-light)] w-full focus:outline-none px-6 py-2 
              text-sm border-[var(--worklog-text-medium)]/30 border-1 rounded-md text-sm font-semibold mb-4"
            />
            <div className="flex flex-row justify-end gap-5 py-5 px-2">
              <button
                onClick={handleCopyTasks}
                disabled={isCopying}
                className="bg-[var(--worklog-brand-green)] hover:bg-[var(--worklog-text-dark)] text-black hover:text-[var(--worklog-brand-green)] border-[var(--worklog-text-medium)]/30 border-1 flex flex-row items-center justify-center px-4 font-['Mori'] font-bold rounded-full text-sm lg:text-md py-5 h-[38px] -mr-3 disabled:opacity-50"
              >
                {isCopying ? "Copying..." : "Copy Tasks"}
              </button>
              <button
                onClick={() => {
                  setShowCopyModal(false);
                  setSourceDate("");
                }}
                className="bg-[var(--worklog-text-medium)] hover:bg-[var(--worklog-text-dark)] text-white border-[var(--worklog-text-medium)] border-1 flex flex-row items-center justify-center px-4 font-['Mori'] font-bold rounded-full text-sm lg:text-md py-5 h-[38px] -mr-3"
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
