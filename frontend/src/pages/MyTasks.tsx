import { useEffect, useState } from "react";
import getMyTasks from "../api/getMyTasks";
import MainTitle from "../components/MainTitle";
import Task from "../components/Task";
import useUser from "../contexts/hook/useUser";
import { userInitialValues } from "../utils/initialValues";
import { TaskDTO } from "../services/interfaces/task.dto";
import { transformTasksSupportTypes } from "../utils/taskSupportTypeMapper";
import styles from './MyTasks.module.css';
import { TaskWarnings } from "../services/enums/taskWarnings";

export default function MyTasks() {

    const { user, setUser } = useUser()
    const userFinal = user ? user : setUser(userInitialValues)

    const [tasks, setTasks] = useState<TaskDTO[]>([]);
    const [warning, setWarning] = useState<string>("");

    async function captureTasks(userType: string | undefined, userId: number | undefined): Promise<void> {
        try {
            const tasks: TaskDTO[] = await getMyTasks(userType, userId);

            if (tasks.length == 0) {
                setTasks([]);
                setWarning(TaskWarnings.NoTasksFound)
                return;
            }

            const formattedTasks: TaskDTO[] = transformTasksSupportTypes(tasks)

            setTasks(formattedTasks);
            setWarning("")

        } catch (error: any) {
            setTasks([]);
            setWarning(TaskWarnings.TasksNotIdentified)

            alert("Não foi possível atualizar a página.\n\nPor favor, tente novamente mais tarde.")
            console.error(`Erro ao solicitar os dados: \nNome: ${error.name} \nMensagem: ${error.message}`)
        }

    }

    useEffect(() => {
        captureTasks(userFinal?.role, userFinal?.id);
    }, [user]);

    return (
        <section className={`container-section-base ${styles.containerSectionMyTasks}`}>
            <header className={styles.containerHeaderMyTasks}>
                <MainTitle content="Minhas Tarefas" />
            </header>

            <main className={styles.containerMyTasks}>
                {warning == "" ? tasks.map((task) => (
                    <Task key={task.id} {...task} />
                )) : <p className={`mainSectionWarning ${styles.warningMyTasks}`}>{`(${warning})`}</p>}
            </main>
        </section>
    );
}