import { useState } from "react";
import EmployeeTopbar_search from "@/components/Employee/EmployeeTopbarSearch";
import EmployeeSidebar from "../components/Employee/EmployeeSidebar";

import EmployeeComingWork from "@/components/Employee/EmployeeComingWork";
import EmployeeWorking from "@/components/Employee/EmployeeWorking";
import EmployeeSuccess from "@/components/Employee/EmployeeSuccess";

function EmployeeDetail() {
  // const [data, setData] = useState([]);
  const [comingwork, setComingwork] = useState(true);
  const [working, setWorking] = useState(false);
  const [success, setSuccess] = useState(false);

  // useEffect(() => {
  //   async function fetchData() {
  //     const order = await axios.get("http://localhost:4000/v1/employee/detail");
  //     console.log(order.data.data);
  //     setData(order.data.data);
  //   }
  //   fetchData();
  // }, []);

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
          comingwork={comingwork}
          handleWorking={handleWorking}
          working={working}
          handleSuccess={handleSuccess}
          success={success}
        />
      </div>
      <div className="w-full">
        <EmployeeTopbar_search />
        {/* {loading ? <h1>Loading ...</h1> : null} */}
        <div className="mx-auto w-[90%] max-w-[1440px] mt-10">
          <div className="px-6 py-2.5 rounded-lg flex flex-row justify-evenly text-left text-gray-700 p1 h-18 bg-gray-200">
            <p className="text-center w-60 px-6">รหัส</p>
            <p className="text-center w-60 px-6">เวลาทำงาน</p>
            <p className="text-center w-60 ">สถานะ</p>
          </div>
          {comingwork && <EmployeeComingWork handleWorking={handleWorking} />}
          {working && <EmployeeWorking handleSuccess={handleSuccess} />}
          {success && <EmployeeSuccess />}
        </div>
      </div>
    </>
  );
}

export default EmployeeDetail;
