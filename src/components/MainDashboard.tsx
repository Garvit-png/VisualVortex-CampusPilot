
import React, { useState, useMemo } from 'react';
import { TaskCard } from './TaskCard';
import { Task } from '../types';
import { History, Clock, ChevronLeft, ChevronRight, Calendar as CalendarIcon, Sparkles } from 'lucide-react';

export const MainDashboard: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState(new Date().getDate());

  // Generate current week dates for the Date Strip
  const weekDates = useMemo(() => {
    const dates = [];
    const today = new Date();
    for (let i = -3; i <= 10; i++) {
      const d = new Date();
      d.setDate(today.getDate() + i);
      dates.push({
        dayName: d.toLocaleDateString('en-US', { weekday: 'short' }),
        date: d.getDate(),
        fullDate: d.toDateString(),
        isToday: d.toDateString() === today.toDateString()
      });
    }
    return dates;
  }, []);

  const latestReleased: Task[] = [
    {
      id: '1',
      subject: 'DSA - D',
      type: 'Post Class',
      title: 'RAM Model, Time and Space Complexity, Order of Growth, Big O...',
      deadline: 'Jan 20th 2026, 1:35 pm',
      xpValue: 80,
      solved: 0,
      total: 2,
    },
    {
      id: '2',
      subject: 'WAP Lab 1 - D',
      type: 'In Class',
      title: 'JavaScript Functions, JavaScript Function Expression, JavaScript...',
      deadline: 'Jan 20th 2026, 1:24 pm',
      xpValue: 80,
      solved: 3,
      total: 3,
    },
    {
      id: '3',
      subject: 'WAP - D',
      type: 'Post Class',
      title: 'JavaScript Functions, JavaScript Function Expression, JavaScript...',
      deadline: 'Jan 19th 2026, 1:05 pm',
      xpValue: 160,
      solved: 0,
      total: 4,
    }
  ];

  const upcomingDeadlines: Task[] = [
    {
      id: '4',
      subject: 'DSA - D',
      type: 'Post Class',
      title: 'Brute Force Implementation, Brute Force - Post Class',
      deadline: 'Jan 18th 2026, 1:00 pm',
      xpValue: 60,
      solved: 0,
      total: 2,
      isDueTomorrow: true
    },
    {
      id: '5',
      subject: 'DSA Lab 1 - D',
      type: 'In Class',
      title: 'Problem Solving and Implementation - In Class',
      deadline: 'Jan 19th 2026, 10:41 am',
      xpValue: 80,
      solved: 1,
      total: 2,
      isDueTomorrow: true
    }
  ];

  // Logic to "adjust data" based on selection
  const filteredLatest = useMemo(() => {
    // Mock filtering logic: if day is even, show all; if odd, show subset
    return selectedDay % 2 === 0 ? latestReleased : latestReleased.slice(0, 1);
  }, [selectedDay]);

  const renderSection = (title: string, sub: string, tasks: Task[], Icon: any) => (
    <section className="mb-12 transition-all duration-500">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-white border border-slate-100 rounded-xl flex items-center justify-center mr-4 shadow-sm">
            <Icon className="w-5 h-5 text-slate-500" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-800">{title}</h2>
            <p className="text-xs text-slate-400 font-medium">{sub}</p>
          </div>
        </div>
        <div className="flex space-x-2">
          <button className="p-2 border border-slate-100 rounded-lg bg-white text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-all">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button className="p-2 border border-slate-100 rounded-lg bg-white text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-all">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
      <div className="flex space-x-5 overflow-x-auto pb-4 no-scrollbar">
        {tasks.length > 0 ? (
          tasks.map(task => <TaskCard key={task.id} task={task} />)
        ) : (
          <div className="w-full py-12 flex flex-col items-center justify-center border-2 border-dashed border-slate-100 rounded-3xl opacity-40">
            <Sparkles className="w-8 h-8 mb-2" />
            <p className="text-xs font-bold uppercase tracking-widest text-slate-400">No tasks for this date</p>
          </div>
        )}
      </div>
    </section>
  );

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Date Strip Header - Dark Theme */}
      <div className="bg-[#09090b] p-4 rounded-3xl border border-white/10 shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between mb-4 px-2">
          <div className="flex items-center gap-2">
            <CalendarIcon className="w-4 h-4 text-blue-500" />
            <h3 className="text-xs font-black text-white uppercase tracking-widest">Schedule Observer</h3>
          </div>
          <span className="text-[10px] font-bold text-slate-500">JANUARY 2026</span>
        </div>
        
        <div className="flex gap-3 overflow-x-auto no-scrollbar py-2">
          {weekDates.map((item, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedDay(item.date)}
              className={`flex flex-col items-center min-w-[56px] py-3 rounded-2xl transition-all duration-300 ${
                selectedDay === item.date 
                  ? 'bg-blue-600 text-white shadow-[0_0_20px_rgba(37,99,235,0.4)] scale-105' 
                  : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-slate-200'
              }`}
            >
              <span className={`text-[9px] font-black uppercase tracking-tighter mb-1 ${selectedDay === item.date ? 'text-blue-100' : 'text-slate-500'}`}>
                {item.dayName}
              </span>
              <span className="text-sm font-bold">{item.date}</span>
              {item.isToday && selectedDay !== item.date && (
                <div className="w-1 h-1 bg-blue-600 rounded-full mt-1 shadow-[0_0_5px_rgba(37,99,235,0.8)]" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Dynamic Data Sections */}
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
        {renderSection("Latest Released", `Tasks active for Jan ${selectedDay}`, filteredLatest, History)}
        {renderSection("Upcoming Deadlines", "Critical priority items", upcomingDeadlines, Clock)}
      </div>
    </div>
  );
};
