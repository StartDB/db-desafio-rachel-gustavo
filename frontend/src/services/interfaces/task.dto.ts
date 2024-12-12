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
    requestBy: number // id do idoso
    volunteer: number | null // id do voluntario
    assessment?: null
}