
import Login from "../pages/Login";
import { Routes, Route } from "react-router-dom";


function UnauthenticationApp() {
	return (
		<Routes>
			<Route path="/" element={<Login />} />
			<Route path="*" element={<Login />} />
		</Routes>

	)
}

export default UnauthenticationApp