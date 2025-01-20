import React, { useState } from 'react';
import Dashboard from './components/Dashboard';
import Team from './components/Team';
import Objectives from './components/Objectives';
import KPIs from './components/KPIs';
import Sidebar from './components/Sidebar';

function App() {
  const [activeModule, setActiveModule] = useState('dashboard');

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar activeModule={activeModule} onModuleChange={setActiveModule} />
      <div className="lg:ml-64">
        {activeModule === 'dashboard' && <Dashboard />}
        {activeModule === 'team' && <Team />}
        {activeModule === 'objectives' && <Objectives />}
        {activeModule === 'kpis' && <KPIs />}
      </div>
    </div>
  );
}

export default App;