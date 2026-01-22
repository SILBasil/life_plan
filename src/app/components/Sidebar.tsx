import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Calendar, 
  CalendarDays, 
  Target, 
  Wallet, 
  TrendingUp, 
  Settings 
} from 'lucide-react';

const navItems = [
  { path: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { path: '/planner', icon: CalendarDays, label: 'Daily Planner' },
  { path: '/calendar', icon: Calendar, label: 'Calendar' },
  { path: '/habits', icon: Target, label: 'Habits' },
  { path: '/finance', icon: Wallet, label: 'Finance' },
  { path: '/goals', icon: TrendingUp, label: 'Goals' },
  { path: '/settings', icon: Settings, label: 'Settings' },
];

export function Sidebar() {
  const location = useLocation();

  return (
    <aside className="w-64 h-screen bg-white border-r border-slate-200 flex flex-col">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-slate-800">Life OS</h1>
        <p className="text-sm text-slate-500 mt-1">Your Life Control Center</p>
      </div>
      
      <nav className="flex-1 px-3">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg mb-1 transition-colors ${
                isActive 
                  ? 'bg-blue-50 text-blue-600' 
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <Icon size={20} />
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>
      
      <div className="p-4 border-t border-slate-200">
        <p className="text-xs text-slate-400 text-center">
          Life OS v1.0
        </p>
      </div>
    </aside>
  );
}
