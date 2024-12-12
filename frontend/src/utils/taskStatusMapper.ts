import { TaskDTO } from "../services/interfaces/task.dto"

export const statusMap: Record <string, string> = {
    AVAILABLE: "Disponível",
    ACCEPTED: "Aceita",
    COMPLETED: "Concluída",
    CANCELED: "Cancelada"
}

export function mapTaskStatus(task: TaskDTO): TaskDTO {
    return {
        ...task,
        status: statusMap[task.status] || "(Sem status)"
    }
}

export function transformTasksStatus(taks: TaskDTO[]): TaskDTO[]{
    return taks.map((task) => mapTaskStatus(task))
}