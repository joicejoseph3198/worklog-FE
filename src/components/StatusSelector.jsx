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

    const getStatusColor = (status) => {
        switch (status) {
            case 'not-started': return 'text-[var(--worklog-text-medium)]';
            case 'initiated': return 'text-purple-500';
            case 'in-progress': return 'text-blue-500';
            case 'blocked': return 'text-red-500';
            case 'done': return 'text-green-500';
            case 'rollover': return 'text-orange-500';
            default: return 'text-[var(--worklog-text-medium)]';
        }
    };

    return (
        <div className={`relative ${className}`}>
            <span className={`px-4 py-1 text-sm font-semibold whitespace-nowrap ${getStatusColor(value)}`}>
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
    
    const getStatusColor = (status) => {
        switch (status) {
            case 'not-started': return 'text-[var(--worklog-text-medium)]';
            case 'initiated': return 'text-purple-500';
            case 'in-progress': return 'text-blue-500';
            case 'blocked': return 'text-red-500';
            case 'done': return 'text-green-500';
            case 'rollover': return 'text-orange-500';
            default: return 'text-[var(--worklog-text-medium)]';
        }
    };

    const sizeClasses = {
        sm: 'text-xs',
        md: 'text-sm',
        lg: 'text-base'
    };

    return (
        <div className="flex items-center gap-2">
            <span className={`${sizeClasses[size]} font-semibold ${getStatusColor(status)}`}>
                {statusOption.label}
            </span>
        </div>
    );
}; 