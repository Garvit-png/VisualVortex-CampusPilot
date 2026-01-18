
import React, { useEffect, useState } from 'react';
import { Layout, Sparkles } from 'lucide-react';

interface LoginPageProps {
  onLogin: () => void;
  loadingText?: string;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLogin, loadingText = "Initializing Dashboard..." }) => {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Auto-login sequence simulation
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        // Non-linear progress for realism
        const increment = Math.random() * 12; // Slightly smoother increments
        return Math.min(prev + increment, 100);
      });
    }, 100);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (progress === 100) {
      // Slight pause at 100% before triggering exit animation
      const timeout = setTimeout(() => {
        setIsExiting(true);
      }, 600);
      return () => clearTimeout(timeout);
    }
  }, [progress]);

  useEffect(() => {
    if (isExiting) {
      // Wait for exit animation to complete before calling onLogin (which unmounts this component)
      const timeout = setTimeout(() => {
        onLogin();
      }, 1000); // Must match CSS duration
      return () => clearTimeout(timeout);
    }
  }, [isExiting, onLogin]);

  return (
    <div className={`h-screen w-full bg-[#fcfdfe] flex items-center justify-center relative overflow-hidden font-sans selection:bg-blue-100 transition-all duration-1000 ease-[cubic-bezier(0.645,0.045,0.355,1)] ${isExiting ? 'opacity-0 scale-105 filter blur-lg' : 'opacity-100 scale-100 blur-0'}`}>
       {/* Light Theme Background Elements - Matching Main App */}
       <div className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-blue-100/50 rounded-full blur-[120px] animate-pulse" />
       <div className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] bg-indigo-100/50 rounded-full blur-[100px]" />
       
       <div className="relative z-10 flex flex-col items-center animate-in fade-in zoom-in duration-700">
          {/* Logo Container */}
          <div className="w-24 h-24 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-[32px] flex items-center justify-center shadow-2xl shadow-blue-200 mb-10 animate-bounce duration-[3000ms]">
             <Layout className="w-12 h-12 text-white" />
          </div>

          {/* Typography */}
          <h1 className="text-5xl font-black text-slate-900 tracking-tighter mb-4">
             CampusPilot
          </h1>
          
          <div className="flex items-center gap-3 mb-12 bg-white/50 backdrop-blur-sm px-4 py-2 rounded-full border border-white/60 shadow-sm">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <p className="text-slate-500 text-xs font-bold uppercase tracking-[0.2em]">
               {loadingText}
            </p>
          </div>

          {/* Custom Progress Bar */}
          <div className="w-64 h-1.5 bg-slate-100 rounded-full overflow-hidden shadow-inner">
             <div 
               className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full transition-all duration-300 ease-out" 
               style={{ width: `${progress}%` }}
             />
          </div>
          
          {/* Footer Metadata */}
          <div className="mt-6 flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest opacity-60">
             <Sparkles className="w-3 h-3" />
             <span>Secure Student Gateway V3.0</span>
          </div>
       </div>
    </div>
  );
};
