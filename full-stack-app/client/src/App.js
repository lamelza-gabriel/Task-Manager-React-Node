import React from "react";
import Dashboard from "./components/Dashboard";
import Form from "./components/Form";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { UserProvider } from "./contexts/UserContext";

function App() {
	return (
		<UserProvider>
			<BrowserRouter>
				<Routes>
					<Route path='/' element={<Dashboard />}></Route>
					<Route path='/tasks' element={<Form />}></Route>
				</Routes>
			</BrowserRouter>
		</UserProvider>
	);
}

export default App;
