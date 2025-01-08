import React from 'react';
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/20/solid';

const DataTable = ({ data, sortConfig, onSort }) => {
  const formatNumber = (number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(number);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getSortIcon = (columnName) => {
    if (sortConfig.key !== columnName) {
      return <ChevronUpIcon className="h-4 w-4 text-gray-400" />;
    }
    return sortConfig.direction === 'asc' ? (
      <ChevronUpIcon className="h-4 w-4 text-indigo-500" />
    ) : (
      <ChevronDownIcon className="h-4 w-4 text-indigo-500" />
    );
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {[
              { key: 'date', label: 'Date' },
              { key: 'revenue', label: 'Revenue' },
              { key: 'netIncome', label: 'Net Income' },
              { key: 'grossProfit', label: 'Gross Profit' },
              { key: 'eps', label: 'EPS' },
              { key: 'operatingIncome', label: 'Operating Income' }
            ].map((column) => (
              <th
                key={column.key}
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                onClick={() => onSort(column.key)}
              >
                <div className="flex items-center space-x-1">
                  <span>{column.label}</span>
                  {getSortIcon(column.key)}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((item, index) => (
            <tr 
              key={index}
              className="hover:bg-gray-50 transition-colors"
            >
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {formatDate(item.date)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {formatNumber(item.revenue)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {formatNumber(item.netIncome)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {formatNumber(item.grossProfit)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                ${item.eps.toFixed(2)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {formatNumber(item.operatingIncome)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable