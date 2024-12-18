import { TaskDTO } from "../../services/interfaces/task.dto"
import TaskProfileDefault from "./TaskProfileDefault"
import CardsElderlyVolunteer from "./CardsElderlyVolunteer";
import FooterButtons from "./FooterButtons";
import { useState } from "react";

interface TaskProfileProps {
    task: TaskDTO,
    userId: number
}

export default function TaskProfileElderly({ task, userId }: TaskProfileProps) {
    const [taskCurrent] = useState<TaskDTO>(task)

    // async function updateTask(valueButton: string): Promise<void> {
    //     try {
    //         const taskUpdated: TaskDTO = await getTaskUpdate(taskCurrent.id ? taskCurrent.id : 0, valueButton, userId)

    //         setTaskCurrent(taskUpdated)

    //     } catch (error: any) {
    //         throw error
    //     }

    // }

    // function onDefaultButtonClick(): void {
    //     updateTask("accept")
        
    //     alert("Tarefa aceita com sucesso!\n\nEntre em contato pelo telefone ou email com o solicitante abaixo!")
    // }

    return (
        <>
            <h1>Idoso</h1>
            <h1>{task + " " + userId}</h1>
            < TaskProfileDefault task={taskCurrent} />
            < CardsElderlyVolunteer task={taskCurrent} isVisibleMiniCards={true} isLinkVisible={true} isVolunteerVisible={true} />
            <FooterButtons isCompleteButtonVisible={true} isFooterVisible={true} isDefautlButtonVisible={true} contentDefaultButton={"Teste"} />
        </>
    )
}