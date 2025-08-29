import React from 'react';
import SectorTag from './SectorTag';
import StatusTag from './StatusTag';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export interface TimelineItemProps {
  id: string | number;
  type: 'Design' | 'Social Media' | string;
  author: string;
  teamName?: string; 
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
    <div className="relative pl-4 sm:pl-6 py-4">
      <div className="absolute left-5 sm:left-7 top-0 bottom-0 w-1 bg-zinc-700"></div>

      {items.length > 0 ? (
        items.map((item) => (
          <div key={item.id} className="relative mb-8">
            <div className="absolute -left-1.5 top-1 h-5 w-5 rounded-full bg-customYellow ring-8 ring-zinc-900"></div>
            
            <div className="ml-10 sm:ml-12 p-3 sm:p-4 bg-zinc-800 rounded-lg">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-2">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                  <SectorTag sectorName={item.type} />
                  <div className="flex items-center sm:divide-x-2 divide-zinc-600">
                    <p className="font-bold text-white text-lg pr-3">{item.author}</p>
                    {item.teamName && <p className="text-zinc-400 text-sm sm:pl-3">{item.teamName}</p>}
                  </div>
                </div>
                <p className="text-sm text-zinc-400 shrink-0">
                  {format(new Date(item.date), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2 mb-3">
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