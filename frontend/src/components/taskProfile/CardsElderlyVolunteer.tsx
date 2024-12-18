import { TaskDTO } from "../../services/interfaces/task.dto";
import styles from './TaskProfile.module.css';
import { NavLink } from "react-router";

interface TasksProps {
    task: TaskDTO,
    isVisibleMiniCards: boolean;
    isLinkVisible?: boolean;
    isVolunteerVisible: boolean;
}

export default function CardsElderlyVolunteer({ task, isVisibleMiniCards, isLinkVisible, isVolunteerVisible }: TasksProps) {

    return (

        <div style={{ visibility: isVisibleMiniCards ? "visible" : "hidden" }} className={styles.containerMiniCards}>
            <div>
                <h2>Solicitante</h2>

                <div className={styles.containerMiniCard}>
                    <h3>{task.requestBy.firstName} {task.requestBy.lastName}</h3>

                    <NavLink
                        className="navigationLink"
                        style={{ visibility: isLinkVisible ? "visible" : "hidden" }}
                        to={`perfil-publico/elderly/${task.requestBy.id}`}>
                        Expandir
                    </NavLink>
                </div>
            </div>

            <div style={{ visibility: isVolunteerVisible ? "visible" : "hidden" }}>
                <h2>Voluntário Responsável</h2>

                <div className={styles.containerMiniCard} >
                    <h3>{task.volunteer?.firstName} {task.volunteer?.lastName}</h3>

                    <NavLink
                        className="navigationLink"
                        to={`perfil-publico/volunteer/${task.volunteer?.id}`}>
                        Expandir
                    </NavLink>
                </div>
            </div>
        </div>
    )
}