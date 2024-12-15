import { UserDTO } from "../services/interfaces/user.dto";

export async function postUser(user: UserDTO): Promise<String> {
    const url = `http://localhost:8080/${user.role}/save`;

    const response: Response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    });

    const responseText = await response.text()

    if (!response.ok) {
        const errorMessage: string = responseText || `Status ${response.status}: ${response.statusText}`;

        throw new Error(`${errorMessage}.`)
    }
    
    return responseText
}
