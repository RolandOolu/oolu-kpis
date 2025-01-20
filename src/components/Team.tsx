import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import { membres } from '../data';

export default function Team() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Équipe</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          Ajouter un membre
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {membres.map((membre) => (
          <div key={membre.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="relative h-48">
              <img
                src={membre.photo}
                alt={membre.nom}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                <h3 className="text-xl font-semibold text-white">{membre.nom}</h3>
                <p className="text-gray-200">{membre.poste}</p>
              </div>
            </div>
            <div className="p-4 space-y-3">
              <div className="flex items-center text-gray-600">
                <Mail className="w-5 h-5 mr-2" />
                <span>{membre.nom.toLowerCase().replace(' ', '.')}@company.com</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Phone className="w-5 h-5 mr-2" />
                <span>+234 {Math.floor(Math.random() * 900000000 + 100000000)}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <MapPin className="w-5 h-5 mr-2" />
                <span>{membre.equipe}</span>
              </div>
              <div className="pt-4 flex space-x-2">
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