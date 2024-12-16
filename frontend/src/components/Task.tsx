import { NavLink, Outlet } from "react-router"; //useNavigate
import { TaskDTO } from "../services/interfaces/task.dto";
import styles from './Task.module.css';

export default function Task({ id, title, description, date, time, supportType, city, state, status, requestBy, isOnline }: TaskDTO) {
    // const navigate = useNavigate();

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
            <article className={`${styles.containerTask}`}>
                <header>
                    <h2>{title}</h2>
                    <div>
                        <div className={styles.flex}>
                            <h3>Data:</h3>
                            <p>{formatDate(date)}</p>
                        </div>

                        <div className={styles.flex}>
                            <h3>Hora:</h3>
                            <p>{formatTime(time)}</p>
                        </div>
                    </div>
                    <div className={styles.flex}>
                        <h3>Local:</h3>
                        <p>{`${city}/${state}`}</p>
                    </div>

                    <div className={styles.flex}>
                        <h3>Área de Suporte</h3>
                        <p>{supportType}</p>
                    </div>
                </header>
                <main className={styles.row}>
                    <h3>Descrição:</h3>
                    <p>{description.length > 200 ? description.slice(0, 200) + "..." : description}</p>
                </main>
                <footer className={styles.flex}>
                    <div className={styles.flex}>
                        <h3>Solicitante</h3>
                        <p>{`${requestBy.firstName} ${requestBy.lastName}`}</p>
                    </div>
                    <div>
                        <p>{isOnline ? "Online " : "Presencial"}</p>
                        <p>{status}</p>
                        
                        <NavLink to={`tarefa/${id}`}>Expandir</NavLink>
                    </div>
                </footer>
            </article>

            <Outlet />
        </>
    )
}