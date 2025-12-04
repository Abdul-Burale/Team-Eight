import type { LucideIcon } from 'lucide-react';

interface SummaryCardProps {
  icon: LucideIcon;
  value: number;
  label: string;
}

export default function SummaryCard({ icon: Icon, value, label }: SummaryCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex flex-col items-center text-center">
        <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-4">
          <Icon className="w-6 h-6 text-blue-600" />
        </div>
        <div className="text-3xl font-bold text-gray-900 mb-1">{value}</div>
        <div className="text-sm text-gray-600">{label}</div>
      </div>
    </div>
  );
}

