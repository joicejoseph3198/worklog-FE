import { UserButton, useUser } from '@clerk/clerk-react';
import React from 'react'
import { Reveal } from '../util/Reveal';

export const Header = () => {
    const { user } = useUser();
    return (
        <div className="flex gap-10 max-w-screen w-screen justify-between">
            <Reveal>
                <div className="p-4 text-5xl font-[NeueBit]">Worklog(s).</div>
            </Reveal>
            <div className="p-6 flex items-center font-bold gap-2">
                Hello, {user?.firstName} <UserButton />
            </div>
        </div>
    )
}
