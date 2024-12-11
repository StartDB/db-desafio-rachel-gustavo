import UserCredentialsDTO from "../services/interfaces/userCredentials.dto";

export default async function loginUser(userCredentials: UserCredentialsDTO):Promise<number>{
    const url:string = "http://localhost:8080/??"

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