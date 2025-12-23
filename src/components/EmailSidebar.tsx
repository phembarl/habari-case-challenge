import React from 'react';
import { GoTag } from 'react-icons/go';
import {
  MdEdit,
  MdInbox,
  MdStar,
  MdSend,
  MdReportProblem,
  MdDrafts,
  MdDelete,
} from 'react-icons/md';

interface EmailSidebarProps {
  className?: string;
}

const EmailSidebar: React.FC<EmailSidebarProps> = ({ className = '' }) => {

  const folders = [
    { name: 'Inbox', icon: MdInbox, count: 24, active: true },
    { name: 'Starred', icon: MdStar, count: 0, active: false },
    { name: 'Sent', icon: MdSend, count: 0, active: false },
    { name: 'Important', icon: MdReportProblem, count: 0, active: false },
    { name: 'Drafts', icon: MdDrafts, count: 30, active: false },
    { name: 'Trash', icon: MdDelete, count: 0, active: false },
  ];

  const labels = [
    { name: 'Work' },
    { name: 'Family' },
    { name: 'Friends' },
    { name: 'Office' },
  ];

  return (
    <div
      className={`w-64 bg-white border-r border-gray-200 h-full flex flex-col ${className}`}
    >
      {/* User Profile Section */}
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h3 className="font-medium text-gray-900">Ari budin</h3>
            <p className="text-sm text-gray-500">Web developer</p>
          </div>
        </div>

        {/* Compose Button */}
        <button className="w-full bg-green-500 hover:bg-green-600 text-white py-2.5 px-4 rounded-lg flex items-center justify-center space-x-2 transition-colors">
          <MdEdit className="w-4 h-4" />
          <span className="font-medium">Compose</span>
        </button>
      </div>

      {/* Folders Section */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-3">
          <nav className="space-y-1">
            {folders.map((folder, index) => (
              <a
                key={index}
                href="#"
                className={`flex items-center justify-between px-3 py-2.5 text-sm rounded-lg transition-colors ${
                  folder.active
                    ? 'bg-gray-100 text-gray-900 font-medium'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <folder.icon className="w-5 h-5" />
                  <span>{folder.name}</span>
                </div>
                {folder.count > 0 && (
                  <span className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full min-w-[24px] text-center">
                    {folder.count}
                  </span>
                )}
              </a>
            ))}
          </nav>
        </div>

        {/* Labels Section */}
        <div className="px-3 py-2">
          <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">
            Labels
          </h4>
          <nav className="space-y-1">
            {labels.map((label, index) => (
              <a
                key={index}
                href="#"
                className="flex items-center space-x-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <GoTag className="w-4 h-4" />
                <span>{label.name}</span>
              </a>
            ))}
          </nav>
        </div>
      </div>

    </div>
  );
};

export default EmailSidebar;
