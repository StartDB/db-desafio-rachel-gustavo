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
import { mapStatus } from "../utils/taskStatusMapper";
import useUser from "../contexts/hook/useUser";
import { userInitialValues } from "../utils/initialValues";
import getTaskUpdate from "../api/getTaskUpdate";
import { UserDTO } from "../services/interfaces/user.dto";
import { statusColors } from "../services/records/statusColors";

enum statusType {
    AVAILABLE = "AVAILABLE",
    ACCEPTED = "ACCEPTED",
    COMPLETED  = "COMPLETED",
    CANCELED  = "CANCELED ",
}

enum optionButtonContent {
    acceptedTask = "Aceitar Tarefa",
    unlikedTask = "Desvincular Tarefa" 
}

export default function TaskProfile() {
    const navigate = useNavigate();

    const { user } = useUser();
    const params = useParams()
    const userFinal = user ? user : userInitialValues;
    const [userCurrent] = useState<UserDTO>(userFinal)

    const [isDisabled] = useState<boolean>(true)
    const [taskEdited, setTaskEdited] = useState<TaskDTO>(exampleTask)
    const [formattedStatus, setFormattedStatus] = useState<string>("Indisponível")

    const [isVisible, setIsVisible] = useState<boolean>(false)
    const [isVisibleButton, setIsVisibleButton] = useState<boolean>(false)
    const [isVisibleMiniCards, setIsVisibleMiniCards] = useState<boolean>(true)

    const [buttonContent, setButtonContent] = useState<string>(optionButtonContent.acceptedTask)
    const [statusColor, setStatusColor] = useState<string>("")

    function setCurrentPage(task: TaskDTO): void {
        const role = userFinal.role;
        const status = task.status
        const volunteerId = task.volunteer?.id

        switch (role) {
            case "volunteer":
                if (status === statusType.AVAILABLE) {
                    setButtonContent(optionButtonContent.acceptedTask)
                    setIsVisible(false)
                    setIsVisibleButton(true)
                }

                if (userFinal.id == volunteerId) {
                    if (status === statusType.ACCEPTED) {
                        setButtonContent(optionButtonContent.unlikedTask)
                        setIsVisible(true)
                        setIsVisibleButton(true)

                    } else if (status === statusType.COMPLETED) {
                        setIsVisible(true)
                        setIsVisibleButton(false)
                        setIsVisibleMiniCards(false)
                    }
                }
                
                break

            default:
                console.log("Tipo de cadastro não identificado")
                setIsVisible(false)
                setIsVisibleButton(false)
        }
    }

    useEffect(() => {
        async function captureTask(taskId: number): Promise<void> {
            try {
                const task: TaskDTO = await getTask(taskId)

                setTaskEdited(task)

                setStatusColor(statusColors[task.status])
                setFormattedStatus(() => {
                    return mapStatus(task.status)
                })
                
                setCurrentPage(task)

            } catch (error: any) {
                alert("Não foi possível atualizar a página.\n\nPor favor, tente novamente mais tarde.")
                console.error(`Erro ao puxar os dados:  \nNome: ${error.name} \nMensagem: ${error.message}`)
            }
        }

        captureTask(Number(params.taskId))
    }, []);

    async function updateTask(valueButton: string): Promise<void> {
        try {
            const taskUpdated: TaskDTO = await getTaskUpdate(taskEdited.id?taskEdited.id:0, valueButton, Number(userCurrent.id))

            setTaskEdited(taskUpdated)

            setStatusColor(statusColors[taskUpdated.status])
            setFormattedStatus(() => {
                return mapStatus(taskUpdated.status)
            })
            

        } catch (error: any) {
            throw error
        }
        
    }

    function handleClick(): void {
        try {
            switch (buttonContent) {
                case optionButtonContent.acceptedTask:

                    updateTask("accept")
                    setButtonContent(optionButtonContent.unlikedTask)
                    setIsVisible(true)

                    alert("Tarefa aceita com sucesso!\n\nEntre em contato pelo telefone ou email com o solicitante abaixo!")
                    break

                case optionButtonContent.unlikedTask:

                    updateTask("unlink")
                    setButtonContent(optionButtonContent.acceptedTask)
                    setIsVisible(false)
                    break
            }

            setIsVisibleButton(true)
            setStatusColor(statusColors[taskEdited.status])
            
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
        <section className="container-section-base">
            <header className={styles.containerHeader}>
                <MainTitle content={`Tarefa nº ${taskEdited.id}`} />
                <p className={`${styles.containerStatus} ${statusColor}`}>{formattedStatus}</p>
            </header>

            <form>
                <fieldset className={styles.containerFormSection}>
                    <Legend content="Dados gerais" />

                    <div className={styles.rowTitle}>
                        <Label content="Título:" />
                        <Input type="text" name="title" value={taskEdited.title} onChange={(e) => handleChangeTask(e, taskEdited, setTaskEdited)} disabled={isDisabled} />
                    </div>

                    <div className={styles.rowDateTime}>
                        <div>
                            <Label content="Data:" />
                            <Input type="date" name="date" value={taskEdited.date} onChange={(e) => handleChangeTask(e, taskEdited, setTaskEdited)} disabled={isDisabled} />
                        </div>
                        <div>
                            <Label content="Hora:" />
                            <Input type="time" name="time" value={taskEdited.time} onChange={(e) => handleChangeTask(e, taskEdited, setTaskEdited)} disabled={isDisabled} />
                        </div>
                    </div>

                    <div className={styles.rowDescription}>
                        <Label content="Descrição:" />
                        <textarea name="description" value={taskEdited.description} onChange={(e) => handleChangeTextAreaTask(e, taskEdited, setTaskEdited)} disabled={isDisabled} className={styles.textAreaForm} />
                    </div>

                    <div className={styles.rowLocation}>
                        <div>
                            <Label content="Estado:" />
                            <Input type="text" name="state" value={taskEdited.state} onChange={(e) => handleChangeTask(e, taskEdited, setTaskEdited)} disabled={isDisabled} />
                        </div>
                        <div>
                            <Label content="Cidade:" />
                            <Input type="text" name="city" value={taskEdited.city} onChange={(e) => handleChangeTask(e, taskEdited, setTaskEdited)} disabled={isDisabled} />
                        </div>
                    </div>

                    <div className={styles.rowIsOnline}>
                        <Label content="A tarefa é online?" />
                        <div>
                            <input type="checkbox" name="isOnline" checked={taskEdited.isOnline == true} onChange={(e) => handleChangeTask(e, taskEdited, setTaskEdited)} disabled={isDisabled} />
                            <label>Sim</label>
                        </div>
                    </div>

                    <div className={styles.rowSupportType}>
                        <Label content="Área de Suporte:" />

                        <div className={styles.rowSupportsTypes}>
                            <div>
                                <input type="radio" name="supportType" value="COMPANIONSHIP_AND_TRANSPORT" checked={taskEdited.supportType === "COMPANIONSHIP_AND_TRANSPORT"} onChange={(e) => handleChangeTask(e, taskEdited, setTaskEdited)} disabled={isDisabled} />
                                <label>Acompanhamento e Transporte</label>
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
                    </div>
                </fieldset>
            </form>

            <div style={{ visibility: isVisibleMiniCards ? "visible" : "hidden" }} className={styles.containerMiniCards}>
                <div>
                    <h2>Solicitante</h2>
                    <div className={styles.containerMiniCard}>
                        <h3>{taskEdited.requestBy.firstName} {taskEdited.requestBy.lastName}</h3>

                        <NavLink
                            className="navigationLink"
                            style={{ visibility: isVisible ? "visible" : "hidden" }}
                            to={`perfil-publico/${taskEdited.requestBy.id}`}>
                            Expandir
                        </NavLink>
                    </div>
                </div>

                <div style={{ visibility: isVisible ? "visible" : "hidden" }}>
                <h2>Voluntário Responsável</h2>
                    <div className={styles.containerMiniCard} >
                        <h3>{taskEdited.volunteer?.firstName} {taskEdited.volunteer?.lastName}</h3>
                        <NavLink className="navigationLink" to={`perfil-publico/${taskEdited.volunteer?.id}`}>Expandir</NavLink>
                    </div>
                </div>

            </div>

            <footer className={styles.containerFooter}>
                <a className={`navigationLink ${styles.linkReturn}`} href="#" onClick={returnPreviousPage}>Voltar</a>
                <button className={styles.buttonMain} style={{ visibility: isVisibleButton ? "visible" : "hidden" }} onClick={handleClick}>{buttonContent}</button>
            </footer>
        </section>
    )
}