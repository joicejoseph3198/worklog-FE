import React from "react";

export const InputTextField = (props) => {
  const {
    title,
    placeholder,
    onClickHandler,
    onChangeHandler,
    valueStore,
    name,
    maxLength,
  } = props;
  return (
    <div className="pb-2 w-full text-sm">
      <h3 className="pb-2 text-2xl font-[NeueBit]">{title}</h3>
      <input
        type="text"
        placeholder={placeholder}
        value={valueStore}
        name={name}
        onChange={onChangeHandler}
        maxLength={maxLength}
        className="bg-transparent text-slate-600 w-full focus:outline-none px-6 py-2 text-sm font-semibold border-slate-700 border-2 rounded-md"
      />
    </div>
  );
};
