import AdminSidebar from "../AdminSidebar/AdminSidebar";
import { Outlet } from "react-router-dom";

function Layout() {
	return (
		<div className="flex w-full">
			<AdminSidebar />
			<Outlet />
		</div>
	)
}

export default Layout
