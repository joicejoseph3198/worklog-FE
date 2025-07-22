import React from 'react'
import { Reveal } from '../util/Reveal'
import { useParams } from 'react-router';

export const DayDetailsRow = () => {
  const { dateParam } = useParams();
  // Fallback to today if param is invalid or missing
  const parsedDate = dateParam && !isNaN(Date.parse(dateParam))
    ? new Date(dateParam)
    : new Date();

  // Month names array
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  // Format to "dd - Month - yyyy"
  const day = String(parsedDate.getDate()).padStart(2, "0");
  const monthText = monthNames[parsedDate.getMonth()];
  const year = parsedDate.getFullYear();

  const formattedDate = `${day} ${monthText} ${year}`;

  const dayIndex = parsedDate.getDay();

  const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S']

  return (
    <div className="w-full p-4 flex flex-row items-center justify-between border-b border-gray-300 overflow-x-scroll min-w-[1200px]">
      <div className="text-3xl mb-2 font-[NeueBit] text-[#ff4500]">{formattedDate}</div>
      <Reveal>
        <div className="flex space-x-2">
          {days.map((d, index) => (
            <div
              key={index}
              className={`
                w-8 h-8 flex items-center justify-center rounded-full font-[NeueBit] 
                ${index === dayIndex ? 'border-2 border-[#ff4500] text-black-500 font-bold' : 'text-gray-500'}
              `}
            >
              {d}
            </div>

          ))}
        </div>
      </Reveal>
    </div>
  )
}
