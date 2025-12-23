import React from 'react';
import AnalyticsCard from '../components/AnalyticsCard';
import LineChart from '../components/charts/LineChart';
import BarChart from '../components/charts/BarChart';
import ProgressBar from '../components/charts/ProgressBar';
import {
  MdAttachMoney,
  MdPeople,
  MdTrendingUp,
  MdShoppingCart,
} from 'react-icons/md';
import {
  FaFacebook,
  FaTwitter,
  FaGoogle,
  FaTiktok,
  FaApple,
} from 'react-icons/fa';

const Marketing: React.FC = () => {
  // Sample data for charts
  const acquisitionData = {
    labels: [
      'March 1',
      'March 2',
      'March 3',
      'March 4',
      'March 5',
      'March 6',
      'March 7',
    ],
    datasets: [
      {
        label: 'Acquisition',
        data: [200, 180, 320, 280, 450, 380, 500],
        borderColor: '#3B82F6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
      },
      {
        label: 'Cost',
        data: [300, 250, 350, 320, 480, 420, 450],
        borderColor: '#10B981',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        tension: 0.4,
      },
    ],
  };

  const trafficSourceData = {
    labels: [
      'March 1',
      'March 2',
      'March 3',
      'March 4',
      'March 5',
      'March 6',
      'March 7',
    ],
    datasets: [
      {
        data: [160, 120, 140, 180, 160, 150, 140],
        backgroundColor: [
          '#22C55E',
          '#16A34A',
          '#15803D',
          '#166534',
          '#14532D',
          '#052E16',
          '#064E3B',
        ],
      },
    ],
  };

  const budgetData = [
    {
      icon: <FaFacebook className="w-5 h-5 text-blue-600" />,
      label: 'Facebook',
      value: 'Remaining: $12,345',
      percentage: 60,
      color: '#22C55E',
    },
    {
      icon: <FaTwitter className="w-5 h-5 text-blue-400" />,
      label: 'Twitter',
      value: 'Remaining: $1,543',
      percentage: 86,
      color: '#22C55E',
    },
    {
      icon: <FaGoogle className="w-5 h-5 text-red-500" />,
      label: 'Google',
      value: 'Remaining: $5,678',
      percentage: 67,
      color: '#22C55E',
    },
    {
      icon: <FaTiktok className="w-5 h-5 text-black" />,
      label: 'TikTok',
      value: 'Remaining: $3,456',
      percentage: 21,
      color: '#EF4444',
    },
    {
      icon: <FaApple className="w-5 h-5 text-gray-700" />,
      label: 'Apple',
      value: 'Remaining: $2,098',
      percentage: 35,
      color: '#F59E0B',
    },
  ];

  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-4 md:space-y-6">
      {/* Header with time filter */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-xl md:text-2xl font-bold text-gray-900">Marketing</h1>
        <div className="flex space-x-2 overflow-x-auto">
          <button className="px-3 md:px-4 py-2 text-xs md:text-sm bg-green-100 text-green-700 rounded-lg font-medium whitespace-nowrap">
            7 Days
          </button>
          <button className="px-3 md:px-4 py-2 text-xs md:text-sm text-gray-600 hover:bg-gray-100 rounded-lg whitespace-nowrap">
            14 Days
          </button>
          <button className="px-3 md:px-4 py-2 text-xs md:text-sm text-gray-600 hover:bg-gray-100 rounded-lg whitespace-nowrap">
            1 Month
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row w-full gap-4 lg:gap-6">
        {/* Top row - 4 analytics cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:w-[55%]">
          <AnalyticsCard
            title="Total Spend"
            value="$8,765"
            previousValue="$6,234"
            progress="Progress +18.32%"
            progressType="positive"
            icon={<MdAttachMoney className="w-5 h-5 text-green-600" />}
          />
          <AnalyticsCard
            title="Visitor"
            value="14,321"
            previousValue="12,643"
            progress="Progress +8.23%"
            progressType="positive"
            icon={<MdPeople className="w-5 h-5 text-green-600" />}
          />
          <AnalyticsCard
            title="Acquisition"
            value="1,023"
            previousValue="876"
            progress="Progress +16.73%"
            progressType="positive"
            icon={<MdTrendingUp className="w-5 h-5 text-green-600" />}
          />
          <AnalyticsCard
            title="Revenue"
            value="$18,765"
            previousValue="$15,432"
            progress="Progress +21.67%"
            progressType="positive"
            icon={<MdShoppingCart className="w-5 h-5 text-green-600" />}
          />
        </div>

        {/* Acquisition vs Cost Chart */}
        <div className="bg-white rounded-lg border border-gray-200 p-4 md:p-6 flex-grow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-600">
              Acquisition vs Cost
            </h3>
            <div className="text-xs text-gray-400">600K</div>
          </div>
          <div className="h-64 md:h-80">
            <LineChart data={acquisitionData} />
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
        {/* Bottom row - Traffic Source chart */}
        <div className="bg-white rounded-lg border border-gray-200 p-4 md:p-6 lg:w-[55%]">
          <h3 className="text-sm font-medium text-gray-600 mb-4">
            Traffic Source
          </h3>
          <div className="h-64 md:h-80">
            <BarChart data={trafficSourceData} />
          </div>
        </div>

        {/* Budget by Platform */}
        <ProgressBar
          title="Budget by Platform"
          items={budgetData}
          className="flex-grow"
        />
      </div>
    </div>
  );
};

export default Marketing;
