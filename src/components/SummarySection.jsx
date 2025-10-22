import React from 'react';
import { Reveal } from '../util/Reveal';

export const SummarySection = ({ selectedMonth, onMonthChange }) => {
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const goToPreviousMonth = () => {
    const newDate = new Date(selectedMonth.getFullYear(), selectedMonth.getMonth() - 1, 1);
    onMonthChange(newDate);
  };

  const goToNextMonth = () => {
    const newDate = new Date(selectedMonth.getFullYear(), selectedMonth.getMonth() + 1, 1);
    onMonthChange(newDate);
  };

  const getWeeksInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    
    const weeks = [];
    let currentWeek = 1;
    let currentDate = 1;
    
    while (currentDate <= daysInMonth) {
      const weekStart = new Date(year, month, currentDate);
      const weekEnd = new Date(year, month, Math.min(currentDate + 6, daysInMonth));
      
      weeks.push({
        weekNumber: currentWeek,
        startDate: weekStart,
        endDate: weekEnd,
        startDay: currentDate,
        endDay: Math.min(currentDate + 6, daysInMonth)
      });
      
      currentDate += 7;
      currentWeek++;
    }
    
    return weeks;
  };

  const weeks = getWeeksInMonth(selectedMonth);

  return (
    <section className="mb-16">
      <Reveal>
        <h2 className="text-2xl font-[NeueBit] text-[var(--worklog-brand-green)] mb-6">
          Monthly Summary
        </h2>
      </Reveal>
      
      <div className="bg-[var(--worklog-dark-bg)] rounded-xl p-8 border border-[var(--worklog-text-medium)]/20">
        {/* Month Navigation */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={goToPreviousMonth}
            className="text-2xl text-[var(--worklog-text-light)] hover:text-[var(--worklog-brand-green)] hover:cursor-pointer transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
              />
            </svg>
          </button>
          
          <Reveal>
            <h3 className="text-xl font-bold text-[var(--worklog-text-light)]">
              {monthNames[selectedMonth.getMonth()]} {selectedMonth.getFullYear()}
            </h3>
          </Reveal>
          
          <button
            onClick={goToNextMonth}
            className="text-2xl text-[var(--worklog-text-light)] hover:text-[var(--worklog-brand-green)] hover:cursor-pointer transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
              />
            </svg>
          </button>
        </div>

        {/* Weekly Summaries */}
        <div className="space-y-6">
          {weeks.map((week, index) => (
            <div key={index} className="border border-[var(--worklog-text-medium)]/30 rounded-lg p-6">
              <div className="flex gap-8 items-start">
                <div className="w-1/3">
                  <h4 className="text-lg font-bold text-[var(--worklog-brand-green)] mb-2">
                    Week {week.weekNumber}
                  </h4>
                  <div className="text-sm text-[var(--worklog-text-light)]">
                    {week.startDay} - {week.endDay} ({week.startDate.toLocaleDateString()} - {week.endDate.toLocaleDateString()})
                  </div>
                </div>
                <div className="w-2/3">
                  <div className="bg-[var(--worklog-dark-bg)] rounded-lg p-4 border border-[var(--worklog-text-medium)]/20">
                    <div className="text-[var(--worklog-text-light)] italic">
                      <p className="mb-2">🤖 AI Summary will appear here...</p>
                      <p className="text-sm">
                        This section will analyze your notes, tasks, and schedule for this week 
                        to provide an automated summary of your activities and achievements.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
