import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, LogOut, Save, CheckCircle, Clock, FileText, 
  Award, TrendingUp, Calendar, Target, BookOpen,
  Users, Briefcase, Star, BarChart3
} from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import Confetti from 'react-confetti';
import AnimatedBackground from './AnimatedBackground';
import AnimatedCard from './AnimatedCard';
import AnimatedButton from './AnimatedButton';
import StatsCard from './StatsCard';
import ProgressBar from './ProgressBar';
import SectionForm from './SectionForm';

const FacultyDashboard = () => {
  const navigate = useNavigate();
  const facultyId = localStorage.getItem('userId');
  const currentYear = new Date().getFullYear();

  const [formData, setFormData] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');
  const [showConfetti, setShowConfetti] = useState(false);
  const [activeSection, setActiveSection] = useState(0);
  const [completionStats, setCompletionStats] = useState({});

  const sections = [
    { code: 'L1', title: 'Teaching & Learning', fields: 6, icon: BookOpen, color: 'blue' },
    { code: 'L2', title: 'Research & Consultancy', fields: 9, icon: Award, color: 'green' },
    { code: 'L3', title: 'Professional Development', fields: 9, icon: TrendingUp, color: 'purple' },
    { code: 'L4', title: 'Contribution to Institute', fields: 6, icon: Briefcase, color: 'orange' },
    { code: 'L5', title: 'Student Development', fields: 5, icon: Users, color: 'red' }
  ];

  useEffect(() => {
    if (!facultyId) return;
    fetchExistingData();
  }, [facultyId, currentYear]);

  useEffect(() => {
    calculateCompletionStats();
  }, [formData]);

  const fetchExistingData = async () => {
    try {
      const res = await fetch(`http://localhost:3001/api/faculty/proof/${facultyId}?year=${currentYear}`);
      const data = await res.json();
      if (res.ok && data) {
        setFormData(data);
        setSubmitted(true);
        toast.success('Previous submission loaded successfully!', { icon: '📋' });
      }
    } catch (err) {
      console.error('Error fetching existing submission:', err);
    }
  };

  const calculateCompletionStats = () => {
    const stats = {};
    let totalFields = 0;
    let completedFields = 0;

    sections.forEach(section => {
      let sectionCompleted = 0;
      for (let i = 1; i <= section.fields; i++) {
        const fieldName = `${section.code.toLowerCase()}_${i}`;
        totalFields++;
        if (formData[fieldName] && formData[fieldName].trim()) {
          sectionCompleted++;
          completedFields++;
        }
      }
      stats[section.code] = {
        completed: sectionCompleted,
        total: section.fields,
        percentage: (sectionCompleted / section.fields) * 100
      };
    });

    stats.overall = {
      completed: completedFields,
      total: totalFields,
      percentage: (completedFields / totalFields) * 100
    };

    setCompletionStats(stats);
  };

  const handleChange = (e) => {
    if (submitted) return;
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitted) return;

    try {
      const res = await fetch('http://localhost:3001/api/faculty/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ faculty_id: facultyId, year: currentYear, ...formData }),
      });
      
      const data = await res.json();
      
      if (res.ok) {
        setSubmitStatus('Submission successful!');
        setSubmitted(true);
        setShowConfetti(true);
        
        toast.success('🎉 Performance data submitted successfully!', {
          duration: 4000,
        });
        
        setTimeout(() => setShowConfetti(false), 5000);
      } else {
        setSubmitStatus(data.message || 'Submission failed.');
        toast.error('Submission failed. Please try again.');
      }
    } catch (err) {
      console.error(err);
      setSubmitStatus('Server error.');
      toast.error('Server error. Please try again.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('userType');
    localStorage.removeItem('isAuthenticated');
    toast.success('Logged out successfully!');
    navigate('/');
  };

  const getOverallProgress = () => {
    return completionStats.overall?.percentage || 0;
  };

  return (
    <div className="min-h-screen bg-gray-50 relative">
      <AnimatedBackground />
      <Toaster position="top-right" />
      
      {showConfetti && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
          numberOfPieces={200}
        />
      )}

      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/80 backdrop-blur-lg shadow-lg border-b border-white/20 sticky top-0 z-50"
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <motion.div
              className="flex items-center space-x-4"
              whileHover={{ scale: 1.02 }}
            >
              <div className="p-2 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg text-white">
                <User className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Welcome, {facultyId}</h1>
                <p className="text-gray-600">Academic Year {currentYear}</p>
              </div>
            </motion.div>
            
            <div className="flex items-center space-x-4">
              <motion.div
                className="text-right"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <p className="text-sm text-gray-600">Overall Progress</p>
                <p className="text-lg font-bold text-blue-600">{Math.round(getOverallProgress())}%</p>
              </motion.div>
              
              <AnimatedButton
                onClick={handleLogout}
                variant="danger"
                icon={LogOut}
                className="shadow-lg"
              >
                Logout
              </AnimatedButton>
            </div>
          </div>
        </div>
      </motion.header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Status Alert */}
        <AnimatePresence>
          {submitted && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -20 }}
              className="mb-8 p-6 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl"
            >
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-6 h-6 text-green-600" />
                <div>
                  <h3 className="font-semibold text-green-800">Submission Complete</h3>
                  <p className="text-green-700">You have successfully submitted your performance data for {currentYear}.</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Overall Progress"
            value={`${Math.round(getOverallProgress())}%`}
            icon={Target}
            color="blue"
            trend={getOverallProgress() > 75 ? 'up' : getOverallProgress() > 50 ? 'neutral' : 'down'}
            change={submitted ? 'Completed' : 'In Progress'}
          />
          <StatsCard
            title="Sections Completed"
            value={`${Object.values(completionStats).filter(stat => stat.percentage === 100).length - 1}/${sections.length}`}
            icon={CheckCircle}
            color="green"
          />
          <StatsCard
            title="Total Fields"
            value={completionStats.overall?.total || 35}
            icon={FileText}
            color="purple"
          />
          <StatsCard
            title="Status"
            value={submitted ? 'Submitted' : 'Draft'}
            icon={submitted ? CheckCircle : Clock}
            color={submitted ? 'green' : 'orange'}
          />
        </div>

        {/* Progress Overview */}
        <AnimatedCard className="p-6 mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
            <BarChart3 className="w-6 h-6 mr-3 text-blue-600" />
            Section Progress Overview
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sections.map((section, index) => (
              <motion.div
                key={section.code}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <ProgressBar
                  progress={completionStats[section.code]?.percentage || 0}
                  label={section.title}
                  color={section.color}
                />
              </motion.div>
            ))}
          </div>
        </AnimatedCard>

        {/* Section Navigation */}
        <AnimatedCard className="p-6 mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Performance Sections</h3>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {sections.map((section, index) => {
              const stats = completionStats[section.code];
              const isComplete = stats?.percentage === 100;
              
              return (
                <motion.button
                  key={section.code}
                  onClick={() => setActiveSection(index)}
                  className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                    activeSection === index
                      ? 'border-blue-500 bg-blue-50'
                      : isComplete
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center justify-center mb-2">
                    <section.icon className={`w-6 h-6 ${
                      activeSection === index
                        ? 'text-blue-600'
                        : isComplete
                        ? 'text-green-600'
                        : 'text-gray-400'
                    }`} />
                  </div>
                  <h4 className="font-semibold text-sm text-center mb-1">{section.title}</h4>
                  <p className="text-xs text-gray-600 text-center">
                    {stats?.completed || 0}/{section.fields} fields
                  </p>
                  {isComplete && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="flex justify-center mt-2"
                    >
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    </motion.div>
                  )}
                </motion.button>
              );
            })}
          </div>
        </AnimatedCard>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
            >
              <SectionForm
                sectionCode={sections[activeSection].code}
                sectionTitle={sections[activeSection].title}
                fields={sections[activeSection].fields}
                formData={formData}
                handleChange={handleChange}
                submitted={submitted}
                icon={sections[activeSection].icon}
                color={sections[activeSection].color}
              />
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <AnimatedCard className="p-6">
            <div className="flex justify-between items-center">
              <AnimatedButton
                type="button"
                variant="outline"
                onClick={() => setActiveSection(Math.max(0, activeSection - 1))}
                disabled={activeSection === 0}
              >
                Previous Section
              </AnimatedButton>

              <div className="flex space-x-4">
                {activeSection < sections.length - 1 ? (
                  <AnimatedButton
                    type="button"
                    variant="secondary"
                    onClick={() => setActiveSection(Math.min(sections.length - 1, activeSection + 1))}
                  >
                    Next Section
                  </AnimatedButton>
                ) : (
                  <AnimatedButton
                    type="submit"
                    variant="success"
                    disabled={submitted}
                    icon={submitted ? CheckCircle : Save}
                    className="shadow-lg"
                  >
                    {submitted ? 'Already Submitted' : 'Submit All Sections'}
                  </AnimatedButton>
                )}
              </div>
            </div>
          </AnimatedCard>

          {submitStatus && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <p className={`font-medium ${submitted ? 'text-green-600' : 'text-red-600'}`}>
                {submitStatus}
              </p>
            </motion.div>
          )}
        </form>
      </div>
    </div>
  );
};

export default FacultyDashboard;