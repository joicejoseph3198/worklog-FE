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

  const handleSave = () => {
    console.log(scheduleData)
    const filteredData = scheduleData
    .map((entry, hour) => ({ hour, entry }))
    .filter(item => item?.entry && item.entry?.trim() !== "");
    saveSchedule(axiosInstance, filteredData, formattedDate)
  }

  return (
    <div className="w-1/2 p-4">
      <div className="flex items-center justify-between mb-4">
        <Reveal>
          <h2 className="text-3xl mb-2 font-[NeueBit]">Schedule</h2>
        </Reveal>
        <button
          className="font-bold hover:cursor-pointer text-[#ff4500]"
          onClick={handleSave}
        >
          Save 
        </button>
      </div>


      <div className="p-4 w-full overflow-y-auto h-[90vh]">
        {hours.map((hour) => (

          <div key={hour} className="flex flex-row items-center mb-1">
            <span className="w-14 text-[#ff4500] text-sm">
              {hour.toString().padStart(2, "0")}:00
            </span>
            <input type="text" className="flex-1 rounded p-2  ml-2"
              value={scheduleData[hour]}
              onChange={(e) => handleChange(hour, e.target.value)} />
          </div>

        ))}
      </div>
    </div>
  );
};
