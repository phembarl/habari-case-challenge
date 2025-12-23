import React from 'react';

interface AnalyticsCardProps {
  title: string;
  value: string;
  previousValue: string;
  progress: string;
  progressType: 'positive' | 'negative';
  icon?: React.ReactNode;
  className?: string;
}

const AnalyticsCard: React.FC<AnalyticsCardProps> = ({
  title,
  value,
  previousValue,
  progress,
  progressType,
  icon,
  className = ''
}) => {
  return (
    <div className={`bg-white rounded-lg border border-gray-200 p-4 md:p-6 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-gray-600">{title}</h3>
        {icon && (
          <div className="p-2 rounded-lg bg-gray-50">
            {icon}
          </div>
        )}
      </div>

      <div className="mb-4">
        <div className="text-xl md:text-2xl font-bold text-gray-900 mb-1">{value}</div>
      </div>

      <div className="flex items-center justify-between text-xs">
        <div className="text-gray-500">
          <span>Previous</span>
          <br />
          <span>{previousValue}</span>
        </div>
        <div className={`flex items-center ${
          progressType === 'positive' ? 'text-green-600' : 'text-red-600'
        }`}>
          <span className="font-medium text-xs md:text-sm">{progress}</span>
          {progressType === 'positive' ? (
            <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsCard;