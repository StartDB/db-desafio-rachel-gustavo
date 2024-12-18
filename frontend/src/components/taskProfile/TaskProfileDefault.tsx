import styles from './TaskProfile.module.css';
import { TaskDTO } from '../../services/interfaces/task.dto';
import Input from '../form/Input';
import Label from '../form/Label';
import Legend from '../form/Legend';
import MainTitle from '../MainTitle';
import { mapStatus } from '../../utils/taskStatusMapper';

interface TaskProfileDefaultProps {
    task: TaskDTO,
}

export default function TaskProfileDefault({ task }: TaskProfileDefaultProps) {

    return (
        <>
            <header className={styles.containerHeader}>
                <MainTitle content={`Tarefa nº ${task.id}`} />
                <p className={`${styles.containerStatus}`}>{mapStatus(task.status)}</p>
            </header>

            <form>
                <fieldset className={styles.containerFormSection}>
                    <Legend content="Dados gerais" />

                    <div className={styles.rowTitle}>
                        <Label content="Título:" />
                        <Input type="text" name="title" value={task.title} disabled />
                    </div>

                    <div className={styles.rowDateTime}>
                        <div>
                            <Label content="Data:" />
                            <Input type="date" name="date" value={task.date} disabled />
                        </div>
                        <div>
                            <Label content="Hora:" />
                            <Input type="time" name="time" value={task.time} disabled />
                        </div>
                    </div>

                    <div className={styles.rowDescription}>
                        <Label content="Descrição:" />
                        <textarea name="description" value={task.description} disabled className={styles.textAreaForm} />
                    </div>

                    <div className={styles.rowLocation}>
                        <div>
                            <Label content="Estado:" />
                            <Input type="text" name="state" value={task.state} disabled />
                        </div>
                        <div>
                            <Label content="Cidade:" />
                            <Input type="text" name="city" value={task.city} disabled />
                        </div>
                    </div>

                    <div className={styles.rowIsOnline}>
                        <Label content="A tarefa é online?" />
                        <div>
                            <input type="checkbox" name="isOnline" checked={task.isOnline == true} disabled />
                            <label>Sim</label>
                        </div>
                    </div>

                    <div className={styles.rowSupportType}>
                        <Label content="Área de Suporte:" />

                        <div className={styles.rowSupportsTypes}>
                            <div>
                                <input type="radio" name="supportType" value="COMPANIONSHIP_AND_TRANSPORT" checked={task.supportType === "COMPANIONSHIP_AND_TRANSPORT"} disabled />
                                <label>Acompanhamento e Transporte</label>
                            </div>
                            <div>
                                <input type="radio" name="supportType" value="MAINTENANCE_AND_REPAIRS" checked={task.supportType === "MAINTENANCE_AND_REPAIRS"} disabled />
                                <label>Manunteção e Reparo</label>
                            </div>
                            <div>
                                <input type="radio" name="supportType" value="TEACHING_AND_TECHNOLOGY" checked={task.supportType === "TEACHING_AND_TECHNOLOGY"} disabled />
                                <label>Ensino e Tecnologia</label>
                            </div>
                            <div>
                                <input type="radio" name="supportType" value="SOCIAL_ACTIVITIES" checked={task.supportType === "SOCIAL_ACTIVITIES"} disabled />
                                <label>Atividades Sociais</label>
                            </div>
                            <div>
                                <input type="radio" name="supportType" value="PHYSICAL_ACTIVITIES" checked={task.supportType === "PHYSICAL_ACTIVITIES"} disabled />
                                <label>Atividades Físicas</label>
                            </div>
                        </div>
                    </div>
                </fieldset>
            </form>
        </>
    )
}