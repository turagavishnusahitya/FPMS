import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield, LogOut, Users, FileText, Award, Search,
  Filter, Download, Eye, Edit, Save, X, Check,
  TrendingUp, BarChart3, PieChart, Calendar
} from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import AnimatedBackground from './AnimatedBackground';
import AnimatedCard from './AnimatedCard';
import AnimatedButton from './AnimatedButton';
import StatsCard from './StatsCard';
import LoadingSpinner from './LoadingSpinner';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const adminId = localStorage.getItem('adminId');
  const currentYear = new Date().getFullYear();

  const [facultyList, setFacultyList] = useState([]);
  const [selectedFaculty, setSelectedFaculty] = useState(null);
  const [proofData, setProofData] = useState({});
  const [scores, setScores] = useState({});
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showScoreModal, setShowScoreModal] = useState(false);

  const scoreCategories = [
    { prefix: 'a1', name: 'Teaching & Learning', count: 6, color: 'blue' },
    { prefix: 'a2', name: 'Research & Consultancy', count: 9, color: 'green' },
    { prefix: 'a3', name: 'Professional Development', count: 9, color: 'purple' },
    { prefix: 'a4', name: 'Contribution to Institute', count: 6, color: 'orange' },
    { prefix: 'a5', name: 'Student Development', count: 5, color: 'red' }
  ];

  useEffect(() => {
    fetchFacultyList();
  }, []);

  const fetchFacultyList = async () => {
    try {
      const res = await fetch('http://localhost:3001/api/admin/faculty-submissions');
      const data = await res.json();
      setFacultyList(data);
      setLoading(false);
    } catch (err) {
      console.error('Fetch faculty error:', err);
      toast.error('Error fetching faculty list');
      setLoading(false);
    }
  };

  const handleSelectFaculty = async (faculty_id) => {
    setSelectedFaculty(faculty_id);
    setLoading(true);
    
    try {
      const res = await fetch(`http://localhost:3001/api/admin/proofs/${faculty_id}?year=${currentYear}`);
      const data = await res.json();
      setProofData(data || {});
      setScores({});
      setLoading(false);
    } catch (err) {
      console.error('Fetch proof error:', err);
      toast.error('Error fetching proof data');
      setLoading(false);
    }
  };

  const handleScoreChange = (e) => {
    const { name, value } = e.target;
    setScores(prev => ({ ...prev, [name]: parseInt(value) || 0 }));
  };

  const handleSubmitScore = async () => {
    if (!selectedFaculty) return;

    const payload = {
      faculty_id: selectedFaculty,
      year: currentYear,
      scored_by: adminId,
      ...scores,
    };

    try {
      const res = await fetch('http://localhost:3001/api/admin/submit-score', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      
      if (res.ok) {
        toast.success('🎉 Scores submitted successfully!');
        setShowScoreModal(false);
        setScores({});
      } else {
        toast.error(data.message || 'Submission failed');
      }
    } catch (err) {
      console.error('Submit score error:', err);
      toast.error('Server error occurred');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminId');
    localStorage.removeItem('userType');
    localStorage.removeItem('isAuthenticated');
    toast.success('Logged out successfully!');
    navigate('/');
  };

  const filteredFaculty = facultyList.filter(faculty => 
    faculty.faculty_id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getTotalScore = () => {
    return Object.values(scores).reduce((sum, score) => sum + (score || 0), 0);
  };

  if (loading && !selectedFaculty) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="xl" text="Loading admin dashboard..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 relative">
      <AnimatedBackground />
      <Toaster position="top-right" />

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
              <div className="p-2 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg text-white">
                <Shield className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
                <p className="text-gray-600">Welcome, {adminId}</p>
              </div>
            </motion.div>
            
            <AnimatedButton
              onClick={handleLogout}
              variant="danger"
              icon={LogOut}
            >
              Logout
            </AnimatedButton>
          </div>
        </div>
      </motion.header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Total Faculty"
            value={facultyList.length}
            icon={Users}
            color="blue"
          />
          <StatsCard
            title="Submissions"
            value={facultyList.length}
            icon={FileText}
            color="green"
          />
          <StatsCard
            title="Pending Reviews"
            value={facultyList.length}
            icon={Award}
            color="orange"
          />
          <StatsCard
            title="Academic Year"
            value={currentYear}
            icon={Calendar}
            color="purple"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Faculty List */}
          <AnimatedCard className="lg:col-span-1">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900 flex items-center">
                  <Users className="w-6 h-6 mr-3 text-blue-600" />
                  Faculty Submissions
                </h3>
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                  {filteredFaculty.length}
                </span>
              </div>

              {/* Search */}
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search faculty..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Faculty List */}
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {filteredFaculty.map((faculty, index) => (
                  <motion.button
                    key={faculty.faculty_id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => handleSelectFaculty(faculty.faculty_id)}
                    className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 ${
                      selectedFaculty === faculty.faculty_id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300 bg-white'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold text-gray-900">{faculty.faculty_id}</h4>
                        <p className="text-sm text-gray-600">Performance Data</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-xs text-gray-500">Submitted</span>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
          </AnimatedCard>

          {/* Faculty Details */}
          <AnimatedCard className="lg:col-span-2">
            <div className="p-6">
              {selectedFaculty ? (
                <>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-gray-900">
                      Performance Review: {selectedFaculty}
                    </h3>
                    <div className="flex space-x-3">
                      <AnimatedButton
                        onClick={() => setShowScoreModal(true)}
                        variant="primary"
                        icon={Edit}
                        size="sm"
                      >
                        Score Faculty
                      </AnimatedButton>
                      <AnimatedButton
                        variant="outline"
                        icon={Download}
                        size="sm"
                      >
                        Export
                      </AnimatedButton>
                    </div>
                  </div>

                  {loading ? (
                    <div className="flex justify-center py-12">
                      <LoadingSpinner text="Loading faculty data..." />
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {/* Proof Links */}
                      <div className="bg-gray-50 rounded-lg p-4">
                        <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                          <FileText className="w-5 h-5 mr-2 text-blue-600" />
                          Submitted Documentation
                        </h4>
                        <div className="grid gap-3">
                          {Object.entries(proofData)
                            .filter(([key]) => key.startsWith('l'))
                            .map(([key, value]) => (
                              <motion.div
                                key={key}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="flex items-center justify-between p-3 bg-white rounded-lg border"
                              >
                                <div>
                                  <span className="font-medium text-gray-900">
                                    {key.toUpperCase()}
                                  </span>
                                  <p className="text-sm text-gray-600 truncate max-w-md">
                                    {value}
                                  </p>
                                </div>
                                <a
                                  href={value}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center space-x-1 text-blue-600 hover:text-blue-700"
                                >
                                  <Eye className="w-4 h-4" />
                                  <span className="text-sm">View</span>
                                </a>
                              </motion.div>
                            ))}
                        </div>
                      </div>

                      {/* Performance Categories */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {scoreCategories.map((category, index) => (
                          <motion.div
                            key={category.prefix}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                            className="p-4 border border-gray-200 rounded-lg"
                          >
                            <h5 className="font-semibold text-gray-900 mb-2">
                              {category.name}
                            </h5>
                            <p className="text-sm text-gray-600">
                              {category.count} criteria to evaluate
                            </p>
                            <div className="mt-2">
                              <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-${category.color}-100 text-${category.color}-800`}>
                                Pending Review
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-12">
                  <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Select a Faculty Member
                  </h3>
                  <p className="text-gray-600">
                    Choose a faculty member from the list to review their performance data.
                  </p>
                </div>
              )}
            </div>
          </AnimatedCard>
        </div>
      </div>

      {/* Score Modal */}
      <AnimatePresence>
        {showScoreModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-gray-900">
                    Score Faculty: {selectedFaculty}
                  </h3>
                  <button
                    onClick={() => setShowScoreModal(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                  {scoreCategories.map((category) => (
                    <div key={category.prefix} className="space-y-3">
                      <h4 className="font-semibold text-gray-900 border-b pb-2">
                        {category.name}
                      </h4>
                      {Array.from({ length: category.count }, (_, i) => (
                        <div key={`${category.prefix}_${i + 1}`}>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            {category.prefix.toUpperCase()}.{i + 1}
                          </label>
                          <input
                            type="number"
                            name={`${category.prefix}_${i + 1}`}
                            min="0"
                            max="100"
                            onChange={handleScoreChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Score (0-100)"
                          />
                        </div>
                      ))}
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                  <div>
                    <p className="text-lg font-semibold text-gray-900">
                      Total Score: {getTotalScore()}
                    </p>
                    <p className="text-sm text-gray-600">
                      Out of {scoreCategories.reduce((sum, cat) => sum + cat.count, 0) * 100} possible points
                    </p>
                  </div>
                  <div className="flex space-x-3">
                    <AnimatedButton
                      onClick={() => setShowScoreModal(false)}
                      variant="outline"
                    >
                      Cancel
                    </AnimatedButton>
                    <AnimatedButton
                      onClick={handleSubmitScore}
                      variant="success"
                      icon={Save}
                    >
                      Submit Scores
                    </AnimatedButton>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminDashboard;