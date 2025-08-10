import React from 'react';
import SectorTag from './SectorTag';
import StatusTag from './StatusTag';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

// 1. ADICIONE A PROPRIEDADE 'teamName' À INTERFACE
export interface TimelineItemProps {
  id: string | number;
  type: 'Design' | 'Social Media' | string;
  author: string;
  teamName?: string; // Nome da equipe (opcional)
  date: string;
  status: string;
  observation?: string | null;
}

interface TimelineProps {
  items: TimelineItemProps[];
  emptyMessage?: string;
}

const Timeline: React.FC<TimelineProps> = ({ items, emptyMessage = "Nenhum item no histórico." }) => {
  return (
    <div className="relative pl-6 py-4">
      <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-zinc-700"></div>

      {items.length > 0 ? (
        items.map((item) => (
          <div key={item.id} className="relative mb-8">
            <div className="absolute -left-1.5 top-1 h-5 w-5 rounded-full bg-customYellow ring-8 ring-zinc-900"></div>
            
            <div className="ml-12 p-4 bg-zinc-800 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-4">
                  <SectorTag sectorName={item.type} />
                  {/* 2. EXIBA O NOME DO AUTOR E DA EQUIPE */}
                  <div className="flex items-center divide-x-2 divide-zinc-600">
                    <p className="font-bold text-white text-lg pr-3">{item.author}</p>
                    {item.teamName && <p className="text-zinc-400 text-sm pl-3">{item.teamName}</p>}
                  </div>
                </div>
                <p className="text-sm text-zinc-400">
                  {format(new Date(item.date), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}
                </p>
              </div>
              <div className="flex items-center gap-2 mb-3">
                <p className="text-zinc-300">Atualizou o status para:</p>
                <StatusTag status={item.status} />
              </div>
              {item.observation && (
                <p className="text-zinc-300 italic">"{item.observation}"</p>
              )}
            </div>
          </div>
        ))
      ) : (
        <p className="text-zinc-400 ml-12">{emptyMessage}</p>
      )}
    </div>
  );
};

export default Timeline;

