import React from 'react';
import { MdStar, MdStarBorder, MdAttachment } from 'react-icons/md';

interface EmailItemProps {
  id: string;
  sender: string;
  subject: string;
  preview: string;
  time: string;
  isStarred: boolean;
  isRead: boolean;
  hasAttachment?: boolean;
  isSelected?: boolean;
  onClick?: () => void;
  onStarClick?: () => void;
  onSelectClick?: () => void;
}

const EmailItem: React.FC<EmailItemProps> = ({
  sender,
  subject,
  preview,
  time,
  isStarred,
  isRead,
  hasAttachment = false,
  isSelected = false,
  onClick,
  onStarClick,
  onSelectClick,
}) => {
  return (
    <div
      className={`flex items-start space-x-3 px-3 md:px-4 py-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors ${
        isSelected ? 'bg-blue-50' : ''
      } ${!isRead ? 'bg-white font-medium' : 'bg-gray-50'}`}
      onClick={onClick}
    >
      {/* Controls (Checkbox & Star) */}
      <div className="flex items-center space-x-2 flex-shrink-0">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={onSelectClick}
          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          onClick={(e) => e.stopPropagation()}
        />
        <button
          onClick={(e) => {
            e.stopPropagation();
            onStarClick?.();
          }}
          className="p-1 rounded hover:bg-gray-200 transition-colors"
        >
          {isStarred ? (
            <MdStar className="w-4 h-4 md:w-5 md:h-5 text-yellow-400" />
          ) : (
            <MdStarBorder className="w-4 h-4 md:w-5 md:h-5 text-gray-400 hover:text-yellow-400" />
          )}
        </button>
      </div>

      {/* Email Content */}
      <div className="flex-1 min-w-0">
        {/* Desktop Layout */}
        <div className="hidden md:block">
          <div className="flex items-center justify-between">
            <h3 className={`text-sm truncate ${!isRead ? 'font-semibold text-gray-900' : 'font-normal text-gray-700'}`}>
              {sender}
            </h3>
            <div className="flex items-center space-x-2 flex-shrink-0 ml-4">
              {hasAttachment && (
                <MdAttachment className="w-4 h-4 text-gray-400" />
              )}
              <span className="text-xs text-gray-500">{time}</span>
            </div>
          </div>
          <p className={`text-sm truncate ${!isRead ? 'font-medium text-gray-900' : 'text-gray-600'}`}>
            {subject}
          </p>
          <p className="text-sm text-gray-500 truncate mt-1">
            {preview}
          </p>
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden">
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0">
              <h3 className={`text-sm truncate ${!isRead ? 'font-semibold text-gray-900' : 'font-normal text-gray-700'}`}>
                {sender}
              </h3>
              <p className={`text-sm truncate ${!isRead ? 'font-medium text-gray-900' : 'text-gray-600'} mt-1`}>
                {subject}
              </p>
              <p className="text-xs text-gray-500 truncate mt-1">
                {preview}
              </p>
            </div>
            <div className="flex items-center space-x-1 flex-shrink-0 ml-2">
              {hasAttachment && (
                <MdAttachment className="w-3 h-3 text-gray-400" />
              )}
              <span className="text-xs text-gray-500">{time}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailItem;