import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import UserIcon from "../../assets/icon/user_icon.svg";
import { useEffect, useState } from "react";

import useFetchEmail from "@/hooks/useFetchEmail";
import axios from "axios";

function EmployeeTopbar_search() {
  const currentLoginEmail = useFetchEmail();

  const [employeeName, setEmployeeName] = useState<string>("");
  console.log("employee navbar", employeeName, currentLoginEmail);

  async function fetchEmployeeName() {
    try {
      const { data } = await axios.get(
        `https://home-service-server.onrender.com/v2/employee/name?email=${currentLoginEmail}`
      );
      setEmployeeName(data.name[0].name);
      console.log("fetchname", data.name[0].name);
    } catch (error) {
      console.log("Error fetchEmployeeName", error);
    }
  }
  useEffect(() => {
    fetchEmployeeName();
  });

  return (
    <nav className="flex items-center justify-between h-20 bg-white px-10 sticky top-0 z-50">
      <div id="Title">
        <h3 className="text-black text-xl font-medium">รายการ</h3>
      </div>
      <div id="Avatar">
        <Avatar className="flex flex-row gap-2">
          <AvatarImage src={UserIcon} />
          <p>{employeeName}</p>
          <AvatarFallback></AvatarFallback>
        </Avatar>
      </div>
    </nav>
  );
}

export default EmployeeTopbar_search;
