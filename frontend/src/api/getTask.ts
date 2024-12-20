import { TaskDTO } from "../services/interfaces/task.dto";

export default async function getTask(taskId: number): Promise<TaskDTO> {
    const url: string = `http://localhost:8080/task/getTask?id=${taskId}`;

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
        const finalResponse = await response.json()
        return finalResponse

    } catch(error: any){
        throw error;

    }
}