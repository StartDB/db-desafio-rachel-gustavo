import { useContext } from "react";
import UserContext, { UserContextType } from "../UserContext";

function useUser(): UserContextType {
    const context = useContext(UserContext);

    if (!context) {
      throw new Error("useUser deve ser usado dentro de um UserProvider");
    }
  
    return context;
};

export default useUser