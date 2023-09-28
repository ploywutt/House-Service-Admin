import axios from "axios";
import { useEffect, useState } from "react";
import EmployeeTopbar_search from "@/components/Employee/EmployeeTopbarSearch";
import EmployeeSidebar from "../components/Employee/EmployeeSidebar";

import EmployeeComingWork from "@/components/Employee/EmployeeComingWork";
import EmployeeWorking from "@/components/Employee/EmployeeWorking";
import EmployeeSuccess from "@/components/Employee/EmployeeSuccess";

function EmployeeDetail() {
  const [data, setData] = useState([]);
  const [comingwork, setComingwork] = useState(true);
  const [working, setWorking] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const order = await axios.get("http://localhost:4000/v1/employee/detail");
      console.log(order.data.data);
      setData(order.data.data);
    }
    fetchData();
  }, []);

  function handleComingwork() {
    setComingwork(true);
    setWorking(false);
    setSuccess(false);
  }

  function handleWorking() {
    setComingwork(false);
    setWorking(true);
    setSuccess(false);
  }

  function handleSuccess() {
    setComingwork(false);
    setWorking(false);
    setSuccess(true);
  }
  console.log(comingwork, working, success);
  return (
    <>
      <div>
        <EmployeeSidebar
          handleComingwork={handleComingwork}
          handleWorking={handleWorking}
          handleSuccess={handleSuccess}
        />
      </div>
      <div className="w-full">
        <EmployeeTopbar_search />
        {/* {loading ? <h1>Loading ...</h1> : null} */}
        <div className="mx-auto w-[90%] max-w-[1440px] mt-10 border rounded-lg">
          <table className="table-auto w-full">
            <tr className="text-left text-gray-700 p1 h-10 bg-gray-200 border-b">
              <th className="px-6 py-2.5 rounded-t-lg flex flex-row justify-evenly">
                <td className="text-center w-60 px-6">รหัส</td>
                <td className="text-center w-60 px-6">เวลาทำงาน</td>
                <td className="text-center w-60 ">สถานะ</td>
              </th>
            </tr>
            {comingwork && <EmployeeComingWork handleWorking={handleWorking} />}
            {working && <EmployeeWorking handleSuccess={handleSuccess} />}
            {success && <EmployeeSuccess />}
          </table>
        </div>
      </div>
    </>
  );
}

export default EmployeeDetail;
