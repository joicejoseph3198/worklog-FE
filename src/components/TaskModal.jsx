import React from "react";
import { InputTextField } from "./InputTextField";
import { Button } from "./Button";
import { useTaskStore } from "../store/useTaskStore";
import { useAxios } from "../util/useAxios";
import { useModalStore } from "../store/useModalStore";
import { useParams } from "react-router";
import { StatusSelector } from "./StatusSelector";

export const TaskModal = ({ modalHeading }) => {
  // Axios:
  const axiosInstance = useAxios();

  // Store Related:
  const id = useModalStore((state)=> state.currentTaskId);
  const tag = useModalStore((state) => state.tag)
  const title = useModalStore((state) => state.title)
  const description = useModalStore((state) => state.description)
  const changeTag = useModalStore((state) => state.changeTag)
  const changeTitle = useModalStore((state) => state.changeTitle)
  const changeDescription = useModalStore((state) => state.changeDescription)
  const addTask = useTaskStore((state) => state.addTask)
  const updateTask = useTaskStore((state) => state.updateTask)
  const hideModal = useModalStore((state) => state.hideModal)
  const tasks = useTaskStore((state) => state.tasks)

  // Status state
  const [status, setStatus] = React.useState('not-started');

  // Update status when modal opens for editing
  React.useEffect(() => {
    if (modalHeading === "Edit Details" && id) {
      const currentTask = tasks.find(task => task.id === id);
      if (currentTask && currentTask.status) {
        setStatus(currentTask.status);
      }
    } else if (modalHeading === "Add Task") {
      setStatus('not-started');
    }
  }, [modalHeading, id, tasks]);

  const { dateParam } = useParams();
  // fallback to today's date if param is missing or invalid
  const parsedDate = dateParam ? new Date(dateParam) : new Date();
  const year = parsedDate.getFullYear();
  const month = String(parsedDate.getMonth() + 1).padStart(2, "0");
  const day = String(parsedDate.getDate()).padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}`;

  // Handler:
  const handleAdd = () => {
    if (title.trim() === "") return;
    addTask(axiosInstance, { title, tag, description, date: formattedDate, status });
    hideModal()
  };

  const handleUpdate = () => {
    if (title.trim() === "") return;
    updateTask(axiosInstance, { id: id, title, tag, description, date: formattedDate, status })
    hideModal()
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex flex-row justify-center items-center">
      <div className="flex flex-col justify-center bg-[var(--worklog-text-dark)] w-full lg:w-2/5 rounded-md border-1 border-[var(--worklog-text-medium)]/30 mx-2 p-2 lg:p-5 text-slate-700">
        <h3 className="text-xl text-[var(--worklog-brand-green)] pb-4">{modalHeading}</h3>
        <div className="flex gap-10 justify-between text-slate-700 pb-4">
          <InputTextField
            title="Tag"
            placeholder="Tag (Optional)"
            maxlength={50}
            valueStore={tag}
            onChangeHandler={(e) => changeTag(e.target.value)}
          />
          <InputTextField
            title="Title"
            placeholder="Provide title"
            maxlength={100}
            valueStore={title}
            onChangeHandler={(e) => changeTitle(e.target.value)}
          />
        </div>
        
        {/* Status Selection */}
        <div className="flex gap-10 justify-between text-slate-700 pb-4">
          <div className="flex-1">
            <h3 className="pb-2 text-2xl font-[NeueBit] text-[var(--worklog-text-light)]">Status</h3>
            <StatusSelector
              value={status}
              onChange={setStatus}
              size="md"
              showLabel={true}
            />
          </div>
          <div className="flex-1"></div> {/* Spacer */}
        </div>
        
        <p className="text-2xl font-[NeueBit] text-[var(--worklog-text-light)]">
          Additonal Details (limit: 500 characters)
        </p>
        <textarea
          value={description}
          onChange={(e) => changeDescription(e.target.value)}
          placeholder="Enter product description"
          name="productDescription"
          className="resize-none bg-transparent text-[var(--worklog-text-light)] w-full h-20 focus:outline-none px-6 py-2 
          text-sm border-[var(--worklog-text-medium)]/30 border-1 rounded-md text-sm font-semibold"
        />
        <div className="flex flex-row justify-end gap-5 py-5 px-2">
          {modalHeading === "Add Task" && (
            <Button buttonText="Add" color="white" onClickHandler={handleAdd} />
          )}
          {modalHeading === "Edit Details" && (
            <Button buttonText="Update" color="white" onClickHandler={handleUpdate} />
          )}
          <Button buttonText="Cancel" color="gray" onClickHandler={hideModal} />
        </div>
      </div>
    </div>
  );
};
