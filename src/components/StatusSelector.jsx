import React from 'react';

const STATUS_OPTIONS = [
    { value: 'not-started', label: 'Not Started', color: 'bg-gray-500' },
    { value: 'initiated', label: 'Initiated', color: 'bg-purple-500' },
    { value: 'in-progress', label: 'In Progress', color: 'bg-blue-500' },
    { value: 'blocked', label: 'Blocked', color: 'bg-red-500' },
    { value: 'done', label: 'Done', color: 'bg-green-500' },
    { value: 'rollover', label: 'Rollover', color: 'bg-orange-500' },
];

export const StatusSelector = ({ 
    value, 
    onChange, 
    className = '', 
    size = 'md',
    showLabel = true 
}) => {
    const selectedStatus = STATUS_OPTIONS.find(option => option.value === value);

    return (
        <div className={`relative ${className}`}>
            <span className={`px-2 py-1 rounded-full border text-sm font-bold whitespace-nowrap text-white ${selectedStatus?.color || 'bg-gray-500'} border-${selectedStatus?.color?.replace('bg-', '') || 'gray-500'}`}>
                {selectedStatus?.label || 'Not Started'}
            </span>
            
            <select
                value={value || 'not-started'}
                onChange={(e) => onChange(e.target.value)}
                className="absolute inset-0 opacity-0 cursor-pointer"
            >
                {STATUS_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export const StatusIndicator = ({ status, size = 'md', showLabel = false }) => {
    const statusOption = STATUS_OPTIONS.find(option => option.value === status) || STATUS_OPTIONS[0];
    
    const sizeClasses = {
        sm: 'w-2 h-2',
        md: 'w-3 h-3',
        lg: 'w-4 h-4'
    };

    return (
        <div className="flex items-center gap-2">
            <div className={`${sizeClasses[size]} rounded-full ${statusOption.color}`}></div>
            {showLabel && (
                <span className="text-xs text-gray-600">{statusOption.label}</span>
            )}
        </div>
    );
}; 