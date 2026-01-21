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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative w-full max-w-md z-10">
        {/* Header with logo */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-4 rounded-2xl shadow-2xl transform hover:scale-110 transition-transform duration-300">
              <Heart className="w-8 h-8 text-white fill-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">MediCare EMR</h1>
          <p className="text-blue-100 text-lg">Hệ thống quản lý bệnh viện thông minh</p>
        </div>

        {/* Main card */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden backdrop-blur-xl">
          {/* Card Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-8 flex flex-col items-center justify-center text-center">
            <p className="text-white text-lg font-bold">Đăng nhập vào hệ thống</p>
          </div>

          {/* Card Body */}
          <div className="p-8">
            {isLogin ? (
              <Login onSwitchToSignup={toggleMode} />
            ) : (
              <Signup onSwitchToLogin={toggleMode} />
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6 text-blue-100 text-sm">
          <p>© 2024 MediCare EMR. Bảo mật và tin cậy.</p>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}
