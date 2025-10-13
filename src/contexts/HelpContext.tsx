import { createContext, useState, useEffect, useContext, ReactNode, useCallback } from 'react';
import { helpContentMap, HelpContent } from './helpContent';

interface HelpContextInterface {
  isOpen: boolean;
  content: HelpContent | null;
  openHelp: (pathname: string) => void;
  closeHelp: () => void;
}

const HelpContext = createContext<HelpContextInterface | undefined>(undefined);

export const HelpProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState<HelpContent | null>(null);

  const openHelp = useCallback((pathname: string) => {
    const helpData = helpContentMap[pathname];
    if (helpData) {
      setContent(helpData);
      setIsOpen(true);
    } else {
      setContent({ title: 'Ajuda não encontrada', content: ['Não há um tópico de ajuda específico para esta página.'] });
      setIsOpen(true);
    }
  }, []);

  const closeHelp = useCallback(() => {
    setIsOpen(false);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'F1') {
        event.preventDefault(); // Impede o navegador de abrir a sua própria ajuda
        openHelp(window.location.pathname);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    // Limpa o listener quando o componente é desmontado
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [openHelp]);

  const value = { isOpen, content, openHelp, closeHelp };

  return (
    <HelpContext.Provider value={value}>
      {children}
    </HelpContext.Provider>
  );
};

export const useHelp = () => {
  const context = useContext(HelpContext);
  if (context === undefined) {
    throw new Error('useHelp must be used within a HelpProvider');
  }
  return context;
};