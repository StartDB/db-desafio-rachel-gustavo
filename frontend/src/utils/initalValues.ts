import { UserDTO } from "../services/interfaces/user.dto";

export const initialUserProfile: UserDTO = {
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
    role: "",
}