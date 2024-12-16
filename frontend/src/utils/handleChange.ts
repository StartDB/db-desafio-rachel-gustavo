import { TaskDTO } from "../services/interfaces/task.dto";
import { UserDTO } from "../services/interfaces/user.dto";

export function handleChangeForm(
    e: React.ChangeEvent<HTMLInputElement>,
    state: UserDTO,
    setState: React.Dispatch<React.SetStateAction<UserDTO>>
): void {
    const { name, value } = e.target;

    switch (name) {
        case 'phone':
            const regexDigits: RegExp = /^\d{1,9}$/

            if (value == "") {
                setState({
                    ...state,
                    [name]: 0,
                });
            }

            if (regexDigits.test(value)) {
                setState({
                    ...state,
                    [name]: parseInt(value),
                });
            }
            break;

        default:
            setState({
                ...state,
                [name]: value,
            });
    }
}

export function handleChangeAddress(
    e: React.ChangeEvent<HTMLInputElement>,
    setState: React.Dispatch<React.SetStateAction<UserDTO>>
): void {
    let { name, value } = e.target;

    setState((prevState) => {
        return {
            ...prevState,
            address: {
                ...prevState['address'],
                [name]: value,
            }
        }
    });
}

export function handleChangeTextArea(
    e: React.ChangeEvent<HTMLTextAreaElement>,
    state: UserDTO,
    setState: React.Dispatch<React.SetStateAction<UserDTO>>
): void {
    const { name, value } = e.target;

    setState({
        ...state,
        [name]: value,
    });
}

export function handleChangeTask(
    e: React.ChangeEvent<HTMLInputElement>,
    state: TaskDTO,
    setState: React.Dispatch<React.SetStateAction<TaskDTO>>
): void {
    const { name, value, checked } = e.target;

    setState({
        ...state,
        [name]: name == "isOnline" ? checked : value,
    });
}

export function handleChangeTextAreaTask(
    e: React.ChangeEvent<HTMLTextAreaElement>,
    state: TaskDTO,
    setState: React.Dispatch<React.SetStateAction<TaskDTO>>
): void {
    const { name, value } = e.target;

    setState({
        ...state,
        [name]: value,
    });
}