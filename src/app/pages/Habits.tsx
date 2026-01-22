import { CheckCircle2, Circle, Flame } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const mockHabits = [
  { id: 1, name: 'Morning Meditation', streak: 15, completed: true, progress: 75, weekData: [1, 1, 1, 0, 1, 1, 1] },
  { id: 2, name: 'Drink 8 glasses of water', streak: 8, completed: true, progress: 88, weekData: [1, 1, 0, 1, 1, 1, 1] },
  { id: 3, name: 'Read for 30 minutes', streak: 22, completed: false, progress: 85, weekData: [1, 1, 1, 1, 1, 0, 0] },
  { id: 4, name: 'Exercise', streak: 5, completed: true, progress: 65, weekData: [0, 1, 1, 0, 1, 1, 1] },
  { id: 5, name: 'No social media after 9PM', streak: 12, completed: false, progress: 72, weekData: [1, 1, 1, 1, 0, 1, 0] },
];

const weeklyData = [
  { day: 'Mon', completed: 4 },
  { day: 'Tue', completed: 5 },
  { day: 'Wed', completed: 4 },
  { day: 'Thu', completed: 3 },
  { day: 'Fri', completed: 4 },
  { day: 'Sat', completed: 4 },
  { day: 'Sun', completed: 3 },
];

export function Habits() {
  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-800 mb-2">Habits Tracker</h2>
        <p className="text-slate-500">Build consistency, one day at a time</p>
      </div>
      
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <Flame size={32} />
            <span className="text-4xl font-bold">22</span>
          </div>
          <p className="text-green-100">Longest Streak</p>
        </div>
        
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <CheckCircle2 size={32} />
            <span className="text-4xl font-bold">77%</span>
          </div>
          <p className="text-blue-100">Average Completion</p>
        </div>
        
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <CheckCircle2 size={32} />
            <span className="text-4xl font-bold">3/5</span>
          </div>
          <p className="text-purple-100">Completed Today</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Habits List */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Your Habits</h3>
          <div className="space-y-4">
            {mockHabits.map((habit) => (
              <div key={habit.id} className="border border-slate-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3 flex-1">
                    {habit.completed ? (
                      <CheckCircle2 className="text-green-500 flex-shrink-0" size={24} />
                    ) : (
                      <Circle className="text-slate-300 flex-shrink-0" size={24} />
                    )}
                    <div className="flex-1">
                      <h4 className="font-medium text-slate-800">{habit.name}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <Flame size={14} className="text-orange-500" />
                        <span className="text-sm text-slate-500">{habit.streak} day streak</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Progress Bar */}
                <div className="mb-2">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-slate-500">Weekly Progress</span>
                    <span className="text-xs font-medium text-slate-700">{habit.progress}%</span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-blue-600"
                      style={{ width: `${habit.progress}%` }}
                    />
                  </div>
                </div>
                
                {/* Week View */}
                <div className="flex gap-1 mt-3">
                  {habit.weekData.map((completed, i) => (
                    <div
                      key={i}
                      className={`flex-1 h-6 rounded ${
                        completed ? 'bg-green-500' : 'bg-slate-200'
                      }`}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Weekly Consistency */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Weekly Consistency</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="day" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                }}
              />
              <Bar dataKey="completed" fill="#3b82f6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          
          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
            <p className="text-sm text-slate-600">
              <span className="font-semibold text-blue-600">Great job!</span> You've maintained an average of 4 habits per day this week.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
