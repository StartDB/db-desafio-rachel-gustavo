import { NavLink, useNavigate, useParams } from "react-router";
import MainTitle from "../components/MainTitle";
import styles from './TaskProfile.module.css';
import Legend from "../components/form/Legend";
import Label from "../components/form/Label";
import { useEffect, useState } from "react";
import { TaskDTO } from "../services/interfaces/task.dto";
import { exampleTask } from "../services/tests/testTask";
import { handleChangeTask, handleChangeTextAreaTask } from "../utils/handleChange";
import Input from "../components/form/Input";
import getTask from "../api/getTask";
import { mapTaskStatus } from "../utils/taskStatusMapper";
import useUser from "../contexts/hook/useUser";
import { userInitialValues } from "../utils/initalValues";
import getTaskUpdate from "../api/getTaskUpdate";
import { UserDTO } from "../services/interfaces/user.dto";

export default function TaskProfile() {
    const navigate = useNavigate();

    const { user } = useUser();
    const userFinal = user ? user : userInitialValues;
    const [userCurrent] = useState<UserDTO>(userFinal)

    const [isDisabled] = useState<boolean>(true)
    const [taskEdited, setTaskEdited] = useState<TaskDTO>(exampleTask)
    const [formattedStatus, setFormattedStatus] = useState<string>("Disponível")

    const [buttonContent, setButtonContent] = useState<string>("Aceitar Tarefa")
    const [isVisible, setIsVisible] = useState<boolean>(false)
    const [isVisibleButton, setIsVisibleButton] = useState<boolean>(true)

    const params = useParams()
    

    function setCurrentPage(task: TaskDTO): void {
        const role = userFinal.role;
        const status = task.status
        const volunteerId = task.volunteer?.id

        switch (role) {
            case "volunteer":
                if (status === "AVAILABLE") {
                    setButtonContent("Aceitar Tarefa")
                    setIsVisible(false)
                    setIsVisibleButton(true)
                }

                if (userFinal.id == volunteerId) {
                    if (status === "ACCEPTED") {
                        setButtonContent("Desvincular Tarefa")
                        setIsVisible(true)

                    } else if (status === "COMPLETED") {
                        setIsVisibleButton(false)
                        setIsVisible(true)
                    }
                }

                break
            default:
                console.log("Tipo de cadastro não identificado")
        }
    }

    useEffect(() => {
        async function captureTask(taskId: number): Promise<void> {
            try {
                const task: TaskDTO = await getTask(taskId)

                setTaskEdited(task)
                setFormattedStatus(() => {
                    return mapTaskStatus(task).status
                })

                setCurrentPage(task)

            } catch (error: any) {
                alert("Não foi possível atualizar a página.\n\nPor favor, tente novamente mais tarde.")
                console.error(`Erro ao puxar os dados:  \nMensagem: ${error.message}`)
            }
        }

        captureTask(Number(params.taskId))

    }, []);

    async function updateTask(valueButton: string): Promise<void> {
        try {
            const taskUpdated: TaskDTO = await getTaskUpdate(taskEdited.id, valueButton, Number(userCurrent.id))

            setTaskEdited(taskUpdated)
            setFormattedStatus(() => {
                return mapTaskStatus(taskUpdated).status
            })

        } catch (error: any) {
            throw error
        }

    }

    function handleClick(): void {
        try {
            switch (buttonContent) {
                case "Aceitar Tarefa":
                    updateTask("accept")

                    setButtonContent("Desvincular Tarefa")
                    setIsVisible(true)
                    alert("Tarefa aceita com sucesso!\n\nEntre em contato pelo telefone ou email com o solicitante abaixo!")
                    break

                case "Desvincular Tarefa":
                    updateTask("unlink")

                    setButtonContent("Aceitar Tarefa")
                    setIsVisible(false)
                    break
            }

        } catch (error: any) {
            alert("Não foi possível atualizar a página.\n\nPor favor, tente novamente mais tarde.")
            console.error(`Erro ao puxar os dados:  \nMensagem: ${error.message}`)
        }
    }

    function returnPreviousPage(e: React.MouseEvent<HTMLAnchorElement>): void {
        e.preventDefault()
        navigate(-1)
    }

    return (
        <main className={styles.containerBackgroundMain}>
            <section className="container-section-base">
                <header>
                    <MainTitle content="Página da Tarefa" />
                    <p>{formattedStatus}</p>
                </header>

                <form>
                    <fieldset>
                        <Legend content="Dados gerais" />

                        <div>
                            <Label content="Título:" />
                            <Input type="text" name="title" value={taskEdited.title} onChange={(e) => handleChangeTask(e, taskEdited, setTaskEdited)} disabled={isDisabled} />
                        </div>

                        <div>
                            <div>
                                <Label content="Data:" />
                                <Input type="date" name="date" value={taskEdited.date} onChange={(e) => handleChangeTask(e, taskEdited, setTaskEdited)} disabled={isDisabled} />
                            </div>
                            <div>
                                <Label content="Hora:" />
                                <Input type="time" name="time" value={taskEdited.time} onChange={(e) => handleChangeTask(e, taskEdited, setTaskEdited)} disabled={isDisabled} />
                            </div>
                        </div>

                        <div>
                            <Label content="Descrição:" />
                            < textarea name="description" value={taskEdited.description} onChange={(e) => handleChangeTextAreaTask(e, taskEdited, setTaskEdited)} disabled={isDisabled} />
                        </div>

                        <div>
                            <div>
                                <Label content="Estado:" />
                                <Input type="text" name="state" value={taskEdited.state} onChange={(e) => handleChangeTask(e, taskEdited, setTaskEdited)} disabled={isDisabled} />
                            </div>
                            <div>
                                <Label content="Cidade:" />
                                <Input type="text" name="city" value={taskEdited.city} onChange={(e) => handleChangeTask(e, taskEdited, setTaskEdited)} disabled={isDisabled} />
                            </div>
                        </div>

                        <div>
                            <Label content="A tarefa é online?" />
                            <div>
                                <input type="checkbox" name="isOnline" checked={taskEdited.isOnline == true} onChange={(e) => handleChangeTask(e, taskEdited, setTaskEdited)} disabled={isDisabled} />
                                <label>Sim</label>
                            </div>
                        </div>

                        <div>
                            <Label content="Área de Suporte" />

                            <div>
                                <input type="radio" name="supportType" value="COMPANIONSHIP_AND_TRANSPORT" checked={taskEdited.supportType === "COMPANIONSHIP_AND_TRANSPORT"} onChange={(e) => handleChangeTask(e, taskEdited, setTaskEdited)} disabled={isDisabled} />
                                <label>Acompanhamento e Ensino</label>
                            </div>

                            <div>
                                <input type="radio" name="supportType" value="MAINTENANCE_AND_REPAIRS" checked={taskEdited.supportType === "MAINTENANCE_AND_REPAIRS"} onChange={(e) => handleChangeTask(e, taskEdited, setTaskEdited)} disabled={isDisabled} />
                                <label>Manunteção e Reparo</label>
                            </div>

                            <div>
                                <input type="radio" name="supportType" value="TEACHING_AND_TECHNOLOGY" checked={taskEdited.supportType === "TEACHING_AND_TECHNOLOGY"} onChange={(e) => handleChangeTask(e, taskEdited, setTaskEdited)} disabled={isDisabled} />
                                <label>Ensino e Tecnologia</label>
                            </div>

                            <div>
                                <input type="radio" name="supportType" value="SOCIAL_ACTIVITIES" checked={taskEdited.supportType === "SOCIAL_ACTIVITIES"} onChange={(e) => handleChangeTask(e, taskEdited, setTaskEdited)} disabled={isDisabled} />
                                <label>Atividades Sociais</label>
                            </div>

                            <div>
                                <input type="radio" name="supportType" value="PHYSICAL_ACTIVITIES" checked={taskEdited.supportType === "PHYSICAL_ACTIVITIES"} onChange={(e) => handleChangeTask(e, taskEdited, setTaskEdited)} disabled={isDisabled} />
                                <label>Atividades Físicas</label>
                            </div>
                        </div>
                    </fieldset>
                </form>

                <div >
                    <div>
                        <h2>Solicitante</h2>
                        <div>
                            <h3>{taskEdited.requestBy.firstName} {taskEdited.requestBy.lastName}</h3>
                            <NavLink
                                style={{ visibility: isVisible ? "visible" : "hidden" }}
                                to={`perfil-publico/${taskEdited.requestBy.id}`}>
                                Expandir
                            </NavLink>
                        </div>
                    </div>

                    <div style={{ visibility: isVisible ? "visible" : "hidden" }}>
                        <h2>Voluntário Responsável</h2>
                        <div>
                            <h3>{taskEdited.volunteer?.firstName} {taskEdited.volunteer?.lastName}</h3>
                            <NavLink to={`perfil-publico/${taskEdited.volunteer?.id}`}>Expandir</NavLink>
                        </div>
                    </div>

                </div>

                <footer>
                    <a href="#" onClick={returnPreviousPage}>Voltar</a>
                    <button style={{ visibility: isVisibleButton ? "visible" : "hidden" }} onClick={handleClick}>{buttonContent}</button>
                </footer>
            </section>
        </main>
    )
}