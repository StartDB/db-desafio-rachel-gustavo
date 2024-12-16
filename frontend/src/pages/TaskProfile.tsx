import { NavLink, useNavigate } from "react-router";
import MainTitle from "../components/MainTitle";
import styles from './TaskProfile.module.css';
import Legend from "../components/form/Legend";
import Label from "../components/form/Label";
import { useState } from "react";
import { TaskDTO } from "../services/interfaces/task.dto";
import { exampleTask } from "../services/tests/testTask";
import { handleChangeTask, handleChangeTextArea, handleChangeTextAreaTask } from "../utils/handleChange";
import Input from "../components/form/Input";

export default function TaskProfile() {
    const navigate = useNavigate();
    const [isDisabled, setIsDisabled] = useState<boolean>(true)
    const [taskEdited, setTaskEdited] = useState<TaskDTO>(exampleTask)

    function returnPreviousPage(e: React.MouseEvent<HTMLAnchorElement>): void {
        e.preventDefault()
        navigate(-1)
    }

    return (
        <main className={styles.containerBackgroundMain}>
            <section className="container-section-base">
                <header>
                    <MainTitle content="Página da Tarefa" />
                    <p>Disponível</p>
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

                <div>
                    <div>
                        <h2>Voluntário Responsável</h2>
                        <div>
                            <h3>{taskEdited.volunteer?.firstName} {taskEdited.volunteer?.lastName}</h3>
                            <NavLink to={`perfil-publico/${taskEdited.volunteer?.id}`}>Expandir</NavLink>
                        </div>
                    </div>

                    <div>
                        <h2>Solicitante</h2>
                        <div>
                            <h3>{taskEdited.requestBy.firstName} {taskEdited.requestBy.lastName}</h3>
                            <NavLink to={`perfil-publico/${taskEdited.requestBy.id}`}>Expandir</NavLink>
                        </div>
                    </div>
                </div>

                <footer>
                    <a href="#" onClick={returnPreviousPage}>Voltar</a>
                    <button>Aceitar Tarefa</button>
                </footer>
            </section>
        </main>
    )
}