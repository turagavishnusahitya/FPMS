import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

const StatsCard = ({ title, value, change, trend, icon: Icon, color = 'blue' }) => {
  const colorClasses = {
    blue: 'from-blue-500 to-blue-600',
    green: 'from-green-500 to-green-600',
    purple: 'from-purple-500 to-purple-600',
    orange: 'from-orange-500 to-orange-600',
    red: 'from-red-500 to-red-600',
  };

  const getTrendIcon = () => {
    if (trend === 'up') return <TrendingUp className="w-4 h-4" />;
    if (trend === 'down') return <TrendingDown className="w-4 h-4" />;
    return <Minus className="w-4 h-4" />;
  };

  const getTrendColor = () => {
    if (trend === 'up') return 'text-green-600';
    if (trend === 'down') return 'text-red-600';
    return 'text-gray-600';
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.05, y: -5 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 relative overflow-hidden"
    >
      {/* Background Gradient */}
      <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${colorClasses[color]} opacity-10 rounded-full transform translate-x-8 -translate-y-8`} />
      
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-gray-600 text-sm font-medium mb-1">{title}</p>
          <motion.p
            className="text-3xl font-bold text-gray-900"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {value}
          </motion.p>
          {change && (
            <motion.div
              className={`flex items-center space-x-1 mt-2 ${getTrendColor()}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {getTrendIcon()}
              <span className="text-sm font-medium">{change}</span>
            </motion.div>
          )}
        </div>
        {Icon && (
          <motion.div
            className={`p-3 bg-gradient-to-br ${colorClasses[color]} rounded-lg text-white`}
            whileHover={{ rotate: 5 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <Icon className="w-6 h-6" />
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default StatsCard;