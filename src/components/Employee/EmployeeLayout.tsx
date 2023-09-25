import EmployeeSidebar from "../Employee/EmployeeSidebar";
import { Outlet } from "react-router-dom";

function EmployeeLayout() {
  return (
    <div className="flex w-full">
      <EmployeeSidebar />
      <Outlet />
    </div>
  );
}

export default EmployeeLayout;
