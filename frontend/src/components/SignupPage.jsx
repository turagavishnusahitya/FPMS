import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, User, Lock, GraduationCap, Shield, ArrowRight, Mail, Calendar, Building } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import AnimatedBackground from './AnimatedBackground';
import AnimatedButton from './AnimatedButton';
import LoadingSpinner from './LoadingSpinner';

const SignupPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('faculty');
  const [showPassword, setShowPassword] = useState({ faculty: false, admin: false });
  const [showConfirmPassword, setShowConfirmPassword] = useState({ faculty: false, admin: false });
  const [loading, setLoading] = useState({ faculty: false, admin: false });
  const [formData, setFormData] = useState({
    faculty: {
      faculty_id: '',
      email: '',
      password: '',
      confirmPassword: '',
      security_code: '',
      department: '',
      designation: '',
      joining_date: ''
    },
    admin: {
      admin_id: '',
      email: '',
      password: '',
      confirmPassword: '',
      security_code: '',
      role: '',
      department: ''
    }
  });

  const departments = [
    'Computer Science',
    'Information Technology',
    'Electronics & Communication',
    'Mechanical Engineering',
    'Civil Engineering',
    'Electrical Engineering',
    'Mathematics',
    'Physics',
    'Chemistry',
    'Management Studies'
  ];

  const designations = [
    'Assistant Professor',
    'Associate Professor',
    'Professor',
    'Senior Professor',
    'Lecturer',
    'Senior Lecturer'
  ];

  const adminRoles = [
    'Department Head',
    'Dean',
    'Vice Chancellor',
    'Registrar',
    'Academic Coordinator',
    'Research Coordinator'
  ];

  const handleInputChange = (type, field, value) => {
    setFormData(prev => ({
      ...prev,
      [type]: { ...prev[type], [field]: value }
    }));
  };

  const validateForm = (type) => {
    const data = formData[type];
    
    if (!data.email || !data.email.includes('@')) {
      toast.error('Please enter a valid email address');
      return false;
    }
    
    if (data.password.length < 6) {
      toast.error('Password must be at least 6 characters long');
      return false;
    }
    
    if (data.password !== data.confirmPassword) {
      toast.error('Passwords do not match');
      return false;
    }
    
    if (!data.security_code || data.security_code.length < 4) {
      toast.error('Security code must be at least 4 characters');
      return false;
    }

    if (type === 'faculty') {
      if (!data.faculty_id || !data.department || !data.designation || !data.joining_date) {
        toast.error('Please fill in all required fields');
        return false;
      }
    } else {
      if (!data.admin_id || !data.role || !data.department) {
        toast.error('Please fill in all required fields');
        return false;
      }
    }
    
    return true;
  };

  const handleSignup = async (type) => {
    if (!validateForm(type)) return;
    
    setLoading(prev => ({ ...prev, [type]: true }));
    
    try {
      // Since there's no signup endpoint in the backend, we'll simulate the signup process
      // In a real application, you would create the signup endpoints in the backend
      
      const data = formData[type];
      const { confirmPassword, ...signupData } = data;
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // For now, we'll show success and redirect to login
      toast.success(`${type === 'faculty' ? 'Faculty' : 'Admin'} account created successfully!`, {
        icon: '🎉',
        duration: 3000,
      });
      
      setTimeout(() => {
        navigate('/');
      }, 1500);
      
    } catch (err) {
      console.error(err);
      toast.error('Signup failed. Please try again.', {
        icon: '❌',
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
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden py-8">
      <AnimatedBackground />
      <Toaster position="top-right" />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl mx-4 relative z-10"
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
              Create Account
            </h1>
          </motion.div>
          <p className="text-gray-600 text-lg">Join the Faculty Performance Management System</p>
        </motion.div>

        <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 overflow-hidden">
          {/* Tab Navigation */}
          <div className="flex bg-gray-50/50">
            {[
              { key: 'faculty', label: 'Faculty Signup', icon: User, color: 'blue' },
              { key: 'admin', label: 'Admin Signup', icon: Shield, color: 'purple' }
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
                      handleSignup(type);
                    }}
                    className="space-y-6 max-w-2xl mx-auto"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* ID Input */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                      >
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {type === 'faculty' ? 'Faculty ID' : 'Admin ID'} *
                        </label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                          <input
                            type="text"
                            value={formData[type][type === 'faculty' ? 'faculty_id' : 'admin_id']}
                            onChange={(e) => handleInputChange(type, type === 'faculty' ? 'faculty_id' : 'admin_id', e.target.value)}
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                            placeholder={type === 'faculty' ? 'e.g., VIT0021' : 'e.g., ADM001'}
                            required
                          />
                        </div>
                      </motion.div>

                      {/* Email Input */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email Address *
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                          <input
                            type="email"
                            value={formData[type].email}
                            onChange={(e) => handleInputChange(type, 'email', e.target.value)}
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                            placeholder="Enter your email"
                            required
                          />
                        </div>
                      </motion.div>

                      {/* Password Input */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                      >
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Password *
                        </label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                          <input
                            type={showPassword[type] ? 'text' : 'password'}
                            value={formData[type].password}
                            onChange={(e) => handleInputChange(type, 'password', e.target.value)}
                            className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                            placeholder="Enter password"
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

                      {/* Confirm Password Input */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                      >
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Confirm Password *
                        </label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                          <input
                            type={showConfirmPassword[type] ? 'text' : 'password'}
                            value={formData[type].confirmPassword}
                            onChange={(e) => handleInputChange(type, 'confirmPassword', e.target.value)}
                            className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                            placeholder="Confirm password"
                            required
                          />
                          <button
                            type="button"
                            onClick={() => setShowConfirmPassword(prev => ({ ...prev, [type]: !prev[type] }))}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          >
                            {showConfirmPassword[type] ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                          </button>
                        </div>
                      </motion.div>

                      {/* Security Code */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                      >
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Security Code *
                        </label>
                        <input
                          type="text"
                          value={formData[type].security_code}
                          onChange={(e) => handleInputChange(type, 'security_code', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                          placeholder="Enter security code"
                          required
                        />
                      </motion.div>

                      {/* Department */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                      >
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Department *
                        </label>
                        <div className="relative">
                          <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                          <select
                            value={formData[type].department}
                            onChange={(e) => handleInputChange(type, 'department', e.target.value)}
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                            required
                          >
                            <option value="">Select Department</option>
                            {departments.map((dept) => (
                              <option key={dept} value={dept}>{dept}</option>
                            ))}
                          </select>
                        </div>
                      </motion.div>

                      {/* Faculty-specific fields */}
                      {type === 'faculty' && (
                        <>
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7 }}
                          >
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Designation *
                            </label>
                            <select
                              value={formData[type].designation}
                              onChange={(e) => handleInputChange(type, 'designation', e.target.value)}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                              required
                            >
                              <option value="">Select Designation</option>
                              {designations.map((designation) => (
                                <option key={designation} value={designation}>{designation}</option>
                              ))}
                            </select>
                          </motion.div>

                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8 }}
                          >
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Joining Date *
                            </label>
                            <div className="relative">
                              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                              <input
                                type="date"
                                value={formData[type].joining_date}
                                onChange={(e) => handleInputChange(type, 'joining_date', e.target.value)}
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                required
                              />
                            </div>
                          </motion.div>
                        </>
                      )}

                      {/* Admin-specific fields */}
                      {type === 'admin' && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.7 }}
                        >
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Role *
                          </label>
                          <select
                            value={formData[type].role}
                            onChange={(e) => handleInputChange(type, 'role', e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                            required
                          >
                            <option value="">Select Role</option>
                            {adminRoles.map((role) => (
                              <option key={role} value={role}>{role}</option>
                            ))}
                          </select>
                        </motion.div>
                      )}
                    </div>

                    {/* Signup Button */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.9 }}
                      className="pt-4"
                    >
                      <AnimatedButton
                        type="submit"
                        variant={type === 'faculty' ? 'primary' : 'secondary'}
                        size="lg"
                        loading={loading[type]}
                        icon={ArrowRight}
                        className="w-full"
                        disabled={loading[type]}
                      >
                        {loading[type] ? 'Creating Account...' : `Create ${type === 'faculty' ? 'Faculty' : 'Admin'} Account`}
                      </AnimatedButton>
                    </motion.div>

                    {/* Login Link */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.0 }}
                      className="text-center"
                    >
                      <p className="text-gray-600">
                        Already have an account?{' '}
                        <Link
                          to="/"
                          className={`${type === 'faculty' ? 'text-blue-600 hover:text-blue-700' : 'text-purple-600 hover:text-purple-700'} font-medium transition-colors duration-200`}
                        >
                          Sign in here
                        </Link>
                      </p>
                    </motion.div>
                  </motion.form>
                )
              ))}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SignupPage;