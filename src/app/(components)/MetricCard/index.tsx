import React from 'react';
import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string;
  change?: {
    value: string;
    type: 'increase' | 'decrease';
    period: string;
  };
  icon?: LucideIcon;
  gradient?: boolean;
}

const MetricCard: React.FC<MetricCardProps> = ({ 
  title, 
  value, 
  change, 
  icon: Icon, 
  gradient = false 
}) => {
  return (
    <div className={`glass-card glass-card-hover p-6 ${gradient ? 'relative overflow-hidden' : ''}`}>
      {gradient && (
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl"></div>
      )}
      
      <div className="relative z-10">
        {/* Header with Icon */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-white/70 text-sm font-medium">{title}</h3>
          {Icon && (
            <div className="p-2 glass-card rounded-lg">
              <Icon className="w-5 h-5 text-white/70" />
            </div>
          )}
        </div>
        
        {/* Value */}
        <div className="mb-3">
          <span className={`text-3xl font-bold ${gradient ? 'gradient-text' : 'text-white'}`}>
            {value}
          </span>
        </div>
        
        {/* Change Indicator */}
        {change && (
          <div className="flex items-center gap-2">
            {change.type === 'increase' ? (
              <TrendingUp className="w-4 h-4 text-green-400" />
            ) : (
              <TrendingDown className="w-4 h-4 text-red-400" />
            )}
            <span className={`text-sm font-medium ${
              change.type === 'increase' ? 'text-green-400' : 'text-red-400'
            }`}>
              {change.value}
            </span>
            <span className="text-white/50 text-sm">{change.period}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default MetricCard;
