import { UserDTO } from "../services/interfaces/user.dto";

export default async function getUserByToken(token: String):Promise<UserDTO>{
    const finalToken = token = token.replace(/^"(.*)"$/, '$1')
    const url:string = `http://localhost:8080/user/getUserByToken?token=${finalToken}`

    const response: Response = await fetch(url);

    if(!response.ok) {
        throw new Error(`Erro: ${response.status}`)
    }

    const user = await response.json();

    return user;
}