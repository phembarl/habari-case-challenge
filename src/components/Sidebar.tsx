import React, { useState, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { navigationItems } from '../utils';
import { RxCaretDown, RxCaretUp } from 'react-icons/rx';
import { MdLogout } from 'react-icons/md';
import { useAuth } from '../hooks/useAuth';
import { useLogout } from '../queriesandmutations/auth';

interface SidebarProps {
  className?: string;
  onClose?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ className = '', onClose }) => {
  const [expandedItems, setExpandedItems] = useState<Record<number, boolean>>(
    () => {
      // Initialize with default expanded state from navigationItems
      const initial: Record<number, boolean> = {};
      navigationItems.forEach((item, index) => {
        if (item.isExpanded) {
          initial[index] = true;
        }
      });
      return initial;
    }
  );

  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();
  const logoutMutation = useLogout();

  const handleLogout = async () => {
    try {
      await logoutMutation.mutateAsync();
      logout();
      window.location.href = '/login';
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // Derive navigation items with active states based on current route
  const navItems = useMemo(() => {
    return navigationItems.map((item, index) => {
      if (item.route && location.pathname === item.route) {
        return {
          ...item,
          active: true,
          isExpanded: expandedItems[index] || false,
        };
      }

      if (item.submenu) {
        const activeSubmenuIndex = item.submenu.findIndex(
          subItem => location.pathname === subItem.route
        );

        return {
          ...item,
          active: false,
          isExpanded: expandedItems[index] || false,
          submenu: item.submenu.map((subItem, i) => ({
            ...subItem,
            active: i === activeSubmenuIndex,
          })),
        };
      }

      return {
        ...item,
        active: false,
        isExpanded: expandedItems[index] || false,
      };
    });
  }, [location.pathname, expandedItems]);

  const toggleDropdown = (index: number) => {
    setExpandedItems(prev => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const handleItemClick = (index: number) => {
    const item = navItems[index];

    if (item.hasDropdown) {
      toggleDropdown(index);
    } else if (item.route) {
      // Navigate to the route
      navigate(item.route);
      // Close sidebar on mobile after navigation
      onClose?.();
    }
  };

  const handleSubmenuClick = (parentIndex: number, submenuIndex: number) => {
    const parentItem = navItems[parentIndex];
    if (parentItem.submenu) {
      const submenuItem = parentItem.submenu[submenuIndex];
      navigate(submenuItem.route);
      // Close sidebar on mobile after navigation
      onClose?.();
    }
  };
  return (
    <div
      className={`bg-gray-50 border-r border-gray-200 h-screen overflow-y-auto flex flex-col ${className}`}
    >
      {/* Logo/Brand Section */}
      <div className="p-4 pb-3">
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 bg-green-500 rounded flex items-center justify-center">
            <span className="text-white font-bold text-xs">B</span>
          </div>
          <span className="text-lg font-semibold text-gray-800">rutalism</span>
        </div>
      </div>

      {/* Navigation Section */}
      <div className="flex-1 py-2">
        <nav className="space-y-1 px-3">
          <ul>
            {navItems.map((item, index) => (
              <li key={`${item.name}-${index}`}>
                <button
                  onClick={() => handleItemClick(index)}
                  className={`w-full flex items-center justify-between cursor-pointer px-3 py-2.5 text-sm font-medium transition-colors rounded ${
                    item.active
                      ? 'bg-white text-gray-900 shadow-sm border border-gray-200'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <span className="flex items-center">
                    <item.icon className="mr-3 w-4 h-4 text-gray-600" />
                    {item.name}
                  </span>
                  {item.hasDropdown &&
                    (item.isExpanded ? <RxCaretUp /> : <RxCaretDown />)}
                </button>

                {/* Submenu */}
                {item.submenu && item.isExpanded && (
                  <ul className="mt-1 ml-7 space-y-1">
                    {item.submenu.map((subItem, subIndex) => (
                      <li key={`${subItem.name}-${subIndex}`}>
                        <button
                          onClick={() => handleSubmenuClick(index, subIndex)}
                          className={`w-full text-left px-3 py-2 text-sm transition-colors rounded ${
                            subItem.active
                              ? 'bg-white text-gray-900 border border-gray-300 shadow-sm'
                              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                          }`}
                        >
                          {subItem.name}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Logout Button */}
      <div className="px-5 pb-3">
        <button
          onClick={handleLogout}
          disabled={logoutMutation.isPending}
          className="w-full flex items-center space-x-3 px-3 py-2.5 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <MdLogout className="w-5 h-5" />
          <span>{logoutMutation.isPending ? 'Logging out...' : 'Logout'}</span>
        </button>
      </div>

      {/* Upgrade Section */}
      <div className="p-3 mx-3 mb-4 bg-white rounded-lg shadow-sm">
        <div className="text-center">
          <h3 className="text-sm font-semibold text-gray-900 mb-1">
            Upgrade to Pro
          </h3>
          <p className="text-xs text-gray-600 mb-3 leading-relaxed">
            Are you looking for more components? Check out our premium version.
          </p>
          <button className="w-full bg-green-500 hover:bg-green-600 text-white text-xs font-medium py-2.5 px-4 rounded-md transition-colors">
            Upgrade Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
