import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, User, Lock, Loader2, Eye, EyeOff, Check, CheckCircle2 } from 'lucide-react';
import { Button } from './Button';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess?: (username: string) => void;
}

export const LoginModal = ({ isOpen, onClose, onLoginSuccess }: LoginModalProps) => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  // Form State
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  // Load saved credentials on mount
  useEffect(() => {
    if (isOpen) {
      setSuccess(false); // Reset success state on open
      setLoading(false); // Reset loading state
      const savedUsername = localStorage.getItem('biography_username');
      const savedPassword = localStorage.getItem('biography_password'); // In a real app, never save passwords in localStorage!
      
      if (savedUsername && savedPassword) {
        setUsername(savedUsername);
        setPassword(savedPassword);
        setRememberMe(true);
      }
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      
      if (rememberMe) {
        localStorage.setItem('biography_username', username);
        localStorage.setItem('biography_password', password); // Mocking persistence
      } else {
        localStorage.removeItem('biography_username');
        localStorage.removeItem('biography_password');
      }

      // Close after a brief success indication
      setTimeout(() => {
        if (onLoginSuccess) {
          onLoginSuccess(username);
        }
        onClose();
        // Reset state after close
        setTimeout(() => setSuccess(false), 300);
      }, 800);
      
    }, 1000);
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    // Clear fields if not remembering
    if (!rememberMe) {
      // setUsername('');
      // setPassword('');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm"
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden pointer-events-auto"
            >
              <div className="p-6 bg-[#F0EEE5] border-b border-[#E5E1D0] flex justify-between items-center">
                <div className="flex space-x-4">
                  <button 
                    onClick={() => setIsLogin(true)}
                    className={`text-xl font-bold transition-colors ${isLogin ? 'text-[#BC5834]' : 'text-gray-400 hover:text-gray-600'}`}
                  >
                    登录
                  </button>
                  <span className="text-gray-300 text-xl">/</span>
                  <button 
                    onClick={() => setIsLogin(false)}
                    className={`text-xl font-bold transition-colors ${!isLogin ? 'text-[#BC5834]' : 'text-gray-400 hover:text-gray-600'}`}
                  >
                    注册
                  </button>
                </div>
                <button onClick={onClose} className="text-gray-500 hover:text-[#BC5834] transition-colors">
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">用户名</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="请输入用户名"
                        className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#BC5834] focus:border-transparent outline-none transition-all"
                        required
                        disabled={loading || success}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">密码</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="请输入密码"
                        className="w-full pl-10 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#BC5834] focus:border-transparent outline-none transition-all"
                        required
                        minLength={6}
                        disabled={loading || success}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        disabled={loading || success}
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${rememberMe ? 'bg-[#BC5834] border-[#BC5834]' : 'bg-white border-gray-300'}`}>
                        {rememberMe && <Check className="w-3.5 h-3.5 text-white" />}
                      </div>
                      <input 
                        type="checkbox" 
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="hidden"
                        disabled={loading || success}
                      />
                      <span className="text-sm text-gray-600">记住我</span>
                    </label>
                    
                    <button type="button" className="text-sm text-[#BC5834] hover:underline">
                      忘记密码？
                    </button>
                  </div>

                  <Button 
                    type="submit" 
                    fullWidth 
                    disabled={loading || success}
                    className={success ? "bg-green-600 hover:bg-green-700 border-green-600" : ""}
                  >
                    {loading ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : success ? (
                      <div className="flex items-center justify-center gap-2">
                        <CheckCircle2 className="w-5 h-5" />
                        <span>{isLogin ? '登录成功' : '注册成功'}</span>
                      </div>
                    ) : (
                      isLogin ? '登录' : '注册'
                    )}
                  </Button>
                </form>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};
