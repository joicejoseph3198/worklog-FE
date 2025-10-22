import React from 'react';
import { SummarySection } from '../../components/SummarySection';
import { useOutletContext } from 'react-router';

export const SummaryPage = () => {
  const { selectedMonth, onMonthChange } = useOutletContext();

  return (
    <SummarySection 
      selectedMonth={selectedMonth}
      onMonthChange={onMonthChange}
    />
  );
};
