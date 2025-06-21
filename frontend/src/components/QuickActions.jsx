import React from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, Download, Upload, Share2, 
  Calendar, MessageSquare, Settings, HelpCircle 
} from 'lucide-react';

const QuickActions = () => {
  const actions = [
    {
      id: 1,
      title: 'New Submission',
      description: 'Start a new performance submission',
      icon: FileText,
      color: 'from-blue-500 to-blue-600',
      action: () => console.log('New submission')
    },
    {
      id: 2,
      title: 'Download Report',
      description: 'Export your performance data',
      icon: Download,
      color: 'from-green-500 to-green-600',
      action: () => console.log('Download report')
    },
    {
      id: 3,
      title: 'Upload Documents',
      description: 'Add supporting documents',
      icon: Upload,
      color: 'from-purple-500 to-purple-600',
      action: () => console.log('Upload documents')
    },
    {
      id: 4,
      title: 'Share Progress',
      description: 'Share with colleagues',
      icon: Share2,
      color: 'from-orange-500 to-orange-600',
      action: () => console.log('Share progress')
    },
    {
      id: 5,
      title: 'Schedule Review',
      description: 'Book a review meeting',
      icon: Calendar,
      color: 'from-red-500 to-red-600',
      action: () => console.log('Schedule review')
    },
    {
      id: 6,
      title: 'Feedback',
      description: 'View feedback and comments',
      icon: MessageSquare,
      color: 'from-indigo-500 to-indigo-600',
      action: () => console.log('View feedback')
    },
    {
      id: 7,
      title: 'Settings',
      description: 'Customize your preferences',
      icon: Settings,
      color: 'from-gray-500 to-gray-600',
      action: () => console.log('Open settings')
    },
    {
      id: 8,
      title: 'Help & Support',
      description: 'Get help and documentation',
      icon: HelpCircle,
      color: 'from-teal-500 to-teal-600',
      action: () => console.log('Open help')
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
    >
      <h3 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h3>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {actions.map((action, index) => {
          const IconComponent = action.icon;
          
          return (
            <motion.button
              key={action.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={action.action}
              className="group relative p-4 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 hover:from-white hover:to-gray-50 border border-gray-200 hover:border-gray-300 transition-all duration-200"
            >
              <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${action.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-200`}>
                <IconComponent className="w-6 h-6 text-white" />
              </div>
              
              <h4 className="font-semibold text-gray-900 text-sm mb-1 text-left">
                {action.title}
              </h4>
              <p className="text-gray-600 text-xs text-left">
                {action.description}
              </p>
              
              {/* Hover effect overlay */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
};

export default QuickActions;