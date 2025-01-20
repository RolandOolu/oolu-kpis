import React from 'react';
import { LayoutDashboard, Users, Target, TrendingUp, Settings, Menu } from 'lucide-react';

const menuItems = [
  { id: 'dashboard', icon: LayoutDashboard, label: 'Tableau de Bord' },
  { id: 'team', icon: Users, label: 'Équipe' },
  { id: 'objectives', icon: Target, label: 'Objectifs' },
  { id: 'kpis', icon: TrendingUp, label: 'KPIs' },
  { id: 'settings', icon: Settings, label: 'Paramètres' }
];

interface SidebarProps {
  activeModule: string;
  onModuleChange: (module: string) => void;
}

export default function Sidebar({ activeModule, onModuleChange }: SidebarProps) {
  const [isOpen, setIsOpen] = React.useState(true);

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
              src="https://nigeria.oolu.energy/wp-content/uploads/2024/11/output-onlinepngtools.png"
              alt="Oolu Logo"
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

          <div className="p-6 border-t border-gray-200">
            <div className="flex items-center space-x-3">
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
                alt="Profile"
                className="w-10 h-10 rounded-full"
              />
              <div className={`${isOpen ? 'opacity-100' : 'lg:opacity-100 opacity-0'}`}>
                <p className="font-medium text-gray-900">Thomas Bernard</p>
                <p className="text-sm text-gray-500">Admin</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}