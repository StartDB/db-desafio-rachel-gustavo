import { UserDTO } from "../services/interfaces/user.dto";

export async function postUser(user: UserDTO): Promise<String> {
    const url = `http://localhost:8080/${user.role}/save`;

    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    });

    const responseText = await response.text()

    if (!response.ok) {
        throw new Error(`${responseText}.`)
    }
    console.log(responseText)
    return responseText
}
