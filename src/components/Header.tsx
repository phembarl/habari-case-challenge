import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useLogout } from '../queriesandmutations/auth';
import {
  MdSearch,
  MdSettings,
  MdLanguage,
  MdMessage,
  MdNotifications,
  MdAccountCircle,
  MdLogout,
  MdMenu,
} from 'react-icons/md';

interface HeaderProps {
  onToggleSidebar?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onToggleSidebar }) => {
  const { user, logout } = useAuth();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const logoutMutation = useLogout();
  const profileMenuRef = useRef<HTMLDivElement>(null);

  const handleLogout = async () => {
    try {
      await logoutMutation.mutateAsync();
      logout();
      window.location.href = '/login';
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target as Node)
      ) {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  return (
    <header className="bg-white border-b border-gray-200 px-4 lg:px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Mobile menu button */}
        <button
          onClick={onToggleSidebar}
          className="p-2 rounded-md lg:hidden hover:bg-gray-100 transition-colors"
        >
          <MdMenu className="h-6 w-6 text-gray-600" />
        </button>

        {/* Search Section */}
        <div className="flex-1 max-w-lg ml-4 lg:ml-0">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MdSearch className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search..."
              className="w-full max-w-[200px] pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>
        </div>

        {/* Right Icons Section */}
        <div className="flex items-center space-x-2 lg:space-x-3 ml-4 lg:ml-6">
          {/* Settings - Hidden on mobile */}
          <button className="hidden md:block p-2 rounded-full border hover:bg-gray-100 transition-colors">
            <MdSettings className="h-5 w-5 text-gray-600" />
          </button>

          {/* Language - Hidden on mobile */}
          <button className="hidden md:block p-2 rounded-full border hover:bg-gray-100 transition-colors">
            <MdLanguage className="h-5 w-5 text-gray-600" />
          </button>

          {/* Messages */}
          <button className="relative p-2 rounded-full border hover:bg-gray-100 transition-colors">
            <MdMessage className="h-5 w-5 text-gray-600" />
            <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
              3
            </span>
          </button>

          {/* Notifications */}
          <button className="relative p-2 rounded-full border hover:bg-gray-100 transition-colors">
            <MdNotifications className="h-5 w-5 text-gray-600" />
            <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
              5
            </span>
          </button>

          {/* Profile */}
          <div className="relative" ref={profileMenuRef}>
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="p-1 rounded-full hover:bg-gray-100 transition-colors"
            >
              <div className="h-8 w-8 bg-gray-300 rounded-full flex items-center justify-center">
                <MdAccountCircle className="h-6 w-6 text-gray-600" />
              </div>
            </button>

            {/* Profile Dropdown */}
            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                <div className="px-4 py-2 border-b border-gray-100">
                  <p className="text-sm font-medium text-gray-900">
                    {user?.name}
                  </p>
                  <p className="text-xs text-gray-600">{user?.email}</p>
                </div>
                <button
                  onClick={handleLogout}
                  disabled={logoutMutation.isPending}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                >
                  <MdLogout className="h-4 w-4" />
                  <span>
                    {logoutMutation.isPending ? 'Logging out...' : 'Logout'}
                  </span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
