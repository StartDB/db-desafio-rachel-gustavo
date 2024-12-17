export interface TaskDTO {
    id?: number
    title: string
    supportType: string
    isOnline: boolean
    description: string
    date: string
    time: string
    city: string
    state: string
    status: string
    requestBy: {
        id: number
        firstName?: string
        lastName?: string
        role: string | undefined
    },
    volunteer?: null | {
        id: number
        firstName: string
        lastName: string
    },
    assessment?: null
}