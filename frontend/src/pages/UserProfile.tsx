import { useState } from "react"
import useUser from "../contexts/hook/useUser"
import { UserDTO } from "../services/interfaces/user.dto"
import Input from "../components/form/Input"
import { initialUserProfile } from "../utils/initalValues"
import { handleChangeAddress, handleChangeForm, handleChangeTextArea } from "../utils/handleChange"
import MainTitle from "../components/MainTitle"
import { updateUser } from "../api/updateUser"

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

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>): Promise<void>{
        e.preventDefault();
        if(userFinal.id === 0) {
            return
        }

        if(buttonHTML == "Editar"){
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
    
            } catch(error: any) {
                alert(`Erro ao enviar os dados: \n${error.message}.`);
            }
            
        }
        
    }

    return (
        <section className="container-section-initial">
            <MainTitle content="Meu Perfil" />
            <p>ID:{userEdited.id}</p>
            <form onSubmit={handleSubmit}>
                <fieldset>
                    <legend>Tipo de Cadastro</legend>
                    <div>
                        <input type="radio" name="role" id="elderly" value="elderly" checked={userEdited.role === "elderly"} onChange={(e) => handleChangeForm(e, userEdited, setUserEdited)} disabled={isDisabled} /><label htmlFor="elderly">Idoso</label>

                        <input type="radio" name="role" id="volunteer" value="volunteer" checked={userEdited.role === "volunteer"} onChange={(e) => handleChangeForm(e, userEdited, setUserEdited)} disabled={isDisabled} /><label htmlFor="volunteer">Voluntário</label>
                    </div>
                </fieldset>
                
                <fieldset>
                    <legend>Dados Pessoais</legend>
                    <div>
                        <label>Nome do Usuário:</label>
                        <Input type="text" name="username" value={userEdited.username} onChange={(e) => handleChangeForm(e, userEdited, setUserEdited)} disabled={isDisabled} />
                    </div>

                    <div>
                        <label>Senha:</label>
                        <Input type={isVisible ? "text" : "password"} name="password" value={userEdited.password} onChange={(e) => handleChangeForm(e, userEdited, setUserEdited)} disabled={isDisabled} />
                    </div>

                    <div>
                        <label>Primeiro Nome:</label>
                        <Input type="text" name="firstName" value={userEdited.firstName} onChange={(e) => handleChangeForm(e, userEdited, setUserEdited)} disabled={isDisabled} />
                    </div>

                    <div>
                        <label>Sobrenome:</label>
                        <Input type="text" name="lastName" value={userEdited.lastName} onChange={(e) => handleChangeForm(e, userEdited, setUserEdited)} disabled={isDisabled}/>
                    </div>

                    <div>
                        <label>E-mail:</label>
                        <Input type="email" name="email" value={userEdited.email} onChange={(e) => handleChangeForm(e, userEdited, setUserEdited)} disabled={isDisabled} />
                    </div>

                    <div>
                        <label>Telefone:</label>
                        <Input type="tel" name="phone" value={userEdited.phone == 0 ? "" : userEdited.phone.toString()} onChange={(e) => handleChangeForm(e, userEdited, setUserEdited)} disabled={isDisabled} />
                    </div>

                    <div>
                        <label>Data de nascimento:</label>
                        <Input type="date" name="birthdate" value={userEdited.birthdate} onChange={(e) => handleChangeForm(e, userEdited, setUserEdited)} disabled={isDisabled}/>
                    </div>
                </fieldset>

                <fieldset>
                    <legend>Endereço</legend>
                    <div>
                        <label>CEP:</label>
                        <Input type="text" name="zip" value={userEdited.address.zip} onChange={(e) => handleChangeAddress(e, setUserEdited)} disabled={isDisabled} />
                    </div>
                    <div>
                        <label>Estado:</label>
                        <Input type="text" name="state" value={userEdited.address.state} onChange={(e) => handleChangeAddress(e, setUserEdited)} disabled={isDisabled} />
                    </div>
                    <div>
                        <label>Cidade:</label>
                        <Input type="text" name="city" value={userEdited.address.city} onChange={(e) => handleChangeAddress(e, setUserEdited)} disabled={isDisabled} />
                    </div>
                    <div>
                        <label>Bairro:</label>
                        <Input type="text" name="district" value={userEdited.address.district} onChange={(e) => handleChangeAddress(e, setUserEdited)} disabled={isDisabled} />
                    </div>
                    <div>
                        <label>Rua:</label>
                        <Input type="text" name="street" value={userEdited.address.street} onChange={(e) => handleChangeAddress(e, setUserEdited)} disabled={isDisabled} />
                    </div>
                    <div>
                        <label>Unidade:</label>
                        <Input type="text" name="number" value={userEdited.address.number} onChange={(e) => handleChangeAddress(e, setUserEdited)} disabled={isDisabled} />
                    </div>
                    <div>
                        <label>Complemento:</label>
                        <Input type="text" name="suite" value={userEdited.address.suite} onChange={(e) => handleChangeAddress(e, setUserEdited)} disabled={isDisabled} />
                    </div>
                </fieldset>

                <fieldset>
                    <label>Sobre mim:</label>
                    <textarea style={{resize: 'none'}} name="description" value={userEdited.description ? userEdited.description : ""} onChange={(e) => handleChangeTextArea(e, userEdited, setUserEdited)} disabled={isDisabled} />
                </fieldset>

                <input type="button" value="Cancelar" style={{ visibility: isVisible ? "visible" : "hidden" }} onClick={handleCancelClick} />
                <input type="submit" value={buttonHTML} />
            </form>
        </section>

    )
}