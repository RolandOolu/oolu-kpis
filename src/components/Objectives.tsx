import React, { useState } from 'react';
import { Calendar, Users, ChevronDown, ChevronRight } from 'lucide-react';
import { objectifs, membres } from '../data';
import { Objectif, ObjectiveLevel } from '../types';

export default function Objectives() {
  const [expandedObjectives, setExpandedObjectives] = useState<number[]>([]);

  const getResponsableName = (id: number) => {
    const membre = membres.find(m => m.id === id);
    return membre ? membre.nom : 'Non assigné';
  };

  const toggleExpand = (id: number) => {
    setExpandedObjectives(prev =>
      prev.includes(id)
        ? prev.filter(objId => objId !== id)
        : [...prev, id]
    );
  };

  const getChildObjectives = (parentId: number): Objectif[] => {
    return objectifs.filter(obj => obj.parentId === parentId);
  };

  const getLevelColor = (level: ObjectiveLevel) => {
    switch (level) {
      case 'company':
        return 'bg-primary/10 text-primary';
      case 'department':
        return 'bg-secondary/10 text-secondary';
      case 'individual':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const renderObjective = (objective: Objectif, level: number = 0) => {
    const children = getChildObjectives(objective.id);
    const isExpanded = expandedObjectives.includes(objective.id);

    return (
      <div key={objective.id} className={`space-y-4 ${level > 0 ? 'ml-6 mt-4' : ''}`}>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-start space-x-4">
              {children.length > 0 && (
                <button
                  onClick={() => toggleExpand(objective.id)}
                  className="mt-1 p-1 hover:bg-gray-100 rounded"
                >
                  {isExpanded ? (
                    <ChevronDown className="w-4 h-4" />
                  ) : (
                    <ChevronRight className="w-4 h-4" />
                  )}
                </button>
              )}
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <span className={`px-2 py-1 rounded-full text-sm font-medium ${getLevelColor(objective.level)}`}>
                    {objective.level.charAt(0).toUpperCase() + objective.level.slice(1)}
                  </span>
                  {objective.equipe && (
                    <span className="px-2 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
                      {objective.equipe}
                    </span>
                  )}
                </div>
                <h3 className="text-xl font-semibold text-gray-900">{objective.titre}</h3>
                <p className="text-gray-600 mt-1">{objective.description}</p>
              </div>
            </div>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              objective.statut === 'complete' ? 'bg-green-100 text-green-800' :
              objective.statut === 'en_retard' ? 'bg-red-100 text-red-800' :
              'bg-blue-100 text-blue-800'
            }`}>
              {objective.statut.replace('_', ' ')}
            </span>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center text-gray-600">
                <Calendar className="w-4 h-4 mr-2" />
                <span>Échéance: {new Date(objective.dateEcheance).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Users className="w-4 h-4 mr-2" />
                <span>Responsable: {getResponsableName(objective.responsable)}</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-700">Progression</span>
                <span className="text-sm font-medium text-gray-700">{objective.progression}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-primary h-2.5 rounded-full transition-all"
                  style={{ width: `${objective.progression}%` }}
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

        {isExpanded && children.length > 0 && (
          <div className="space-y-4">
            {children.map(child => renderObjective(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  const companyObjectives = objectifs.filter(obj => obj.level === 'company');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Objectifs</h1>
        <button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors">
          Nouvel objectif
        </button>
      </div>

      <div className="space-y-6">
        {companyObjectives.map(objective => renderObjective(objective))}
      </div>
    </div>
  );
}