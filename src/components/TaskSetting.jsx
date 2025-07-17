import React from "react";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";

export const TaskSetting = ({ handleDelete, handleView, handleUpdate, id }) => {
    return (
        <Popover className="relative">
            {({ close }) => (
                <>
                    <PopoverButton className="font-[NueuBit] text-black hover:cursor-pointer">
                        ...
                    </PopoverButton>
                    <PopoverPanel
                        anchor="bottom"
                        className="flex flex-col bg-gray-50 rounded-sm border-1 border-slate-400"
                    >
                        <a
                            onClick={() => {
                                handleView(id);
                                close();
                            }}
                            className="p-1 hover:bg-[#ff5400] hover:cursor-pointer"
                        >
                            View
                        </a>
                        <a
                            onClick={() => {
                                handleUpdate(id);
                                close();
                            }}
                            className="p-1 hover:bg-[#ff5400] hover:cursor-pointer">Edit</a>
                        <a
                            onClick={() => handleDelete(id)}
                            className="p-1 hover:bg-[#ff5400] hover:cursor-pointer"
                        >
                            Delete
                        </a>
                    </PopoverPanel>
                </>
            )}
        </Popover>
    );
};
