import { useEffect, useState } from "react";
import getTasks from "../api/getTasks";
import { transformTasksSupportTypes } from "../utils/taskSupportTypeMapper";
import { TaskDTO } from "../services/interfaces/task.dto";
import Task from "../components/Task.tsx";
import MainTitle from "../components/MainTitle.tsx";
import styles from './SearchTasks.module.css';
// import { exampleTask } from "../services/tests/testTask.ts";
import Legend from "../components/form/Legend.tsx";
import Label from "../components/form/Label.tsx";
import { TaskWarnings } from "../services/enums/taskWarnings.ts";


interface SearchDTO {
    supportType: string
}

export default function SearchTasks() {
    const [tasks, setTasks] = useState<TaskDTO[]>([]);
    const [warning, setWarning] = useState<string>("Tarefas não encontradas.");
    const [search, setSearch] = useState<SearchDTO>({
        supportType: ""
    });

    async function captureTasks(supportType?: string): Promise<void> {
        // setTasks([exampleTask])
        // setWarning("")
        // console.log(supportType)
        try {
            const tasks: TaskDTO[] = await getTasks(supportType);

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
        <section className={`container-section-base ${styles.sectionSearchTasks}`}>

            <header className={styles.containerHeaderSearchTasks}>
                <MainTitle content="Buscar Tarefas"/>
            </header>

            <div className={styles.containerSearchTasks}>

                <form>
                    <fieldset className={styles.containerSupportTypes}>
                        <Legend content="Pesquisa" />

                        <div className={styles.containerRadiosSupportTypes}>
                            <Label content="Área de Suporte:"/>
                            
                            <div className={styles.test}>
                                <input type="radio" name="supportType" value="COMPANIONSHIP_AND_TRANSPORT" checked={search.supportType === "COMPANIONSHIP_AND_TRANSPORT"} onChange={handleChange} />
                                <label>Acompanhamento e Ensino</label>
                            </div>

                            <div>
                                <input type="radio" name="supportType" value="MAINTENANCE_AND_REPAIRS" checked={search.supportType === "MAINTENANCE_AND_REPAIRS"} onChange={handleChange} />
                                <label>Manunteção e Reparo</label>
                                </div>

                            <div>
                                <input type="radio" name="supportType" value="TEACHING_AND_TECHNOLOGY " checked={search.supportType === "TEACHING_AND_TECHNOLOGY "} onChange={handleChange} />
                                <label>Ensino e Tecnologia</label>
                            </div>

                            <div>
                                <input type="radio" name="supportType" value="SOCIAL_ACTIVITIES" checked={search.supportType === "SOCIAL_ACTIVITIES"} onChange={handleChange} />
                                <label>Atividades Sociais</label>
                            </div>

                            <div>
                                <input type="radio" name="supportType" value="PHYSICAL_ACTIVITIES" checked={search.supportType === "PHYSICAL_ACTIVITIES"} onChange={handleChange} />
                                <label>Atividades Físicas</label>
                            </div>
                        </div>
                    </fieldset>

                    <input className={`buttonSearch ${styles.buttonSearchTasks}`} type="button" value="Resetar Pesquisa" onClick={handleClick} />
                </form>

                <main className={styles.containerMainSectionSearchTasks}>
                    {warning == "" ? tasks.map((task) => (
                        <Task key={task.id} {...task} />
                    )) : <p className="mainSectionWarning">{`(${warning})`}</p>}
                </main>
            </div>
        </section>
    )
}