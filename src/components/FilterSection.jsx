import React from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const FilterSection = ({ filters, onFilterChange }) => {
  const handleDateChange = (key, value) => {
    onFilterChange({
      ...filters,
      dateRange: {
        ...filters.dateRange,
        [key]: value
      }
    });
  };

  const handleRangeChange = (category, key, value) => {
    onFilterChange({
      ...filters,
      [category]: {
        ...filters[category],
        [key]: value
      }
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Filter Data</h2>
        <button
          onClick={() => onFilterChange({
            dateRange: { start: null, end: null },
            revenue: { min: '', max: '' },
            netIncome: { min: '', max: '' }
          })}
          className="px-4 py-2 bg-gray-100 text-gray-600 rounded-md hover:bg-gray-200 transition-colors"
        >
          Clear Filters
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Date Range Filter */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Date Range
          </label>
          <div className="flex flex-col space-y-2">
            <DatePicker
              selected={filters.dateRange.start}
              onChange={(date) => handleDateChange('start', date)}
              selectsStart
              startDate={filters.dateRange.start}
              endDate={filters.dateRange.end}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
              placeholderText="Start Date"
            />
            <DatePicker
              selected={filters.dateRange.end}
              onChange={(date) => handleDateChange('end', date)}
              selectsEnd
              startDate={filters.dateRange.start}
              endDate={filters.dateRange.end}
              minDate={filters.dateRange.start}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
              placeholderText="End Date"
            />
          </div>
        </div>

        {/* Revenue Range Filter */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Revenue Range (USD)
          </label>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <input
                type="number"
                value={filters.revenue.min}
                onChange={(e) => handleRangeChange('revenue', 'min', e.target.value)}
                placeholder="Min"
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
              />
            </div>
            <div>
              <input
                type="number"
                value={filters.revenue.max}
                onChange={(e) => handleRangeChange('revenue', 'max', e.target.value)}
                placeholder="Max"
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
              />
            </div>
          </div>
        </div>

        {/* Net Income Range Filter */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Net Income Range (USD)
          </label>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <input
                type="number"
                value={filters.netIncome.min}
                onChange={(e) => handleRangeChange('netIncome', 'min', e.target.value)}
                placeholder="Min"
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
              />
            </div>
            <div>
              <input
                type="number"
                value={filters.netIncome.max}
                onChange={(e) => handleRangeChange('netIncome', 'max', e.target.value)}
                placeholder="Max"
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterSection;