import { createContext, ReactNode, useState } from "react";
import { UserDTO } from "../services/interfaces/user.dto";

// Tipando as Props do contexto
export interface UserContextType {
    user: UserDTO | null;
    setUser: React.Dispatch<React.SetStateAction<UserDTO | null>>;
}

// Criando o contexto UserContext
const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
    children: ReactNode;
}

function UserProvider({ children }: UserProviderProps) {
    const [user, setUser] = useState<UserDTO | null>(null);
  
    return (
      <UserContext.Provider value={{ user, setUser }}>
        {children}
      </UserContext.Provider>
    );
  };
  
  export { UserProvider }
  export default UserContext;