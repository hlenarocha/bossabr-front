import React from 'react';

interface BurnoutCardProps {
  name: string;
  score: number;
}

const BURNOUT_THRESHOLDS = {
  ALTO: 90,  // Acima de 90 pontos é considerado alto risco
  MEDIO: 50, // Acima de 50 pontos é considerado médio risco
};

const BurnoutCard: React.FC<BurnoutCardProps> = ({ name, score }) => {
  // REMOVIDO: O cálculo de porcentagem que usava MAX_SCORE foi removido.

  // ALTERADO: A lógica de cor agora se baseia nos limites de carga definidos acima.
  let colorClass = 'text-green-500'; // Padrão: Baixo Risco
  if (score > BURNOUT_THRESHOLDS.MEDIO) {
    colorClass = 'text-yellow-500'; // Médio Risco
  }
  if (score > BURNOUT_THRESHOLDS.ALTO) {
    colorClass = 'text-red-500'; // Alto Risco
  }

  return (
    <div className="bg-zinc-800 p-4 rounded-lg flex items-center gap-4 w-full sm:w-auto sm:min-w-[250px] flex-grow">
      <div className="relative w-16 h-16">
        <svg className="w-full h-full" viewBox="0 0 36 36">
          <path
            className="text-zinc-700"
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
          />
          
          <path
            className={colorClass}
            stroke="currentColor"
            strokeWidth="3"
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
          />
        </svg>
        {/* O número exibido é o 'score' bruto, não uma porcentagem */}
        <div className={`absolute inset-0 flex items-center justify-center font-bold text-lg ${colorClass}`}>
          {score}
        </div>
      </div>
      <div className="flex-1">
        <p className="text-white font-bold">{name}</p>
        <p className="text-sm text-zinc-400">Carga de trabalho</p>
      </div>
    </div>
  );
};

export default BurnoutCard;