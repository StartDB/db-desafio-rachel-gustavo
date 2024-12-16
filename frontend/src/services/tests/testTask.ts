import { TaskDTO } from "../interfaces/task.dto";

export const exampleTask: TaskDTO = {
    id: 1,
    title: "Entrega de Medicamentos",
    supportType: "COMPANIONSHIP_AND_TRANSPORT",
    isOnline: false,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In rutrum nisl justo, mollis finibus metus dignissim nec. Nullam at semper quam. Cras urna massa, condimentum quis arcu at, fringilla facilisis erat. Aliquam dui tellus, facilisis sed condimentum sit amet, egestas non nibh. Etiam et volutpat lorem. Vivamus turpis libero, tristique ut feugiat sit amet, feugiat in dui. Fusce ultrices nisl luctus suscipit porta. Phasellus vel eros ligula.",
    date: "2024-12-15",
    time: "10:30",
    city: "São Paulo",
    state: "SP",
    status: "AVAILABLE",
    requestBy: {
        id:102,
        firstName:"Gustavo",
        lastName: "Silva",
    },
    volunteer: null, // Ainda sem voluntário
    assessment: null // Avaliação ainda não realizada
};
