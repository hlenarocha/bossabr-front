import React from 'react';

interface BurnoutCardProps {
  name: string;
  score: number;
}

const BurnoutCard: React.FC<BurnoutCardProps> = ({ name, score }) => {
  const MAX_SCORE = 100; // pontuação máxima esperada para o mês
  const percentage = Math.min((score / MAX_SCORE) * 100, 100);

  let colorClass = 'text-green-500';
  if (percentage > 50) colorClass = 'text-yellow-500';
  if (percentage > 80) colorClass = 'text-red-500';

  return (
    <div className="bg-zinc-800 p-4 rounded-lg flex items-center gap-4 w-full sm:w-auto sm:min-w-[250px] flex-grow">
      <div className="relative w-16 h-16">
        <svg className="w-full h-full" viewBox="0 0 36 36">
          <path
            className="text-zinc-700"
            d="M18 2.0845
              a 15.9155 15.9155 0 0 1 0 31.831
              a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
          />
          <path
            className={colorClass}
            stroke="currentColor"
            strokeWidth="3"
            strokeDasharray={`${percentage}, 100`}
            d="M18 2.0845
              a 15.9155 15.9155 0 0 1 0 31.831
              a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            strokeLinecap="round"
            transform="rotate(-90 18 18)"
          />
        </svg>
        <div className={`absolute inset-0 flex items-center justify-center font-bold text-lg ${colorClass}`}>
          {score}
        </div>
      </div>
      <div className="flex-1">
        <p className="text-white font-bold">{name}</p>
        <p className="text-sm text-zinc-400">Carga prevista</p>
      </div>
    </div>
  );
};

export default BurnoutCard;
