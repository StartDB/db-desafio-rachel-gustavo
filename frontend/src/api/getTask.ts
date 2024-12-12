import { TaskDTO } from "../services/interfaces/task.dto";

export default async function getTasks(supportType?: string): Promise<TaskDTO[]> {
    const initialUrl: string = "http://localhost:8080/";

    const finalUrl:string = supportType ? `${initialUrl}${supportType}` : initialUrl

    const response: Response = await fetch(finalUrl)

    if (!response.ok) {
        throw new Error(`Erro: ${response.status} -  ${response.text()}`)
    }
    
    return response.json()
}