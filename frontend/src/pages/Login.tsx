import { useState } from "react";
import { useNavigate } from "react-router";
import UserCredentialsDTO from "../services/interfaces/userCredentials.dto";
import useUser from "../contexts/hook/useUser";
import loginUser from "../api/auth";
import { UserDTO } from "../services/interfaces/user.dto";

export function Login(){
    const { setUser } = useUser();
    
    const [userCredentials, setuserCredentials] = useState<UserCredentialsDTO>({
        username: "",
        password: "",
    });

    const navigate = useNavigate();

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>): Promise<void> {
        e.preventDefault()

        try {
            const user: UserDTO = await loginUser(userCredentials)
            setUser(user)
            navigate(`/dashboard/${user.id}`);
        } catch(error){
            alert(error)
        }
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
        const { name, value } = e.target;
        setuserCredentials({
            ...userCredentials,
            [name]: value
        })
    }

    return (
        <form onSubmit={handleSubmit}>
            <h1>Login</h1>

            <div>
                <label>Nome do Usuário</label>
                <input type="text" name="username" placeholder="Nome Completo" value={userCredentials.username} onChange={handleChange}/>
            </div>

            <div>
                <label>Senha</label>
                <input type="password"  name="password" placeholder="Senha" value={userCredentials.password} onChange={handleChange}/>
            </div>

            <input type="submit" value="Entrar"/>
        </form>
    )
}