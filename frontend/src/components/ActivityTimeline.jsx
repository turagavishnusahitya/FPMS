import React from 'react';
import { motion } from 'framer-motion';
import { Clock, CheckCircle, AlertCircle, FileText, User, Award } from 'lucide-react';

const ActivityTimeline = () => {
  const activities = [
    {
      id: 1,
      type: 'submission',
      title: 'Performance Data Submitted',
      description: 'All sections completed and submitted for review',
      time: '2 hours ago',
      icon: FileText,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      id: 2,
      type: 'review',
      title: 'Admin Review Started',
      description: 'Dr. Smith began reviewing your submission',
      time: '4 hours ago',
      icon: User,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      id: 3,
      type: 'update',
      title: 'Section L2 Updated',
      description: 'Research & Consultancy section was modified',
      time: '1 day ago',
      icon: AlertCircle,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100'
    },
    {
      id: 4,
      type: 'achievement',
      title: 'Excellence Award Received',
      description: 'Outstanding performance in teaching category',
      time: '3 days ago',
      icon: Award,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    {
      id: 5,
      type: 'completion',
      title: 'Section L1 Completed',
      description: 'Teaching & Learning section fully documented',
      time: '5 days ago',
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-900 flex items-center">
          <Clock className="w-6 h-6 mr-3 text-blue-600" />
          Recent Activity
        </h3>
        <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
          View All
        </button>
      </div>

      <div className="space-y-4">
        {activities.map((activity, index) => {
          const IconComponent = activity.icon;
          
          return (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-start space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <motion.div
                className={`p-2 rounded-full ${activity.bgColor}`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <IconComponent className={`w-5 h-5 ${activity.color}`} />
              </motion.div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-gray-900 text-sm">
                    {activity.title}
                  </h4>
                  <span className="text-xs text-gray-500 flex items-center">
                    <Clock className="w-3 h-3 mr-1" />
                    {activity.time}
                  </span>
                </div>
                <p className="text-gray-600 text-sm mt-1">
                  {activity.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Timeline Connector */}
      <div className="absolute left-8 top-16 bottom-4 w-px bg-gradient-to-b from-blue-200 via-gray-200 to-transparent"></div>
    </motion.div>
  );
};

export default ActivityTimeline;