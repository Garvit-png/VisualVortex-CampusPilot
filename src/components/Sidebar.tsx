
import React from 'react';
import { 
  Home, 
  GitBranch, 
  Users, 
  Calendar, 
  Zap, 
  Trophy, 
  HelpCircle, 
  BookOpen,
  Layout,
  Star,
  PartyPopper,
  Flame,
  Globe,
  Plus,
  ArrowRight,
  Ticket,
  Medal
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  unopenedEventsCount?: number;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, unopenedEventsCount = 0 }) => {
  const menuItems = [
    { name: 'My Timeline', icon: GitBranch },
    { name: 'Expert Sessions', icon: Users },
    { name: 'Arena', icon: Zap },
    { name: 'Leaderboard', icon: Trophy },
    { name: 'Question of the Day', icon: BookOpen },
  ];

  return (
    <aside className="w-64 border-r border-slate-200 bg-white flex flex-col h-full shrink-0 z-40">
      {/* Brand Logo */}
      <div className="p-7">
        <div className="flex items-start space-x-3 mb-1">
          <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center shadow-xl shadow-blue-100 shrink-0 mt-1">
            <Layout className="w-5 h-5 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="font-black text-slate-900 tracking-tight text-sm leading-tight">Newton School of Technology</span>
            <span className="text-[9px] text-slate-400 font-bold tracking-[0.1em] mt-1">V3.0 PLATFORM</span>
          </div>
        </div>
      </div>

      {/* Navigation Scroll Area */}
      <div className="flex-1 overflow-y-auto px-4 pb-6 space-y-1">
        <button 
          onClick={() => setActiveTab('Home')}
          className={`flex items-center w-full px-4 py-3 rounded-2xl transition-all duration-300 ${
            activeTab === 'Home' 
              ? 'bg-slate-900 text-white shadow-lg shadow-slate-200 font-bold' 
              : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
          }`}
        >
          <Home className={`w-5 h-5 mr-3 transition-colors ${activeTab === 'Home' ? 'text-white' : 'text-slate-400'}`} />
          <span className="text-sm">Dashboard</span>
        </button>

        {/* Section: EVENT - PROMINENT SECTION */}
        <div className="pt-6 pb-2">
          <div className="px-4 flex items-center justify-between">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.25em]">Events Arena</span>
            <button className="text-slate-300 hover:text-slate-600 transition-colors">
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
        
        <div className="space-y-1 relative">
          {/* Special Border Container for Events */}
          <div className="relative group">
            {/* Animated Gradient Border */}
            <div className={`absolute -inset-[2px] bg-gradient-to-r from-rose-400 via-orange-400 to-rose-400 rounded-[18px] opacity-70 blur-[1px] transition duration-500 ${
              activeTab === 'Events' ? 'opacity-100' : 'opacity-0 group-hover:opacity-40'
            }`}></div>
            
            <button 
              onClick={() => setActiveTab('Events')}
              className={`relative flex items-center justify-between w-full px-4 py-3 rounded-2xl transition-all duration-300 bg-white border ${
                activeTab === 'Events' 
                  ? 'border-transparent text-rose-600 font-bold' 
                  : 'border-slate-100 text-slate-500 hover:text-slate-900'
              }`}
            >
              <div className="flex items-center">
                <PartyPopper className={`w-5 h-5 mr-3 transition-colors ${activeTab === 'Events' ? 'text-rose-500' : 'text-slate-400'}`} />
                <span className="text-sm">Events</span>
              </div>
              {activeTab === 'Events' ? (
                <div className="flex items-center gap-1.5">
                   <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse shadow-sm" />
                   <span className="text-[8px] font-black uppercase tracking-wider text-rose-400">Live</span>
                </div>
              ) : (
                <span className={`text-[8px] px-1.5 py-0.5 rounded font-black tracking-tighter transition-all ${unopenedEventsCount > 0 ? 'bg-rose-50 text-rose-500' : 'bg-slate-100 text-slate-400'}`}>
                  {unopenedEventsCount > 0 ? `${unopenedEventsCount} NEW` : '0 NEW'}
                </span>
              )}
            </button>
          </div>

          <button 
            className="flex items-center w-full px-4 py-3 text-slate-500 hover:bg-slate-50 hover:text-slate-900 rounded-2xl transition-all group mt-1"
          >
            <Ticket className="w-5 h-5 mr-3 text-slate-400 group-hover:text-slate-600" />
            <span className="text-sm">My Bookings</span>
          </button>

          <button 
            className="flex items-center w-full px-4 py-3 text-slate-500 hover:bg-slate-50 hover:text-slate-900 rounded-2xl transition-all group"
          >
            <Medal className="w-5 h-5 mr-3 text-slate-400 group-hover:text-slate-600" />
            <span className="text-sm">Hall of Fame</span>
          </button>
        </div>

        {/* Section: ACADEMICS */}
        <div className="pt-8 pb-2">
          <div className="px-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.25em]">Academics</div>
        </div>
        
        <div className="space-y-1">
          <button 
            onClick={() => setActiveTab('Calendar')}
            className={`flex items-center w-full px-4 py-3 rounded-2xl transition-all duration-300 group ${
              activeTab === 'Calendar' 
                ? 'bg-blue-50 text-blue-600 shadow-sm ring-1 ring-blue-100 font-bold' 
                : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            <Calendar className={`w-5 h-5 mr-3 transition-colors ${activeTab === 'Calendar' ? 'text-blue-500' : 'text-slate-400 group-hover:text-slate-600'}`} />
            <span className="text-sm">Full Schedule</span>
          </button>
        </div>

        <div className="pt-8 pb-2">
          <div className="px-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Activity Hub</div>
        </div>
        <div className="space-y-1">
          {menuItems.map(item => (
            <button 
              key={item.name}
              onClick={() => setActiveTab(item.name)}
              className={`group flex items-center justify-between w-full px-4 py-3 rounded-2xl transition-all ${
                activeTab === item.name 
                  ? 'bg-slate-100 text-slate-900 font-bold' 
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <div className="flex items-center">
                <item.icon className={`w-5 h-5 mr-3 transition-colors ${activeTab === item.name ? 'text-slate-900' : 'text-slate-400 group-hover:text-slate-600'}`} />
                <span className="text-sm">{item.name}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Bottom Profile */}
      <div className="p-6 border-t border-slate-100">
        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center">
                <Flame className="w-4 h-4 text-orange-500" />
             </div>
             <div>
                <p className="text-[9px] font-black text-slate-400 uppercase leading-none">Streak</p>
                <p className="text-xs font-bold text-slate-800">12 Days</p>
             </div>
          </div>
          <ArrowRight className="w-4 h-4 text-slate-300" />
        </div>
        <button className="flex items-center justify-center w-full px-4 py-3 text-slate-500 bg-white border border-slate-200 hover:bg-slate-50 hover:text-slate-700 rounded-xl transition-all text-xs font-bold shadow-sm">
          <HelpCircle className="w-4 h-4 mr-2" />
          NST Support
        </button>
      </div>
    </aside>
  );
};
