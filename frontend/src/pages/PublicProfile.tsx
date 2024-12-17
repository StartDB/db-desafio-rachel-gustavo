import Input from "../components/form/Input"
import MainTitle from "../components/MainTitle"
import styles from './PublicProfile.module.css';
import Label from "../components/form/Label"
import Legend from "../components/form/Legend"
import { userInitialValues } from "../utils/initalValues"
import { useNavigate, useParams } from "react-router"
import { useEffect, useState } from "react";
import { UserDTO } from "../services/interfaces/user.dto";
import getPublicUser from "../api/getPublicUser";

export default function PublicProfile() {
    const navigate = useNavigate()
    const {publicId, role } = useParams()

    const [userPublic, setUserPublic]= useState<UserDTO>(userInitialValues)

    useEffect( () => {
        async function getPublicProfileUser(): Promise<void> {
            try {
                const userAPI: UserDTO = await getPublicUser(Number(publicId), String(role))

                setUserPublic(userAPI)

            } catch(error: any) {
                alert("Não foi possível atualizar a página.\n\nPor favor, tente novamente mais tarde.")
                console.error(`Erro ao puxar os dados:  \nNome: ${error.name} \nMensagem: ${error.message}`)
            }
        }

        getPublicProfileUser()
    }, [])

    function returnPreviousPage(e: React.MouseEvent<HTMLAnchorElement>): void {
        e.preventDefault()
        navigate(-1)
    }

    return (
        <section className={`container-section-base`}>

            <header className={styles.headerForm}>
                <MainTitle content="Perfil Público" />
                
                <div className={styles.headerFormFixedValues}>
                    <p className={styles.fixedValue}>
                        <span>ID:</span> {userPublic.id}
                    </p>

                    <p className={styles.fixedValue}>
                        <span>Tipo de cadastro:</span> {userPublic.role ? userPublic.role == "elderly" ? "Idoso" : "Voluntário" : " "}
                    </p>
                </div>
            </header>

            <form className={styles.formUserProfile}>
                <fieldset className={styles.rowForm}>
                    <Legend content="Dados Pessoais" />

                    <div>
                        <Label content="Nome do usuário:" />
                        <Input type="text" name="username" value={userPublic.username} disabled />
                    </div>

                    <div>
                        <Label content="Data de nascimento:" />
                        <Input type="date" name="birthdate" value={userPublic.birthdate} disabled />
                    </div>


                    <div>
                        <Label content="Primeiro nome:" />
                        <Input type="text" name="firstName" value={userPublic.firstName} disabled />
                    </div>
                    
                    
                    <div>
                        <Label content="Sobrenome:" />
                        <Input type="text" name="lastName" value={userPublic.lastName} disabled />
                    </div>

                    <div>
                        <Label content="E-mail:" />
                        <Input type="email" name="email" value={userPublic.email} disabled />
                    </div>

                    <div>
                        <Label content="Telefone:" />
                        <Input type="tel" name="phone" value={userPublic.phone == 0 ? "" : userPublic.phone.toString()} disabled />
                    </div>


                </fieldset>

                <fieldset className={styles.rowForm}>
                    <Legend content="Endereço" />

                    <div>
                        <Label content="CEP:" />
                        <Input type="text" name="zip" value={userPublic.address.zip} disabled />
                    </div>

                    <div>
                        <Label content="Estado:" />
                        <Input type="text" name="state" value={userPublic.address.state} disabled />
                    </div>

                    <div>
                        <Label content="Cidade:" />
                        <Input type="text" name="city" value={userPublic.address.city} disabled />
                    </div>

                    <div>
                        <Label content="Bairro:" />
                        <Input type="text" name="district" value={userPublic.address.district} disabled />
                    </div>
                </fieldset>

                <fieldset className={`${styles.rowForm} ${styles.aboutForm}`}>
                    <Legend content="Sobre mim" />

                    <textarea className={styles.textAreaForm} name="description" value={userPublic.description ? userPublic.description : ""} disabled />
                </fieldset>

                <div className={styles.footerFormUserProfile}>
                    <a className={`navigationLink ${styles.linkReturn}`} href="#" onClick={returnPreviousPage}>Voltar</a>
                </div>
            </form>
        </section>
    )
}