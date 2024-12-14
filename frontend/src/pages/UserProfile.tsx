import { useState } from "react"
import useUser from "../contexts/hook/useUser"
import { UserDTO } from "../services/interfaces/user.dto"
import Input from "../components/form/Input"
import { initialUserProfile } from "../utils/initalValues"
import { handleChangeAddress, handleChangeForm } from "../utils/handleChange"

export default function UserProfile() {
    const { user } = useUser()
    const userFinal = user ? user : initialUserProfile
    const [userEdited, setUserEdited] = useState<UserDTO>(userFinal)

    const [isDisabled, setIsDisabled] = useState<boolean>(true)
    const [buttonHTML, setbuttonHTML] = useState<string>("Editar")
    const [isVisible, setisVisible] = useState<boolean>(false)
    
    function handleClickForm(): void{
        setIsDisabled(false)
        setbuttonHTML("Salvar")
        setisVisible(true)
    }

    function handleCancelClick():void {
        setUserEdited(userFinal)
        setbuttonHTML("Editar")
        setIsDisabled(true)
        setisVisible(false)
    }

    return (
        <>
            <Input type="text" name="firstName" value={userEdited.firstName} onChange={(e) => handleChangeForm(e, userEdited, setUserEdited)} disabled={isDisabled}/>
            <p>{userEdited.firstName}</p>
            <Input type="text" name="city" value={userEdited.address.city} onChange={(e) => handleChangeAddress(e, setUserEdited)} disabled={isDisabled}/>
            <p>{userEdited.address.city}</p>

            <button style={{visibility: isVisible ? "visible" : "hidden"}}onClick={handleCancelClick}>Cancelar</button>
            <button onClick={handleClickForm}>{buttonHTML}</button>
        </>
    )
}