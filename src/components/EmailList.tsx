import React, { useState } from 'react';
import { useDebounce } from 'use-debounce';
import EmailItem from './EmailItem';
import {
  MdRefresh,
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
} from 'react-icons/md';
import { useEmails, useToggleStar } from '../queriesandmutations/email';

export interface EmailFilterState {
  isRead?: boolean;
  isStarred?: boolean;
  isImportant?: boolean;
  labels?: string[];
  hasAttachments?: boolean;
  folder?: string;
}

interface EmailListProps {
  className?: string;
  filters?: EmailFilterState;
  title?: string;
}

const EmailList: React.FC<EmailListProps> = ({
  className = '',
  filters = {},
  title = 'Inbox',
}) => {
  const [selectedEmails, setSelectedEmails] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  // Debounce search query to avoid excessive API calls
  const [debouncedSearchQuery] = useDebounce(searchQuery, 500);

  const {
    data: emailsResponse,
    isLoading,
    isError,
    refetch,
  } = useEmails({
    page: currentPage,
    limit: 15,
    search: debouncedSearchQuery || undefined,
    ...filters,
  });

  const toggleStarMutation = useToggleStar();

  const emails = emailsResponse?.data || [];
  const pagination = emailsResponse?.pagination;

  const handleEmailSelect = (emailId: string) => {
    setSelectedEmails(prev =>
      prev.includes(emailId)
        ? prev.filter(id => id !== emailId)
        : [...prev, emailId]
    );
  };

  const handleStarToggle = (emailId: string) => {
    toggleStarMutation.mutate(emailId);
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

    if (diffInHours < 24) {
      return date.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      });
    } else if (diffInHours < 48) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    if (currentPage !== 1) {
      setCurrentPage(1);
    }
  };


  const handleSelectAll = () => {
    if (selectedEmails.length === emails.length) {
      setSelectedEmails([]);
    } else {
      setSelectedEmails(emails.map(email => email.id));
    }
  };

  if (isError) {
    return (
      <div
        className={`flex-1 bg-white border border-gray-200 rounded-lg ${className}`}
      >
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <p className="text-red-600 mb-4">Failed to load emails</p>
            <button
              onClick={() => refetch()}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`flex-1 bg-white border border-gray-200 rounded-lg ${className}`}
    >
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        {/* Top row */}
        <div className="flex items-center justify-between mb-4 lg:mb-0">
          <div className="flex items-center space-x-4">
            <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={selectedEmails.length === emails.length && emails.length > 0}
                onChange={handleSelectAll}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <button
                onClick={() => refetch()}
                disabled={isLoading}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50"
              >
                <MdRefresh
                  className={`w-5 h-5 text-gray-600 ${
                    isLoading ? 'animate-spin' : ''
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Search - visible on larger screens */}
          <div className="hidden lg:flex items-center space-x-2">
            <input
              type="text"
              placeholder="Search emails..."
              value={searchQuery}
              onChange={e => handleSearchChange(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && e.preventDefault()}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none w-64"
            />
          </div>
        </div>

        {/* Bottom row for mobile/tablet */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          {/* Search - visible on smaller screens */}
          <div className="lg:hidden">
            <input
              type="text"
              placeholder="Search emails..."
              value={searchQuery}
              onChange={e => handleSearchChange(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && e.preventDefault()}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>

          {/* Pagination controls */}
          <div className="flex items-center justify-between lg:justify-end">
            <span className="text-sm text-gray-600">
              {pagination
                ? `${(currentPage - 1) * 15 + 1}-${Math.min(
                    currentPage * 15,
                    pagination.total
                  )} of ${pagination.total}`
                : '0 emails'}
            </span>
            <div className="flex items-center space-x-1 ml-4">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage <= 1}
                className="p-1 rounded hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <MdKeyboardArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={!pagination || currentPage >= pagination.totalPages}
                className="p-1 rounded hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <MdKeyboardArrowRight className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </div>


      {/* Email List */}
      <div className="divide-y divide-gray-100">
        <>
          {isLoading ? (
            <div
              className={`flex-1 bg-white border border-gray-200 rounded-lg ${className}`}
            >
              <div className="flex items-center justify-center h-96">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
            </div>
          ) : (
            <>
              {emails.map(email => (
                <EmailItem
                  key={email.id}
                  id={email.id}
                  sender={email.from}
                  subject={email.subject}
                  preview={
                    email.body.substring(0, 100) +
                    (email.body.length > 100 ? '...' : '')
                  }
                  time={formatTime(email.timestamp)}
                  isStarred={email.isStarred}
                  isRead={email.isRead}
                  hasAttachment={email.hasAttachments}
                  isSelected={selectedEmails.includes(email.id)}
                  onSelectClick={() => handleEmailSelect(email.id)}
                  onStarClick={() => handleStarToggle(email.id)}
                  onClick={() => console.log('Open email:', email.id)}
                />
              ))}
            </>
          )}
        </>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200 text-center">
        <p className="text-sm text-gray-500">Copyright 2025</p>
      </div>
    </div>
  );
};

export default EmailList;
