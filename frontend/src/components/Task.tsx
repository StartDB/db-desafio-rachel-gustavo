import { TaskDTO } from "../services/interfaces/task.dto";

export default function Task ({title, description, date, supportType, city, state, status, requestBy, isOnline}: TaskDTO) {
    return (
        <>
            <article>
                <header>
                    <h2>{title}</h2>
                    <div>
                        <h3>Data:</h3>
                        <p>{`${date.getDay()}/${date.getDate() +1 }/${date.getFullYear()}`}</p>
                        <h3>Hora:</h3>
                        <p>{`${date.getHours()}:${date.getMinutes()}`}</p>
                    </div>
                    <div>
                        <h3>Local:</h3>
                        <p>{`${city}/${state}`}</p>
                        <h3>Área de Suporte</h3>
                        <p>{supportType}</p>
                    </div>
                </header>
                <main>
                    <p>{description.length > 200 ? description.slice(0,200) + "...": description}</p>
                </main>
                <footer>
                    <h3>Solicitante</h3>
                    <p>{`${requestBy.firstName} ${requestBy.lastName}`}</p>
                    <p>{isOnline ? "Online " : "Presencial"}</p>
                    <p>{status}</p>
                </footer>
            </article>
        </>
    )
}