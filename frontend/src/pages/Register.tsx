import { useState } from "react";
import { UserDTO } from "../services/interfaces/user.dto";
import { postUser } from "../api/postUser";
import Input from "../components/form/Input";
import { userInitialValues } from "../utils/initalValues";
import { handleChangeAddress, handleChangeForm } from "../utils/handleChange";

export default function Register() {
	const [data, setData] = useState<UserDTO>(userInitialValues);

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>): Promise<void> {
		e.preventDefault();

		try {
			const response = await postUser(data);

			alert(response);
			setData(userInitialValues);

		} catch (error) {
			alert(`Erro ao enviar os dados: ${error}`);
		}
	}

	return (
		<form onSubmit={handleSubmit}>
			<fieldset>
				<legend>Primeiro Passo</legend>
				<div>
					<label>Tipo de cadastro</label>

					<input type="radio" name="role" id="elderly" value="elderly" checked={data.role === "elderly"} onChange={(e) => handleChangeForm(e, data, setData)} /><label htmlFor="elderly">Idoso</label>
					<input type="radio" name="role" id="volunteer" value="volunteer" checked={data.role === "volunteer"} onChange={(e) => handleChangeForm(e, data, setData)}/><label htmlFor="volunteer">Voluntário</label>
				</div>

			</fieldset>
			<fieldset>
				<legend>Dados Pessoais</legend>
				<div>
					<label>Nome do Usuário</label>
					<Input type="text" name="username" value={data.username} placeholder="Informe o seu username" onChange={(e) => handleChangeForm(e, data, setData)}/>
				</div>

				<div>
					<label>Senha</label>
					<input type="password" name="password" value={data.password} placeholder="Informe a sua senha" onChange={(e) => handleChangeForm(e, data, setData)}/>
				</div>

				<div>
					<label>Primeiro Nome</label>
					<input type="text" name="firstName" value={data.firstName} placeholder="Informe o seu primeiro nome" onChange={(e) => handleChangeForm(e, data, setData)}/>
				</div>

				<div>
					<label>Sobrenome</label>
					<input type="text" name="lastName" value={data.lastName} placeholder="Informe o seu sobrenome" onChange={(e) => handleChangeForm(e, data, setData)}/>
				</div>

				<div>
					<label>E-mail</label>
					<input type="email" name="email" value={data.email} placeholder="Informe o seu email" onChange={(e) => handleChangeForm(e, data, setData)}/>
				</div>

				<div>
					<label>Telefone</label>
					<input type="tel" name="phone" value={data.phone == 0 ? "" : data.phone} placeholder="Informe o seu celular" onChange={(e) => handleChangeForm(e, data, setData)}/>
				</div>

				<div>
					<label>Data de nascimento</label>
					<input type="date" name="birthdate" value={data.birthdate} placeholder="Informe a sua data de nascimento" onChange={(e) => handleChangeForm(e, data, setData)}/>
				</div>
			</fieldset>

			<fieldset>
				<legend>Endereço</legend>
				<div>
					<label>CEP</label>
					<input type="text" name="zip" value={data.address.zip} placeholder="Informe o seu CEP" onChange={(e) => handleChangeAddress(e, setData)} />
				</div>
				<div>
					<label>Estado</label>
					<input type="text" name="state" value={data.address.state} placeholder="Informe o seu estado" onChange={(e) => handleChangeAddress(e, setData)} />
				</div>
				<div>
					<label>Cidade</label>
					<input type="text" name="city" value={data.address.city} placeholder="Informe a sua cidade" onChange={(e) => handleChangeAddress(e, setData)} />
				</div>
				<div>
					<label>Bairro</label>
					<input type="text" name="district" value={data.address.district} placeholder="Informe o seu bairro" onChange={(e) => handleChangeAddress(e, setData)} />
				</div>
				<div>
					<label>Rua</label>
					<input type="text" name="street" value={data.address.street} placeholder="Informe a sua rua" onChange={(e) => handleChangeAddress(e, setData)} />
				</div>
				<div>
					<label>Unidade</label>
					<input type="text" name="number" value={data.address.number} placeholder="Informe a sua unidade" onChange={(e) => handleChangeAddress(e, setData)} />
				</div>
				<div>
					<label>Complemento</label>
					<input type="text" name="suite" value={data.address.suite} placeholder="Informe o seu complemento" onChange={(e) => handleChangeAddress(e, setData)} />
				</div>
			</fieldset>
			<input type="submit" value="Cadastrar" />
		</form>
	);
}
