import { TaskDTO } from "../services/interfaces/task.dto";
import { UserDTO } from "../services/interfaces/user.dto";

export const userInitialValues: UserDTO = {
    id: 0,
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    email: "",
    phone: 0,
    birthdate: "",
    address: {
        zip: "",
        street: "",
        number: "",
        suite: "",
        city: "",
        district: "",
        state: "",
    },
    description: "",
    role: "",
}

export const taskInitialValues: TaskDTO = {
    title: "",
    supportType: "",
    isOnline: false,
    description: "",
    date: "",
    time: "",
    city: "",
    state: "",
    status: "AVAILABLE",
    requestBy: {
        id: 0,
        role: "elderly"
    },
    assessment: null
}