import React from 'react'

export const Button = (props) => {
    const { color, buttonText, onClickHandler, mouseEnterHandler, mouseExitHandler } = props;
    const buttonVariants = {
        blue: 'bg-blue-600 hover:bg-blue-500 text-white',
        gray: 'bg-gray-600 hover:bg-gray-600/70 text-white border-gray',
        white: 'bg-[#ff4500] hover:bg-[#ff4500]/70 text-white border-[#ff4500]',
    }
    return (
        <button onClick={onClickHandler} onMouseEnter={mouseEnterHandler} onMouseLeave={mouseExitHandler}
            className={`${buttonVariants[color]} flex flex-row items-center justify-center px-4 font-['Mori'] font-bold rounded-full text-sm lg:text-md py-5 h-[38px] -mr-3 border-2`}>
            {buttonText}
        </button>
    )
}
