import Input from "../components/form/Input";
import Label from "../components/form/Label";
import Legend from "../components/form/Legend";
import MainTitle from "../components/MainTitle";
import useUser from "../contexts/hook/useUser";
import { useState } from "react";
import { TaskDTO } from "../services/interfaces/task.dto";
import styles from './TaskProfile.module.css';
import InputButton from "../components/form/InputButton";
import { handleChangeTask, handleChangeTextAreaTask } from "../utils/handleChange";
import { postTask } from "../api/postTask";
import { useNavigate } from "react-router";
import { taskInitialValues } from "../utils/initialValues";

export default function CreateTask() {
    const { user } = useUser();
    const [task, setTask] = useState<TaskDTO>(taskInitialValues);
    const navigate = useNavigate();

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>): Promise<void> {
            e.preventDefault();
    
            try {
                console.log(task)
                if (user) {
                    task.requestBy.id = user.id? user.id : 0;
                }
                const response = await postTask(task);
                
                if ("message" in response && "id" in response) {
                    navigate(`/dashboard/${user?.id}/tarefa/${response.id}`);
                    alert(response.message);
                };
    
            } catch (error: any) {
                alert("Não foi possível criar a tarefa.\n\nPor favor, tente novamente mais tarde.")
                console.error(`Erro ao enviar os dados: \nNome: ${error.name} \nMensagem: ${error.message}`)
            }
        }

    return (
    <section className="container-section-base">
        <header className={styles.containerHeader}>
            <MainTitle content="Criar uma Tarefa" />
        </header>
        <form onSubmit={handleSubmit}>
                <fieldset className={styles.containerFormSection}>
                    <Legend content="Dados gerais" />

                    <div className={styles.rowTitle}>
                        <Label content="Título:" />
                        <Input type="text" name="title" value={task.title} onChange={(e) => handleChangeTask(e, task, setTask)} disabled={false} />
                    </div>

                    <div className={styles.rowDateTime}>
                        <div>
                            <Label content="Data:" />
                            <Input type="date" name="date" value={task.date} onChange={(e) => handleChangeTask(e, task, setTask)} disabled={false} />
                        </div>
                        <div>
                            <Label content="Hora:" />
                            <Input type="time" name="time" value={task.time} onChange={(e) => handleChangeTask(e, task, setTask)} disabled={false} />
                        </div>
                    </div>

                    <div className={styles.rowDescription}>
                        <Label content="Descrição:" />
                        <textarea name="description" value={task.description} onChange={(e) => handleChangeTextAreaTask(e, task, setTask)} disabled={false} className={styles.textAreaForm} />
                    </div>

                    <div className={styles.rowLocation}>
                        <div>
                            <Label content="Estado:" />
                            <Input type="text" name="state" value={task.state} onChange={(e) => handleChangeTask(e, task, setTask)} disabled={false} />
                        </div>
                        <div>
                            <Label content="Cidade:" />
                            <Input type="text" name="city" value={task.city} onChange={(e) => handleChangeTask(e, task, setTask)} disabled={false} />
                        </div>
                    </div>

                    <div className={styles.rowIsOnline}>
                        <Label content="A tarefa é online?" />
                        <div>
                            <input type="checkbox" name="isOnline" checked={task.isOnline == true} onChange={(e) => handleChangeTask(e, task, setTask)} disabled={false} />
                            <label>Sim</label>
                        </div>
                    </div>

                    <div className={styles.rowSupportType}>
                        <Label content="Área de Suporte:" />

                        <div className={styles.rowSupportsTypes}>
                            <div>
                                <input type="radio" name="supportType" value="COMPANIONSHIP_AND_TRANSPORT" checked={task.supportType === "COMPANIONSHIP_AND_TRANSPORT"} onChange={(e) => handleChangeTask(e, task, setTask)} disabled={false} />
                                <label>Acompanhamento e Transporte</label>
                            </div>
                            <div>
                                <input type="radio" name="supportType" value="MAINTENANCE_AND_REPAIRS" checked={task.supportType === "MAINTENANCE_AND_REPAIRS"} onChange={(e) => handleChangeTask(e, task, setTask)} disabled={false} />
                                <label>Manunteção e Reparo</label>
                            </div>
                            <div>
                                <input type="radio" name="supportType" value="TEACHING_AND_TECHNOLOGY" checked={task.supportType === "TEACHING_AND_TECHNOLOGY"} onChange={(e) => handleChangeTask(e, task, setTask)} disabled={false} />
                                <label>Ensino e Tecnologia</label>
                            </div>
                            <div>
                                <input type="radio" name="supportType" value="SOCIAL_ACTIVITIES" checked={task.supportType === "SOCIAL_ACTIVITIES"} onChange={(e) => handleChangeTask(e, task, setTask)} disabled={false} />
                                <label>Atividades Sociais</label>
                            </div>
                            <div>
                                <input type="radio" name="supportType" value="PHYSICAL_ACTIVITIES" checked={task.supportType === "PHYSICAL_ACTIVITIES"} onChange={(e) => handleChangeTask(e, task, setTask)} disabled={false} />
                                <label>Atividades Físicas</label>
                            </div>
                        </div>
                    </div>
                </fieldset>
                <div className={styles.footerContainer}>
					<InputButton type="submit" value="Criar Tarefa" />
				</div>
            </form>
    </section>
    )
}