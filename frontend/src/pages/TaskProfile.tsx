//import { NavLink, useNavigate, useParams } from "react-router";
// import MainTitle from "../components/MainTitle";
// import styles from './TaskProfile.module.css';
// import Legend from "../components/form/Legend";
// import Label from "../components/form/Label";
import { useEffect, useState } from "react";
// import { TaskDTO } from "../services/interfaces/task.dto";
// import { exampleTask } from "../services/tests/testTask";
// import { handleChangeTask, handleChangeTextAreaTask } from "../utils/handleChange";
// import Input from "../components/form/Input";
// import getTask from "../api/getTask";
// //import { mapStatus } from "../utils/taskStatusMapper";
import useUser from "../contexts/hook/useUser";
import { taskInitialValues, userInitialValues } from "../utils/initialValues";
//import getTaskUpdate from "../api/getTaskUpdate";
import { UserDTO } from "../services/interfaces/user.dto";
//import { statusColors } from "../services/records/statusColors";
import TaskProfileElderly from "../components/taskProfile/TaskProfileElderly";
import TaskProfileVolunteer from "../components/taskProfile/TaskProfileVolunteer";
import { useParams } from "react-router";
import { TaskDTO } from "../services/interfaces/task.dto";
import getTask from "../api/getTask";


export default function TaskProfile() {
    const { user } = useUser();
    const params = useParams()

    const [userCurrent, setUserCurrent] = useState<UserDTO>(userInitialValues)
    const [task, setTask] = useState<TaskDTO>(taskInitialValues)

    useEffect(() => {
        const userFinal = user ? user : userInitialValues
        setUserCurrent(userFinal)

        async function captureTask(taskId: number): Promise<void> {
            try {
                const taskAPI: TaskDTO = await getTask(taskId)

                setTask(taskAPI)


            } catch (error: any) {
                alert("Não foi possível atualizar a página.\n\nPor favor, tente novamente mais tarde.")
                console.error(`Erro ao puxar os dados:  \nNome: ${error.name} \nMensagem: ${error.message}`)
            }
        }

        captureTask(Number(params.taskId))
    }, [])

    return (
        <>
            {userCurrent.role == "elderly" ?
                <TaskProfileElderly task={task} userId={Number(userCurrent.id)} /> :
                <TaskProfileVolunteer task={task} userId={Number(userCurrent.id)} />}
        </>
    )
}