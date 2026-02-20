import React from 'react';

interface LoadingSpinnerProps {
    size?: 'sm' | 'md' | 'lg';
    color?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ size = 'md', color = 'border-primary' }) => {
    const sizeClasses = {
        sm: 'w-4 h-4 border-2',
        md: 'w-8 h-8 border-3',
        lg: 'w-12 h-12 border-4',
    };

    return (
        <div className={`flex justify-center items-center`}>
            <div
                className={`${sizeClasses[size]} animate-spin rounded-full border-t-transparent ${color} border-white/20`}
                role="status"
                aria-label="loading"
            >
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    );
};

export default LoadingSpinner;
