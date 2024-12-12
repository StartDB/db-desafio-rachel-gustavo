import { UserDTO } from "../services/interfaces/user.dto";

export async function postUser(user: UserDTO): Promise<UserDTO> {
    const url = `http://localhost:8080/${user.role}/save`;

    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    });

    if (!response.ok) {
        throw new Error(`Erro: ${response.status}`)
    }
    return response.json()
}
