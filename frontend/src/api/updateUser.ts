import { UserDTO } from "../services/interfaces/user.dto";

export async function updateUser(user: UserDTO): Promise<UserDTO> {
    const url = `http://localhost:8080/${user.role}/update`;

    try {
        const response: Response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        });
    
        if (!response.ok) {
            let errorBody: string | undefined;

            try {
                errorBody = await response.text(); 

            } catch {
                errorBody = undefined;
            }
    
            const errorMessage: string = errorBody || `Status ${response.status}: ${response.statusText}`;
            throw new Error(errorMessage);
        }
    
        return response.json()

    } catch(error: any) {
        throw error;
    }
    
}

