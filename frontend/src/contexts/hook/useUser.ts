import { useContext } from "react";
import UserContext, { UserContextType } from "../UserContext";

export function seUser(): UserContextType {
    const context = useContext(UserContext);

    if (!context) {
      throw new Error("Erro");
    }
  
    return context;
};