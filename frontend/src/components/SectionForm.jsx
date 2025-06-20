import React from 'react';
import { motion } from 'framer-motion';
import { Link, FileText, AlertCircle } from 'lucide-react';
import AnimatedCard from './AnimatedCard';

const SectionForm = ({ 
  sectionCode, 
  sectionTitle, 
  fields, 
  formData, 
  handleChange, 
  submitted,
  icon: Icon,
  color = 'blue'
}) => {
  const colorClasses = {
    blue: 'from-blue-500 to-blue-600',
    green: 'from-green-500 to-green-600',
    purple: 'from-purple-500 to-purple-600',
    orange: 'from-orange-500 to-orange-600',
    red: 'from-red-500 to-red-600',
  };

  const getFieldDescription = (sectionCode, fieldIndex) => {
    const descriptions = {
      L1: [
        'Teaching methodology and innovation',
        'Course content development',
        'Student assessment techniques',
        'Classroom management skills',
        'Use of educational technology',
        'Student feedback and improvement'
      ],
      L2: [
        'Research publications',
        'Conference presentations',
        'Research grants received',
        'Patent applications',
        'Industry collaborations',
        'Research supervision',
        'Consultancy projects',
        'Research impact metrics',
        'International collaborations'
      ],
      L3: [
        'Professional certifications',
        'Workshop attendance',
        'Skill development programs',
        'Industry training',
        'Academic conferences',
        'Professional memberships',
        'Continuing education',
        'Leadership development',
        'Technical skill enhancement'
      ],
      L4: [
        'Committee participation',
        'Administrative responsibilities',
        'Institutional service',
        'Academic governance',
        'Policy development',
        'Strategic planning'
      ],
      L5: [
        'Student mentoring',
        'Career guidance',
        'Extracurricular activities',
        'Student project supervision',
        'Student welfare initiatives'
      ]
    };
    
    return descriptions[sectionCode]?.[fieldIndex - 1] || `${sectionCode}.${fieldIndex} Documentation`;
  };

  return (
    <AnimatedCard className="overflow-hidden">
      {/* Header */}
      <div className={`bg-gradient-to-r ${colorClasses[color]} p-6 text-white`}>
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-white/20 rounded-lg">
            <Icon className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">{sectionCode}: {sectionTitle}</h2>
            <p className="text-white/90">
              Provide documentation links for each criterion below
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {submitted && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg flex items-start space-x-3"
          >
            <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
            <div>
              <h4 className="font-semibold text-yellow-800">Read-Only Mode</h4>
              <p className="text-yellow-700 text-sm">
                This section has been submitted and cannot be modified.
              </p>
            </div>
          </motion.div>
        )}

        <div className="grid gap-6">
          {Array.from({ length: fields }).map((_, i) => {
            const fieldIndex = i + 1;
            const name = `${sectionCode.toLowerCase()}_${fieldIndex}`;
            const value = formData[name] || '';
            const hasValue = value.trim().length > 0;

            return (
              <motion.div
                key={name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`p-4 border-2 rounded-lg transition-all duration-200 ${
                  hasValue 
                    ? 'border-green-200 bg-green-50' 
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                <div className="flex items-start space-x-3 mb-3">
                  <div className={`p-2 rounded-lg ${hasValue ? 'bg-green-100' : 'bg-gray-100'}`}>
                    {hasValue ? (
                      <FileText className="w-5 h-5 text-green-600" />
                    ) : (
                      <Link className="w-5 h-5 text-gray-400" />
                    )}
                  </div>
                  <div className="flex-1">
                    <label className="block font-semibold text-gray-900 mb-1">
                      {sectionCode}.{fieldIndex} - {getFieldDescription(sectionCode, fieldIndex)}
                    </label>
                    <p className="text-sm text-gray-600 mb-3">
                      Provide a valid URL link to your supporting documentation or evidence.
                    </p>
                  </div>
                </div>

                <div className="relative">
                  <input
                    type="url"
                    name={name}
                    value={value}
                    onChange={handleChange}
                    disabled={submitted}
                    className={`w-full px-4 py-3 border rounded-lg transition-all duration-200 ${
                      submitted 
                        ? 'bg-gray-50 text-gray-500 cursor-not-allowed' 
                        : 'bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                    } ${hasValue ? 'border-green-300' : 'border-gray-300'}`}
                    placeholder={`Enter URL for ${sectionCode}.${fieldIndex} documentation`}
                  />
                  
                  {hasValue && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    >
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    </motion.div>
                  )}
                </div>

                {hasValue && value.startsWith('http') && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mt-3"
                  >
                    <a
                      href={value}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 text-sm font-medium"
                    >
                      <Link className="w-4 h-4" />
                      <span>View Documentation</span>
                    </a>
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Section Summary */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 p-4 bg-gray-50 rounded-lg"
        >
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold text-gray-900">Section Progress</h4>
              <p className="text-gray-600 text-sm">
                {Object.values(formData).filter(val => 
                  val && val.toString().includes(sectionCode.toLowerCase())
                ).length} of {fields} fields completed
              </p>
            </div>
            <div className="text-right">
              <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                Object.values(formData).filter(val => 
                  val && val.toString().includes(sectionCode.toLowerCase())
                ).length === fields
                  ? 'bg-green-100 text-green-800'
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                {Object.values(formData).filter(val => 
                  val && val.toString().includes(sectionCode.toLowerCase())
                ).length === fields ? 'Complete' : 'In Progress'}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatedCard>
  );
};

export default SectionForm;