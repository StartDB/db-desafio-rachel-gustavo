import { useState } from "react";
import { useNavigate } from "react-router";
import UserCredentialsDTO from "../services/interfaces/userCredentials.dto";
import useUser from "../contexts/hook/useUser";
import loginUser from "../api/auth";
import { UserDTO } from "../services/interfaces/user.dto";
import { testUser } from "../services/tests/testUser";
import MainTitle from "../components/MainTitle";
import Input from "../components/form/Input";
import Label from "../components/form/Label";
import InputButton from "../components/form/InputButton";
import styles from './Login.module.css';

export function Login(){
    const { user, setUser } = useUser();
    
    const [userCredentials, setuserCredentials] = useState<UserCredentialsDTO>({
        username: "",
        password: "",
    });

    const navigate = useNavigate();

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>): Promise<void> {
        e.preventDefault()

        try {
            // const userAPI: UserDTO = await loginUser(userCredentials)
            // setUser(userAPI)
            setUser(testUser) // TESTE EXCLUIR
            // navigate(`/dashboard/${userAPI?.id}`);
        } catch(error){
            alert(error)
        }

        navigate(`/dashboard/${testUser?.id}`); // TESTE EXCLUIR
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
        const { name, value } = e.target;
        setuserCredentials({
            ...userCredentials,
            [name]: value
        })
    }

    return (
        <section className="container-section">
            <form className={styles.formLogin} onSubmit={handleSubmit}>
                <MainTitle className={styles.labelJustifyCenter} content="Login"/>
                <div className={styles.row}>
                    <div className={styles.subRow}>
                        <Label content="Nome do Usuário:" />
                        <Input type="text" name="username" placeholder="Nome Completo" value={userCredentials.username} onChange={handleChange}/>
                    </div>
                    <div className={styles.subRow}>
                        <Label content="Senha:" />
                        <Input type="password"  name="password" placeholder="Senha" value={userCredentials.password} onChange={handleChange}/>
                    </div>
                </div>
                <InputButton type="submit" value="Login"/>
            </form>
        </section>
    )
}