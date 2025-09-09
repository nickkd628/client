import React from 'react';
import MetricCard from '@/app/(components)/MetricCard';
import { SimpleAreaChart, SimpleDonutChart, SimpleBarChart } from '@/app/(components)/Charts';
import { 
  DollarSign, 
  Users, 
  Package, 
  TrendingUp,
  ShoppingCart,
  Activity
 } from 'lucide-react';

const Dashboard = () => {
  return (
    <div className="p-6 space-y-6">
      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Revenue Today"
          value="$12,426"
          change={{ value: "+12.5%", type: "increase", period: "vs yesterday" }}
          icon={DollarSign}
          gradient
        />
        
        <MetricCard
          title="Total Customers"
          value="1,834"
          change={{ value: "+8.2%", type: "increase", period: "this month" }}
          icon={Users}
        />
        
        <MetricCard
          title="Products Sold"
          value="429"
          change={{ value: "-2.1%", type: "decrease", period: "vs yesterday" }}
          icon={ShoppingCart}
        />
        
        <MetricCard
          title="Inventory Items"
          value="2,847"
          change={{ value: "+15.3%", type: "increase", period: "this quarter" }}
          icon={Package}
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SimpleAreaChart className="col-span-1" />
        <SimpleBarChart className="col-span-1" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <SimpleDonutChart className="col-span-1" />
        
        {/* Recent Activity Card */}
        <div className="glass-card glass-card-hover p-6 col-span-1 lg:col-span-2">
          <div className="flex items-center gap-3 mb-6">
            <Activity className="w-6 h-6 text-white/70" />
            <h3 className="text-xl font-semibold text-white">Recent Activity</h3>
          </div>
          
          <div className="space-y-4">
            {[
              {
                action: "New order received",
                details: "Order #1234 - $247.90",
                time: "2 minutes ago",
                type: "success"
              },
              {
                action: "Low stock alert",
                details: "iPhone 15 Pro - Only 3 left",
                time: "15 minutes ago",
                type: "warning"
              },
              {
                action: "User registered",
                details: "sarah@example.com joined",
                time: "1 hour ago",
                type: "info"
              },
              {
                action: "Product updated",
                details: "MacBook Pro pricing changed",
                time: "2 hours ago",
                type: "info"
              }
            ].map((activity, index) => (
              <div key={index} className="flex items-start gap-4 p-3 glass-card rounded-lg">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  activity.type === 'success' ? 'bg-green-400' :
                  activity.type === 'warning' ? 'bg-yellow-400' :
                  'bg-blue-400'
                } glow-purple`}></div>
                <div className="flex-1">
                  <p className="text-white font-medium text-sm">{activity.action}</p>
                  <p className="text-white/60 text-xs">{activity.details}</p>
                  <p className="text-white/40 text-xs mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="glass-card glass-card-hover p-6">
          <div className="text-center">
            <TrendingUp className="w-8 h-8 text-green-400 mx-auto mb-2" />
            <h4 className="text-lg font-semibold text-white">99.2%</h4>
            <p className="text-white/60 text-sm">Uptime</p>
          </div>
        </div>
        
        <div className="glass-card glass-card-hover p-6">
          <div className="text-center">
            <Package className="w-8 h-8 text-blue-400 mx-auto mb-2" />
            <h4 className="text-lg font-semibold text-white">847</h4>
            <p className="text-white/60 text-sm">Orders Today</p>
          </div>
        </div>
        
        <div className="glass-card glass-card-hover p-6">
          <div className="text-center">
            <Users className="w-8 h-8 text-purple-400 mx-auto mb-2" />
            <h4 className="text-lg font-semibold text-white">23</h4>
            <p className="text-white/60 text-sm">New Users</p>
          </div>
        </div>
        
        <div className="glass-card glass-card-hover p-6">
          <div className="text-center">
            <DollarSign className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
            <h4 className="text-lg font-semibold text-white">$42.5K</h4>
            <p className="text-white/60 text-sm">Monthly Revenue</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
