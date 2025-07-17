import React from 'react'
import { Reveal } from '../util/Reveal'

export const DayDetailsRow = () => {
    const date = new Date();
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();
    const formattedDate = `${day} ${month} ${year}`;
    const dayIndex = date.getDay();
  
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
