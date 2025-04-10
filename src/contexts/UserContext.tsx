import { createContext, ReactNode, useState } from 'react';
import UserInterface from '@/interfaces/UserInterface';

interface UserContextInterface { // interface para o contexto
  user: UserInterface | null;
  setUser: (user: UserInterface | null) => void;
}


export const UserContext = createContext<UserContextInterface>({
  user: null,
  setUser: () => {
    throw new Error('setUser was called outside of UserProvider')
;  },
});

export function UserProvider({ children } : { children: ReactNode}) {
  const [user, setUser] = useState<UserInterface | null>(null);

  return (
  <UserContext.Provider value={{ user, setUser }}>
    {children}

  </UserContext.Provider>
  );

}