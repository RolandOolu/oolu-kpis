import React, { useState } from 'react';
import { X, Loader2, Plus, Trash2 } from 'lucide-react';
import { Objectif, KeyResult, ObjectiveLevel } from '../../types';

interface AddObjectiveModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (objective: Omit<Objectif, 'id'>) => Promise<void>;
  parentId?: string;
  defaultLevel?: ObjectiveLevel;
}

export default function AddObjectiveModal({ isOpen, onClose, onAdd, parentId, defaultLevel }: AddObjectiveModalProps) {
  const [formData, setFormData] = useState<Omit<Objectif, 'id'>>({
    titre: '',
    description: '',
    dateEcheance: '',
    progression: 0,
    responsable: '',
    statut: 'en_cours',
    level: defaultLevel || 'company',
    parentId: parentId,
    keyResults: [],
    createdAt: '',
    updatedAt: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const addKeyResult = () => {
    setFormData(prev => ({
      ...prev,
      keyResults: [
        ...prev.keyResults,
        {
          id: Date.now().toString(),
          title: '',
          target: 0,
          current: 0,
          unit: '',
          dueDate: formData.dateEcheance
        }
      ]
    }));
  };

  const removeKeyResult = (index: number) => {
    setFormData(prev => ({
      ...prev,
      keyResults: prev.keyResults.filter((_, i) => i !== index)
    }));
  };

  const updateKeyResult = (index: number, data: Partial<KeyResult>) => {
    setFormData(prev => ({
      ...prev,
      keyResults: prev.keyResults.map((kr, i) =>
        i === index ? { ...kr, ...data } : kr
      )
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await onAdd({
        ...formData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
      onClose();
    } catch (err) {
      setError('Error adding objective');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-2xl font-bold mb-6">Add New Objective</h2>

        {error && (
          <div className="mb-4 p-4 bg-red-50 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              required
              value={formData.titre}
              onChange={(e) => setFormData({ ...formData, titre: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
              placeholder="e.g., Increase Market Share"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
              rows={3}
              placeholder="Describe the objective..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Due Date
              </label>
              <input
                type="date"
                required
                value={formData.dateEcheance}
                onChange={(e) => setFormData({ ...formData, dateEcheance: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Level
              </label>
              <select
                value={formData.level}
                onChange={(e) => setFormData({ ...formData, level: e.target.value as ObjectiveLevel })}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
              >
                <option value="company">Company</option>
                <option value="department">Department</option>
                <option value="individual">Individual</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Responsible
            </label>
            <input
              type="text"
              required
              value={formData.responsable}
              onChange={(e) => setFormData({ ...formData, responsable: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
              placeholder="Assignee name or ID"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Key Results
              </label>
              <button
                type="button"
                onClick={addKeyResult}
                className="text-sm text-primary hover:text-primary-dark flex items-center"
              >
                <Plus className="w-4 h-4 mr-1" />
                Add Key Result
              </button>
            </div>
            <div className="space-y-4">
              {formData.keyResults.map((kr, index) => (
                <div key={kr.id} className="p-4 bg-gray-50 rounded-lg space-y-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1 space-y-4">
                      <input
                        type="text"
                        required
                        value={kr.title}
                        onChange={(e) => updateKeyResult(index, { title: e.target.value })}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                        placeholder="Key result title"
                      />
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs text-gray-500 mb-1">Target</label>
                          <input
                            type="number"
                            required
                            value={kr.target}
                            onChange={(e) => updateKeyResult(index, { target: Number(e.target.value) })}
                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-gray-500 mb-1">Unit</label>
                          <input
                            type="text"
                            required
                            value={kr.unit}
                            onChange={(e) => updateKeyResult(index, { unit: e.target.value })}
                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                            placeholder="e.g., %, $, users"
                          />
                        </div>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeKeyResult(index)}
                      className="ml-4 text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 text-white bg-primary rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Adding...
                </>
              ) : (
                'Add Objective'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}