import { createContext, ReactNode, useEffect, useState } from "react";
import { UserDTO } from "../services/interfaces/user.dto";
import getUserByToken from "../api/getUserByToken"

export interface UserContextType {
    user: UserDTO | null;
    setUser: React.Dispatch<React.SetStateAction<UserDTO | null>>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
    children: ReactNode;
}

function UserProvider({ children }: UserProviderProps) {
    const [user, setUser] = useState<UserDTO | null>(null);
    
    useEffect(() => {
      const fetchUser = async () => {
        const userToken = localStorage.getItem("user_token");
  
        if (userToken) {
          try {
            const user = await getUserByToken(userToken);
            if (user) {
              setUser(user);
            }
          } catch (error) {
            console.error("");
          }
        }
      };
  
      fetchUser();
    }, [])

    return (
      <UserContext.Provider value={{ user, setUser }}>
        {children}
      </UserContext.Provider>
    );
  };
  
  export { UserProvider }
  export default UserContext;