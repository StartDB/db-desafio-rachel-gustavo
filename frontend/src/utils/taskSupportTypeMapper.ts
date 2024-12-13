import { TaskDTO } from "../services/interfaces/task.dto"

// Record
export const supportTypeMap: Record <string, string> = {
    COMPANIONSHIP_AND_TRANSPORT: "Acompanhamento e Ensino",
    MAINTENANCE_AND_REPAIRS: "Manunteção e Reparo",
    TEACHING_AND_TECHNOLOGY : "Ensino e Tecnologia",
    SOCIAL_ACTIVITIES: "Atividades Sociais",
    PHYSICAL_ACTIVITIES: "Atividades Físicas",
}

// Função que altera o valor do atributo de uma tarefa, para um valor correspondente.
export function mapTaskSupportType(task: TaskDTO): TaskDTO {
    // Desestrutura a task e altera seu supportType para o valor que corresponder ao item acessado pelo "supportTypeMap[task.supportType]"
    // Exemplo: supportTypeMap[PHYSICAL_ACTIVITIES] retorna "Atividades Físicas", mas se não houver um item da chave mencionada, retorna null. Caso isso ocorra, o retorno final será "Indefinido"
    return {
        ...task,
        supportType: supportTypeMap[task.supportType] || "Indefinido"
    }
}

// Função que altera o supportType de várias tasks de um array:
export function transformTasksSupportTypes(taks: TaskDTO[]): TaskDTO[]{
    // Percorre cada tarefa e toda seu tipo de suporte.
    return taks.map((task) => mapTaskSupportType(task))
}