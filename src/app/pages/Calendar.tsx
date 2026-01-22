import { useState } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday } from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const mockEvents: Record<string, { category: string; count: number }[]> = {
  '2026-01-15': [{ category: 'work', count: 3 }, { category: 'health', count: 1 }],
  '2026-01-20': [{ category: 'work', count: 2 }, { category: 'personal', count: 1 }],
  '2026-01-22': [{ category: 'work', count: 4 }, { category: 'health', count: 2 }],
  '2026-01-25': [{ category: 'personal', count: 1 }],
};

const categoryColors: Record<string, string> = {
  work: 'bg-blue-500',
  health: 'bg-green-500',
  personal: 'bg-purple-500',
  learning: 'bg-yellow-500',
};

export function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 0, 22));
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [view, setView] = useState<'month' | 'week' | 'day'>('month');
  
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });
  
  const startingDayOfWeek = monthStart.getDay();
  const leadingDays = Array(startingDayOfWeek).fill(null);
  
  const allDays = [...leadingDays, ...daysInMonth];
  
  const selectedDateEvents = selectedDate ? mockEvents[selectedDate] || [] : [];
  
  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-800 mb-2">Calendar</h2>
        <p className="text-slate-500">View and manage your schedule</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Calendar */}
        <div className="lg:col-span-3 bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-slate-800">
              {format(currentDate, 'MMMM yyyy')}
            </h3>
            <div className="flex items-center gap-4">
              {/* View Toggle */}
              <div className="flex bg-slate-100 rounded-lg p-1">
                {(['month', 'week', 'day'] as const).map((v) => (
                  <button
                    key={v}
                    onClick={() => setView(v)}
                    className={`px-4 py-1 rounded-md text-sm font-medium capitalize transition-colors ${
                      view === v ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-600'
                    }`}
                  >
                    {v}
                  </button>
                ))}
              </div>
              
              {/* Month Navigation */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))}
                  className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))}
                  className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          </div>
          
          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-2">
            {/* Day Headers */}
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <div key={day} className="text-center font-semibold text-slate-600 py-2 text-sm">
                {day}
              </div>
            ))}
            
            {/* Days */}
            {allDays.map((day, index) => {
              if (!day) {
                return <div key={`empty-${index}`} className="aspect-square" />;
              }
              
              const dateKey = format(day, 'yyyy-MM-dd');
              const events = mockEvents[dateKey] || [];
              const isCurrentMonth = isSameMonth(day, currentDate);
              const isCurrentDay = isToday(day);
              
              return (
                <button
                  key={dateKey}
                  onClick={() => setSelectedDate(dateKey)}
                  className={`aspect-square rounded-lg p-2 transition-all border ${
                    selectedDate === dateKey
                      ? 'bg-blue-50 border-blue-300 shadow-sm'
                      : isCurrentDay
                      ? 'bg-blue-100 border-blue-200'
                      : 'border-slate-200 hover:bg-slate-50'
                  } ${!isCurrentMonth ? 'opacity-40' : ''}`}
                >
                  <div className={`text-sm font-medium mb-1 ${
                    isCurrentDay ? 'text-blue-600' : isCurrentMonth ? 'text-slate-800' : 'text-slate-400'
                  }`}>
                    {format(day, 'd')}
                  </div>
                  <div className="flex gap-1 justify-center">
                    {events.slice(0, 3).map((event, i) => (
                      <div
                        key={i}
                        className={`w-1.5 h-1.5 rounded-full ${categoryColors[event.category]}`}
                      />
                    ))}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
        
        {/* Day Preview */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">
            {selectedDate ? format(new Date(selectedDate), 'MMM d, yyyy') : 'Select a day'}
          </h3>
          
          {selectedDateEvents.length > 0 ? (
            <div className="space-y-3">
              <div>
                <p className="text-sm text-slate-500 mb-2">Tasks & Events</p>
                {selectedDateEvents.map((event, index) => (
                  <div key={index} className="flex items-center gap-2 mb-2">
                    <div className={`w-3 h-3 rounded-full ${categoryColors[event.category]}`} />
                    <span className="text-sm text-slate-700 capitalize">
                      {event.category}: {event.count} tasks
                    </span>
                  </div>
                ))}
              </div>
              
              <div className="pt-3 border-t border-slate-200">
                <p className="text-sm text-slate-500 mb-1">Energy Usage</p>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-green-400 to-yellow-400 w-3/4" />
                  </div>
                  <span className="text-sm font-medium text-slate-700">75%</span>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-sm text-slate-400">No tasks scheduled</p>
          )}
        </div>
      </div>
    </div>
  );
}
