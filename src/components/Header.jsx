import { UserButton } from '@clerk/clerk-react';
import React, { useState } from 'react'
import { Reveal } from '../util/Reveal';
import { useNavigate } from 'react-router';

export const Header = () => {
    const navigate = useNavigate();
    const parsedDate = new Date();
    const year = parsedDate.getFullYear();
    const month = String(parsedDate.getMonth() + 1).padStart(2, "0");
    const day = String(parsedDate.getDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;
    return (
        <navbar className="flex gap-10 max-w-[screen] justify-between text-white drop-shadow">
            <div className="flex items-center">
                <Reveal color="white">
                    <button 
                    onClick={()=> navigate("/")}
                    className="p-4 text-3xl font-[NeueBit] hover:cursor-pointer">worklog(s).</button>
                </Reveal>
            </div>
            <div className="p-6 flex items-center font-bold gap-5">
                <div className="flex gap-2">
                    <button 
                    onClick={()=> navigate(`/${formattedDate}`)}
                    className="text-md font-bold  hover:cursor-pointer hover:text-black">
                        current worklog{" "}
                    </button>
                </div>
                <div className="flex gap-2">
                    <button
                    onClick={()=> navigate("/calender")} 
                    className="text-md font-bold  hover:cursor-pointer hover:text-black">
                        calender-view
                    </button>
                </div>
                <UserButton className="ml-5" />
            </div>
        </navbar>
    )
}
