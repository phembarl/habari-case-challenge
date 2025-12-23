import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <div className="flex-1 flex items-center justify-center p-8">
      <div className="text-center">
        <div className="mb-8">
          <h1 className="text-6xl font-bold text-gray-300 mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Page Not Found</h2>
          <p className="text-gray-600 mb-6">
            This feature is currently under development.
          </p>
        </div>

        <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-8 rounded-lg shadow-lg mb-6">
          <h3 className="text-xl font-semibold mb-2">🚀 Coming Soon!</h3>
          <p className="text-blue-100">
            We're working hard to bring you this amazing feature.
            Stay tuned for updates!
          </p>
        </div>

        <Link
          to="/marketing"
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          ← Back to Marketing
        </Link>
      </div>
    </div>
  );
};

export default NotFound;