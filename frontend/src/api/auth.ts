import { UserDTO } from "../services/interfaces/user.dto";
import UserCredentialsDTO from "../services/interfaces/userCredentials.dto";

export default async function loginUser(userCredentials: UserCredentialsDTO):Promise<UserDTO>{
    const url:string = "http://localhost:8080/user/login"

    const response: Response = await fetch(url,{
        method: "POST",
        headers: {
           "Content-Type": "application/json",
        },
        body: JSON.stringify(userCredentials)
    });

    if(!response.ok) {
        throw new Error(`Erro: ${response.status}`)
    }

    return response.json()
}