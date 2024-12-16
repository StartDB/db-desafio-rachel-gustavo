import { useEffect, useState } from "react";
import getMyTasks from "../api/getMyTasks";
import MainTitle from "../components/MainTitle";
import Task from "../components/Task";
import useUser from "../contexts/hook/useUser";
import { userInitialValues } from "../utils/initalValues";
import { UserDTO } from "../services/interfaces/user.dto";
import { TaskDTO } from "../services/interfaces/task.dto";
import { transformTasksSupportTypes } from "../utils/taskSupportTypeMapper";
import { transformTasksStatus } from "../utils/taskStatusMapper";

export default function MyTasks() {

    const { user, setUser } = useUser()
    const userFinal = user ? user : userInitialValues
    const [userEdited, setUserEdited] = useState<UserDTO>(userFinal)

    const [tasks, setTasks] = useState<TaskDTO[]>([]);
    const [warning, setWarning] = useState<string>("Tarefas não encontradas.");

    async function captureTasks(userType: string, userId: number): Promise<void> {
            
            try {
                const tasks: TaskDTO[] = await getMyTasks(userType, userId);
    
                if (tasks.length == 0) {
                    throw Error("Tarefas não encontradas")
                }
    
                let formattedTasks: TaskDTO[] = transformTasksSupportTypes(tasks)
                formattedTasks = transformTasksStatus(formattedTasks)
    
                setTasks(formattedTasks);
                setWarning("")
    
            } catch (error) {
                if ((error as Error).name == "TypeError") {
                    (error as Error).message = "Tarefas não identificadas"
                }
                setTasks([]);
                setWarning((error as Error).message)
            }
        }

        useEffect(() => {
                captureTasks(user?.role, user?.id);
            }, []);

    return (
        <section>
            <MainTitle content="Buscar Tarefas"/>
            <div>
                <Task key={task.id}/>
            </div>
        </section>
    );
}