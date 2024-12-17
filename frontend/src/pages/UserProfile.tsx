import { useEffect, useState } from "react"
import useUser from "../contexts/hook/useUser"
import { UserDTO } from "../services/interfaces/user.dto"
import Input from "../components/form/Input"
import { handleChangeAddress, handleChangeUserForm, handleChangeTextArea } from "../utils/handleChange"
import MainTitle from "../components/MainTitle"
import { updateUser } from "../api/updateUser"
import styles from './UserProfile.module.css';
import Label from "../components/form/Label"
import Legend from "../components/form/Legend"
import InputButton from "../components/form/InputButton"
import { userInitialValues } from "../utils/initialValues"

export default function UserProfile() {
    const { user, setUser } = useUser()
    const userFinal = user ? user : userInitialValues
    const [userEdited, setUserEdited] = useState<UserDTO>(userFinal)

    const [isDisabled, setIsDisabled] = useState<boolean>(true)
    const [buttonHTML, setbuttonHTML] = useState<string>("Editar")
    const [isVisible, setisVisible] = useState<boolean>(false)

    useEffect(() => {
        const userFinal = user ? user : userInitialValues
        setUserEdited(userFinal)
    }, [user])

    function handleCancelClick(): void {
        setUserEdited(userFinal)
        setbuttonHTML("Editar")
        setIsDisabled(true)
        setisVisible(false)
    }


    async function handleSubmit(e: React.FormEvent<HTMLFormElement>): Promise<void> {
        e.preventDefault();

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

                alert("Cadastro atualizado com sucesso!")

            } catch (error: any) {
                alert("Não foi possível concluir a atualização do cadastro.\n\nPor favor, tente novamente mais tarde.")

			    console.error(`Erro ao enviar os dados:  \nNome: ${error.name} \nMensagem: ${error.message}`)
            }

        }

    }

    return (
        <section className={`container-section-base`}>

            <header className={styles.headerForm}>
                <MainTitle content="Meu Perfil" />
                
                <div className={styles.headerFormFixedValues}>
                    <p className={styles.fixedValue}>
                        <span>ID:</span> {userFinal.id != 0 ? userFinal.id : " "}
                    </p>

                    <p className={styles.fixedValue}>
                        <span>Tipo de cadastro:</span> {userFinal.role ? userFinal.role == "elderly" ? "Idoso" : "Voluntário" : " "}
                    </p>
                </div>
            </header>

            <form onSubmit={handleSubmit} className={styles.formUserProfile}>
                <fieldset className={styles.rowForm}>
                    <Legend content="Dados Pessoais" />

                    <div>
                        <Label content="Nome do usuário:" />
                        <Input type="text" name="username" value={userEdited.username} onChange={(e) => handleChangeUserForm(e, userEdited, setUserEdited)} disabled={isDisabled} />
                    </div>

                    <div>
                        <Label content="Senha:" />
                        <Input type={isVisible ? "text" : "password"} name="password" value={userEdited.password} onChange={(e) => handleChangeUserForm(e, userEdited, setUserEdited)} disabled={isDisabled} />
                    </div>

                    <div>
                        <Label content="Primeiro nome:" />
                        <Input type="text" name="firstName" value={userEdited.firstName} onChange={(e) => handleChangeUserForm(e, userEdited, setUserEdited)} disabled={isDisabled} />
                    </div>

                    <div>
                        <Label content="Sobrenome:" />
                        <Input type="text" name="lastName" value={userEdited.lastName} onChange={(e) => handleChangeUserForm(e, userEdited, setUserEdited)} disabled={isDisabled} />
                    </div>

                    <div>
                        <Label content="E-mail:" />
                        <Input type="email" name="email" value={userEdited.email} onChange={(e) => handleChangeUserForm(e, userEdited, setUserEdited)} disabled={isDisabled} />
                    </div>

                    <div>
                        <Label content="Telefone:" />
                        <Input type="tel" name="phone" value={userEdited.phone == 0 ? "" : userEdited.phone.toString()} onChange={(e) => handleChangeUserForm(e, userEdited, setUserEdited)} disabled={isDisabled} />
                    </div>

                    <div>
                        <Label content="Data de nascimento:" />
                        <Input type="date" name="birthdate" value={userEdited.birthdate} onChange={(e) => handleChangeUserForm(e, userEdited, setUserEdited)} disabled={isDisabled} />
                    </div>
                </fieldset>

                <fieldset className={styles.rowForm}>
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

                <fieldset className={`${styles.rowForm} ${styles.aboutForm}`}>
                    <Legend content="Sobre mim" />

                    <textarea className={styles.textAreaForm} name="description" value={userEdited.description ? userEdited.description : ""} onChange={(e) => handleChangeTextArea(e, userEdited, setUserEdited)} disabled={isDisabled} />
                </fieldset>

                <div className={styles.footerFormUserProfile}>
                    <input style={{ visibility: isVisible ? "visible" : "hidden" }} className={styles.buttonCanceled} type="button" value="Cancelar"  onClick={handleCancelClick} />

                    <InputButton type="submit" value={buttonHTML} disabled={userFinal.id === 0 ? true : false}/>
                </div>
            </form>
        </section>
    )
}