import { createContext, useState } from "react";

const userContext = createContext();

const initialValue = {
	name: "",
	id: "",
};

const UserProvider = ({ children }) => {
	const [userState, setUserState] = useState(initialValue);

	const data = { userState, setUserState };

	return <userContext.Provider value={data}> {children} </userContext.Provider>;
};

export { UserProvider };

export default userContext;
