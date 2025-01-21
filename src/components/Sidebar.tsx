import React, { useState } from 'react';
import { LayoutDashboard, Users, Target, TrendingUp, Settings, Menu, LogOut, UserCog } from 'lucide-react';
import { signOut } from '../lib/auth';
import ProfileModal from './Profile';
import { useAuth } from '../contexts/AuthContext';

const getMenuItems = (isAdmin: boolean) => {
  const baseItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Tableau de Bord' },
    { id: 'team', icon: Users, label: 'Équipe' },
    { id: 'objectives', icon: Target, label: 'Objectifs' },
    { id: 'kpis', icon: TrendingUp, label: 'KPIs' },
  ];

  if (isAdmin) {
    baseItems.push(
      { id: 'users', icon: UserCog, label: 'Gestion Utilisateurs' },
      { id: 'settings', icon: Settings, label: 'Paramètres' }
    );
  } else {
    baseItems.push({ id: 'settings', icon: Settings, label: 'Paramètres' });
  }

  return baseItems;
};

interface SidebarProps {
  activeModule: string;
  onModuleChange: (module: string) => void;
}

export default function Sidebar({ activeModule, onModuleChange }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';
  const menuItems = getMenuItems(isAdmin);

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-20 p-2 rounded-md bg-primary text-white"
      >
        <Menu size={24} />
      </button>

      {/* Sidebar */}
      <div className={`
        fixed top-0 left-0 h-full bg-white border-r border-gray-200 transition-all duration-300 ease-in-out z-10
        ${isOpen ? 'w-64' : 'w-0 lg:w-64'} 
      `}>
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-gray-200">
            <img 
              src="https://ignite-power.com/wp-content/uploads/2024/03/ignite-logo.png"
              alt="Logo"
              className="h-12 w-auto"
            />
          </div>

          <nav className="flex-1 pt-4">
            <ul className="space-y-2 px-4">
              {menuItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => onModuleChange(item.id)}
                    className={`
                      w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors
                      ${activeModule === item.id
                        ? 'bg-primary text-white' 
                        : 'text-gray-600 hover:bg-primary/10 hover:text-primary'}
                    `}
                  >
                    <item.icon size={20} />
                    <span className={`${isOpen ? 'opacity-100' : 'lg:opacity-100 opacity-0'}`}>
                      {item.label}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <div className="p-4 border-t border-gray-200">
            <button
              onClick={() => setShowProfileModal(true)}
              className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <img
                src={user?.membre?.photo || "https://ignite-power.com/wp-content/uploads/2024/03/ignite-logo.png"}
                alt="Profile"
                className="w-10 h-10 rounded-full"
              />
              <div className={`${isOpen ? 'opacity-100' : 'lg:opacity-100 opacity-0'}`}>
                <p className="font-medium text-gray-900">{user?.membre?.nom || 'Utilisateur'}</p>
                <p className="text-sm text-gray-500">{user?.membre?.poste || 'Mon profil'}</p>
              </div>
            </button>

            <button
              onClick={handleSignOut}
              className="mt-2 w-full flex items-center space-x-3 p-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
            >
              <LogOut size={20} />
              <span className={`${isOpen ? 'opacity-100' : 'lg:opacity-100 opacity-0'}`}>
                Déconnexion
              </span>
            </button>
          </div>
        </div>
      </div>

      <ProfileModal
        isOpen={showProfileModal}
        onClose={() => setShowProfileModal(false)}
      />
    </>
  );
}