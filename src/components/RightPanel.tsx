
import React from 'react';
import { ArrowRight, Calendar as CalendarIcon, Clock, User } from 'lucide-react';

interface RightPanelProps {
  setActiveTab?: (tab: string) => void;
}

export const RightPanel: React.FC<RightPanelProps> = ({ setActiveTab }) => {
  const schedule = [
    {
      date: '19',
      day: 'MON',
      items: [
        {
          subject: 'WAP - D',
          type: 'Lecture',
          time: '9:00 AM - 10:30 AM'
        },
        {
          subject: 'Maths II - D',
          type: 'Lecture',
          time: '1:00 PM - 2:30 PM'
        }
      ]
    },
    {
      date: '20',
      day: 'TUE',
      items: [
        {
          subject: 'Maths II Tut 1 - D',
          type: 'Lecture',
          time: '9:00 AM - 10:20 AM'
        },
        {
          subject: 'DSA - D',
          type: 'Lecture',
          time: '10:30 AM - 12:00 PM'
        }
      ]
    }
  ];

  return (
    <aside className="w-[380px] border-l border-slate-200 bg-white flex flex-col h-full shrink-0 overflow-y-auto">
      <div className="p-6 space-y-8">
        
        {/* Live Challenge Card */}
        <div className="bg-[#f0f5ff] rounded-3xl p-6 relative overflow-hidden group">
          {/* Status Badges */}
          <div className="flex justify-between items-center mb-6">
            <span className="flex items-center bg-red-500 text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-widest">
              <span className="w-1.5 h-1.5 bg-white rounded-full mr-1.5 animate-pulse"></span>
              Live
            </span>
            <span className="flex items-center bg-blue-600 text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-widest">
              Ends in 11:00:38
            </span>
          </div>

          <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Question of the day</h3>
          <h2 className="text-xl font-bold text-slate-800 mb-6 leading-tight">Balanced Quadruples in a...</h2>

          <div className="flex items-center mb-8">
            {/* Replaced actual photos with placeholder avatars */}
            <div className="flex -space-x-2 mr-3">
              {[1, 2, 3].map(i => (
                <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center">
                  <User className="w-4 h-4 text-slate-400" />
                </div>
              ))}
            </div>
            <span className="text-[11px] font-semibold text-slate-500">136 people have attempted</span>
          </div>

          <button className="w-full bg-slate-900 hover:bg-black text-white rounded-2xl py-3.5 px-6 flex items-center justify-center text-sm font-bold transition-all shadow-xl shadow-slate-200 active:scale-[0.98]">
            Solve Now
            <ArrowRight className="w-4 h-4 ml-2" />
          </button>

          {/* Abstract pattern */}
          <div className="absolute top-0 right-0 w-24 h-24 bg-blue-100 rounded-full blur-3xl -mr-8 -mt-8 opacity-50"></div>
        </div>

        {/* Calendar Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-slate-800">Calendar</h3>
              <p className="text-[11px] text-slate-400 font-medium">Your schedule for the next days</p>
            </div>
            <button 
              onClick={() => setActiveTab?.('Calendar')}
              className="flex items-center text-xs font-bold text-slate-600 hover:text-slate-900 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100 transition-colors"
            >
              View
              <CalendarIcon className="w-3.5 h-3.5 ml-2" />
            </button>
          </div>

          {/* Today Banner */}
          <div className="bg-gradient-to-r from-orange-400 to-rose-400 rounded-2xl p-4 text-white">
            <p className="text-xs font-bold">You have 0 events today</p>
          </div>

          {/* Schedule List */}
          <div className="space-y-8">
            {schedule.map((day) => (
              <div key={day.date} className="flex space-x-6">
                <div className="flex flex-col items-center pt-1 min-w-[32px]">
                  <span className="text-lg font-bold text-slate-800 leading-none">{day.date}</span>
                  <span className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-wider">{day.day}</span>
                </div>
                <div className="flex-1 space-y-6">
                  {day.items.map((item, i) => (
                    <div key={i} className="group">
                      <div className="flex flex-col">
                        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">{item.subject}</span>
                        <h4 className="text-sm font-bold text-slate-800 mt-0.5">{item.type}</h4>
                        <div className="flex items-center text-[11px] text-slate-400 font-medium mt-1">
                          <Clock className="w-3 h-3 mr-1.5" />
                          {item.time}
                        </div>
                      </div>
                      {i < day.items.length - 1 && <div className="h-px bg-slate-50 w-full mt-6" />}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
};
