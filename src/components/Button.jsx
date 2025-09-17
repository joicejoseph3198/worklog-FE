import React from 'react'

export const Button = (props) => {
    const { color, buttonText, onClickHandler, mouseEnterHandler, mouseExitHandler } = props;
    const buttonVariants = {
        blue: 'bg-blue-600 hover:bg-blue-500 text-white',
        gray: 'bg-[var(--worklog-text-medium)] hover:bg-[var(--worklog-text-dark)] text-white border-[var(--worklog-text-medium)] border-1',
        white: 'bg-[var(--worklog-brand-green)] hover:bg-[var(--worklog-text-dark)] text-black hover:text-[var(--worklog-brand-green)] border-[var(--worklog-text-medium)]/30 border-1',
    }
    return (
        <button onClick={onClickHandler} onMouseEnter={mouseEnterHandler} onMouseLeave={mouseExitHandler}
            className={`${buttonVariants[color]} flex flex-row items-center justify-center px-4 font-['Mori'] font-bold rounded-full text-sm lg:text-md py-5 h-[38px] -mr-3`}>
            {buttonText}
        </button>
    )
}
