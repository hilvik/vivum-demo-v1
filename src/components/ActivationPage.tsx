import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Fingerprint, X, Mail, Lock, Sparkles } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Dialog } from '@headlessui/react';
import toast from 'react-hot-toast';

interface ActivationPageProps {
  isDarkMode: boolean;
}

export function ActivationPage({ isDarkMode }: ActivationPageProps) {
  const [invitationCode, setInvitationCode] = useState('');
  const [isWaitlistModalOpen, setIsWaitlistModalOpen] = useState(false);
  const [showAuthForm, setShowAuthForm] = useState(false);
  const [isSignUp, setIsSignUp] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (invitationCode === '12345') {
      setShowAuthForm(true);
    } else {
      setIsWaitlistModalOpen(true);
    }
  };

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (email === 'admin@gmail.com' && password === 'admin@123') {
      toast.success(`Successfully signed in!`);
      navigate('/dashboard');
    } else {
      toast.error('Invalid credentials. Use admin@gmail.com/admin@123 for demo.');
    }
  };

  const handleJoinWaitlist = () => {
    window.open('https://forms.gle/b2tS2VxjpvbGBGsc7', '_blank');
  };

  return (
    <div className={`min-h-screen theme-transition ${
      isDarkMode ? 'theme-dark bg-black' : 'theme-light bg-white'
    } flex items-center justify-center p-4`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full space-y-8"
      >
        {!showAuthForm ? (
          <>
            <div className="text-center">
              <motion.div
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              >
                <Fingerprint className={`mx-auto h-16 w-16 ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`} />
              </motion.div>

              <h2 className={`mt-6 text-3xl font-bold font-display ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Activate your account
              </h2>
              <p className={`mt-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Welcome to Vivum! We're currently in private beta.
                <br />
                To get started, please enter your invitation code.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
              <div>
                <label htmlFor="invitation-code" className="sr-only">
                  Invitation code
                </label>
                <div className="relative">
                  <input
                    id="invitation-code"
                    name="code"
                    type="text"
                    required
                    value={invitationCode}
                    onChange={(e) => setInvitationCode(e.target.value)}
                    className={`w-full px-4 py-3 ${
                      isDarkMode 
                        ? 'bg-gray-800 border-gray-700 placeholder-gray-500 text-white' 
                        : 'bg-white border-gray-200 placeholder-gray-400 text-gray-900'
                    } border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                    placeholder="Enter your invitation code"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                >
                  Verify Code
                </motion.button>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className={`w-full border-t ${isDarkMode ? 'border-gray-800' : 'border-gray-200'}`}></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className={`px-2 ${
                      isDarkMode ? 'bg-black text-gray-400' : 'bg-white text-gray-500'
                    }`}>
                      Or
                    </span>
                  </div>
                </div>

                <div className="flex flex-col space-y-3">
                  <motion.button
                    type="button"
                    onClick={() => {
                      setShowAuthForm(true);
                      setIsSignUp(false);
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full flex justify-center py-3 px-4 rounded-xl ${
                      isDarkMode 
                        ? 'bg-gray-800 text-white hover:bg-gray-700' 
                        : 'bg-white text-gray-900 hover:bg-gray-50'
                    } border ${
                      isDarkMode ? 'border-gray-700' : 'border-gray-200'
                    } font-medium`}
                  >
                    Already activated? Sign in
                  </motion.button>

                  <motion.button
                    type="button"
                    onClick={handleJoinWaitlist}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full flex justify-center items-center py-4 px-6 rounded-xl text-lg font-semibold ${
                      isDarkMode 
                        ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-white hover:from-purple-500/30 hover:to-pink-500/30' 
                        : 'bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 hover:from-purple-200 hover:to-pink-200'
                    } border border-transparent shadow-lg hover:shadow-xl transition-all duration-200`}
                  >
                    <span className="mr-2">✨</span>
                    Join the Waitlist
                    <span className="ml-2">→</span>
                  </motion.button>
                </div>
              </div>
            </form>
          </>
        ) : (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className={`text-3xl font-bold font-display ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                {isSignUp ? 'Create your account' : 'Welcome back'}
              </h2>
              <p className={`mt-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {isSignUp 
                  ? 'Start your research journey with Vivum'
                  : 'Sign in to continue your research'}
              </p>
            </div>

            <form onSubmit={handleAuthSubmit} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label htmlFor="email" className={`block text-sm font-medium ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Email address
                  </label>
                  <div className="mt-1 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className={`h-5 w-5 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                    </div>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={`w-full pl-10 pr-4 py-3 ${
                        isDarkMode 
                          ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500' 
                          : 'bg-white border-gray-200 text-gray-900 placeholder-gray-400'
                      } border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="password" className={`block text-sm font-medium ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Password
                  </label>
                  <div className="mt-1 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className={`h-5 w-5 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                    </div>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className={`w-full pl-10 pr-4 py-3 ${
                        isDarkMode 
                          ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500' 
                          : 'bg-white border-gray-200 text-gray-900 placeholder-gray-400'
                      } border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                      placeholder="Enter your password"
                    />
                  </div>
                </div>
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
              >
                {isSignUp ? 'Create account' : 'Sign in'}
              </motion.button>

              <p className="text-center">
                <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                  {isSignUp ? 'Already have an account?' : "Don't have an account?"}
                </span>
                {' '}
                <button
                  type="button"
                  onClick={() => setIsSignUp(!isSignUp)}
                  className={`font-medium ${
                    isDarkMode ? 'text-purple-400 hover:text-purple-300' : 'text-purple-600 hover:text-purple-500'
                  }`}
                >
                  {isSignUp ? 'Sign in' : 'Sign up'}
                </button>
              </p>
            </form>
          </div>
        )}

        <AnimatePresence>
          {isWaitlistModalOpen && (
            <Dialog
              as={motion.div}
              static
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              open={isWaitlistModalOpen}
              onClose={() => setIsWaitlistModalOpen(false)}
              className="fixed inset-0 z-50 overflow-y-auto"
            >
              <div className="fixed inset-0">
                <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
              </div>
              
              <div className="fixed inset-0 flex items-center justify-center p-4">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className={`w-full max-w-md p-8 overflow-hidden rounded-2xl shadow-xl ${
                    isDarkMode ? 'bg-gray-900' : 'bg-white'
                  } relative`}
                >
                  <div className="flex justify-between items-start mb-6">
                    <Dialog.Title as="h3" className={`text-2xl font-semibold ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      Join the Waitlist
                    </Dialog.Title>
                    <button
                      onClick={() => setIsWaitlistModalOpen(false)}
                      className={`rounded-full p-2 ${
                        isDarkMode 
                          ? 'hover:bg-gray-800 text-gray-400 hover:text-gray-300' 
                          : 'hover:bg-gray-100 text-gray-500 hover:text-gray-600'
                      }`}
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="mb-8">
                    <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-4`}>
                      The invitation code you entered is invalid. Join our waitlist to get early access when we launch!
                    </p>
                    <div className={`p-4 rounded-lg ${
                      isDarkMode ? 'bg-gray-800' : 'bg-gray-100'
                    }`}>
                      <div className="flex items-center space-x-3 text-purple-500">
                        <Sparkles className="w-5 h-5" />
                        <p className="font-medium">Be among the first to experience Vivum AI</p>
                      </div>
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleJoinWaitlist}
                    className="w-full flex items-center justify-center py-4 px-6 rounded-xl text-lg font-semibold bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
                  >
                    <span className="mr-2">✨</span>
                    Join the Waitlist Now
                    <span className="ml-2">→</span>
                  </motion.button>
                </motion.div>
              </div>
            </Dialog>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}