import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { kpis } from '../data';

export default function KPIs() {
  const getTrendIcon = (tendance: string) => {
    switch (tendance) {
      case 'hausse':
        return <TrendingUp className="w-6 h-6 text-green-500" />;
      case 'baisse':
        return <TrendingDown className="w-6 h-6 text-red-500" />;
      default:
        return <Minus className="w-6 h-6 text-gray-500" />;
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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">KPIs</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          Ajouter KPI
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {kpis.map((kpi) => (
          <div key={kpi.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-medium text-gray-900">{kpi.nom}</h3>
                <p className="text-sm text-gray-500">{kpi.categorie}</p>
              </div>
              {getTrendIcon(kpi.tendance)}
            </div>

            <div className="mt-4">
              <div className="flex items-baseline">
                <span className="text-3xl font-bold text-gray-900">
                  {formatNumber(kpi.valeur)}{kpi.unite}
                </span>
                <span className="ml-2 text-sm text-gray-500">
                  / {formatNumber(kpi.cible)}{kpi.unite}
                </span>
              </div>

              <div className="mt-4">
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-blue-600 h-2.5 rounded-full transition-all"
                    style={{ width: `${(kpi.valeur / kpi.cible) * 100}%` }}
                  ></div>
                </div>
              </div>

              <div className="flex space-x-2 mt-6">
                <button className="flex-1 bg-gray-100 text-gray-700 px-4 py-2 rounded hover:bg-gray-200 transition-colors">
                  Modifier
                </button>
                <button className="flex-1 bg-red-50 text-red-600 px-4 py-2 rounded hover:bg-red-100 transition-colors">
                  Supprimer
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}