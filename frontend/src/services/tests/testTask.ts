import { TaskDTO } from "../interfaces/task.dto";
import { testUser } from "./testUser";

const exampleTask: TaskDTO = {
    id: 1,
    title: "Entrega de Medicamentos",
    supportType: "Acompanhamento e Transporte",
    isOnline: false,
    description: "Levar os medicamentos prescritos ao idoso na cidade.",
    date: new Date("2024-12-15"),
    time: new Date("2024-12-15T10:30:00"),
    city: "São Paulo",
    state: "SP",
    status: "Disponível",
    requestBy: testUser,
    volunteer: null, // Ainda sem voluntário
    assessment: null // Avaliação ainda não realizada
};