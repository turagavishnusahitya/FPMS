import React, { useState } from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, User, Lock, GraduationCap, Shield, ArrowRight, UserPlus } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import AnimatedBackground from './AnimatedBackground';
import AnimatedButton from './AnimatedButton';
import LoadingSpinner from './LoadingSpinner';

const LoginPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('faculty');
  const [showPassword, setShowPassword] = useState({ faculty: false, admin: false });
  const [loading, setLoading] = useState({ faculty: false, admin: false });
  const [formData, setFormData] = useState({
    faculty: { id: '', password: '' },
    admin: { id: '', password: '' }
  });

  // Redirect if already authenticated
  const isAuthenticated = localStorage.getItem('isAuthenticated');
  const userType = localStorage.getItem('userType');

  if (isAuthenticated && userType === 'faculty') return <Navigate to="/faculty" replace />;
  if (isAuthenticated && userType === 'admin') return <Navigate to="/admin" replace />;

  const handleInputChange = (type, field, value) => {
    setFormData(prev => ({
      ...prev,
      [type]: { ...prev[type], [field]: value }
    }));
  };

  const handleLogin = async (type) => {
    setLoading(prev => ({ ...prev, [type]: true }));
    
    try {
      const endpoint = type === 'faculty' ? '/api/faculty/login' : '/api/admin/login';
      const payload = type === 'faculty' 
        ? { login_id: formData.faculty.id, password: formData.faculty.password }
        : { admin_id: formData.admin.id, password: formData.admin.password };

      const res = await fetch(`http://localhost:3001${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      
      if (res.ok) {
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userType', type);
        localStorage.setItem(type === 'faculty' ? 'userId' : 'adminId', formData[type].id);
        
        toast.success(`Welcome back! Redirecting to ${type} dashboard...`, {
          icon: '🎉',
          duration: 2000,
        });
        
        setTimeout(() => {
          navigate(`/${type}`);
        }, 1000);
      } else {
        toast.error(data.message || `${type} login failed`, {
          icon: '❌',
        });
      }
    } catch (err) {
      console.error(err);
      toast.error('Server error. Please try again.', {
        icon: '🔥',
      });
    } finally {
      setLoading(prev => ({ ...prev, [type]: false }));
    }
  };

  const tabVariants = {
    inactive: { scale: 0.95, opacity: 0.7 },
    active: { scale: 1, opacity: 1 }
  };

  const formVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <AnimatedBackground />
      <Toaster position="top-right" />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-6xl mx-4 relative z-10"
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-8"
        >
          <motion.div
            className="inline-flex items-center space-x-3 mb-4"
            whileHover={{ scale: 1.05 }}
          >
            <div className="p-3 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl text-white">
              <GraduationCap className="w-8 h-8" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Faculty Performance Management System
            </h1>
          </motion.div>
          <p className="text-gray-600 text-lg">Empowering academic excellence through comprehensive performance tracking</p>
        </motion.div>

        <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 overflow-hidden">
          {/* Tab Navigation */}
          <div className="flex bg-gray-50/50">
            {[
              { key: 'faculty', label: 'Faculty Login', icon: User, color: 'blue' },
              { key: 'admin', label: 'Admin Login', icon: Shield, color: 'purple' }
            ].map((tab) => (
              <motion.button
                key={tab.key}
                variants={tabVariants}
                animate={activeTab === tab.key ? 'active' : 'inactive'}
                onClick={() => setActiveTab(tab.key)}
                className={`flex-1 p-6 flex items-center justify-center space-x-3 font-semibold transition-all duration-300 ${
                  activeTab === tab.key
                    ? `text-${tab.color}-600 bg-white shadow-lg border-b-2 border-${tab.color}-600`
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
              >
                <tab.icon className="w-5 h-5" />
                <span>{tab.label}</span>
              </motion.button>
            ))}
          </div>

          {/* Form Content */}
          <div className="p-8">
            <AnimatePresence mode="wait">
              {['faculty', 'admin'].map((type) => (
                activeTab === type && (
                  <motion.form
                    key={type}
                    variants={formVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    transition={{ duration: 0.3 }}
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleLogin(type);
                    }}
                    className="space-y-6 max-w-md mx-auto"
                  >
                    {/* ID Input */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {type === 'faculty' ? 'Faculty ID' : 'Admin ID'}
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="text"
                          value={formData[type].id}
                          onChange={(e) => handleInputChange(type, 'id', e.target.value)}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                          placeholder={type === 'faculty' ? 'Enter Faculty ID (e.g. VIT0021)' : 'Enter Admin ID'}
                          required
                        />
                      </div>
                    </motion.div>

                    {/* Password Input */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Password
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type={showPassword[type] ? 'text' : 'password'}
                          value={formData[type].password}
                          onChange={(e) => handleInputChange(type, 'password', e.target.value)}
                          className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                          placeholder="Enter your password"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(prev => ({ ...prev, [type]: !prev[type] }))}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showPassword[type] ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                    </motion.div>

                    {/* Login Button */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <AnimatedButton
                        type="submit"
                        variant={type === 'faculty' ? 'primary' : 'secondary'}
                        size="lg"
                        loading={loading[type]}
                        icon={ArrowRight}
                        className="w-full"
                        disabled={!formData[type].id || !formData[type].password}
                      >
                        {loading[type] ? 'Signing In...' : `Sign In as ${type === 'faculty' ? 'Faculty' : 'Admin'}`}
                      </AnimatedButton>
                    </motion.div>

                    {/* Forgot Password Link */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                      className="text-center"
                    >
                      <Link
                        to={`/${type}/forgot-password`}
                        className={`text-sm ${type === 'faculty' ? 'text-blue-600 hover:text-blue-700' : 'text-purple-600 hover:text-purple-700'} font-medium transition-colors duration-200`}
                      >
                        Forgot your password?
                      </Link>
                    </motion.div>

                    {/* Signup Link */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      className="text-center pt-4 border-t border-gray-200"
                    >
                      <p className="text-gray-600 mb-3">
                        Don't have an account?
                      </p>
                      <Link to="/signup">
                        <AnimatedButton
                          variant="outline"
                          icon={UserPlus}
                          className="w-full"
                        >
                          Create New Account
                        </AnimatedButton>
                      </Link>
                    </motion.div>
                  </motion.form>
                )
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {[
            { title: 'Performance Tracking', desc: 'Comprehensive evaluation across 5 key areas', icon: '📊' },
            { title: 'Real-time Analytics', desc: 'Interactive dashboards and progress monitoring', icon: '📈' },
            { title: 'Secure & Reliable', desc: 'Enterprise-grade security and data protection', icon: '🔒' }
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 + index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-white/60 backdrop-blur-sm rounded-xl p-6 text-center border border-white/20"
            >
              <div className="text-3xl mb-3">{feature.icon}</div>
              <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LoginPage;