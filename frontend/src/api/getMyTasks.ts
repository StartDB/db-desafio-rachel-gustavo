import { TaskDTO } from "../services/interfaces/task.dto";

export default async function getTasks(userType: string, userId: number): Promise<TaskDTO[]> {
    const url: string = `http://localhost:8080/${userType}/myTasks?id=${userId}`;

    const response: Response = await fetch(url);

    if (!response.ok) {
        throw new Error("Tarefas não identificadas.")
    }


    return response.json();
}