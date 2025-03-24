import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring, useMotionValueEvent } from 'framer-motion';
import { Search, ArrowRight, Database, Brain, Clock, ChevronDown, Newspaper, FlaskRound as Flask, Tag, MessageCircle, X, Sparkles, Lightbulb } from 'lucide-react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import { ThemeToggle } from './components/ThemeToggle';
import { ActivationPage } from './components/ActivationPage';
import { ChatInterface } from './components/ChatInterface';
import { Toaster } from 'react-hot-toast';

function FeatureCard({ icon, title, description, isDarkMode, delay }) {
  return (
    <motion.div
      className={`p-6 sm:p-8 rounded-xl border ${
        isDarkMode 
          ? 'border-gray-800 bg-gray-900/50' 
          : 'border-gray-200 bg-white/50'
      } backdrop-blur-sm hover:border-purple-500/50 h-full`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ 
        y: -5, 
        boxShadow: "0 10px 30px rgba(147, 51, 234, 0.2)",
        transition: { duration: 0.2 }
      }}
    >
      <motion.div 
        className="mb-4"
        whileHover={{ scale: 1.1, rotate: 5 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        {icon}
      </motion.div>
      <h3 className={`text-xl font-semibold mb-4 ${
        isDarkMode ? 'text-white' : 'text-gray-900'
      }`}>{title}</h3>
      <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>{description}</p>
    </motion.div>
  );
}

function HomePage({ isDarkMode, setIsDarkMode }) {
  const [mainSearchQuery, setMainSearchQuery] = useState('');
  const [keywordSearchQuery, setKeywordSearchQuery] = useState('');
  const [selectedSource, setSelectedSource] = useState('all');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isNavVisible, setIsNavVisible] = useState(true);
  const navigate = useNavigate();

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const currentScroll = latest;
    setIsNavVisible(currentScroll < lastScrollY || currentScroll < 100);
    setLastScrollY(currentScroll);
  });

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const sources = [
    { value: 'all', label: 'All Sources', icon: Database },
    { value: 'pubmed', label: 'PubMed', icon: Flask },
    { value: 'scopus', label: 'Scopus', icon: Newspaper },
  ];

  const selectedSourceData = sources.find(source => source.value === selectedSource);
  const SelectedIcon = selectedSourceData?.icon || Database;

  const handleSearch = (e) => {
    e.preventDefault();
    navigate('/activate');
  };

  return (
    <div className={`min-h-screen theme-transition ${
      isDarkMode ? 'theme-dark bg-black' : 'theme-light bg-white'
    }`}>
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-600 to-pink-600 transform origin-left z-50"
        style={{ scaleX }}
      />

      {/* Header */}
      <motion.header 
        initial={{ opacity: 1, y: 0 }}
        animate={{ 
          opacity: isNavVisible ? 1 : 0,
          y: isNavVisible ? 0 : -100,
        }}
        transition={{
          duration: 0.3,
          ease: "easeInOut"
        }}
        className={`container mx-auto px-6 lg:px-8 py-6 max-w-[1400px] sticky top-0 z-40 backdrop-blur-lg bg-opacity-80 transition-all duration-300 ${
          isDarkMode ? 'bg-black/80' : 'bg-white/80'
        }`}
      >
        <nav className="flex items-center justify-between">
          <motion.div 
            className="flex items-center space-x-3"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <motion.img 
              src="/vivum-logo.png" 
              alt="Vivum Logo" 
              className="w-10 h-10 sm:w-12 sm:h-12"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.8 }}
            />
            <motion.span 
              className="text-xl sm:text-2xl font-bold font-display bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text"
              animate={{ 
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{ 
                duration: 5,
                repeat: Infinity,
                ease: "linear"
              }}
              style={{ backgroundSize: "200% 200%" }}
            >
              Vivum
            </motion.span>
          </motion.div>
          
          <div className="flex items-center space-x-5">
            <motion.button
              onClick={() => navigate('/activate')}
              className="px-6 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg shadow-lg hover:shadow-purple-500/25 transition-all duration-200"
              whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(147, 51, 234, 0.3)" }}
              whileTap={{ scale: 0.98 }}
            >
              Get Started
            </motion.button>
            <ThemeToggle isDarkMode={isDarkMode} onToggle={() => setIsDarkMode(!isDarkMode)} />
          </div>
        </nav>
      </motion.header>

      {/* Main Content */}
      <main className="container mx-auto px-6 lg:px-8 py-16 sm:py-24 max-w-[1400px]">
        <div className="max-w-5xl mx-auto">
          <motion.div 
            className="text-center mb-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.h2 
              className={`text-4xl sm:text-5xl lg:text-6xl font-bold mb-8 bg-gradient-to-r ${
                isDarkMode 
                  ? 'from-purple-400 to-pink-400' 
                  : 'from-purple-600 to-pink-600'
              } text-transparent bg-clip-text leading-tight max-w-4xl mx-auto`}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              Take a Leap to Discover. Analyze. Synthesize.
            </motion.h2>
            <motion.p 
              className={`text-lg sm:text-xl ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              } mb-16 max-w-3xl mx-auto leading-relaxed`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              No more manual and time-consuming literature searches and time wasting—Vivum brings it quickly at your fingertips. 
              Get instant access to real-time data from PubMed, Scopus, and beyond, making literature reviews and evidence synthesis effortless.
            </motion.p>
          </motion.div>

          {/* Search Section */}
          <motion.div 
            className={`p-8 sm:p-10 lg:p-12 rounded-2xl backdrop-blur-lg ${
              isDarkMode 
                ? 'bg-gray-900/80 border-gray-800' 
                : 'bg-white/80 border-gray-200'
            } mb-16 shadow-xl border`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            whileHover={{ boxShadow: "0 0 30px rgba(147, 51, 234, 0.2)" }}
          >
            <form onSubmit={handleSearch} className="flex flex-col space-y-8">
              {/* Main Search */}
              <div className="relative group">
                <Search className={`absolute left-5 top-4 w-5 h-5 ${
                  isDarkMode ? 'text-gray-500' : 'text-gray-400'
                } group-hover:text-purple-400 transition-colors`} />
                <input
                  type="text"
                  placeholder="What's on your mind?"
                  value={mainSearchQuery}
                  onChange={(e) => setMainSearchQuery(e.target.value)}
                  className={`w-full pl-14 pr-5 py-4 rounded-xl text-lg ${
                    isDarkMode 
                      ? 'bg-gray-800 text-gray-100 placeholder-gray-500 border-gray-700' 
                      : 'bg-white text-gray-900 placeholder-gray-400 border-gray-200'
                  } border focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all`}
                />
              </div>

              {/* Keyword Search and Source Dropdown Row */}
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
                <div className="flex-1 relative group">
                  <Tag className={`absolute left-5 top-4 w-5 h-5 ${
                    isDarkMode ? 'text-gray-500' : 'text-gray-400'
                  } group-hover:text-purple-400 transition-colors`} />
                  <input
                    type="text"
                    placeholder="Filter by keywords (e.g., clinical trials, genomics)..."
                    value={keywordSearchQuery}
                    onChange={(e) => setKeywordSearchQuery(e.target.value)}
                    className={`w-full pl-14 pr-5 py-4 rounded-xl text-lg ${
                      isDarkMode 
                        ? 'bg-gray-800 text-gray-100 placeholder-gray-500 border-gray-700' 
                        : 'bg-white text-gray-900 placeholder-gray-400 border-gray-200'
                    } border focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all`}
                  />
                </div>

                {/* Source Dropdown */}
                <div className="relative min-w-[220px]">
                  <motion.button
                    type="button"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className={`w-full flex items-center space-x-3 px-5 py-4 rounded-xl text-lg ${
                      isDarkMode 
                        ? 'bg-gray-800 border-gray-700' 
                        : 'bg-white border-gray-200'
                    } border hover:border-purple-400/50 focus:outline-none focus:ring-2 focus:ring-purple-400/20 transition-all`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <SelectedIcon className="w-5 h-5 text-purple-400" />
                    <span className="flex-1 text-left">{selectedSourceData?.label}</span>
                    <ChevronDown className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                  </motion.button>

                  {isDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className={`absolute mt-2 w-full rounded-xl shadow-lg ${
                        isDarkMode 
                          ? 'bg-gray-800 border-gray-700' 
                          : 'bg-white border-gray-200'
                      } border py-2 z-50`}
                    >
                      {sources.map((source) => {
                        const Icon = source.icon;
                        return (
                          <motion.button
                            type="button"
                            key={source.value}
                            onClick={() => {
                              setSelectedSource(source.value);
                              setIsDropdownOpen(false);
                            }}
                            className={`w-full flex items-center space-x-3 px-5 py-3 text-left ${
                              isDarkMode 
                                ? 'hover:bg-purple-400/10' 
                                : 'hover:bg-purple-50'
                            } transition-colors ${
                              selectedSource === source.value ? 'text-purple-400' : ''
                            }`}
                            whileHover={{ x: 5 }}
                          >
                            <Icon className="w-5 h-5" />
                            <span>{source.label}</span>
                          </motion.button>
                        );
                      })}
                    </motion.div>
                  )}
                </div>
              </div>

              {/* Search Button */}
              <motion.button 
                type="submit"
                className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-10 py-4 rounded-xl text-lg flex items-center justify-center space-x-3 transition-all shadow-lg text-white font-medium"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>Search</span>
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </form>
          </motion.div>

          {/* Coming Soon Section */}
          <motion.div
            className={`text-center p-10 sm:p-12 rounded-2xl ${
              isDarkMode ? 'bg-gradient-to-r from-purple-900/30 to-pink-900/30' : 'bg-gradient-to-r from-purple-50 to-pink-50'
            } backdrop-blur-sm mb-24 border ${isDarkMode ? 'border-purple-800/30' : 'border-purple-100'}`}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            whileHover={{ scale: 1.02 }}
          >
            <motion.div 
              className="flex items-center justify-center space-x-4 mb-6"
              animate={{ 
                scale: [1, 1.05, 1],
                rotate: [0, 2, -2, 0]
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              <motion.div
                animate={{ 
                  rotate: [0, 360],
                  scale: [1, 1.2, 1]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                <Sparkles className={`w-7 h-7 ${isDarkMode ? 'text-purple-400' : 'text-purple-500'}`} />
              </motion.div>
              <span className={`text-2xl sm:text-3xl font-display font-bold ${
                isDarkMode ? 'text-purple-400' : 'text-purple-600'
              }`}>
                Coming Soon
              </span>
              <motion.div
                animate={{ 
                  rotate: [0, -360],
                  scale: [1, 1.2, 1]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                <Sparkles className={`w-7 h-7 ${isDarkMode ? 'text-purple-400' : 'text-purple-500'}`} />
              </motion.div>
            </motion.div>
            <motion.p 
              className={`text-lg sm:text-xl ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              } leading-relaxed`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              We're crafting a smarter way to explore and innovate. 
              <br className="hidden sm:block" />
              Vivum is almost here—get ready to experience the future!
            </motion.p>
          </motion.div>

          {/* Features Section */}
          <motion.section 
            className="max-w-7xl mx-auto py-20"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.h2 
              className={`text-3xl sm:text-4xl font-bold text-center mb-20 bg-gradient-to-r ${
                isDarkMode 
                  ? 'from-purple-400 to-pink-400' 
                  : 'from-purple-600 to-pink-600'
              } text-transparent bg-clip-text`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              How vivum empowers you
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 gap-8 lg:gap-10">
              <FeatureCard
                icon={<Brain className="w-8 h-8 text-purple-400" />}
                title="Your Personal Research Assistant"
                description="Vivum does more than search—it analyzes, critiques, and organizes your research."
                isDarkMode={isDarkMode}
                delay={0}
              />
              <FeatureCard
                icon={<Database className="w-8 h-8 text-pink-400" />}
                title="Automated Literature Reviews & Systematic Analysis"
                description="Vivum takes the complexity out of evidence synthesis from AI-augmented systematic reviews to AI meta-analyses."
                isDarkMode={isDarkMode}
                delay={0.1}
              />
              <FeatureCard
                icon={<Search className="w-8 h-8 text-purple-400" />}
                title="Smarter Searches, Faster Insights"
                description="Instantly access PubMed, Scopus, and global databases with AI-enhanced precision. Filter by keywords, MeSH terms, and Boolean logic to find exactly what you need."
                isDarkMode={isDarkMode}
                delay={0.2}
              />
              <FeatureCard
                icon={<MessageCircle className="w-8 h-8 text-pink-400" />}
                title="Source Citations"
                description="Every insight comes with real-time citations and links to original sources."
                isDarkMode={isDarkMode}
                delay={0.3}
              />
              <FeatureCard
                icon={<Lightbulb className="w-8 h-8 text-purple-400" />}
                title="Stay Ahead with AI-Augmented Future"
                description="Whether you're a clinician, academic, or industry researcher, Vivum empowers you with the latest breakthroughs and personalized alerts."
                isDarkMode={isDarkMode}
                delay={0.4}
              />
            </div>
          </motion.section>
        </div>
      </main>
    </div>
  );
}

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  return (
    <Router>
      <Toaster position="top-center" />
      <Routes>
        <Route path="/" element={<HomePage isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />} />
        <Route path="/activate" element={<ActivationPage isDarkMode={isDarkMode} />} />
        <Route path="/dashboard" element={<ChatInterface isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />} />
      </Routes>
    </Router>
  );
}

export default App;