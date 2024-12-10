import { AddressDTO } from "./adress.dto"

export interface UserDTO {
    firstName: string
    lastName: string
    username: string
    password: string
    email: string
    phone: number
    birthdate: string
    address: AddressDTO
    role: string
}