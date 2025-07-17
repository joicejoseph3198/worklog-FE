import React, { useState } from "react";
import { Header } from "../components/Header";


export const CalenderSpread = () => {
    const [currentDate] = useState(new Date());
    const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];
    const dayNames = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

    const getDaysInMonth = (date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startingDayOfWeek = (firstDay.getDay() + 6) % 7; // Convert to Monday = 0

        const days = [];

        // Add empty cells for days before month starts (no boxes)
        for (let i = 0; i < startingDayOfWeek; i++) {
            days.push({ day: null, showBox: false });
        }

        // Add days of the month (with boxes)
        for (let day = 1; day <= daysInMonth; day++) {
            days.push({ day: day, showBox: true });
        }

        return days;
    };

    const days = getDaysInMonth(currentDate);

    return (
        <div
            className="bg-white text-black p-4 mx-auto"
            style={{
                backgroundImage: `radial-gradient(circle, rgba(153, 153, 153, 0.52) 1px, transparent 1px)`,
                backgroundSize: `20px 20px`,
                backgroundPosition: `center`,
            }}
        >
            <div className="mx-auto">
                {/* Header */}
                <div className="flex px-2 mb-6">
                    <div className="flex items-center space-x-4">
                        <h1 className="text-5xl font-medium font-[NeueBit]">Calendar View </h1>
                    </div>
                </div>

                {/* Month and Total */}
                <div className="mb-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-light font-semibold">
                        {monthNames[currentDate.getMonth()]}, {currentDate.getFullYear()}
                        </h2>
                    </div>
                </div>

                {/* Calendar */}
                <div className="max-w-3/4 mx-auto">
                    {/* Day headers */}
                    <div className="grid grid-cols-7 gap-1 mb-4">
                        {dayNames.map((day) => (
                            <div
                                key={day}
                                className="text-center text-2xl text-slate-700 font-[NeueBit] py-2"
                            >
                                {day}
                            </div>
                        ))}
                    </div>

                    {/* Calendar grid */}
                    <div className="grid grid-cols-7 gap-x-2 bg-white p-2 rounded-xl">
                        {days.map((dayObj, index) => (
                            <div
                                key={index}
                                className={`aspect-square flex items-center justify-center relative p-1 ${dayObj.showBox
                                        ? `border-2 bg-gray-100 rounded-2xl hover:bg-[#ff5400]`
                                        : ``
                                    }`}
                            >
                                {dayObj.showBox && (
                                    <span
                                        className={`text-lg ${dayObj.day % 2 ? "font-semibold text-[#ff1000]" : "black"
                                            }`}
                                    >
                                        {dayObj.day}
                                    </span>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};