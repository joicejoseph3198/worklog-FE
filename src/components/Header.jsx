import { UserButton } from '@clerk/clerk-react';
import React, { useState } from 'react'
import { Reveal } from '../util/Reveal';
import { useNavigate, useParams } from 'react-router';

export const Header = () => {
    const navigate = useNavigate();
    const { dateParam } = useParams();
    
    // Get current date (either from URL param or today)
    const parsedDate = dateParam ? new Date(dateParam) : new Date();
    const year = parsedDate.getFullYear();
    const month = String(parsedDate.getMonth() + 1).padStart(2, "0");
    const day = String(parsedDate.getDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;

    // Navigation functions
    const goToPreviousDay = () => {
        const previousDate = new Date(parsedDate);
        previousDate.setDate(previousDate.getDate() - 1);
        const prevYear = previousDate.getFullYear();
        const prevMonth = String(previousDate.getMonth() + 1).padStart(2, "0");
        const prevDay = String(previousDate.getDate()).padStart(2, "0");
        const prevFormattedDate = `${prevYear}-${prevMonth}-${prevDay}`;
        navigate(`/${prevFormattedDate}`);
    };

    const goToNextDay = () => {
        const nextDate = new Date(parsedDate);
        nextDate.setDate(nextDate.getDate() + 1);
        const nextYear = nextDate.getFullYear();
        const nextMonth = String(nextDate.getMonth() + 1).padStart(2, "0");
        const nextDay = String(nextDate.getDate()).padStart(2, "0");
        const nextFormattedDate = `${nextYear}-${nextMonth}-${nextDay}`;
        navigate(`/${nextFormattedDate}`);
    };

    const goToToday = () => {
        const today = new Date();
        const todayYear = today.getFullYear();
        const todayMonth = String(today.getMonth() + 1).padStart(2, "0");
        const todayDay = String(today.getDate()).padStart(2, "0");
        const todayFormattedDate = `${todayYear}-${todayMonth}-${todayDay}`;
        navigate(`/${todayFormattedDate}`);
    };

    return (
        <navbar className="flex gap-10 max-w-[screen] justify-between text-white drop-shadow">
            <div className="flex items-center">
                <Reveal color="white">
                    <button 
                    onClick={()=> navigate("/")}
                    title="Home Page"
                    className="p-4 text-3xl font-[NeueBit] hover:cursor-pointer hover:bg-white/10">worklog(s).</button>
                </Reveal>
            </div>
            
            {/* Date Navigation */}
            <div className="flex absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 gap-4">
                <button 
                    onClick={goToPreviousDay}
                    className="text-md font-bold hover:cursor-pointer hover:text-black px-3 py-1 rounded-lg hover:bg-white/10"
                    title="Previous Day"
                >
                    ← previous
                </button>
                
                <button 
                    onClick={goToToday}
                    className="text-md font-bold hover:cursor-pointer hover:text-black px-3 py-1 rounded-lg hover:bg-white/10"
                    title="Today"
                >
                    today
                </button>
                
                <button 
                    onClick={goToNextDay}
                    className="text-md font-bold hover:cursor-pointer hover:text-black px-3 py-1 rounded-lg hover:bg-white/10"
                    title="Next Day"
                >
                    next →
                </button>
            </div>

            <div className="p-6 flex items-center font-bold gap-5">
                <div className="flex gap-2">
                    <button 
                    onClick={()=> navigate(`/${formattedDate}`)}
                    title="Present Day Worklog"
                    className="text-md font-bold  hover:cursor-pointer hover:text-black hover:bg-white/10">
                        current worklog{" "}
                    </button>
                </div>
                <div className="flex gap-2">
                    <button
                    onClick={()=> navigate("/calender")} 
                    title="Navigate To A Different Worklog"
                    className="text-md font-bold  hover:cursor-pointer hover:text-black hover:bg-white/10">
                        calender-view
                    </button>
                </div>
                <UserButton className="ml-5" />
            </div>
        </navbar>
    )
}
