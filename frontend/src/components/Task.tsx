import { TaskDTO } from "../services/interfaces/task.dto";

export default function Task (props: TaskDTO) {
    return (
        <>
            <article>
                <header>
                    <h2>{props.title}</h2>
                    <div>
                        <h3>Data:</h3>
                        <p>{`${props.date.getDay()}/${props.date.getDate() +1 }/${props.date.getFullYear}`}</p>
                        <h3>Hora:</h3>
                        <p>{`${props.date.getHours()}:${props.date.getMinutes()}`}</p>
                    </div>
                    <div>
                        <h3>Local:</h3>
                        <p>{`${props.city}/${props.state}`}</p>
                        <h3>Área de Suporte</h3>
                        <p>{props.supportType}</p>
                    </div>
                </header>
                <main>
                    <p>{props.description.length > 100 ? props.description.slice(0,100) + "...": props.description}</p>
                </main>
                <footer>
                    <h3>Solicitante</h3>
                    <p>{`${props.requestBy.firstName} ${props.requestBy.lastName}`}</p>
                    <p>{props.isOnline ? "Online " : "Presencial"}</p>
                    <p>{props.status}</p>
                </footer>
            </article>
        </>
    )
}