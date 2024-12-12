import { UserDTO } from "./user.dto"

export interface TaskDTO {
    id: number
    title: string
    supportType: string
    isOnline: boolean
    description: string
    date: Date
    time: Date
    city: string
    state: string
    status: string
    requestBy: UserDTO
    volunteer?: UserDTO | null 
    assessment?: null
}