import React, { useState } from 'react';
import EmailSidebar from '../components/EmailSidebar';
import EmailList, { type EmailFilterState } from '../components/EmailList';

const Email: React.FC = () => {
  const [activeFolder, setActiveFolder] = useState('Inbox');
  const [emailFilters, setEmailFilters] = useState<EmailFilterState>({ folder: 'inbox' });

  const handleFolderChange = (folderName: string, filters: EmailFilterState) => {
    setActiveFolder(folderName);
    setEmailFilters(filters);
  };

  const handleLabelChange = (labelName: string) => {
    setActiveFolder(`Label: ${labelName}`);
    setEmailFilters({ labels: [labelName] });
  };

  return (
    <div className="flex h-full bg-gray-50 p-2 md:p-4">
      {/* Email Sidebar - hidden on mobile */}
      <div className="hidden lg:block">
        <EmailSidebar
          activeFolder={activeFolder}
          onFolderChange={handleFolderChange}
          onLabelChange={handleLabelChange}
        />
      </div>

      {/* Main Email Content */}
      <div className="flex-1 lg:ml-4">
        <EmailList filters={emailFilters} title={activeFolder} />
      </div>
    </div>
  );
};

export default Email;