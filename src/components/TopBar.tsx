
import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Bell, UserPlus, Search, User, Zap, Command, Trash2, Clock } from 'lucide-react';

export interface Notification {
  id: number;
  text: string;
  eventName: string;
  eventId: string;
  timestamp: Date;
  read: boolean;
}

interface TopBarProps {
  notifications?: Notification[];
  onNotificationClick?: (eventId: string) => void;
  onClearNotifications?: () => void;
  onMarkRead?: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({ 
  notifications = [], 
  onNotificationClick = () => {}, 
  onClearNotifications = () => {},
  onMarkRead = () => {}
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter(n => !n.read).length;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleToggle = () => {
    if (!isOpen) {
      onMarkRead();
    }
    setIsOpen(!isOpen);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <header className="h-16 border-b border-slate-200 bg-white/80 backdrop-blur-md px-8 flex items-center justify-between shrink-0 sticky top-0 z-30 transition-all duration-300 relative">
      <div className="flex items-center gap-6">
        {/* Branch Selector */}
        <button className="group flex items-center gap-3 pl-1 pr-4 py-1.5 rounded-full hover:bg-slate-50 transition-all border border-transparent hover:border-slate-200">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform">
            <span className="text-[10px] text-white font-black">N</span>
          </div>
          <div className="flex flex-col items-start">
             <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider leading-none mb-0.5">Cohort</span>
             <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-slate-700 leading-none">NST'25 CS+AI RU</span>
                <ChevronDown className="w-3 h-3 text-slate-400 group-hover:translate-y-0.5 transition-transform" />
             </div>
          </div>
        </button>
      </div>

      {/* Global Search - Centered */}
      <div className="flex-1 max-w-xl px-8 hidden md:block">
         <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
            <input 
              type="text" 
              placeholder="Search for tasks, events, or peers..." 
              className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-2.5 pl-11 pr-12 text-sm font-medium text-slate-600 focus:bg-white focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none placeholder:text-slate-400"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 bg-white border border-slate-200 rounded-md px-1.5 py-0.5 pointer-events-none">
               <Command className="w-3 h-3 text-slate-400" />
               <span className="text-[10px] font-bold text-slate-400">K</span>
            </div>
         </div>
      </div>

      <div className="flex items-center gap-6">
        {/* XP Tracker - Enhanced */}
        <div className="hidden lg:flex items-center bg-slate-900 text-white px-1 py-1 pr-4 rounded-full shadow-xl shadow-slate-200 hover:shadow-2xl transition-all cursor-default group">
          <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center mr-3 shadow-inner group-hover:rotate-12 transition-transform">
            <Zap className="w-4 h-4 text-white fill-white" />
          </div>
          <div className="flex flex-col">
             <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-0.5">Total XP</span>
             <span className="text-sm font-black tracking-tight leading-none">2,366</span>
          </div>
        </div>

        <div className="h-8 w-px bg-slate-200 mx-2 hidden sm:block" />

        {/* Icons and Profile */}
        <div className="flex items-center gap-3">
          <button className="w-10 h-10 rounded-full hover:bg-slate-50 flex items-center justify-center text-slate-400 hover:text-blue-600 transition-all relative">
            <UserPlus className="w-5 h-5" />
          </button>
          
          {/* Notification Bell with Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button 
              id="tour-notifications"
              onClick={handleToggle}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all relative ${isOpen ? 'bg-blue-50 text-blue-600' : 'hover:bg-slate-50 text-slate-400 hover:text-blue-600'}`}
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white animate-pulse" />
              )}
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
              <div className="absolute top-full right-0 mt-4 w-96 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden animate-in fade-in zoom-in-95 duration-200 origin-top-right z-50">
                <div className="p-4 border-b border-slate-50 flex items-center justify-between bg-slate-50/50">
                   <div className="flex items-center gap-2">
                     <h3 className="text-xs font-black text-slate-800 uppercase tracking-widest">Notifications</h3>
                     <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full text-[10px] font-bold">{notifications.length}</span>
                   </div>
                   {notifications.length > 0 && (
                     <button 
                       onClick={onClearNotifications}
                       className="text-[10px] font-bold text-slate-400 hover:text-rose-500 flex items-center gap-1 transition-colors uppercase tracking-wider"
                     >
                       <Trash2 className="w-3 h-3" /> Clear
                     </button>
                   )}
                </div>
                
                <div className="max-h-[400px] overflow-y-auto">
                  {notifications.length === 0 ? (
                    <div className="p-12 text-center flex flex-col items-center">
                      <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mb-3">
                        <Bell className="w-5 h-5 text-slate-300" />
                      </div>
                      <p className="text-sm font-bold text-slate-400">No new notifications</p>
                      <p className="text-[10px] text-slate-300 mt-1 uppercase tracking-wide">You're all caught up!</p>
                    </div>
                  ) : (
                    <div className="divide-y divide-slate-50">
                      {notifications.map(notif => (
                        <div 
                          key={notif.id}
                          onClick={() => { onNotificationClick(notif.eventId); setIsOpen(false); }}
                          className="p-4 hover:bg-slate-50 transition-colors cursor-pointer group relative"
                        >
                          <div className="flex justify-between items-start mb-1">
                             <h4 className="text-[11px] font-black text-slate-700 uppercase tracking-wide group-hover:text-blue-600 transition-colors">{notif.eventName}</h4>
                             <span className="text-[10px] font-bold text-slate-300 flex items-center gap-1">
                               <Clock className="w-3 h-3" /> {formatTime(notif.timestamp)}
                             </span>
                          </div>
                          <p className="text-xs text-slate-500 font-medium leading-relaxed pr-4">
                            {notif.text}
                          </p>
                          {!notif.read && (
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 w-2 h-2 bg-blue-500 rounded-full ring-2 ring-white shadow-sm" />
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
          
          <div className="pl-2">
            <button className="w-10 h-10 rounded-full bg-slate-100 border-2 border-white shadow-sm hover:border-blue-200 transition-all overflow-hidden">
               <img src="https://i.pravatar.cc/150?img=12" alt="Profile" className="w-full h-full object-cover" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
