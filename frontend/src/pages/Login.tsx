import { useState } from "react";
import { useNavigate } from "react-router";
import UserCredentialsDTO from "../services/interfaces/userCredentials.dto";
// import { testUser } from "../services/tests/testUser";
import MainTitle from "../components/MainTitle";
import Input from "../components/form/Input";
import Label from "../components/form/Label";
import InputButton from "../components/form/InputButton";
import styles from './Login.module.css';
import { UserDTO } from "../services/interfaces/user.dto";
import loginUser from "../api/auth";
import useUser from "../contexts/hook/useUser";

export function Login() {
    const { setUser } = useUser();

    const [userCredentials, setuserCredentials] = useState<UserCredentialsDTO>({
        username: "",
        password: "",
    });

    const navigate = useNavigate();

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>): Promise<void> {
        e.preventDefault()

        try {
            const userAPI: UserDTO = await loginUser(userCredentials)
            setUser(userAPI)
            navigate(`/dashboard/${userAPI?.id}`);
        } catch (error) {
            console.error(error)
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
        <section className={`container-section-base ${styles.containerSectionMain}`}>
            <form className={styles.formLogin} onSubmit={handleSubmit}>
                <MainTitle className={styles.labelJustifyCenter} content="Login" />
                <div className={styles.row}>
                    <div className={styles.subRow}>
                        <Label content="Nome do Usuário:" />
                        <Input type="text" name="username" placeholder="Usuário" value={userCredentials.username} onChange={handleChange} className={styles.inputHeight}/>
                    </div>
                    <div className={styles.subRow}>
                        <Label content="Senha:" />
                        <Input type="password" name="password" placeholder="Senha" value={userCredentials.password} onChange={handleChange} className={styles.inputHeight}/>
                    </div>
                </div>
                <InputButton type="submit" value="Login" />
            </form>
        </section>
    )
}
