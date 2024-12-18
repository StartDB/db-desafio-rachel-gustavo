import { TaskDTO } from "../services/interfaces/task.dto";
import { TaskSaveResponseDTO } from "../services/interfaces/taskSaveResponse.dto";

export async function postTask(task:TaskDTO): Promise<TaskSaveResponseDTO | String> {
    const url = `http://localhost:8080/task/save`;
    const response: Response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
    });

    const responseText = await response.json();

    if (response.ok) {
        const sucessesMessage: TaskSaveResponseDTO = responseText;
        return sucessesMessage;
    } else {
        const errorMessage: string = responseText || `Status ${response.status}: ${response.statusText}`;

        throw new Error(`${errorMessage}.`)
    }
    
}
