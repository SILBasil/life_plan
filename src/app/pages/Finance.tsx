import { DollarSign, TrendingUp, TrendingDown, Target } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const spendingData = [
  { category: 'Housing', amount: 1200 },
  { category: 'Food', amount: 450 },
  { category: 'Transport', amount: 200 },
  { category: 'Entertainment', amount: 180 },
  { category: 'Shopping', amount: 320 },
  { category: 'Health', amount: 150 },
];

const recentTransactions = [
  { id: 1, date: 'Jan 22', description: 'Grocery Shopping', category: 'Food', amount: -85.50 },
  { id: 2, date: 'Jan 21', description: 'Salary Deposit', category: 'Income', amount: 3500 },
  { id: 3, date: 'Jan 20', description: 'Netflix Subscription', category: 'Entertainment', amount: -15.99 },
  { id: 4, date: 'Jan 19', description: 'Gas Station', category: 'Transport', amount: -45.00 },
  { id: 5, date: 'Jan 18', description: 'Restaurant', category: 'Food', amount: -68.25 },
];

export function Finance() {
  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-800 mb-2">Finance Overview</h2>
        <p className="text-slate-500">Track your financial health</p>
      </div>
      
      {/* Balance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <TrendingUp size={32} />
            <span className="text-4xl font-bold">$3,500</span>
          </div>
          <p className="text-green-100">Monthly Income</p>
        </div>
        
        <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-2xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <TrendingDown size={32} />
            <span className="text-4xl font-bold">$2,500</span>
          </div>
          <p className="text-red-100">Monthly Expenses</p>
        </div>
        
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <DollarSign size={32} />
            <span className="text-4xl font-bold">$1,000</span>
          </div>
          <p className="text-blue-100">Net Savings</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Spending by Category */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Spending by Category</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={spendingData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="category" stroke="#64748b" fontSize={12} />
              <YAxis stroke="#64748b" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                }}
                formatter={(value) => `$${value}`}
              />
              <Bar dataKey="amount" fill="#3b82f6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        {/* Recent Transactions */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Recent Transactions</h3>
          <div className="space-y-3">
            {recentTransactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 transition-colors"
              >
                <div className="flex-1">
                  <p className="font-medium text-slate-800">{transaction.description}</p>
                  <p className="text-sm text-slate-500">{transaction.date} • {transaction.category}</p>
                </div>
                <span className={`font-semibold ${
                  transaction.amount > 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount).toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Financial Goals */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Savings Goal</h3>
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-600">Emergency Fund</span>
              <span className="font-semibold text-slate-800">$7,500 / $10,000</span>
            </div>
            <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-green-400 to-green-500 w-3/4" />
            </div>
            <p className="text-sm text-slate-500 mt-2">75% complete • $2,500 to go</p>
          </div>
        </div>
        
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Debt Payoff</h3>
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-600">Credit Card</span>
              <span className="font-semibold text-slate-800">$1,200 / $3,000</span>
            </div>
            <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-blue-400 to-blue-500 w-2/5" />
            </div>
            <p className="text-sm text-slate-500 mt-2">40% paid off • $1,800 remaining</p>
          </div>
        </div>
      </div>
    </div>
  );
}
