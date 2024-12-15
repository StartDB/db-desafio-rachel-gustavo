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