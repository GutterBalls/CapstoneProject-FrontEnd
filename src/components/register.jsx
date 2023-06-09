import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const DATABASE_URL = 'https://gutterballs-back.onrender.com/api';

const Register = () =>{
    const [ newUser, setNewUser] = useState("");
    const [ newPass, setNewPass] = useState("");
    const [ newEmail, setNewEmail] = useState("");
    const [ confirmPass, setConfirmPass] = useState("");

    const nav = useNavigate();

    async function registerUser(event){
        event.preventDefault();
        
        try{
            if (newPass.length < 8){
                alert("Your password needs to be at least 8 characters");
                return
            } else if(newUser.length < 6){
                alert("Your username needs to be at least 6 characters")
                return
            }
            if(newPass != confirmPass){
                alert("Passwords do not match, Please try again.")
                setNewPass("");
                setConfirmPass("");
                return
            }
            const response = await fetch(`${DATABASE_URL}/users/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: newUser,
                    password: newPass,
                    email: newEmail,
                    isAdmin: false,
                    isActive: true
                })
            })
            const transData = await response.json();

            if(!transData){
                alert("Account Registration Unsuccessful")
            } else {
                const tokenKey = transData.token;
                localStorage.setItem("token", tokenKey);
                alert("New Account was successfully created.")
                nav("/")
            }
        } catch(error){
            console.log("Error w/ registerUser in register.jsx", error)
        }
    }

    return (
        <div className='sign-up-log-in'>
            <div className="form">
                <form action="" onSubmit={ registerUser }>
                    <span className="form__switch">
                        Sign up for a new account
                    </span>
                    <div className="form__input">
                        <i className="ri-user-line"></i>
                        <input 
                            type="text" 
                            placeholder="Username"
                            value={ newUser }
                            onChange={(event)=> setNewUser(event.target.value)}
                        />
                        <span className="bar"></span>
                    </div>
                    <div className="form__input">
                        <i className="ri-mail-line"></i>
                        <input 
                            type="email" 
                            placeholder="Email"
                            value={ newEmail }
                            onChange={(event)=> setNewEmail(event.target.value)}
                        />
                        <span className="bar"></span>
                    </div>
                    <div className="form__input">
                        <i className="ri-lock-line"></i>
                        <input 
                            type="password" 
                            placeholder="Password"
                            value={ newPass }
                            onChange={(event)=> setNewPass(event.target.value)}
                        />
                        <span className="bar"></span>
                    </div>
                    <div className="form__input">
                        <i className="ri-lock-line"></i>
                        <input 
                            type="password" 
                            placeholder="Confirm password"
                            value={ confirmPass }
                            onChange={(event)=> setConfirmPass(event.target.value)}
                        />
                        <span className="bar"></span>
                    </div>
                    <button type="submit" className="form__button">Sign up</button>
                    <span className="form__switch">
                        Already have an account? <Link to="/login">Login</Link>
                    </span>
                </form>
            </div>
        </div>
    )
}

export default Register;