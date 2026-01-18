
import React from 'react';
import { Task } from '../types';
import { FileText, Zap, ChevronRight, Clock } from 'lucide-react';

interface TaskCardProps {
  task: Task;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  const isCompleted = task.solved === task.total && task.total > 0;

  return (
    <div className={`relative min-w-[340px] flex-1 bg-white rounded-2xl border-2 transition-all p-5 flex flex-col justify-between group overflow-hidden ${
      task.isDueTomorrow ? 'border-red-100 hover:border-red-300' : 'border-slate-50 hover:border-slate-200 hover:shadow-lg hover:shadow-slate-100'
    }`}>
      {/* Header */}
      <div>
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">{task.subject}</h3>
          {task.isDueTomorrow && (
            <span className="bg-red-500 text-white text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-wider animate-pulse">
              Due Tomorrow
            </span>
          )}
        </div>

        <div className="flex items-center space-x-2 mb-4">
          <div className={`p-2 rounded-lg ${task.type === 'Post Class' ? 'bg-orange-50 text-orange-600' : 'bg-emerald-50 text-emerald-600'}`}>
            <FileText className="w-4 h-4" />
          </div>
          <span className="text-xs font-semibold text-slate-700">{task.type}</span>
        </div>

        <h2 className="text-sm font-bold text-slate-800 leading-snug mb-2 group-hover:text-blue-600 transition-colors">
          {task.title}
        </h2>
        <p className="text-[11px] text-slate-400 font-medium mb-4">
          Deadline is {task.deadline}
        </p>

        {/* XP and Multiplier */}
        <div className="flex items-center space-x-3 mb-6">
          <div className="bg-orange-50 text-orange-600 text-[10px] font-bold px-2 py-0.5 rounded border border-orange-100">
            2x
          </div>
          <div className="flex items-center">
            <Zap className="w-3.5 h-3.5 text-orange-400 mr-1" />
            <span className="text-xs font-bold text-slate-600">{task.solved}/{task.xpValue}</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between mt-auto">
        <div className="flex flex-col">
          <span className={`text-[11px] font-bold ${isCompleted ? 'text-emerald-500' : 'text-slate-400'}`}>
            {task.solved} <span className="text-slate-300">/</span> {task.total} <span className="ml-1">Solved</span>
          </span>
          <div className="w-24 h-1.5 bg-slate-100 rounded-full mt-1.5 overflow-hidden">
            <div 
              className={`h-full transition-all duration-700 ${isCompleted ? 'bg-emerald-400' : 'bg-slate-300'}`} 
              style={{ width: `${(task.solved / task.total) * 100}%` }}
            />
          </div>
        </div>

        <button className="flex items-center bg-slate-900 hover:bg-black text-white px-5 py-2 rounded-xl text-xs font-bold transition-all transform active:scale-95">
          Solve
          <ChevronRight className="w-4 h-4 ml-1" />
        </button>
      </div>

      {/* Decorative background circle */}
      <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-slate-50 rounded-full opacity-50 group-hover:scale-125 transition-transform" />
    </div>
  );
};
