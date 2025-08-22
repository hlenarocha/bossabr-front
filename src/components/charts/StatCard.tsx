import React from 'react';

interface StatCardProps {
  title: string;
  value: number;
  icon: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon }) => {
  return (
    <div className="bg-zinc-800 p-6 rounded-lg flex-1 flex items-center gap-6">
      <div className="text-customYellow text-4xl">
        <i className={icon}></i>
      </div>
      <div>
        <p className="text-zinc-400 text-sm font-semibold">{title}</p>
        <p className="text-white text-4xl font-bold">{value}</p>
      </div>
    </div>
  );
};

export default StatCard;
