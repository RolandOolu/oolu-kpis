import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Minus, Plus, Search, Filter, Loader2, BarChart3 } from 'lucide-react';
import { getKPIs, addKPI, updateKPI, deleteKPI } from '../lib/kpis';
import { KPI } from '../types';
import AddKPIModal from './modals/AddKPIModal';

export default function KPIs() {
  const [kpis, setKpis] = useState<KPI[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    loadKPIs();
  }, []);

  const loadKPIs = async () => {
    try {
      setLoading(true);
      const data = await getKPIs();
      setKpis(data);
    } catch (err) {
      setError('Error loading KPIs');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'hausse':
        return <TrendingUp className="w-5 h-5 text-green-500" />;
      case 'baisse':
        return <TrendingDown className="w-5 h-5 text-red-500" />;
      default:
        return <Minus className="w-5 h-5 text-gray-500" />;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'hausse':
        return 'text-green-600 bg-green-50';
      case 'baisse':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const formatNumber = (number: number) => {
    if (number >= 1000000) {
      return (number / 1000000).toFixed(1) + 'M';
    } else if (number >= 1000) {
      return (number / 1000).toFixed(1) + 'k';
    }
    return number.toString();
  };

  const handleAddKPI = async (kpiData: Omit<KPI, 'id'>) => {
    try {
      await addKPI(kpiData);
      await loadKPIs();
    } catch (err) {
      console.error('Error adding KPI:', err);
      throw err;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Key Performance Indicators</h1>
              <p className="mt-2 text-sm text-gray-500">
                Track and monitor company performance metrics
              </p>
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors"
            >
              <Plus className="h-5 w-5 mr-2" />
              Add KPI
            </button>
          </div>

          {/* Filters */}
          <div className="mt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search KPIs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm"
                />
              </div>
              <div className="relative">
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm appearance-none"
                >
                  <option value="all">All Categories</option>
                  <option value="Finance">Finance</option>
                  <option value="Client">Client</option>
                  <option value="Growth">Growth</option>
                  <option value="Performance">Performance</option>
                </select>
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <Filter className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* KPIs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {kpis.map((kpi) => (
            <div
              key={kpi.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{kpi.nom}</h3>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 mt-2">
                      {kpi.categorie}
                    </span>
                  </div>
                  <div className={`p-2 rounded-lg ${getTrendColor(kpi.tendance)}`}>
                    {getTrendIcon(kpi.tendance)}
                  </div>
                </div>

                <div className="mt-6">
                  <div className="flex items-baseline">
                    <span className="text-3xl font-bold text-gray-900">
                      {formatNumber(kpi.valeur)}{kpi.unite}
                    </span>
                    <span className="ml-2 text-sm text-gray-500">
                      / {formatNumber(kpi.cible)}{kpi.unite}
                    </span>
                  </div>

                  <div className="mt-4">
                    <div className="flex justify-between text-sm text-gray-500 mb-1">
                      <span>Progress</span>
                      <span>{((kpi.valeur / kpi.cible) * 100).toFixed(1)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full transition-all"
                        style={{ width: `${(kpi.valeur / kpi.cible) * 100}%` }}
                      />
                    </div>
                  </div>

                  <div className="mt-6 flex space-x-3">
                    <button className="flex-1 text-sm font-medium text-gray-700 bg-gray-100 px-3 py-2 rounded-lg hover:bg-gray-200 transition-colors">
                      Edit
                    </button>
                    <button className="flex-1 text-sm font-medium text-red-600 bg-red-50 px-3 py-2 rounded-lg hover:bg-red-100 transition-colors">
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add KPI Modal */}
        <AddKPIModal
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
          onAdd={handleAddKPI}
        />
      </div>
    </div>
  );
}