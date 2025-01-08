import React, { useState, useEffect } from 'react';
import { fetchFinancialData } from './services/api';
import DataTable from './components/DataTable';
import FilterSection from './components/FilterSection';

function App() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    dateRange: { start: null, end: null },
    revenue: { min: '', max: '' },
    netIncome: { min: '', max: '' }
  });
  const [sortConfig, setSortConfig] = useState({
    key: 'date',
    direction: 'desc'
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetchFinancialData();
        setData(response);
        setFilteredData(response);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const applyFilters = (filters) => {
    let filtered = [...data];

    // Apply date range filter
    if (filters.dateRange.start && filters.dateRange.end) {
      filtered = filtered.filter(item => {
        const date = new Date(item.date);
        return date >= filters.dateRange.start && date <= filters.dateRange.end;
      });
    }

    // Apply revenue filter
    if (filters.revenue.min || filters.revenue.max) {
      filtered = filtered.filter(item => {
        const revenue = item.revenue;
        const min = filters.revenue.min ? parseFloat(filters.revenue.min) : -Infinity;
        const max = filters.revenue.max ? parseFloat(filters.revenue.max) : Infinity;
        return revenue >= min && revenue <= max;
      });
    }

    // Apply net income filter
    if (filters.netIncome.min || filters.netIncome.max) {
      filtered = filtered.filter(item => {
        const netIncome = item.netIncome;
        const min = filters.netIncome.min ? parseFloat(filters.netIncome.min) : -Infinity;
        const max = filters.netIncome.max ? parseFloat(filters.netIncome.max) : Infinity;
        return netIncome >= min && netIncome <= max;
      });
    }

    setFilteredData(filtered);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    applyFilters(newFilters);
  };

  const handleSort = (key) => {
    const direction = 
      sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc';
    setSortConfig({ key, direction });
    
    const sorted = [...filteredData].sort((a, b) => {
      if (key === 'date') {
        return direction === 'asc' 
          ? new Date(a[key]) - new Date(b[key])
          : new Date(b[key]) - new Date(a[key]);
      }
      return direction === 'asc' ? a[key] - b[key] : b[key] - a[key];
    });
    
    setFilteredData(sorted);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-indigo-600 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-2xl font-bold text-white">
            Apple Financial Dashboard
          </h1>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-sm font-medium text-gray-500">Latest Revenue</h3>
              <p className="mt-2 text-3xl font-semibold text-gray-900">
                {new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'USD',
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                }).format(filteredData[0]?.revenue || 0)}
              </p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-sm font-medium text-gray-500">Latest Net Income</h3>
              <p className="mt-2 text-3xl font-semibold text-gray-900">
                {new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'USD',
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                }).format(filteredData[0]?.netIncome || 0)}
              </p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-sm font-medium text-gray-500">Latest EPS</h3>
              <p className="mt-2 text-3xl font-semibold text-gray-900">
                ${(filteredData[0]?.eps || 0).toFixed(2)}
              </p>
            </div>
          </div>

          {/* Filters */}
          <FilterSection 
            filters={filters} 
            onFilterChange={handleFilterChange}
          />

          {/* Data Table */}
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <DataTable 
              data={filteredData} 
              sortConfig={sortConfig}
              onSort={handleSort}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;