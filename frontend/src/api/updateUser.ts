import { UserDTO } from "../services/interfaces/user.dto";

export async function updateUser(user: UserDTO): Promise<UserDTO> {
    const url = `http://localhost:8080/${user.role}/update`;

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        });
    
        if (!response.ok) {
            throw new Error(`Erro inesperado. Status: ${response.status}`);
        }
    
        return response.json()

    } catch(error: any) {
        if (error instanceof TypeError) {
            console.log(error.message)
            
        } else if(error instanceof Error) {
            console.log(error.message)

        } else if (error instanceof SyntaxError) {
            console.log(error.message)

        } else {
            console.log(error.message)
        }
        
        throw error;
    }
    
}

