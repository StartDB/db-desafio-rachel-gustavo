import { UserDTO } from "../services/interfaces/user.dto";

export default async function getPublicUser(publicId: string | undefined, role: string | undefined): Promise<UserDTO> {
    const url: string = `http://localhost:8080/${role}/getProfileById?id=${publicId}`;

    try {
        const response: Response = await fetch(url)

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

    } catch(error: any){
        throw error;

    }
}