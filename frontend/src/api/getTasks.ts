import { TaskDTO } from "../services/interfaces/task.dto";

export default async function getTasks(supportType?: string): Promise<TaskDTO[]> {
    const initialUrl: string = "http://localhost:8080/task/status-type-filter?status=AVAILABLE";
    const finalUrl:string = supportType ? `${initialUrl}&&supportType=${supportType}` : initialUrl

    try {

        const response: Response = await fetch(finalUrl)

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