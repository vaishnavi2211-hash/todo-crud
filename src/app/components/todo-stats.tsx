import { Card } from '@/app/components/ui/card';
import { CheckCircle2, Circle, AlertCircle } from 'lucide-react';

interface TodoStatsProps {
  total: number;
  completed: number;
  active: number;
}

export function TodoStats({ total, completed, active }: TodoStatsProps) {
  const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

  const stats = [
    {
      label: 'Total Tasks',
      value: total,
      icon: <AlertCircle className="size-5 text-blue-600" />,
      color: 'bg-blue-50 border-blue-200',
    },
    {
      label: 'Active',
      value: active,
      icon: <Circle className="size-5 text-yellow-600" />,
      color: 'bg-yellow-50 border-yellow-200',
    },
    {
      label: 'Completed',
      value: completed,
      icon: <CheckCircle2 className="size-5 text-green-600" />,
      color: 'bg-green-50 border-green-200',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {stats.map((stat) => (
        <Card key={stat.label} className={`p-4 ${stat.color}`}>
          <div className="flex items-center gap-3">
            {stat.icon}
            <div>
              <p className="text-sm text-gray-600">{stat.label}</p>
              <p className="text-2xl font-semibold">{stat.value}</p>
            </div>
          </div>
        </Card>
      ))}
      
      <Card className="p-4 bg-purple-50 border-purple-200 sm:col-span-3">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">Completion Rate</p>
            <p className="text-2xl font-semibold text-purple-700">{completionRate}%</p>
          </div>
          <div className="w-32 h-32">
            <svg viewBox="0 0 100 100" className="transform -rotate-90">
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="#e0e7ff"
                strokeWidth="8"
              />
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="#9333ea"
                strokeWidth="8"
                strokeDasharray={`${completionRate * 2.51} 251`}
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>
      </Card>
    </div>
  );
}
