import { useState } from "react";
import {login} from "../services/authService"
import {useNavigate, useNavigation} from "react-router-dom"

function Login(){
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username:"",
        password:""
    });

    const handleChange = (e)=>{
        setFormData({...formData,[e.target.name]:e.target.value});

    }
    const handleSubmit = async(e)=>{
        e.preventDefault();
        try{
            const res = await login(formData)

            localStorage.setItem("token",res.token);
            localStorage.setItem("role",res.role);
            navigate("/dashboard")
        }
        catch(error){
                alert("Invalid username pr password")
        }
    }
    return(
        <>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
            <input name="username" placeholder="Usernmae" onChange={handleChange}/>

            <br/>

        <input type="password" name="password" placeholder="Password" onChange={handleChange}/>

        <br />

        <button>Login</button>
        </form>
        </>
    )
}

export default Login