import { NavLink } from "react-router";
import { TaskDTO } from "../services/interfaces/task.dto";
import styles from './Task.module.css';
import useUser from "../contexts/hook/useUser";
import { useState } from "react";
import { statusColors } from "../services/records/statusColors";
import { mapStatus } from "../utils/taskStatusMapper";


export default function Task({ id, title, description, date, time, supportType, city, state, status, requestBy, isOnline }: TaskDTO) {
    const { user } = useUser();
    const [statusColor] = useState<string>(statusColors[status])

    function formatDate(date: string): string {
        let formattedDate = date.split("-")
        return `${formattedDate[2]}/${formattedDate[1]}/${formattedDate[0]}`

    }

    function formatTime(time: string): string {
        let formattedTime = time.split(":")
        return `${formattedTime[0]}:${formattedTime[1]}`

    }

    return (
        <>
            <article className={`${styles.containerTaskCard}`}>
                <header>

                    <h2 className={styles.titleTaskCard}>{title}</h2>

                    <div className={styles.containerHeaderTaskCard}>
                        <div>
                            <h3>Data:</h3>
                            <p>{formatDate(date)}</p>
                        </div>
                        <div>
                            <h3>Hora:</h3>
                            <p>{formatTime(time)}</p>
                        </div>

                        <div>
                            <h3>Local:</h3>
                            <p>{`${city}/${state}`}</p>
                        </div>
                        <div>
                            <h3>Área de Suporte:</h3>
                            <p>{supportType}</p>
                        </div>

                    </div>
                </header>

                <main>
                    <h3>Descrição:</h3>
                    <p>{description.length > 200 ? description.slice(0, 200) + "..." : description}</p>
                </main>

                <footer className={styles.containerFooterTaskCard}>
                    <div>
                        <h3>Solicitante:</h3>
                        <p>{`${requestBy.firstName} ${requestBy.lastName}`}</p>
                    </div>

                    <div className={styles.containerStatusOnlineButton}>
                        <p className={`${styles.miniContainer} ${styles.backgroundColorIsOnline}`}>{isOnline ? "Online " : "Presencial"}</p>
                        
                        <p className={`${styles.miniContainer} ${statusColor}`}>{mapStatus(status)}</p>

                        <NavLink className="navigationLink" to={`/dashboard/${user?.id}/tarefa/${id}`}>Expandir</NavLink>
                    </div>
                </footer>
            </article>
        </>
    )
}