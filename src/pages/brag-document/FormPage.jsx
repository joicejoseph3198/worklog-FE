import React from 'react';
import { BragFormSection } from '../../components/BragFormSection';
import { useOutletContext } from 'react-router';

export const FormPage = () => {
  const { selectedMonth, onMonthChange, bragData, onQuestionChange, onSave } = useOutletContext();

  return (
    <BragFormSection 
      selectedMonth={selectedMonth}
      onMonthChange={onMonthChange}
      onSave={onSave}
      bragData={bragData}
      onQuestionChange={onQuestionChange}
    />
  );
};
