import { useEffect, useState } from "react";
import getTasks from "../api/getTask";
import { transformTasksSupportTypes } from "../utils/taskSupportTypeMapper";
import { transformTasksStatus } from "../utils/taskStatusMapper";
import { TaskDTO } from "../services/interfaces/task.dto";
import Task from "../components/Task.tsx";
import { exampleTask } from "../services/tests/testTask";
import MainTitle from "../components/MainTitle.tsx";
import styles from './SearchTasks.module.css';
import InputButton from "../components/form/InputButton.tsx";

export default function SearchTasks() {

    interface SearchDTO {
        supportType: string
    }

    const [tasks, setTasks] = useState<TaskDTO[]>([]);
    const [warning, setWarning] = useState<string>("Tarefas não encontradas.");
    const [search, setSearch] = useState<SearchDTO>({
        supportType: ""
    });

    async function captureTasks(supportType?: string): Promise<void> {
        setTasks([exampleTask])
        setWarning("")

        // try {
        //     const tasks: TaskDTO[] = await getTasks(supportType);

        //     if (tasks.length == 0) {
        //         throw Error("Tarefas não encontradas")
        //     }

        //     let formattedTasks: TaskDTO[] = transformTasksSupportTypes(tasks)
        //     formattedTasks = transformTasksStatus(formattedTasks)

        //     setTasks(formattedTasks);
        //     setWarning("")

        // } catch (error) {
        //     if ((error as Error).name == "TypeError") {
        //         (error as Error).message = "Tarefas não identificadas"
        //     }
        //     setTasks([]);
        //     setWarning((error as Error).message)
        // }
    }

    useEffect(() => {
        captureTasks();
    }, []);
    
    function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
        const { value } = e.target

        setSearch({
            supportType: value,
        });

        captureTasks(value)
    }

    function handleClick() {
        captureTasks()
        setSearch({
            supportType: "",
        });
    }

    return (
        <section className="container-section-initial">
            <MainTitle content="Buscar Tarefas"/>
            <div className={styles.containerSearchTasks}>
                <form className={styles.row}>
                    <fieldset>
                        <legend>Pesquisa</legend>
                        <div>
                            <label>Área de Suporte</label>
                            <input type="radio" name="supportType" value="COMPANIONSHIP_AND_TRANSPORT" checked={search.supportType === "COMPANIONSHIP_AND_TRANSPORT"} onChange={handleChange} /><label>Acompanhamento e Ensino</label>
                            <input type="radio" name="supportType" value="MAINTENANCE_AND_REPAIRS" checked={search.supportType === "MAINTENANCE_AND_REPAIRS"} onChange={handleChange} /><label>Manunteção e Reparo</label>
                            <input type="radio" name="supportType" value="TEACHING_AND_TECHNOLOGY " checked={search.supportType === "TEACHING_AND_TECHNOLOGY "} onChange={handleChange} /><label>Ensino e Tecnologia</label>
                            <input type="radio" name="supportType" value="SOCIAL_ACTIVITIES" checked={search.supportType === "SOCIAL_ACTIVITIES"} onChange={handleChange} /><label>Atividades Sociais</label>
                            <input type="radio" name="supportType" value="PHYSICAL_ACTIVITIES" checked={search.supportType === "PHYSICAL_ACTIVITIES"} onChange={handleChange} /><label>Atividades Físicas</label>
                        </div>
                    </fieldset>
                    <InputButton className={styles.buttonSearch} type="button" value="Resetar Pesquisa" onClick={handleClick} />
                </form>
                <main className={styles.row}>
                    {warning == "" ? tasks.map((task) => (
                        <Task key={task.id} {...task} />
                    )) : warning}
                </main>
            </div>
        </section>
    )
}