import { Briefcase, Heart, DollarSign, BookOpen, Users, TrendingUp } from 'lucide-react';

const lifeAreas = [
  {
    id: 1,
    name: 'Work',
    icon: Briefcase,
    color: 'from-blue-500 to-blue-600',
    progress: 75,
    goals: [
      { name: 'Complete Q1 project', progress: 80, status: 'on-track' },
      { name: 'Learn new framework', progress: 60, status: 'on-track' },
      { name: 'Mentor junior developers', progress: 40, status: 'at-risk' },
    ],
  },
  {
    id: 2,
    name: 'Health',
    icon: Heart,
    color: 'from-green-500 to-green-600',
    progress: 82,
    goals: [
      { name: 'Run 5K race', progress: 90, status: 'on-track' },
      { name: 'Meal prep weekly', progress: 75, status: 'on-track' },
      { name: 'Sleep 8 hours daily', progress: 70, status: 'on-track' },
    ],
  },
  {
    id: 3,
    name: 'Finance',
    icon: DollarSign,
    color: 'from-purple-500 to-purple-600',
    progress: 65,
    goals: [
      { name: 'Save $10K emergency fund', progress: 75, status: 'on-track' },
      { name: 'Pay off credit card', progress: 40, status: 'at-risk' },
      { name: 'Start investing', progress: 20, status: 'behind' },
    ],
  },
  {
    id: 4,
    name: 'Personal Growth',
    icon: BookOpen,
    color: 'from-yellow-500 to-yellow-600',
    progress: 70,
    goals: [
      { name: 'Read 24 books this year', progress: 85, status: 'on-track' },
      { name: 'Learn Spanish', progress: 55, status: 'on-track' },
      { name: 'Attend 2 workshops', progress: 50, status: 'on-track' },
    ],
  },
  {
    id: 5,
    name: 'Relationships',
    icon: Users,
    color: 'from-pink-500 to-pink-600',
    progress: 88,
    goals: [
      { name: 'Weekly family dinner', progress: 95, status: 'on-track' },
      { name: 'Monthly friend gatherings', progress: 80, status: 'on-track' },
      { name: 'Call parents weekly', progress: 90, status: 'on-track' },
    ],
  },
  {
    id: 6,
    name: 'Career',
    icon: TrendingUp,
    color: 'from-indigo-500 to-indigo-600',
    progress: 60,
    goals: [
      { name: 'Get promoted', progress: 55, status: 'on-track' },
      { name: 'Build professional network', progress: 65, status: 'on-track' },
      { name: 'Speak at conference', progress: 30, status: 'behind' },
    ],
  },
];

const getStatusColor = (status: string) => {
  if (status === 'on-track') return 'text-green-600 bg-green-50';
  if (status === 'at-risk') return 'text-yellow-600 bg-yellow-50';
  return 'text-red-600 bg-red-50';
};

const getStatusText = (status: string) => {
  if (status === 'on-track') return 'On Track';
  if (status === 'at-risk') return 'At Risk';
  return 'Behind';
};

export function Goals() {
  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-800 mb-2">Goals & Life Areas</h2>
        <p className="text-slate-500">Track progress across all areas of your life</p>
      </div>
      
      {/* Overall Progress */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-100 mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-slate-800">Overall Life Balance</h3>
          <span className="text-2xl font-bold text-blue-600">73%</span>
        </div>
        <div className="h-4 bg-white rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 w-3/4" />
        </div>
        <p className="text-sm text-slate-600 mt-3">
          You're making great progress! Keep focusing on your goals and celebrate your wins.
        </p>
      </div>
      
      {/* Life Areas Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {lifeAreas.map((area) => {
          const Icon = area.icon;
          
          return (
            <div
              key={area.id}
              className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-lg transition-shadow"
            >
              {/* Header */}
              <div className={`bg-gradient-to-r ${area.color} p-6 text-white`}>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Icon size={28} />
                    <h3 className="text-xl font-bold">{area.name}</h3>
                  </div>
                  <span className="text-3xl font-bold">{area.progress}%</span>
                </div>
                <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-white"
                    style={{ width: `${area.progress}%` }}
                  />
                </div>
              </div>
              
              {/* Goals List */}
              <div className="p-6">
                <h4 className="text-sm font-semibold text-slate-500 uppercase mb-4">Active Goals</h4>
                <div className="space-y-4">
                  {area.goals.map((goal, index) => (
                    <div key={index}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-slate-700">{goal.name}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-medium text-slate-600">{goal.progress}%</span>
                          <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(goal.status)}`}>
                            {getStatusText(goal.status)}
                          </span>
                        </div>
                      </div>
                      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full bg-gradient-to-r ${area.color}`}
                          style={{ width: `${goal.progress}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
