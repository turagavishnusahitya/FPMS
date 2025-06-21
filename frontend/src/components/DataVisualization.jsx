import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, PieChart, TrendingUp, Award, Users, FileText } from 'lucide-react';

const DataVisualization = ({ data = {} }) => {
  const performanceData = [
    { category: 'Teaching', score: 85, color: 'bg-blue-500' },
    { category: 'Research', score: 92, color: 'bg-green-500' },
    { category: 'Professional Dev', score: 78, color: 'bg-purple-500' },
    { category: 'Institute Contribution', score: 88, color: 'bg-orange-500' },
    { category: 'Student Development', score: 90, color: 'bg-red-500' }
  ];

  const monthlyProgress = [
    { month: 'Jan', value: 65 },
    { month: 'Feb', value: 72 },
    { month: 'Mar', value: 78 },
    { month: 'Apr', value: 85 },
    { month: 'May', value: 88 },
    { month: 'Jun', value: 92 }
  ];

  return (
    <div className="space-y-6">
      {/* Performance Overview Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900 flex items-center">
            <BarChart3 className="w-6 h-6 mr-3 text-blue-600" />
            Performance Overview
          </h3>
          <div className="flex space-x-2">
            <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
              Current Year
            </button>
            <button className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded-full text-sm">
              Previous Year
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {performanceData.map((item, index) => (
            <motion.div
              key={item.category}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center space-x-4"
            >
              <div className="w-32 text-sm font-medium text-gray-700">
                {item.category}
              </div>
              <div className="flex-1 bg-gray-200 rounded-full h-3 overflow-hidden">
                <motion.div
                  className={`h-full ${item.color} rounded-full relative`}
                  initial={{ width: 0 }}
                  animate={{ width: `${item.score}%` }}
                  transition={{ duration: 1, delay: index * 0.1 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-white/20"
                    animate={{ x: ['-100%', '100%'] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  />
                </motion.div>
              </div>
              <div className="w-12 text-sm font-semibold text-gray-900">
                {item.score}%
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Monthly Progress Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
      >
        <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
          <TrendingUp className="w-6 h-6 mr-3 text-green-600" />
          Monthly Progress
        </h3>

        <div className="flex items-end justify-between h-48 space-x-2">
          {monthlyProgress.map((item, index) => (
            <motion.div
              key={item.month}
              className="flex flex-col items-center flex-1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <motion.div
                className="w-full bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-lg relative overflow-hidden"
                initial={{ height: 0 }}
                animate={{ height: `${(item.value / 100) * 160}px` }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              >
                <motion.div
                  className="absolute inset-0 bg-white/20"
                  animate={{ y: ['-100%', '100%'] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
              </motion.div>
              <div className="mt-2 text-sm font-medium text-gray-700">
                {item.month}
              </div>
              <div className="text-xs text-gray-500">
                {item.value}%
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm">Total Submissions</p>
              <p className="text-3xl font-bold">24</p>
              <p className="text-blue-100 text-sm mt-1">+12% from last month</p>
            </div>
            <FileText className="w-12 h-12 text-blue-200" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm">Average Score</p>
              <p className="text-3xl font-bold">87.5</p>
              <p className="text-green-100 text-sm mt-1">+5.2% improvement</p>
            </div>
            <Award className="w-12 h-12 text-green-200" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-6 text-white"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm">Active Faculty</p>
              <p className="text-3xl font-bold">156</p>
              <p className="text-purple-100 text-sm mt-1">98% participation</p>
            </div>
            <Users className="w-12 h-12 text-purple-200" />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DataVisualization;