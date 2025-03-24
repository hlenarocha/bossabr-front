import { createContext, ReactNode, useState } from 'react';
import UserInterface from '../interfaces/UserInterface';

interface UserContextInterface { // interface para o contexto
  user: UserInterface | null;
  setUser: (user: any) => any;
}


export const UserContext = createContext<UserContextInterface>({
  user: null,
  setUser: (user: any) => console.log(user),
});

export function UserProvider({ children } : { children: ReactNode}) {
  const [user, setUser] = useState(null);

  return (
  <UserContext.Provider value={{ user, setUser }}>
    {children}

  </UserContext.Provider>
  );

}