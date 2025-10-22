import React, { useState } from 'react';

export const QuestionAnswer = ({ question, placeholder, value = '', onChange }) => {
  const [answer, setAnswer] = useState(value);
  const [isEditing, setIsEditing] = useState(false);

  const handleAnswerChange = (e) => {
    const newValue = e.target.value;
    setAnswer(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  const handleFocus = () => {
    setIsEditing(true);
  };

  const handleBlur = () => {
    setIsEditing(false);
  };

  return (
    <div className="flex gap-8 items-start">
      <div className="w-1/3">
        <h4 className="text-lg font-bold text-[var(--worklog-text-light)]">
          {question}
        </h4>
      </div>
      
      <div className="w-2/3">
        <div className="relative">
          <textarea
            value={answer}
            onChange={handleAnswerChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder={placeholder}
            className={`
              w-full p-4 rounded-lg border-2 transition-all duration-200 resize-none
              bg-[var(--worklog-dark-bg)] text-[var(--worklog-text-light)]
              placeholder-[var(--worklog-text-medium)]
              ${isEditing 
                ? 'border-[var(--worklog-brand-green)] focus:outline-none focus:ring-2 focus:ring-[var(--worklog-brand-green)]/20' 
                : 'border-[var(--worklog-text-medium)]/30 hover:border-[var(--worklog-text-medium)]/50'
              }
            `}
            rows={4}
          />
          
          {/* Character count indicator */}
          <div className="absolute bottom-2 right-2 text-xs text-[var(--worklog-text-medium)]">
            {answer.length} characters
          </div>
        </div>
        
        {/* Status indicator */}
        {answer.trim() && (
          <div className="flex items-center gap-2 text-xs text-[var(--worklog-brand-green)] mt-2">
            <svg 
              className="w-3 h-3" 
              fill="currentColor" 
              viewBox="0 0 20 20"
            >
              <path 
                fillRule="evenodd" 
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" 
                clipRule="evenodd" 
              />
            </svg>
            Ready to save
          </div>
        )}
      </div>
    </div>
  );
};
