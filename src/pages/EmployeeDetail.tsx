import axios from "axios";
import { useEffect, useState } from "react";
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
          {/* <table className="table-auto w-full"> */}
          {/* <tr className="text-left  "> */}
          <div className="text-gray-700 p1 bg-gray-200 h-14 rounded-lg flex flex-row items-center justify-evenly drop-shadow-md">
            <p className="text-start p-4 w-60 ">รหัส</p>
            <p className="text-start p-4 w-60 ">เวลาทำงาน</p>
            <p className="text-start p-4 w-60 ">สถานะ</p>
          </div>
          {/* </tr> */}
          {comingwork && <EmployeeComingWork handleWorking={handleWorking} />}
          {working && <EmployeeWorking handleSuccess={handleSuccess} />}
          {success && <EmployeeSuccess />}
          {/* </table> */}
        </div>
      </div>
    </>
  );
}

export default EmployeeDetail;
