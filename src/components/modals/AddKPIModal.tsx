import React, { useState } from 'react';
import { X, Loader2 } from 'lucide-react';
import { KPI } from '../../types';

interface AddKPIModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (kpi: Omit<KPI, 'id'>) => Promise<void>;
}

export default function AddKPIModal({ isOpen, onClose, onAdd }: AddKPIModalProps) {
  const [formData, setFormData] = useState({
    nom: '',
    valeur: 0,
    cible: 0,
    unite: '',
    tendance: 'stable',
    categorie: 'Performance'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await onAdd(formData);
      onClose();
      setFormData({
        nom: '',
        valeur: 0,
        cible: 0,
        unite: '',
        tendance: 'stable',
        categorie: 'Performance'
      });
    } catch (err) {
      setError('Error adding KPI');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-2xl font-bold mb-6">Add New KPI</h2>

        {error && (
          <div className="mb-4 p-4 bg-red-50 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              required
              value={formData.nom}
              onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
              placeholder="e.g., Monthly Revenue"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Current Value
              </label>
              <input
                type="number"
                required
                value={formData.valeur}
                onChange={(e) => setFormData({ ...formData, valeur: Number(e.target.value) })}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Target Value
              </label>
              <input
                type="number"
                required
                value={formData.cible}
                onChange={(e) => setFormData({ ...formData, cible: Number(e.target.value) })}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Unit
            </label>
            <input
              type="text"
              required
              value={formData.unite}
              onChange={(e) => setFormData({ ...formData, unite: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
              placeholder="e.g., $, %, users"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Trend
            </label>
            <select
              value={formData.tendance}
              onChange={(e) => setFormData({ ...formData, tendance: e.target.value as 'hausse' | 'baisse' | 'stable' })}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
            >
              <option value="hausse">Increasing</option>
              <option value="baisse">Decreasing</option>
              <option value="stable">Stable</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              value={formData.categorie}
              onChange={(e) => setFormData({ ...formData, categorie: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
            >
              <option value="Finance">Finance</option>
              <option value="Client">Client</option>
              <option value="Growth">Growth</option>
              <option value="Performance">Performance</option>
            </select>
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
                'Add KPI'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}