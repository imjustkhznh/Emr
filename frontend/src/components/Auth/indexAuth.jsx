import React, { useState } from 'react';
import { Heart, Lock } from 'lucide-react';
import Login from './Login';
import Signup from './Signup';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  const toggleMode = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ background: '#CCCCCC' }}>
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-xl overflow-hidden p-8 sm:p-12">
        {/* Logo + Title */}
        <div className="flex items-center gap-2 mb-8 justify-center">
          <Heart className="w-8 h-8 text-blue-600 fill-blue-600" />
          <span className="text-2xl font-bold text-gray-800">MediCare EMR</span>
        </div>
        {isLogin ? (
          <Login onSwitchToSignup={toggleMode} />
        ) : (
          <Signup onSwitchToLogin={toggleMode} />
        )}
        {/* Footer removed as requested */}
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}
