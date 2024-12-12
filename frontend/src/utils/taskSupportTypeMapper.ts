import { TaskDTO } from "../services/interfaces/task.dto"

// Record
export const supportTypeMap: Record <string, string> = {
    COMPANIONSHIP_AND_TRANSPORT: "Acompanhamento e Ensino",
    MAINTENANCE_AND_REPAIRS: "Manunteção e Reparo",
    TEACHING_AND_TECHNOLOGY : "Ensino e Tecnologia",
    SOCIAL_ACTIVITIES: "Atividades Sociais",
    PHYSICAL_ACTIVITIES: "Atividas Físicas",
}

// Função que altera o tipo
export function mapTaskSupportType(task: TaskDTO): TaskDTO {
    // Destrutura a task e altera seu supportType para o valor que corresponder ao item acessado pelo "supportTypeMap[task.supportType]"
    // Exemplo: supportTypeMap[PHYSICAL_ACTIVITIES] retorna "Atividas Físicas". Se não houver um item do tipo, retorna null e assim retornando "Indefinido"

    return {
        ...task,
        supportType: supportTypeMap[task.supportType] || "Indefinido"
    }
}

// Função que altera o tipo de uma array
export function transformTasksSupportTypes(taks: TaskDTO[]): TaskDTO[]{
    // Percorre cada tarefa e toda seu tipo de suporte.
    return taks.map((task) => mapTaskSupportType(task))
}