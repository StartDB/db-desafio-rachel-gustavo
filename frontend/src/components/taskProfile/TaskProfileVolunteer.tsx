import { TaskDTO } from "../../services/interfaces/task.dto"
import CardsElderlyVolunteer from "./CardsElderlyVolunteer"
import FooterButtons from "./FooterButtons"
import TaskProfileDefault from "./TaskProfileDefault"

interface TaskProfileProps {
    task: TaskDTO,
    userId: number
}

export default function TaskProfileVolunteer({ task, userId }: TaskProfileProps) {

    return (
        <>
            <h1>Voluntário</h1>
            <h1>{task + " " + userId}</h1>
            < TaskProfileDefault task={task} />
            < CardsElderlyVolunteer task={task} isVisibleMiniCards={true} isLinkVisible={true} isVolunteerVisible={true} />
            <FooterButtons isCompleteButtonVisible={true} isFooterVisible={true} isDefautlButtonVisible={true} contentDefaultButton={"Teste"} />
        </>
    )
}