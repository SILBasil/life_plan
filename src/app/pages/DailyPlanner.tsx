import { useState } from 'react';
import { Plus, GripVertical } from 'lucide-react';

const timeSlots = Array.from({ length: 19 }, (_, i) => i + 6);

const mockTasks = [
  { id: 1, name: 'Morning Workout', time: 6, duration: 1, category: 'health', energy: 15 },
  { id: 2, name: 'Deep Work Session', time: 9, duration: 3, category: 'work', energy: 30 },
  { id: 3, name: 'Lunch Break', time: 12, duration: 1, category: 'personal', energy: -10 },
  { id: 4, name: 'Team Meeting', time: 14, duration: 1, category: 'work', energy: 10 },
  { id: 5, name: 'Creative Project', time: 16, duration: 2, category: 'work', energy: 20 },
  { id: 6, name: 'Evening Walk', time: 19, duration: 1, category: 'health', energy: -15 },
];

const categoryColors: Record<string, string> = {
  work: 'bg-blue-500',
  health: 'bg-green-500',
  personal: 'bg-purple-500',
  learning: 'bg-yellow-500',
};

export function DailyPlanner() {
  const [tasks] = useState(mockTasks);
  
  const formatTime = (hour: number) => {
    if (hour === 0) return '12:00 AM';
    if (hour === 12) return '12:00 PM';
    if (hour < 12) return `${hour}:00 AM`;
    return `${hour - 12}:00 PM`;
  };
  
  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-slate-800 mb-2">Daily Planner</h2>
          <p className="text-slate-500">Thursday, January 22, 2026</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <Plus size={20} />
          Add Task
        </button>
      </div>
      
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
        <div className="relative">
          {/* Timeline */}
          <div className="space-y-0">
            {timeSlots.map((hour) => {
              const tasksAtTime = tasks.filter(t => t.time === hour);
              
              return (
                <div key={hour} className="flex border-b border-slate-100 min-h-[80px]">
                  {/* Time Label */}
                  <div className="w-24 pr-4 py-4 text-sm font-medium text-slate-500">
                    {formatTime(hour)}
                  </div>
                  
                  {/* Content Area */}
                  <div className="flex-1 py-2 relative">
                    {tasksAtTime.map(task => (
                      <div
                        key={task.id}
                        className={`${categoryColors[task.category]} text-white rounded-lg p-4 mb-2 shadow-md hover:shadow-lg transition-all cursor-move`}
                        style={{ height: `${task.duration * 60}px` }}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <GripVertical size={16} />
                              <h4 className="font-semibold">{task.name}</h4>
                            </div>
                            <p className="text-sm opacity-90">{task.duration}h • {Math.abs(task.energy)}% energy {task.energy > 0 ? 'used' : 'restored'}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      
      {/* Energy Usage Summary */}
      <div className="mt-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-100">
        <h3 className="text-lg font-semibold text-slate-800 mb-3">Daily Energy Usage</h3>
        <div className="flex items-center gap-8">
          <div>
            <p className="text-sm text-slate-500">Energy Consumed</p>
            <p className="text-2xl font-bold text-red-600">75%</p>
          </div>
          <div>
            <p className="text-sm text-slate-500">Energy Restored</p>
            <p className="text-2xl font-bold text-green-600">25%</p>
          </div>
          <div>
            <p className="text-sm text-slate-500">Net Energy</p>
            <p className="text-2xl font-bold text-blue-600">50%</p>
          </div>
        </div>
      </div>
    </div>
  );
}
