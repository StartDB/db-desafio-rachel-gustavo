import { TaskDTO } from "../services/interfaces/task.dto"

export const supportTypeMap: Record <string, string> = {
    COMPANIONSHIP_AND_TRANSPORT: "Acompanhamento e Transporte",
    MAINTENANCE_AND_REPAIRS: "Manutenção e Reparo",
    TEACHING_AND_TECHNOLOGY : "Ensino e Tecnologia",
    SOCIAL_ACTIVITIES: "Atividades Sociais",
    PHYSICAL_ACTIVITIES: "Atividades Físicas",
}

export function mapTaskSupportType(task: TaskDTO): TaskDTO {
    return {
        ...task,
        supportType: supportTypeMap[task.supportType] || "Indefinido"
    }
}

export function transformTasksSupportTypes(taks: TaskDTO[]): TaskDTO[]{
    return taks.map((task) => mapTaskSupportType(task))
}