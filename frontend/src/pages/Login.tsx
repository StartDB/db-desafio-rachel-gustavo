import { useState } from "react";
import { useNavigate } from "react-router";

export function Login(){

    const [id, setId] = useState('');
    const navigate = useNavigate();

    function handleLogin() {
        if (id) {
          console.log()
          navigate(`/dashboard/${id}`);
        } else {
          alert('Por favor, insira um ID');
        }
    };

    return (
        <form>
            <h1>Login</h1>

            <div>
                <label>Nome do Usuário</label>
                <input type="text" />
            </div>

            <div>
                <label>Senha</label>
                <input type="password" />
            </div>

            <button>Entrar</button>
        </form>
    )
}