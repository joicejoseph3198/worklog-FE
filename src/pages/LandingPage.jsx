import React from "react";
import { useNavigate } from "react-router";
import { Reveal } from "../util/Reveal";
import { SignedIn, SignedOut, SignInButton } from "@clerk/clerk-react";

export const LandingPage = () => {
    const parsedDate = new Date();
    const year = parsedDate.getFullYear();
    const month = String(parsedDate.getMonth() + 1).padStart(2, "0");
    const day = String(parsedDate.getDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;

    const navigate = useNavigate();
    return (
        <div>
            <div className="bg-[#ff6400] p-2 overflow-x-scroll">
                <nav className="text-white flex justify-between items-center font-bold p-2 gap-2">
                    <p className="cursor-none text-sm text-slate-100">
                        beta release v1.0
                    </p>
                    <Reveal color="white">
                        <SignedOut>
                            <SignInButton className="hover:cursor-pointer" />
                        </SignedOut>
                        <SignedIn>
                            <button
                                onClick={() => navigate(`/${formattedDate}`)}
                                className="hover:cursor-pointer text-xl hover:text-slate-200 font-bold"
                            >
                                get started.
                            </button>
                        </SignedIn>
                    </Reveal>
                </nav>
            </div>
            {/*HERO BANNER*/}
            <div className="flex items-center justify-center w-screen h-[80vh] lg:h-[50vh] bg-[#ff6400] ">
                <div className="flex flex-col items-center text-white m-auto">
                    <Reveal color="white">
                        <h1 className="text-8xl font-[NeueBit]"> worklog(s).</h1>
                    </Reveal>
                    <Reveal color="white">
                        <h1 className="text-xl font-bold">
                            {" "}
                            simple. minimal. organized - focused digital workspace for
                            personal productivity.
                        </h1>
                    </Reveal>
                    {/* <h1 className='text-xl m-auto'> Simple. Minimal. Organized</h1> */}
                </div>
            </div>
            <div className="flex items-center justify-center bg-[#ff6400] px-10 h-auto">
                <img
                    src="src/assets/images/worlog(s)-banner-image.png"
                    alt=""
                    className="w-screen h-2/3 object-fill rounded-t-2xl"
                />
            </div>
        </div>
    );
};
