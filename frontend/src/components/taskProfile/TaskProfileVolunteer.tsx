import { useEffect, useState } from "react"
import getTaskUpdate from "../../api/getTaskUpdate"
import { TaskDTO } from "../../services/interfaces/task.dto"
import CardsElderlyVolunteer from "./CardsElderlyVolunteer"
import FooterButtons from "./FooterButtons"
import TaskProfileDefault from "./TaskProfileDefault"

interface TaskProfileProps {
    task: TaskDTO,
    userId: number
}

export default function TaskProfileVolunteer({ task, userId }: TaskProfileProps) {
        const [taskCurrent, setTaskCurrent] = useState<TaskDTO>(task)
       
        useEffect(() => {
            setTaskCurrent(task); 
        }, []);

        async function updateTask(valueButton: string): Promise<void> {
            try {
                if (taskCurrent) {
                    const taskUpdated: TaskDTO = await getTaskUpdate(taskCurrent.id ? taskCurrent.id : 0, valueButton, userId)
                    console.log("TAKS UPDATE" + taskUpdated.title)
                    setTaskCurrent(taskUpdated)
                }

            } catch (error: any) {
                throw error
            }

        }
    
        function onDefaultButtonClick(): void {
            updateTask("accept")
            
            alert("Tarefa aceita com sucesso!\n\nEntre em contato pelo telefone ou email com o solicitante abaixo!")
        }
        
    return (
        <>
            <h1>Voluntário</h1>
            <h1>{task + " " + userId}</h1>
            
            < TaskProfileDefault task={taskCurrent} />
            < CardsElderlyVolunteer task={taskCurrent} isVisibleMiniCards={true} isLinkVisible={true} isVolunteerVisible={true} />
            <FooterButtons isCompleteButtonVisible={true} isFooterVisible={true} isDefautlButtonVisible={true} contentDefaultButton={"Aceitar Tarefa"} onDefaultButtonClick={onDefaultButtonClick}/>
        </>
    )
}