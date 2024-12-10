import { useState } from "react";
import { UserDTO } from "../services/interfaces/user.dto";
import { postUser } from "../services/postUser";

export default function Register() {
  const INITIALUSER: UserDTO= {
		firstName: "",
    	lastName: "",
  }

	const [data, setForm] = useState<UserDTO>(INITIALUSER);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    setForm({
      ...data,
      [name]: value,
    });
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>): Promise<void>{
    e.preventDefault();

		alert(data.firstName + " " + data.lastName)

		try {
			const response = await postUser(data);

			alert("Enviado pelo servidor: " + response.firstName + " " + response.lastName)
    		setForm(INITIALUSER);

		} catch(error){
			console.log("Erro ao enviar os dados: ${error}")
		}

  }

  return (
    <form onSubmit={handleSubmit}>
      <fieldset>

				<div>
					<label>Username</label>
					<input
						type="text"
						name="username"
						placeholder="Informe o seu username"
					/>
				</div>

				<div>
					<label>Senha</label>
					<input
						type="password"
						name="password"
						placeholder="Informe a sua senha"
					/>
				</div>

				<div>
					<label>E-mail</label>
					<input
						type="email"
						name="email"
						placeholder="Informe a sua senha"
					/>
				</div>

        <div>
					<label>Primeiro Nome</label>
					<input
						type="text"
						name="firstName"
						placeholder="Informe o seu primeiro nome"
						onChange={handleChange}
					/>
				</div>

        <div>
					<label>Sobrenome</label>
					<input
						type="text"
						name="lastName"
						placeholder="Informe o seu sobrenome"
						onChange={handleChange}/>
				</div>
				<div>
						<label>Data de nascimento</label>
						<input
							type="date"
							name="birthdate"
							placeholder="Informe a sua data de nascimento"
							onChange={handleChange}/>
				</div>

				<div>
						<label>Celular</label>
						<input
							type="tel"
							name="phone"
							placeholder="Informe o seu celular"
							onChange={handleChange}/>
				</div>
      </fieldset>
      <input type="submit" value="Cadastrar" />
    </form>
  );
}
