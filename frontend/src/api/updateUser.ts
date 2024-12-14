import { UserDTO } from "../services/interfaces/user.dto";

export async function updateUser(user: UserDTO): Promise<UserDTO> {
    const url = `http://localhost:8080/${user.role}/update`;

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
    console.log(response.json())
    return response.json()
}
