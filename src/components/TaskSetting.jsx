import React from "react";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";

export const TaskSetting = ({ handleDelete, handleView, handleUpdate, id }) => {
    return (
        <Popover className="relative">
            {({ close }) => (
                <>
                    <PopoverButton className="font-semibold text-[var(--worklog-brand-green)] hover:text-[var(--worklog-text-light)] hover:cursor-pointer">
                        ...
                    </PopoverButton>
                    <PopoverPanel
                        anchor="bottom"
                        className="flex flex-col bg-[var(--worklog-text-dark)]/90 backdrop-blur-sm rounded-lg border border-[var(--worklog-text-medium)]/30 shadow-lg z-50 min-w-[120px]"
                    >
                        <a
                            onClick={() => {
                                handleView(id);
                                close();
                            }}
                            className="px-3 py-2 text-sm text-[var(--worklog-text-light)] hover:bg-[var(--worklog-card-hover)] hover:text-[var(--worklog-brand-green)] hover:cursor-pointer transition-colors duration-200 first:rounded-t-lg"
                        >
                            View
                        </a>
                        <a
                            onClick={() => {
                                handleUpdate(id);
                                close();
                            }}
                            className="px-3 py-2 text-sm text-[var(--worklog-text-light)] hover:bg-[var(--worklog-card-hover)] hover:text-[var(--worklog-brand-green)] hover:cursor-pointer transition-colors duration-200"
                        >
                            Edit
                        </a>
                        <a
                            onClick={() => handleDelete(id)}
                            className="px-3 py-2 text-sm text-[var(--worklog-text-light)] hover:bg-[var(--worklog-card-hover)] hover:text-red-500 hover:cursor-pointer transition-colors duration-200 last:rounded-b-lg"
                        >
                            Delete
                        </a>
                    </PopoverPanel>
                </>
            )}
        </Popover>
    );
};
