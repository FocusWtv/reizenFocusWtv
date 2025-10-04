import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom'; // <- Voeg Outlet toe

const AdminLayout = () => { // <- Verwijder children prop
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    document.body.classList.add('admin-mode');
    return () => {
      document.body.classList.remove('admin-mode');
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  const navigation = [
    {
      name: 'Homepage',
      href: '/admin/homepage',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
    },
    {
      name: 'Infoavonden',
      href: '/admin/events',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      name: 'Reizen',
      href: '/admin/reizen',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      name: 'Gebruikers',
      href: '/admin/users',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5V4a2 2 0 00-2-2H7a2 2 0 00-2 2v16h5m7 0v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4m10 0H7" />
        </svg>
      ),
    },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-50 
        w-64 bg-white shadow-lg 
        transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Sidebar header */}
        <div className="flex items-center justify-center h-16 bg-indigo-600 border-b border-indigo-700">
          <h1 className="text-white text-xl font-bold">Focus & WTV REIZEN</h1>
        </div>
        
        {/* Navigation */}
        <nav className="mt-8 px-4">
          <div className="space-y-2">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`
                    group flex items-center px-4 py-3 text-sm font-medium rounded-lg 
                    transition-colors duration-200
                    ${isActive
                      ? 'bg-indigo-100 text-indigo-700 border-r-4 border-indigo-700'
                      : 'text-gray-700 hover:bg-gray-100 hover:text-indigo-700'
                    }
                  `}
                  onClick={() => setSidebarOpen(false)}
                >
                  <span className={`mr-3 ${isActive ? 'text-indigo-700' : 'text-gray-400 group-hover:text-indigo-700'}`}>
                    {item.icon}
                  </span>
                  {item.name}
                </Link>
              );
            })}
          </div>
        </nav>
      </div>

      {/* Main content area */}
      <div className="flex-1 flex flex-col overflow-hidden min-h-0">
        {/* Top navigation */}
        <header className="bg-white shadow-sm border-b border-gray-200 z-30">
          <div className="flex items-center justify-between h-16 px-4">
            <div className="flex items-center">
              {/* Mobile menu button */}
              <button
                type="button"
                className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                onClick={() => setSidebarOpen(true)}
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              
              {/* Page title */}
              <h2 className="ml-4 text-2xl font-semibold text-gray-900 lg:ml-0">
                {navigation.find(item => item.href === location.pathname)?.name || 'Admin Panel'}
              </h2>
            </div>

            {/* Right side buttons */}
            <div className="flex items-center space-x-4">
              <a
                href="/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-indigo-600 hover:text-indigo-500 font-medium"
              >
                Website bekijken
              </a>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
              >
                Uitloggen
              </button>
            </div>
          </div>
        </header>

        {/* Page content - HIER IS DE BELANGRIJKE VERANDERING */}
        <main className="flex-1 overflow-y-auto min-h-0 p-6">
          <Outlet /> {/* <- Gebruik Outlet in plaats van children */}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;