import { useState } from "react";
import { UserDTO } from "../services/interfaces/user.dto";
import { postUser } from "../api/postUser";
import { AddressDTO } from "../services/interfaces/adress.dto";

export default function Register() {
	const INITIALDDRESS: AddressDTO = {
		zip: "",
		street: "",
		number: "",
		suite: "",
		city: "",
		district: "",
		state: "",
	}

	const [address, setAddress] = useState<AddressDTO>(INITIALDDRESS);

	const INITIALUSER: UserDTO = {
		firstName: "",
		lastName: "",
		username: "",
		password: "",
		email: "",
		phone: 0,
		birthdate: "",
		address: address,
		role: "",
	};

	const [data, setData] = useState<UserDTO>(INITIALUSER);

	function handleChangeAdress(e: React.ChangeEvent<HTMLInputElement>) {
		let { name, value } = e.target;
		setAddress({
			...address,
			[name]: value,
		});

		setData({
			...data,
			"address": address
		});
	}

	function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
		let { name, value } = e.target;

		switch (name) {
			case 'phone':
				const regexDigits: RegExp = /^\d{1,9}$/

				if (value == "") {
					setData({
						...data,
						[name]: 0,
					});
				}

				if (regexDigits.test(value)) {
					setData({
						...data,
						[name]: parseInt(value),
					});
				}
				break;

			default:
				setData({
					...data,
					[name]: value,
				});
		}
	}


	async function handleSubmit(e: React.FormEvent<HTMLFormElement>): Promise<void> {
		e.preventDefault();

		try {
			const response = await postUser(data);
			const user: UserDTO = { ...response }

			alert("Enviado pelo servidor: \n" + JSON.stringify(user));
			setData(INITIALUSER);
			setAddress(INITIALDDRESS);

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

					<input type="radio" name="role" id="elderly" value="elderly" checked={data.role === "elderly"} onChange={handleChange} /><label htmlFor="elderly">Idoso</label>
					<input type="radio" name="role" id="volunteer" value="volunteer" checked={data.role === "volunteer"} onChange={handleChange} /><label htmlFor="volunteer">Voluntário</label>
				</div>

			</fieldset>
			<fieldset>
				<legend>Dados Pessoais</legend>
				<div>
					<label>Nome do Usuário</label>
					<input type="text" name="username" value={data.username} placeholder="Informe o seu username" onChange={handleChange} />
				</div>

				<div>
					<label>Senha</label>
					<input type="password" name="password" value={data.password} placeholder="Informe a sua senha" onChange={handleChange} />
				</div>

				<div>
					<label>Primeiro Nome</label>
					<input type="text" name="firstName" value={data.firstName} placeholder="Informe o seu primeiro nome" onChange={handleChange} />
				</div>

				<div>
					<label>Sobrenome</label>
					<input type="text" name="lastName" value={data.lastName} placeholder="Informe o seu sobrenome" onChange={handleChange} />
				</div>

				<div>
					<label>E-mail</label>
					<input type="email" name="email" value={data.email} placeholder="Informe o seu email" onChange={handleChange} />
				</div>

				<div>
					<label>Telefone</label>
					<input type="tel" name="phone" value={data.phone == 0 ? "" : data.phone} placeholder="Informe o seu celular" onChange={handleChange} />
				</div>

				<div>
					<label>Data de nascimento</label>
					<input type="date" name="birthdate" value={data.birthdate} placeholder="Informe a sua data de nascimento" onChange={handleChange} />
				</div>
			</fieldset>

			<fieldset>
				<legend>Endereço</legend>
				<div>
					<label>CEP</label>
					<input type="text" name="zip" value={address.zip} placeholder="Informe o seu CEP" onChange={handleChangeAdress} />
				</div>
				<div>
					<label>Estado</label>
					<input type="text" name="state" value={address.state} placeholder="Informe o seu estado" onChange={handleChangeAdress} />
				</div>
				<div>
					<label>Cidade</label>
					<input type="text" name="city" value={address.city} placeholder="Informe a sua cidade" onChange={handleChangeAdress} />
				</div>
				<div>
					<label>Bairro</label>
					<input type="text" name="district" value={address.district} placeholder="Informe o seu bairro" onChange={handleChangeAdress} />
				</div>
				<div>
					<label>Rua</label>
					<input type="text" name="street" value={address.street} placeholder="Informe a sua rua" onChange={handleChangeAdress} />
				</div>
				<div>
					<label>Unidade</label>
					<input type="text" name="number" value={address.number} placeholder="Informe a sua unidade" onChange={handleChangeAdress} />
				</div>
				<div>
					<label>Complemento</label>
					<input type="text" name="suite" value={address.suite} placeholder="Informe o seu complemento" onChange={handleChangeAdress} />
				</div>
			</fieldset>
			<input type="submit" value="Cadastrar" />
		</form>
	);
}
