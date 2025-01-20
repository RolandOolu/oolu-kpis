import React from 'react';
import { membres, objectifs, kpis } from '../data';
import { Users, Target, TrendingUp, ChevronUp, ChevronDown, Minus } from 'lucide-react';

const getTrendIcon = (tendance: string) => {
  switch (tendance) {
    case 'hausse':
      return <ChevronUp className="text-primary" />;
    case 'baisse':
      return <ChevronDown className="text-red-500" />;
    default:
      return <Minus className="text-gray-500" />;
  }
};

const getStatusColor = (statut: string) => {
  switch (statut) {
    case 'complete':
      return 'bg-primary/10 text-primary';
    case 'en_retard':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-secondary/10 text-secondary';
  }
};

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Tableau de Bord</h1>
        
        {/* KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {kpis.map((kpi) => (
            <div key={kpi.id} className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">{kpi.nom}</h3>
                {getTrendIcon(kpi.tendance)}
              </div>
              <div className="flex items-baseline">
                <p className="text-3xl font-semibold text-gray-900">
                  {kpi.valeur}{kpi.unite}
                </p>
                <p className="ml-2 text-sm text-gray-500">
                  / {kpi.cible}{kpi.unite}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Équipe */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Équipe</h2>
                <Users className="text-primary" />
              </div>
              <div className="space-y-4">
                {membres.slice(0, 5).map((membre) => (
                  <div key={membre.id} className="flex items-center space-x-4">
                    <img
                      src={membre.photo}
                      alt={membre.nom}
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <p className="font-medium text-gray-900">{membre.nom}</p>
                      <p className="text-sm text-gray-500">{membre.poste}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Objectifs */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Objectifs</h2>
                <Target className="text-primary" />
              </div>
              <div className="space-y-4">
                {objectifs.map((objectif) => (
                  <div key={objectif.id} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium text-gray-900">{objectif.titre}</h3>
                      <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(objectif.statut)}`}>
                        {objectif.statut.replace('_', ' ')}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500">{objectif.description}</p>
                    <div className="relative pt-1">
                      <div className="flex mb-2 items-center justify-between">
                        <div>
                          <span className="text-xs font-semibold inline-block text-gray-600">
                            {objectif.progression}%
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="text-xs font-semibold inline-block text-gray-600">
                            {objectif.dateEcheance}
                          </span>
                        </div>
                      </div>
                      <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
                        <div
                          style={{ width: `${objectif.progression}%` }}
                          className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary"
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}