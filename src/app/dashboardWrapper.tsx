import React from 'react'

const DashboardWrapper = ({children}:{children: React.ReactNode}) => {
  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-900">
      {/* Simple Sidebar */}
      <div className="w-64 bg-gray-800 text-white">
        <div className="p-4">
          <h1 className="font-bold text-xl mb-8">Inventory</h1>
          <nav className="space-y-2">
            <a href="/dashboard" className="flex items-center space-x-3 p-3 rounded-lg bg-blue-600">
              <span>📊</span>
              <span>Dashboard</span>
            </a>
            <a href="#" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-700">
              <span>📦</span>
              <span>Products</span>
            </a>
            <a href="#" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-700">
              <span>📈</span>
              <span>Analytics</span>
            </a>
            <a href="#" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-700">
              <span>⚙️</span>
              <span>Settings</span>
            </a>
          </nav>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Simple Navbar */}
        <header className="bg-white shadow-sm border-b border-gray-200 p-4">
          <h2 className="text-xl font-semibold text-gray-800">Inventory Management</h2>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}

export default DashboardWrapper
