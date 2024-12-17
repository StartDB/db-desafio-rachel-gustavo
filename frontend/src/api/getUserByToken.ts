import { UserDTO } from "../services/interfaces/user.dto";

export default async function getUserByToken(token: String):Promise<UserDTO>{
    const url:string = `http://localhost:8080/user/getUserByToken?token=${token}`

    const response: Response = await fetch(url);

    if(!response.ok) {
        throw new Error(`Erro: ${response.status}`)
    }

    const user = await response.json();

    return user;
}