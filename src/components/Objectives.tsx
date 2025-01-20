import React from 'react';
import { Calendar, Users } from 'lucide-react';
import { objectifs, membres } from '../data';

export default function Objectives() {
  const getResponsableName = (id: number) => {
    const membre = membres.find(m => m.id === id);
    return membre ? membre.nom : 'Non assigné';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Objectifs</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          Nouvel objectif
        </button>
      </div>

      <div className="grid gap-6">
        {objectifs.map((objectif) => (
          <div key={objectif.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {objectif.titre}
                </h3>
                <p className="text-gray-600">{objectif.description}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                objectif.statut === 'complete' ? 'bg-green-100 text-green-800' :
                objectif.statut === 'en_retard' ? 'bg-red-100 text-red-800' :
                'bg-blue-100 text-blue-800'
              }`}>
                {objectif.statut.replace('_', ' ')}
              </span>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center text-gray-600">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>Échéance: {new Date(objectif.dateEcheance).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Users className="w-4 h-4 mr-2" />
                  <span>Responsable: {getResponsableName(objectif.responsable)}</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">Progression</span>
                  <span className="text-sm font-medium text-gray-700">{objectif.progression}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-blue-600 h-2.5 rounded-full transition-all"
                    style={{ width: `${objectif.progression}%` }}
                  ></div>
                </div>
              </div>

              <div className="flex space-x-2 pt-4">
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