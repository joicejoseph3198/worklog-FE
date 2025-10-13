import React, { useState, useEffect } from "react";
import { Header } from "../components/Header";
import { useNavigate } from "react-router";
import { Reveal } from "../util/Reveal";
import { useOverviewStore } from "../store/useOverviewStore";
import { useAxios } from "../util/useAxios";


export const CalenderSpread = () => {
    const [date, setDate] = useState(new Date());
    const axiosInstance = useAxios();
    const { taskDates, scheduleDates, noteDates, fetchOverview, loading } = useOverviewStore();

    const goToPreviousMonth = () => {
        const newDate = new Date(date.getFullYear(), date.getMonth() - 1, 1);
        setDate(newDate);
    };

    const goToNextMonth = () => {
        const newDate = new Date(date.getFullYear(), date.getMonth() + 1, 1);
        setDate(newDate);
    };

    // Fetch task overview when date changes
    useEffect(() => {
        const month = date.getMonth() + 1; // JavaScript months are 0-indexed
        const year = date.getFullYear();
        fetchOverview(axiosInstance, month, year);
    }, [date, axiosInstance, fetchOverview]);

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
        <div className="bg-[var(--worklog-card-bg)] flex flex-col w-screen">
            <Header />
            <div
                className="bg-[var(--worklog-dark-bg)] text-black h-screen rounded-xl mx-3 mb-3 overflow-x-scroll "
            >
                <div className="overflow-x-auto">
                    <div className="min-w-[1600px]">

                        {/* Calendar */}
                        <div className="max-w-3/5 mx-auto pt-10">
                            <div className="flex px-2 mb-6 items-center justify-between border-b-1 pb-5 border-[var(--worklog-text-medium)]/30">
                                <div className="flex gap-10 items-center">
                                    <Reveal>
                                        <h2 className="text-xl text-[var(--worklog-brand-green)]">{"Calender View"}</h2>
                                    </Reveal>
                                </div>
                                <div className="flex gap-10 items-center">
                                    <button
                                        onClick={goToPreviousMonth}
                                        className="text-2xl text-slate-400 hover:text-white hover:cursor-pointer"
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
                                    <Reveal>
                                        <h2 className="text-xl text-bold text-[var(--worklog-text-light)]">
                                            {monthNames[date.getMonth()]}, {date.getFullYear()}
                                        </h2>
                                    </Reveal>
                                    
                                    <button
                                        onClick={goToNextMonth}
                                        className="text-3xl text-slate-400 hover:text-white hover:cursor-pointer"
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
                                        className="text-center text-2xl text-[var(--worklog-text-light)] font-[NeueBit] py-2"
                                    >
                                        {day}
                                    </div>
                                ))}
                            </div>

                            {/* Calendar grid */}
                            <div className="grid grid-cols-7 gap-x-2 bg-[var(--worklog-dark-bg)] p-2 rounded-xl h-full"
                            style={{
                                backgroundImage: `radial-gradient(circle, rgba(153, 153, 153, 0.25) 1px, transparent 1px)`,
                                backgroundSize: `20px 20px`,
                                backgroundPosition: `center`,
                            }}>
                                {days.map((dayObj, index) => {
                                    // Check what content this date has
                                    const dateContent = dayObj.showBox && dayObj.day ? (() => {
                                        const year = date.getFullYear();
                                        const month = String(date.getMonth() + 1).padStart(2, "0");
                                        const day = String(dayObj.day).padStart(2, "0");
                                        const fullDate = `${year}-${month}-${day}`;
                                        
                                        const checkDateExists = (dateArray) => {
                                            return dateArray.some(apiDate => {
                                                // Convert API date (YYYY-MM-DD) to match calendar date format
                                                const apiDateObj = new Date(apiDate);
                                                const apiYear = apiDateObj.getFullYear();
                                                const apiMonth = String(apiDateObj.getMonth() + 1).padStart(2, "0");
                                                const apiDay = String(apiDateObj.getDate()).padStart(2, "0");
                                                const apiFormattedDate = `${apiYear}-${apiMonth}-${apiDay}`;
                                                
                                                return apiFormattedDate === fullDate;
                                            });
                                        };
                                        
                                        return {
                                            hasTasks: checkDateExists(taskDates),
                                            hasSchedule: checkDateExists(scheduleDates),
                                            hasNotes: checkDateExists(noteDates)
                                        };
                                    })() : { hasTasks: false, hasSchedule: false, hasNotes: false };

                                    return (
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
                                                ? `border-2 border-[var(--worklog-text-medium)]/30 bg-[var(--worklog-text-dark)]/30 rounded-2xl
                                                 hover:bg-[var(--worklog-brand-green)] hover:cursor-pointer hover:text-black`
                                                : ``
                                                }`}
                                        >
                                            {dayObj.showBox && (
                                                <>
                                                    <span className="text-base font-semibold text-[var(--worklog-text-light)]">
                                                        {dayObj.day}
                                                    </span>
                                                    {/* Content indicators */}
                                                    <div className="absolute bottom-2 right-2 flex flex-col gap-1">
                                                        {/* Task indicator */}
                                                        {dateContent.hasTasks && (
                                                            <div className="w-4 h-4 border-2 border-[var(--worklog-brand-green)] rounded-full flex items-center justify-center">
                                                                <svg 
                                                                    className="w-2.5 h-2.5 text-[var(--worklog-brand-green)]" 
                                                                    fill="currentColor" 
                                                                    viewBox="0 0 20 20"
                                                                >
                                                                    <path 
                                                                        fillRule="evenodd" 
                                                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" 
                                                                        clipRule="evenodd" 
                                                                    />
                                                                </svg>
                                                            </div>
                                                        )}
                                                        
                                                        {/* Schedule indicator */}
                                                        {dateContent.hasSchedule && (
                                                            <div className="flex items-center justify-center">
                                                                <svg 
                                                                    className="w-4 h-4 text-[var(--worklog-brand-green)]" 
                                                                    fill="currentColor" 
                                                                    viewBox="0 0 20 20"
                                                                >
                                                                    <path 
                                                                        fillRule="evenodd" 
                                                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" 
                                                                        clipRule="evenodd" 
                                                                    />
                                                                </svg>
                                                            </div>
                                                        )}
                                                        
                                                        {/* Notes indicator - three lines */}
                                                        {dateContent.hasNotes && (
                                                            <div className="flex items-center justify-center">
                                                                <div className="flex flex-col gap-0.5">
                                                                    <div className="w-3 h-0.5 bg-[var(--worklog-brand-green)] rounded"></div>
                                                                    <div className="w-3 h-0.5 bg-[var(--worklog-brand-green)] rounded"></div>
                                                                    <div className="w-3 h-0.5 bg-[var(--worklog-brand-green)] rounded"></div>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};
