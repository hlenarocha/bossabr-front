import { createContext, ReactNode, useState } from 'react';
import UserInterface from '@/interfaces/UserInterface';

interface UserContextInterface {
  user: UserInterface | null;
  setUser: React.Dispatch<React.SetStateAction<UserInterface | null>>;
  // Adicionada a nova função à interface do contexto
  switchUserRoleForTesting: (newRole: string) => void;
}

export const UserContext = createContext<UserContextInterface>({
  user: null,
  setUser: () => {
    throw new Error('setUser was called outside of UserProvider');
  },
  // Adicionado o valor padrão para a nova função
  switchUserRoleForTesting: () => {
    throw new Error('switchUserRoleForTesting was called outside of UserProvider');
  },
});

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserInterface | null>(null);

  // Lógica principal do trocador de cargos
  const switchUserRoleForTesting = (newRole: string) => {
    // CRÍTICO: Garante que esta função só funcione em ambiente de desenvolvimento
    if (import.meta.env.MODE === 'development' && user) {
      console.warn(`[MODO DE TESTE] Cargo do usuário alterado para: ${newRole}`);
      // Atualiza o estado do usuário, mantendo os dados existentes e trocando apenas o cargo
      // Certifique-se que sua UserInterface tenha a propriedade 'role'
      setUser(currentUser => {
        if (!currentUser) return null;
        return { ...currentUser, role: newRole };
      });
    } else {
      console.error("A troca de cargos só é permitida em ambiente de desenvolvimento.");
    }
  };

  // Disponibiliza a nova função para toda a aplicação através do contexto
  const value = { user, setUser, switchUserRoleForTesting };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}