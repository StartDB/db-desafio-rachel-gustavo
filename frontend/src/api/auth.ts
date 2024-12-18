import { UserDTO } from "../services/interfaces/user.dto";
import UserCredentialsDTO from "../services/interfaces/userCredentials.dto";

export default async function loginUser(userCredentials: UserCredentialsDTO):Promise<UserDTO>{
    const url:string = "http://localhost:8080/user/login"

    const response: Response = await fetch(url,{
        method: "POST",
        headers: {
           "Content-Type": "application/json",
        },
        body: JSON.stringify(userCredentials)
    });

    if(!response.ok) {
        alert(await response.text());
    }

    const user = await response.json();
    if (response.ok) {
        localStorage.setItem("user_token", JSON.stringify(user.token));
    }

    return user;
}