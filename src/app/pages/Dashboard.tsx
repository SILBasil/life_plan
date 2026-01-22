import { useState } from 'react';
import { format } from 'date-fns';
import { CheckCircle2, Clock, Zap, Trophy } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { EnergyBar } from '@/app/components/EnergyBar';

const mockTasks = [
  { id: 1, text: 'Morning workout', completed: true, priority: 'high' },
  { id: 2, text: 'Review project proposal', completed: true, priority: 'high' },
  { id: 3, text: 'Team meeting at 2 PM', completed: false, priority: 'medium' },
  { id: 4, text: 'Prepare presentation slides', completed: false, priority: 'high' },
  { id: 5, text: 'Call with client', completed: false, priority: 'medium' },
  { id: 6, text: 'Weekly review', completed: false, priority: 'low' },
];

export function Dashboard() {
  const [tasks, setTasks] = useState(mockTasks);
  const [energy, setEnergy] = useState(75);
  
  const currentDate = format(new Date(), 'EEEE, MMMM d, yyyy');
  const currentTime = format(new Date(), 'h:mm a');
  
  const completedTasks = tasks.filter(t => t.completed).length;
  const completionRate = Math.round((completedTasks / tasks.length) * 100);
  
  const pieData = [
    { name: 'Completed', value: completedTasks },
    { name: 'Remaining', value: tasks.length - completedTasks },
  ];
  
  const COLORS = ['#3b82f6', '#e2e8f0'];
  
  const toggleTask = (id: number) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };
  
  const getPriorityColor = (priority: string) => {
    if (priority === 'high') return 'border-l-red-500 bg-red-50';
    if (priority === 'medium') return 'border-l-yellow-500 bg-yellow-50';
    return 'border-l-green-500 bg-green-50';
  };
  
  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-800 mb-2">
          Good {new Date().getHours() < 12 ? 'Morning' : new Date().getHours() < 18 ? 'Afternoon' : 'Evening'}! 👋
        </h2>
        <p className="text-slate-500">{currentDate} • {currentTime}</p>
      </div>
      
      {/* Energy Bar */}
      <div className="mb-6">
        <EnergyBar energy={energy} onChange={setEnergy} />
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <CheckCircle2 size={32} />
            <span className="text-4xl font-bold">{completedTasks}/{tasks.length}</span>
          </div>
          <p className="text-blue-100">Tasks Completed</p>
        </div>
        
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <Clock size={32} />
            <span className="text-4xl font-bold">6.5h</span>
          </div>
          <p className="text-purple-100">Time Spent Today</p>
        </div>
        
        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <Zap size={32} />
            <span className="text-4xl font-bold">{energy}%</span>
          </div>
          <p className="text-green-100">Energy Remaining</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Progress Chart */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Today's Progress</h3>
          <div className="flex items-center justify-center">
            <div className="relative">
              <ResponsiveContainer width={200} height={200}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx={100}
                    cy={100}
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl font-bold text-slate-800">{completionRate}%</div>
                  <div className="text-sm text-slate-500">Complete</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Today Tasks */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Today's Tasks</h3>
          <div className="space-y-3">
            {tasks.map(task => (
              <div
                key={task.id}
                className={`flex items-center gap-3 p-4 rounded-lg border-l-4 transition-all ${getPriorityColor(task.priority)}`}
              >
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(task.id)}
                  className="w-5 h-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                />
                <span className={`flex-1 ${task.completed ? 'line-through text-slate-400' : 'text-slate-700'}`}>
                  {task.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Motivational Message */}
      <div className="mt-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-100">
        <div className="flex items-center gap-3">
          <Trophy className="text-yellow-500" size={32} />
          <div>
            <h4 className="text-lg font-semibold text-slate-800">You're doing great today!</h4>
            <p className="text-slate-600">Keep up the momentum and celebrate your progress.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
