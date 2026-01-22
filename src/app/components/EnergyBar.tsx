import { AlertCircle, CheckCircle, Zap } from 'lucide-react';

interface EnergyBarProps {
  energy: number;
  onChange?: (value: number) => void;
}

export function EnergyBar({ energy, onChange }: EnergyBarProps) {
  const getEnergyColor = (value: number) => {
    if (value >= 70) return 'from-green-400 to-green-500';
    if (value >= 40) return 'from-yellow-400 to-yellow-500';
    return 'from-red-400 to-red-500';
  };

  const getEnergyStatus = (value: number) => {
    if (value >= 70) return { icon: CheckCircle, text: 'Great energy! Keep up the momentum.', color: 'text-green-600' };
    if (value >= 40) return { icon: Zap, text: 'Moderate energy – pace yourself wisely.', color: 'text-yellow-600' };
    return { icon: AlertCircle, text: 'Low energy detected – consider resting.', color: 'text-red-600' };
  };

  const status = getEnergyStatus(energy);
  const StatusIcon = status.icon;

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-slate-800">Daily Energy</h3>
        <span className="text-3xl font-bold text-slate-800">{energy}%</span>
      </div>
      
      <div className="relative h-6 bg-slate-100 rounded-full overflow-hidden">
        <div
          className={`absolute inset-y-0 left-0 bg-gradient-to-r ${getEnergyColor(energy)} transition-all duration-500`}
          style={{ width: `${energy}%` }}
        />
      </div>
      
      <div className={`flex items-center gap-2 mt-4 ${status.color}`}>
        <StatusIcon size={16} />
        <p className="text-sm">{status.text}</p>
      </div>
    </div>
  );
}
