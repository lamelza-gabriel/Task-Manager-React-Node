import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Dashboard.scss";
import LockLogo from "../assets/lock-solid.svg";
import UserLogo from "../assets/user-solid.svg";
import EmailLogo from "../assets/envelope-solid.svg";
import axios from "axios";
import userContext from "../contexts/UserContext";

const Dashboard = () => {
	const navigate = useNavigate();

	//estados iniciales
	const intialState = {
		usernameLogin: "",
		passwordLogin: "",
		emailLogin: "",
	};

	const intialState2 = {
		usernameRegister: "",
		passwordRegister: "",
		emailRegister: "",
	};

	//states para manejo del form
	const [formLogin, setFormLogin] = useState(intialState);
	const [formRegister, setFormRegister] = useState(intialState2);

	//states para guardar el token
	//const [token, setToken] = useState();

	//estado para nombre de usuario
	const { setUserState } = useContext(userContext);

	const handleChange = (e) => {
		setFormLogin({
			...formLogin,
			[e.target.name]: e.target.value,
		});
	};

	const handleChange2 = (e) => {
		setFormRegister({
			...formRegister,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit1 = (e) => {
		e.preventDefault();
		try {
			axios
				.post("api/logreg/login", {
					name: formLogin.usernameLogin,
					password: formLogin.passwordLogin,
					email: formLogin.emailLogin,
				})
				.then((response) => {
					if (response.data.msg === "Password is not correct") {
						window.alert(
							"Password is not correct, try again with a diferent password"
						);
					} else if (
						response.data.msg ===
						"Invalid credentials, user or email are not correct"
					) {
						window.alert("Invalid credentials, user or email are not correct");
					} else if (response.data.token) {
						const tokenTemp = response.data.token;
						localStorage.setItem("TOKEN JWT", tokenTemp);
						const TempUser = response.data.user.name;
						const TempId = response.data.user.id;
						setUserState({ name: TempUser, id: TempId });
						navigate("/tasks");
					}
				});
		} catch (error) {
			console.log(error);
		}
	};

	const handleSubmit2 = (e) => {
		e.preventDefault();
		try {
			axios
				.post("api/logreg/register", {
					name: formRegister.usernameRegister,
					password: formRegister.passwordRegister,
					email: formRegister.emailRegister,
				})
				.then((response) => {
					if (
						response.data.msg ===
						"Duplicate value for the email, please provide a new one"
					) {
						window.alert(
							"Duplicate value for the email, please provide a new one"
						);
					} else if (
						response.data.msg === "Invalid credentials, provide them all"
					) {
						window.alert("Invalid credentials, provide them all");
					} else if (response.data.token) {
						const tokenTemp = response.data.token;
						localStorage.setItem("TOKEN JWT", tokenTemp);
						const TempUser = response.data.user.name;
						const TempId = response.data.user.id;
						setUserState({ name: TempUser, id: TempId });
						navigate("/tasks");
					}
				});
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			<div className='body'>
				<div className='main-text'>
					<h1 className='dashboard-title'>Task Manager</h1>

					<h3>Please, register your user or login with an existing account</h3>
				</div>

				<div className='forms-container'>
					<div className='dashboard-form'>
						<h3>Login</h3>
						<form onSubmit={handleSubmit1}>
							<div className='input-container'>
								<img
									alt='user logo'
									className='dashboard-logo'
									src={UserLogo}
								/>
								<input
									type='text'
									name='usernameLogin'
									required
									placeholder='Username'
									id='usernameLogin'
									className='dashboard-input'
									value={formLogin.usernameLogin}
									onChange={handleChange}
								/>
							</div>
							<div className='input-container'>
								<img
									alt='email logo'
									className='dashboard-logo'
									src={EmailLogo}
								/>
								<input
									type='text'
									name='emailLogin'
									required
									placeholder='Email'
									id='emailLogin'
									className='dashboard-input'
									value={formLogin.emailLogin}
									onChange={handleChange}
								/>
							</div>

							<div className='input-container'>
								<img
									alt='lock logo'
									className='dashboard-logo'
									src={LockLogo}
								/>
								<input
									type='password'
									name='passwordLogin'
									required
									id='passwordLogin'
									placeholder='Password'
									className='dashboard-input'
									value={formLogin.passwordLogin}
									onChange={handleChange}
								/>
							</div>

							<input type='submit' value='Login' className='dashboard-btn' />
						</form>
					</div>
					<hr />
					<div className='dashboard-form'>
						<h3>Register</h3>
						<form onSubmit={handleSubmit2}>
							<div className='input-container'>
								<img
									alt='user logo'
									className='dashboard-logo'
									src={UserLogo}
								/>

								<input
									type='text'
									name='usernameRegister'
									required
									id='usernameRegister'
									className='dashboard-input'
									placeholder='Username'
									value={formRegister.usernameRegister}
									onChange={handleChange2}
								/>
							</div>

							<div className='input-container'>
								<img
									alt='email logo'
									className='dashboard-logo'
									src={EmailLogo}
								/>

								<input
									type='email'
									name='emailRegister'
									placeholder='Email'
									required
									id='emailRegister'
									className='dashboard-input'
									value={formRegister.emailRegister}
									onChange={handleChange2}
								/>
							</div>
							<div className='input-container'>
								<img
									alt='lock logo'
									className='dashboard-logo'
									src={LockLogo}
								/>

								<input
									type='password'
									name='passwordRegister'
									placeholder='Password'
									required
									id='passwordRegister'
									className='dashboard-input'
									value={formRegister.passwordRegister}
									onChange={handleChange2}
								/>
							</div>

							<input
								type='submit'
								value='Register User'
								className='dashboard-btn'
							/>
						</form>
					</div>
				</div>
			</div>
			<footer className='footer'>
				©2023 Gabriel Lamelza. All rights reserved
			</footer>
		</>
	);
};

export default Dashboard;
