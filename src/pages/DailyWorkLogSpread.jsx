import React from "react";
import { Task } from "../components/Task";
import { Schedule } from "../components/Schedule";
import { Notes } from "../components/Notes";
import { DayDetailsRow } from "../components/DayDetailsRow";
import { TaskModal } from "../components/TaskModal";
import { useModalStore } from "../store/useModalStore";
import { Header } from "../components/Header";

export const DailyWorkLogSpread = () => {
  const modalFlag = useModalStore((state) => state.modalFlag)
  const modalHeading = useModalStore((state) => state.modalHeading)


  return (
    <div className="overflow-x-scroll">
      <Header/>
      <DayDetailsRow />
      {/* Main spread content container */}
      <div className={`relative`}>
        {/* Content to blur */}
        <div
          className={`
                flex 
                px-5
                w-screen 
                h-screen 
                text-black
                overflow-x-scroll
                min-w-[1200px]
                divide-x divide-gray-300
                transition-all
                ${modalFlag ? "blur-sm pointer-events-none" : ""}
              `}
        >
          <Task />
          <Schedule />
          <Notes />
        </div>

        {/* Modal overlay */}
        {modalFlag && (
          <TaskModal modalHeading={modalHeading} />
        )}
      </div>
    </div>
  );
};