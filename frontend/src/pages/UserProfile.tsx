import { useState } from "react"
import useUser from "../contexts/hook/useUser"
import { UserDTO } from "../services/interfaces/user.dto"
import Input from "../components/form/Input"
import { initialUserProfile } from "../utils/initalValues"
import { handleChangeAddress, handleChangeForm, handleChangeTextArea } from "../utils/handleChange"
import MainTitle from "../components/MainTitle"
import { updateUser } from "../api/updateUser"
import styles from './UserProfile.module.css';
import Label from "../components/form/Label"
import Legend from "../components/form/Legend"

export default function UserProfile() {
    const { user, setUser } = useUser()
    const userFinal = user ? user : initialUserProfile
    const [userEdited, setUserEdited] = useState<UserDTO>(userFinal)

    const [isDisabled, setIsDisabled] = useState<boolean>(true)
    const [buttonHTML, setbuttonHTML] = useState<string>("Editar")
    const [isVisible, setisVisible] = useState<boolean>(false)

    function handleCancelClick(): void {
        setUserEdited(userFinal)
        setbuttonHTML("Editar")
        setIsDisabled(true)
        setisVisible(false)
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>): Promise<void> {
        e.preventDefault();
        if (userFinal.id === 0) {
            return
        }

        if (buttonHTML == "Editar") {
            setIsDisabled(false)
            setbuttonHTML("Salvar")
            setisVisible(true)

        } else {
            try {
                const userUpdate: UserDTO = await updateUser(userEdited)

                setUser(userUpdate)
                setUserEdited(userUpdate)

                setbuttonHTML("Editar")
                setisVisible(false)
                setIsDisabled(true)

            } catch (error: any) {
                alert(`Erro ao enviar os dados: \n${error.message}.`);
            }

        }

    }

    return (
        <section className={`${styles.containerSectionUserProfile} container-section-initial`}>

            <header>
                <MainTitle content="Meu Perfil" />
                <p>ID:{userEdited.id == 0 ? "" : userEdited.id}</p>
            </header>

            <form onSubmit={handleSubmit}>
                <fieldset>
                    <Legend content="Tipo de Cadastro" />

                    <div className={styles.radioForm}>
                        <div className={styles.radioUnitForm}>
                            <input type="radio" name="role" id="elderly" value="elderly" checked={userEdited.role === "elderly"} onChange={(e) => handleChangeForm(e, userEdited, setUserEdited)} disabled={isDisabled} />
                            <label htmlFor="elderly">Idoso</label>
                        </div>

                        <div className={styles.radioUnitForm}>
                            <input type="radio" name="role" id="volunteer" value="volunteer" checked={userEdited.role === "volunteer"} onChange={(e) => handleChangeForm(e, userEdited, setUserEdited)} disabled={isDisabled} />
                            <label htmlFor="volunteer">Voluntário</label>
                        </div>
                    </div>
                </fieldset>

                <fieldset>
                    <Legend content="Dados Pessoais" />

                    <div>
                        <Label content="Nome do Usuário:" />
                        <Input type="text" name="username" value={userEdited.username} onChange={(e) => handleChangeForm(e, userEdited, setUserEdited)} disabled={isDisabled} />
                    </div>

                    <div>
                        <Label content="Senha:" />
                        <Input type={isVisible ? "text" : "password"} name="password" value={userEdited.password} onChange={(e) => handleChangeForm(e, userEdited, setUserEdited)} disabled={isDisabled} />
                    </div>

                    <div>
                        <Label content="Primeiro Nome:" />
                        <Input type="text" name="firstName" value={userEdited.firstName} onChange={(e) => handleChangeForm(e, userEdited, setUserEdited)} disabled={isDisabled} />
                    </div>

                    <div>
                        <Label content="Sobrenome:" />
                        <Input type="text" name="lastName" value={userEdited.lastName} onChange={(e) => handleChangeForm(e, userEdited, setUserEdited)} disabled={isDisabled} />
                    </div>

                    <div>
                        <Label content="E-mail:" />
                        <Input type="email" name="email" value={userEdited.email} onChange={(e) => handleChangeForm(e, userEdited, setUserEdited)} disabled={isDisabled} />
                    </div>

                    <div>
                        <Label content="Telefone:" />
                        <Input type="tel" name="phone" value={userEdited.phone == 0 ? "" : userEdited.phone.toString()} onChange={(e) => handleChangeForm(e, userEdited, setUserEdited)} disabled={isDisabled} />
                    </div>

                    <div>
                        <Label content="Data de nascimento:" />
                        <Input type="date" name="birthdate" value={userEdited.birthdate} onChange={(e) => handleChangeForm(e, userEdited, setUserEdited)} disabled={isDisabled} />
                    </div>
                </fieldset>

                <fieldset>
                    <Legend content="Endereço" />

                    <div>
                        <Label content="CEP:" />
                        <Input type="text" name="zip" value={userEdited.address.zip} onChange={(e) => handleChangeAddress(e, setUserEdited)} disabled={isDisabled} />
                    </div>

                    <div>
                        <Label content="Estado:" />
                        <Input type="text" name="state" value={userEdited.address.state} onChange={(e) => handleChangeAddress(e, setUserEdited)} disabled={isDisabled} />
                    </div>

                    <div>
                        <Label content="Cidade:" />
                        <Input type="text" name="city" value={userEdited.address.city} onChange={(e) => handleChangeAddress(e, setUserEdited)} disabled={isDisabled} />
                    </div>

                    <div>
                        <Label content="Bairro:" />
                        <Input type="text" name="district" value={userEdited.address.district} onChange={(e) => handleChangeAddress(e, setUserEdited)} disabled={isDisabled} />
                    </div>

                    <div>
                        <Label content="Rua:" />
                        <Input type="text" name="street" value={userEdited.address.street} onChange={(e) => handleChangeAddress(e, setUserEdited)} disabled={isDisabled} />
                    </div>

                    <div>
                        <Label content="Unidade:" />
                        <Input type="text" name="number" value={userEdited.address.number} onChange={(e) => handleChangeAddress(e, setUserEdited)} disabled={isDisabled} />
                    </div>

                    <div>
                        <Label content="Complemento:" />
                        <Input type="text" name="suite" value={userEdited.address.suite} onChange={(e) => handleChangeAddress(e, setUserEdited)} disabled={isDisabled} />
                    </div>
                </fieldset>

                <fieldset className={styles.aboutForm}>
                    <Legend content="Sobre mim" />

                    <textarea style={{ resize: 'none' }} name="description" value={userEdited.description ? userEdited.description : ""} onChange={(e) => handleChangeTextArea(e, userEdited, setUserEdited)} disabled={isDisabled} />
                </fieldset>

                <input type="button" value="Cancelar" style={{ visibility: isVisible ? "visible" : "hidden" }} onClick={handleCancelClick} />
                <input type="submit" value={buttonHTML} />
            </form>
        </section>

    )
}