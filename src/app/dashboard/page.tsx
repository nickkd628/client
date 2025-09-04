import React from 'react'

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Inventory management system</p>
      </div>

      {/* Content will be loaded here */}
      <div className="bg-white p-6 rounded-lg shadow border">
        <p className="text-gray-500 text-center py-8">Dashboard content will be displayed here</p>
      </div>
    </div>
  )
}

export default Dashboard
