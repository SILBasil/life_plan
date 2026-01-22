import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Sidebar } from '@/app/components/Sidebar';
import { Dashboard } from '@/app/pages/Dashboard';
import { DailyPlanner } from '@/app/pages/DailyPlanner';
import { Calendar } from '@/app/pages/Calendar';
import { Habits } from '@/app/pages/Habits';
import { Finance } from '@/app/pages/Finance';
import { Goals } from '@/app/pages/Goals';
import { Settings } from '@/app/pages/Settings';

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex h-screen bg-slate-50">
        <Sidebar />
        <main className="flex-1 overflow-auto">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/planner" element={<DailyPlanner />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/habits" element={<Habits />} />
            <Route path="/finance" element={<Finance />} />
            <Route path="/goals" element={<Goals />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
