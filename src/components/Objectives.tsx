import React, { useState, useEffect } from 'react';
import { Plus, ChevronDown, ChevronRight, Target, Users, Calendar, Loader2, Search, Filter, BarChart3 } from 'lucide-react';
import { getObjectives, addObjective, updateObjective, deleteObjective } from '../lib/objectives';
import { useAuth } from '../contexts/AuthContext';
import { Objectif, ObjectiveLevel } from '../types';
import AddObjectiveModal from './modals/AddObjectiveModal';

function renderObjectiveTree(objective: Objectif, level: number = 0) {
  return (
    <div key={objective.id} className={`${level > 0 ? 'ml-8 border-l border-gray-200' : ''}`}>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-4">
        <div className="p-6">
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-4">
              {objective.children && objective.children.length > 0 && (
                <button
                  onClick={() => toggleExpand(objective.id)}
                  className="mt-1 p-1 hover:bg-gray-100 rounded transition-colors"
                >
                  {expandedObjectives.includes(objective.id) ? (
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  ) : (
                    <ChevronRight className="w-5 h-5 text-gray-500" />
                  )}
                </button>
              )}
              <div>
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {objective.titre}
                  </h3>
                  <span className={`px-2.5 py-0.5 text-xs font-medium rounded-full border ${getLevelColor(objective.level)}`}>
                    {objective.level}
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-4">
                  {objective.description}
                </p>
                <div className="flex items-center space-x-6 text-sm text-gray-500">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>Due {new Date(objective.dateEcheance).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-2" />
                    <span>{objective.responsable} assignees</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="text-right">
                <span className="text-sm font-medium text-gray-900">
                  {objective.progression}%
                </span>
                <div className="mt-1 w-32 bg-gray-200 rounded-full h-2">
                  <div
                    className={`rounded-full h-2 transition-all ${getProgressColor(objective.progression)}`}
                    style={{ width: `${objective.progression}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {expandedObjectives.includes(objective.id) && (
            <>
              <div className="mt-6 pl-9">
                <h4 className="text-sm font-medium text-gray-900 mb-4">Key Results</h4>
                <div className="space-y-4">
                  {objective.keyResults.map((kr) => (
                    <div
                      key={kr.id}
                      className="bg-gray-50 rounded-lg p-4 border border-gray-200"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h5 className="text-sm font-medium text-gray-900">
                            {kr.title}
                          </h5>
                          <div className="mt-1 text-sm text-gray-500">
                            Target: {kr.target} {kr.unit}
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-sm font-medium text-gray-900">
                            {kr.current} / {kr.target} {kr.unit}
                          </span>
                          <div className="mt-1 w-32 bg-gray-200 rounded-full h-2">
                            <div
                              className={`rounded-full h-2 transition-all ${getProgressColor((kr.current / kr.target) * 100)}`}
                              style={{ width: `${(kr.current / kr.target) * 100}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {objective.children && objective.children.length > 0 && (
                <div className="mt-6">
                  <h4 className="text-sm font-medium text-gray-900 mb-4">Child Objectives</h4>
                  <div className="space-y-4">
                    {objective.children.map(child => renderObjectiveTree(child, level + 1))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Objectives() {
  const [objectives, setObjectives] = useState<Objectif[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedObjectives, setExpandedObjectives] = useState<string[]>([]);
  const [selectedView, setSelectedView] = useState<'list' | 'tree'>('tree');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterLevel, setFilterLevel] = useState<ObjectiveLevel | 'all'>('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    loadObjectives();
  }, []);

  const loadObjectives = async () => {
    try {
      setLoading(true);
      const data = await getObjectives();
      setObjectives(data);
    } catch (err) {
      setError('Error loading objectives');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const toggleExpand = (id: string) => {
    setExpandedObjectives(prev =>
      prev.includes(id) ? prev.filter(objId => objId !== id) : [...prev, id]
    );
  };

  const getLevelColor = (level: ObjectiveLevel) => {
    switch (level) {
      case 'company':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'department':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'individual':
        return 'bg-green-50 text-green-700 border-green-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 75) return 'bg-green-500';
    if (progress >= 50) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const handleAddObjective = async (objectiveData: Omit<Objectif, 'id'>) => {
    try {
      await addObjective(objectiveData);
      await loadObjectives();
    } catch (err) {
      console.error('Error adding objective:', err);
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
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Objectives & Key Results</h1>
              <p className="mt-2 text-sm text-gray-500">
                Track and manage company, department, and individual goals
              </p>
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors"
            >
              <Plus className="h-5 w-5 mr-2" />
              New Objective
            </button>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search objectives..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm"
                />
              </div>
              <div className="relative">
                <select
                  value={filterLevel}
                  onChange={(e) => setFilterLevel(e.target.value as ObjectiveLevel | 'all')}
                  className="block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm appearance-none"
                >
                  <option value="all">All Levels</option>
                  <option value="company">Company</option>
                  <option value="department">Department</option>
                  <option value="individual">Individual</option>
                </select>
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <Filter className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2 bg-gray-100 p-1 rounded-lg">
              <button
                onClick={() => setSelectedView('tree')}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  selectedView === 'tree'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                <Target className="h-4 w-4 inline-block mr-1" />
                Tree View
              </button>
              <button
                onClick={() => setSelectedView('list')}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  selectedView === 'list'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                <BarChart3 className="h-4 w-4 inline-block mr-1" />
                List View
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {objectives.map(objective => renderObjectiveTree(objective))}
        </div>

        <AddObjectiveModal
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
          onAdd={handleAddObjective}
        />
      </div>
    </div>
  );
}