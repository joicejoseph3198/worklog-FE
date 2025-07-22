import React, { useState } from "react";
import { Header } from "../components/Header";
import { useNavigate } from "react-router";


export const CalenderSpread = () => {
    const [date, setDate] = useState(new Date());
    const goToPreviousMonth = () => {
        const newDate = new Date(date.getFullYear(), date.getMonth() - 1, 1);
        setDate(newDate);
    };

    const goToNextMonth = () => {
        const newDate = new Date(date.getFullYear(), date.getMonth() + 1, 1);
        setDate(newDate);
    };

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

    const days = getDaysInMonth(date);
    const navigate = useNavigate();

    return (
        <div>
            <Header />
            <div
                className="bg-white text-black h-screen p-4 w-screen overflow-x-scroll"
                style={{
                    backgroundImage: `radial-gradient(circle, rgba(153, 153, 153, 0.52) 1px, transparent 1px)`,
                    backgroundSize: `20px 20px`,
                    backgroundPosition: `center`,
                }}
            >
                <div className="overflow-x-auto">
                    <div className="min-w-[1600px]">

                        {/* Calendar */}
                        <div className="max-w-3/5 mx-auto pt-10">
                            <div className="flex px-2 mb-6 items-center justify-between">
                                <div className="flex gap-10 items-center">
                                    <h2 className="text-lg font-bold text-[#ff5400]">{"Navigate To"}</h2>
                                </div>
                                <div className="flex gap-10 items-center">
                                    <button
                                        onClick={goToPreviousMonth}
                                        className="text-3xl text-slate-400 hover:text-black hover:cursor-pointer"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke="currentColor"
                                            className="size-6"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
                                            />
                                        </svg>
                                    </button>
                                    <h2 className="text-4xl font-medium font-[NeueBit]">
                                        {monthNames[date.getMonth()]}, {date.getFullYear()}
                                    </h2>
                                    <button
                                        onClick={goToNextMonth}
                                        className="text-3xl text-slate-400 hover:text-black hover:cursor-pointer"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke="currentColor"
                                            className="size-6"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                                            />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                            {/* Day headers */}
                            <div className="grid grid-cols-7 gap-1 mb-4 align-center">
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
                                        onClick={() => {
                                            if (!dayObj.showBox) return;
                                            const year = date.getFullYear();
                                            const month = String(date.getMonth() + 1).padStart(2, "0");
                                            const day = String(dayObj.day).padStart(2, "0");
                                            const fullDate = `${year}-${month}-${day}`;
                                            console.log(fullDate)
                                            navigate(`/${fullDate}`);
                                        }}
                                        key={index}
                                        className={`aspect-square flex items-center justify-center relative p-1 ${dayObj.showBox
                                            ? `border-2 bg-gray-100 rounded-2xl hover:bg-[#ff5400] hover:cursor-pointer`
                                            : ``
                                            }`}
                                    >
                                        {dayObj.showBox && (
                                            <span className="text-lg font-semibold text-[#ff1000]">
                                                {dayObj.day}
                                            </span>
                                        )}
                                    </div>
                                ))}
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};
