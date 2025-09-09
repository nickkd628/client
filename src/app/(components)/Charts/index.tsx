import React from 'react';

// Simple Area Chart Component
export const SimpleAreaChart: React.FC<{ data?: number[]; className?: string }> = ({ 
  data = [20, 45, 28, 80, 99, 43, 60, 85, 95], 
  className = "" 
}) => {
  const maxValue = Math.max(...data);
  const points = data
    .map((value, index) => {
      const x = (index / (data.length - 1)) * 100;
      const y = 100 - (value / maxValue) * 100;
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <div className={`glass-card glass-card-hover p-6 ${className}`}>
      <div className="relative h-32 w-full">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          {/* Gradient Definition */}
          <defs>
            <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(99, 102, 241, 0.3)" />
              <stop offset="100%" stopColor="rgba(99, 102, 241, 0.05)" />
            </linearGradient>
          </defs>
          
          {/* Area Fill */}
          <polygon
            points={`0,100 ${points} 100,100`}
            fill="url(#areaGradient)"
            className="drop-shadow-sm"
          />
          
          {/* Line */}
          <polyline
            points={points}
            fill="none"
            stroke="rgb(99, 102, 241)"
            strokeWidth="0.5"
            className="drop-shadow-sm"
          />
          
          {/* Data Points */}
          {data.map((value, index) => {
            const x = (index / (data.length - 1)) * 100;
            const y = 100 - (value / maxValue) * 100;
            return (
              <circle
                key={index}
                cx={x}
                cy={y}
                r="0.8"
                fill="rgb(99, 102, 241)"
                className="drop-shadow-sm"
              />
            );
          })}
        </svg>
      </div>
      
      <div className="mt-4">
        <h4 className="text-white font-semibold text-lg">Revenue Trend</h4>
        <p className="text-white/60 text-sm">Last 9 months performance</p>
      </div>
    </div>
  );
};

// Simple Donut Chart Component
export const SimpleDonutChart: React.FC<{ 
  data?: { label: string; value: number; color: string }[];
  className?: string;
}> = ({ 
  data = [
    { label: 'Electronics', value: 45, color: '#6366f1' },
    { label: 'Clothing', value: 30, color: '#8b5cf6' },
    { label: 'Home', value: 25, color: '#a855f7' }
  ], 
  className = "" 
}) => {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  let cumulativePercentage = 0;

  return (
    <div className={`glass-card glass-card-hover p-6 ${className}`}>
      <div className="flex items-center justify-between">
        <div className="relative">
          <svg className="w-24 h-24" viewBox="0 0 42 42">
            <circle
              cx="21"
              cy="21"
              r="15.91549430918954"
              fill="transparent"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="2"
            />
            {data.map((item, index) => {
              const strokeDasharray = `${(item.value / total) * 100} ${100 - (item.value / total) * 100}`;
              const strokeDashoffset = -cumulativePercentage;
              cumulativePercentage += (item.value / total) * 100;
              
              return (
                <circle
                  key={index}
                  cx="21"
                  cy="21"
                  r="15.91549430918954"
                  fill="transparent"
                  stroke={item.color}
                  strokeWidth="2"
                  strokeDasharray={strokeDasharray}
                  strokeDashoffset={strokeDashoffset}
                  className="transition-all duration-300 hover:stroke-4"
                />
              );
            })}
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-white font-bold text-sm">100%</span>
          </div>
        </div>
        
        <div className="flex-1 ml-6">
          <h4 className="text-white font-semibold text-lg mb-3">Categories</h4>
          <div className="space-y-2">
            {data.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: item.color }}
                ></div>
                <span className="text-white/70 text-sm flex-1">{item.label}</span>
                <span className="text-white text-sm font-medium">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Simple Bar Chart Component
export const SimpleBarChart: React.FC<{
  data?: { label: string; value: number }[];
  className?: string;
}> = ({ 
  data = [
    { label: 'Jan', value: 65 },
    { label: 'Feb', value: 85 },
    { label: 'Mar', value: 45 },
    { label: 'Apr', value: 95 },
    { label: 'May', value: 75 },
    { label: 'Jun', value: 55 }
  ], 
  className = "" 
}) => {
  const maxValue = Math.max(...data.map(d => d.value));

  return (
    <div className={`glass-card glass-card-hover p-6 ${className}`}>
      <div className="mb-4">
        <h4 className="text-white font-semibold text-lg">Monthly Sales</h4>
        <p className="text-white/60 text-sm">Performance by month</p>
      </div>
      
      <div className="flex items-end justify-between h-32 gap-2">
        {data.map((item, index) => {
          const height = (item.value / maxValue) * 100;
          return (
            <div key={index} className="flex flex-col items-center flex-1">
              <div 
                className="w-full bg-gradient-to-t from-purple-600 to-purple-400 rounded-t transition-all duration-300 hover:from-purple-500 hover:to-purple-300 glow-purple"
                style={{ height: `${height}%`, minHeight: '4px' }}
              ></div>
              <span className="text-white/60 text-xs mt-2">{item.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
