import { Outlet } from "react-router-dom";

function EmployeeLayout() {
  return (
    <div className="flex w-full">
      <Outlet />
    </div>
  );
}

export default EmployeeLayout;
