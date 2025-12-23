import React from 'react';
import EmailSidebar from '../components/EmailSidebar';
import EmailList from '../components/EmailList';

const Email: React.FC = () => {
  return (
    <div className="flex h-full bg-gray-50 p-2 md:p-4">
      {/* Email Sidebar - hidden on mobile */}
      <div className="hidden lg:block">
        <EmailSidebar />
      </div>

      {/* Main Email Content */}
      <div className="flex-1 lg:ml-4">
        <EmailList />
      </div>
    </div>
  );
};

export default Email;