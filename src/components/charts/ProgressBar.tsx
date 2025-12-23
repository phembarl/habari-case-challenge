import React from 'react';

interface ProgressBarItem {
  icon: React.ReactNode;
  label: string;
  value: string;
  percentage: number;
  color: string;
}

interface ProgressBarProps {
  title: string;
  items: ProgressBarItem[];
  className?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ title, items, className = '' }) => {
  return (
    <div className={`bg-white rounded-lg border border-gray-200 p-6 ${className}`}>
      <h3 className="text-sm font-medium text-gray-600 mb-4">{title}</h3>

      <div className="space-y-4">
        {items.map((item, index) => (
          <div key={index} className="flex items-center space-x-3">
            <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center">
              {item.icon}
            </div>

            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-gray-700">{item.label}</span>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-gray-900">{item.value}</span>
                  <span className="text-sm text-gray-500">{item.percentage}%</span>
                </div>
              </div>

              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="h-2 rounded-full transition-all duration-300"
                  style={{
                    width: `${item.percentage}%`,
                    backgroundColor: item.color,
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressBar;