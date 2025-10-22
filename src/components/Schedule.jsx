import React, { useEffect, useState } from "react";
import { Reveal } from "../util/Reveal";
import { useScheduledStore } from "../store/useScheduleStore";
import { useAxios } from "../util/useAxios";
import { useParams } from "react-router";

export const Schedule = () => {
  const saveSchedule = useScheduledStore((store) => store.saveSchedule)
  const fetchSchedule = useScheduledStore((store) => store.fetchSchedule)
  const slots = useScheduledStore((store)=> store.slots)
  const axiosInstance = useAxios();
  const [isSaving, setIsSaving] = useState(false);

  const { dateParam } = useParams();
  // fallback to today's date if param is missing or invalid
  const parsedDate = dateParam ? new Date(dateParam) : new Date();
  const year = parsedDate.getFullYear();
  const month = String(parsedDate.getMonth() + 1).padStart(2, "0");
  const day = String(parsedDate.getDate()).padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}`;

  useEffect(()=> {
    fetchSchedule(axiosInstance, formattedDate)
  },[dateParam])

  useEffect(() => {
    const fetchedSchedule = Array.from({ length: 24 }, () => "");
  
    slots.forEach(({ hour, detail }) => {
      if (typeof hour === "number" && hour >= 0 && hour < 24) {
        fetchedSchedule[hour] = detail;
      }
    });
  
    setScheduleData(fetchedSchedule);
  }, [slots]);

  // State to hold input values for each hour
  const [scheduleData, setScheduleData] = useState(
    Array.from({ length: 24 }, () => "")
  );

  // Generate hour slots (0 to 23)
  const hours = Array.from({ length: 24 }, (_, i) => i);

  // Handlers
  const handleChange = (index, value) => {
    const updatedData = [...scheduleData];
    updatedData[index] = value;
    setScheduleData(updatedData);
  };

  const handleSave = async () => {
    setIsSaving(true);   
    try {
      const filteredData = scheduleData
    .map((entry, hour) => ({ hour, entry }))
    .filter(item => item?.entry && item.entry?.trim() !== "");
    await saveSchedule(axiosInstance, filteredData, formattedDate);
    } catch (error) {
      console.warn("Failed to save schedule: " + error.message);
    } finally {
      setIsSaving(false);;
    }
  }

  return (
    <div className="w-1/2 p-4">
      <div className="flex items-center justify-between mb-4">
        <Reveal>
          <h2 className="text-md mb-2 text-[var(--worklog-text-light)]">Schedule</h2>
        </Reveal>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="font-bold hover:cursor-pointer px-4 py-2 bg-[var(--worklog-brand-green)] disabled:opacity-50 disabled:cursor-not-allowed p-1 rounded-md text-sm
          hover:bg-[var(--worklog-card-hover)] hover:text-[var(--worklog-brand-green)]"
        >
          {isSaving ? "Saving..." : "Save"}
        </button>
      </div>

      {/* Ready to Save Indicator */}
      {scheduleData.some(slot => slot.trim()) && (
        <div className="flex items-center gap-2 text-xs text-[var(--worklog-brand-green)] mb-2 px-4">
          <svg 
            className="w-3 h-3" 
            fill="currentColor" 
            viewBox="0 0 20 20"
          >
            <path 
              fillRule="evenodd" 
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" 
              clipRule="evenodd" 
            />
          </svg>
          Ready to save
        </div>
      )}

      <div className="p-4 w-full overflow-y-auto h-[90vh]">
        {hours.map((hour) => (

          <div key={hour} className="flex flex-row items-center mb-1">
            <span className="w-14 text-[var(--worklog-text-medium)] text-sm">
              {hour.toString().padStart(2, "0")}:00
            </span>
            <input type="text" className="flex-1 rounded p-2 ml-2 text-[var(--worklog-text-white)] hover:bg-[var(--worklog-card-hover)]  focus:outline-[var(--worklog-text-medium)] focus:outline-1 focus:outline-offset-2"
              value={scheduleData[hour]}
              onChange={(e) => handleChange(hour, e.target.value)} />
          </div>

        ))}
      </div>
    </div>
  );
};
