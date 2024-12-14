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
 
    return (
        <>
            <Input type="text" name="firstName" value={userEdited.firstName} onChange={(e) => handleChangeForm(e, userEdited, setUserEdited)} />
            <p>{userEdited.firstName}</p>
            <Input type="text" name="city" value={userEdited.address.city} onChange={(e) => handleChangeAddress(e, setUserEdited)} />
            <p>{userEdited.address.city}</p>
        </>
    )
}