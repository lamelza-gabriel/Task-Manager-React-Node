import React, { useContext } from "react";
import userContext from "../contexts/UserContext";
import "../styles/Navbar.scss";
import LogoutLogo from "../assets/arrow-right-from-bracket-solid.svg";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
	const { userState, setUserState } = useContext(userContext);

	const navigate = useNavigate();

	//exit user
	const exitUser = () => {
		setUserState({ name: "", id: "" });
		navigate("/");
	};

	return (
		<header className='header-form'>
			<nav>
				<div className='header-space'></div>
				<div className='header-container'>
					<p>Bienvenido {userState.name}</p>
					<img
						onClick={exitUser}
						alt='log out icon'
						src={LogoutLogo}
						className='header-logo'
					/>
				</div>
			</nav>
		</header>
	);
};

export default Navbar;
