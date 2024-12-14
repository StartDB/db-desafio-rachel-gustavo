import { UserDTO } from "../interfaces/user.dto";

export const testUser: UserDTO = {
    id:102,
    firstName:"Gustavo",
    lastName: "Silva",
    username:"gusilvo",
    password:"12345",
    email:"gustavossilva13@gmail.com",
    phone:12345,
    birthdate:"2003-10-13",
    address: {
        zip:"88101310",
        street:"Rua Frei Hilário",
        number:"102",
        suite:"",
        city:"São José",
        district:"Campinas",
        state:"SC"
    },
    description: "",
    role:"elderly",
}