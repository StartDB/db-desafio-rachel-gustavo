import { useState } from "react";
import { UserDTO } from "../services/interfaces/user.dto";
import { postUser } from "../api/postUser";
import Input from "../components/form/Input";
import { userInitialValues } from "../utils/initialValues";
import { handleChangeAddress, handleChangeUserForm } from "../utils/handleChange";
import { useNavigate } from "react-router";
import styles from './Register.module.css';
import MainTitle from "../components/MainTitle";
import Legend from "../components/form/Legend";
import InputButton from "../components/form/InputButton";
import Label from "../components/form/Label";

export default function Register() {
	const [data, setData] = useState<UserDTO>(userInitialValues);
	const navigate = useNavigate();

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>): Promise<void> {
		e.preventDefault();

		try {
			const response = await postUser(data);

			alert(response);
			navigate("/login");

		} catch (error: any) {
			alert("Não foi possível concluir o cadastro.\n\nPor favor, tente novamente mais tarde.")
			console.error(`Erro ao enviar os dados: \nNome: ${error.name} \nMensagem: ${error.message}`)
		}
	}

	return (
		<section className={`container-section-base`}>
			 <header className={styles.headerForm}>
                <MainTitle content="Criar uma nova conta" />
            </header>

			<form onSubmit={handleSubmit} className={styles.formContainer}>
				<fieldset className={styles.rowRadioForm}>
					<Legend content="Primeiro Passo" />

					<div className={styles.radioForm}>
						<Label content="Tipo de cadastro" />

						<div className={styles.radioUnitForm}>
							<input type="radio" name="role" id="elderly" value="elderly" checked={data.role === "elderly"} onChange={(e) => handleChangeUserForm(e, data, setData)} />
							<label htmlFor="elderly">Idoso</label>
						</div>

						<div className={styles.radioUnitForm}>
							<input type="radio" name="role" id="volunteer" value="volunteer" checked={data.role === "volunteer"} onChange={(e) => handleChangeUserForm(e, data, setData)}/>
							<label htmlFor="volunteer">Voluntário</label>
						</div>
					</div>
				</fieldset>
				
				<fieldset className={styles.rowForm}>
					<Legend content="Dados Pessoais" />

					<div>
						<Label content="Nome do Usuário:"/>
						<Input type="text" name="username" value={data.username} placeholder="Informe o seu nome de usuário" onChange={(e) => handleChangeUserForm(e, data, setData)}/>
					</div>

					<div>
						<Label content="Senha:"/>
						<Input type="password" name="password" value={data.password} placeholder="Informe a sua senha" onChange={(e) => handleChangeUserForm(e, data, setData)}/>
					</div>

					<div>
						<Label content="Primeiro Nome:"/>
						<Input type="text" name="firstName" value={data.firstName} placeholder="Informe o seu primeiro nome" onChange={(e) => handleChangeUserForm(e, data, setData)}/>
					</div>

					<div>
						<Label content="Sobrenome:"/>
						<Input type="text" name="lastName" value={data.lastName} placeholder="Informe o seu sobrenome" onChange={(e) => handleChangeUserForm(e, data, setData)}/>
					</div>

					<div>
						<Label content="E-mail:"/>
						<Input type="email" name="email" value={data.email} placeholder="Informe o seu email" onChange={(e) => handleChangeUserForm(e, data, setData)}/>
					</div>

					<div>
						<Label content="Telefone:"/>
						<Input type="tel" name="phone" value={data.phone == 0 ? "" : data.phone.toString()} placeholder="Informe o seu telefone" onChange={(e) => handleChangeUserForm(e, data, setData)}/>
					</div>

					<div>
						<Label content="Data de nascimento:"/>
						<Input type="date" name="birthdate" value={data.birthdate} onChange={(e) => handleChangeUserForm(e, data, setData)}/>
					</div>
				</fieldset>

				<fieldset className={styles.rowForm}>
					<Legend content="Endereço" />

					<div>
						<Label content="CEP:"/>
						<Input type="text" name="zip" value={data.address.zip} placeholder="Informe o seu CEP" onChange={(e) => handleChangeAddress(e, setData)} />
					</div>
					
					<div>
						<Label content="Estado:"/>
						<Input type="text" name="state" value={data.address.state} placeholder="Informe o seu estado" onChange={(e) => handleChangeAddress(e, setData)} />
					</div>
					
					<div>
						<Label content="Cidade:"/>
						<Input type="text" name="city" value={data.address.city} placeholder="Informe a sua cidade" onChange={(e) => handleChangeAddress(e, setData)} />
					</div>
					
					<div>
						<Label content="Bairro:"/>
						<Input type="text" name="district" value={data.address.district} placeholder="Informe o seu bairro" onChange={(e) => handleChangeAddress(e, setData)} />
					</div>
					
					<div>
						<Label content="Rua:"/>
						<Input type="text" name="street" value={data.address.street} placeholder="Informe a sua rua" onChange={(e) => handleChangeAddress(e, setData)} />
					</div>
					
					<div>
						<Label content="Unidade:"/>
						<Input type="text" name="number" value={data.address.number} placeholder="Informe a sua unidade" onChange={(e) => handleChangeAddress(e, setData)} />
					</div>
					
					<div>
						<Label content="Complemento:"/>
						<Input type="text" name="suite" value={data.address.suite} placeholder="Informe o seu complemento" onChange={(e) => handleChangeAddress(e, setData)} />
					</div>
				</fieldset>
				
				<div className={styles.footerContainer}>
					<InputButton type="submit" value="Cadastrar" />
				</div>
			</form>
		</section>
	);
}
