import { TaskDTO } from "../services/interfaces/task.dto";

export default async function getTaskUpdate(taskId: number,  valueButton: string, userId: number): Promise<TaskDTO> {
    const url: string = `http://localhost:8080/task/updateStatus?id=${taskId}&button=${valueButton}&volunteerId=${userId}`;

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