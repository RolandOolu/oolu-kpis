import React from 'react';
import { useAuth } from './contexts/AuthContext';
import Dashboard from './components/Dashboard';
import Team from './components/Team';
import Objectives from './components/Objectives';
import KPIs from './components/KPIs';
import UserManagement from './components/UserManagement';
import Sidebar from './components/Sidebar';
import Login from './components/Login';
import Signup from './components/Signup';

function App() {
  const { user, loading } = useAuth();
  const [activeModule, setActiveModule] = React.useState('dashboard');
  const [currentPage, setCurrentPage] = React.useState(() => 
    window.location.hash === '#signup' ? 'signup' : 'login'
  );

  // Listen to hash changes
  React.useEffect(() => {
    const handleHashChange = () => {
      setCurrentPage(window.location.hash === '#signup' ? 'signup' : 'login');
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Reset to dashboard when user logs in
  React.useEffect(() => {
    if (user) {
      setActiveModule('dashboard');
    }
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  if (!user) {
    // Clear hash when logging out
    if (window.location.hash && window.location.hash !== '#signup') {
      window.location.hash = '';
    }
    return currentPage === 'signup' ? <Signup /> : <Login />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar 
        activeModule={activeModule} 
        onModuleChange={setActiveModule}
        user={user}
      />
      <div className="lg:ml-64">
        {activeModule === 'dashboard' && <Dashboard user={user} />}
        {activeModule === 'team' && <Team user={user} />}
        {activeModule === 'objectives' && <Objectives user={user} />}
        {activeModule === 'kpis' && <KPIs user={user} />}
        {activeModule === 'users' && user?.role === 'admin' && <UserManagement />}
      </div>
    </div>
  );
}

export default App;