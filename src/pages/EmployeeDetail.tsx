import axios from "axios";
import { useEffect, useState } from "react";
import EmployeeTopbar_search from "@/components/Employee/EmployeeTopbarSearch";
import { Button } from "@/components/ui/button";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

function EmployeeDetail() {
  const [data, setData] = useState([]);
  // const [isStatus, setIsStatus] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const order = await axios.get("http://localhost:4000/v1/employee");
      console.log(order.data.data);
      setData(order.data.data);
    }
    fetchData();
  }, []);

  // const handleIncrement = (index: number) => {
  //   const updatedCounts = [...counts];
  //   updatedCounts[index].count += 1;
  //   setCounts(updatedCounts);
  // };

  // const handleIncrement = (index: number) => {
  //   (isStatus[index].status > 0) {
  //     const updatedStatus = [...isStatus];
  //     updatedStatus[index].status += 1;
  //     setIsStatus(updatedStatus);
  //   }
  // };

  async function clickToWork(orderId) {
    try {
      await axios.put(
        `http://localhost:4000/v1/employee/status/towork?orderId=${orderId}`
      );
      console.log("Working status updated successfully");
    } catch (error) {
      console.log("Update Error:", error.message);
    }
  }

  async function clickToFinish(orderId) {
    try {
      await axios.put(
        `http://localhost:4000/v1/employee/status/tofinish?orderId=${orderId}`
      );
      console.log("Finishing status updated successfully");
    } catch (error) {
      console.log("Update Error:", error.message);
    }
  }

  return (
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

          <tbody className="bg-white">
            {data.map((item, index) => {
              return (
                <Accordion type="single" collapsible key={index}>
                  <AccordionItem value="item-1">
                    <AccordionTrigger className="flex justify-evenly text-sm">
                      <td className="px-6 w-60 text-center">{item.order_id}</td>
                      <td className="px-6 w-60 text-center">
                        {item.order_detail.working_time}
                      </td>
                      <td className="px-6 w-60 text-center ">
                        {item.status.status}
                      </td>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div
                        id="Container-1 "
                        className=" h-fit bg-white flex flex-col items-start px-[145px]"
                      >
                        {/* <div id="UpdateStatusBtn">
                          <Button onClick={() => handleIncrement(index)}>
                            กำลัง
                          </Button>
                        </div> */}

                        <div className=" bg-white flex flex-row justify-start gap-[180px]">
                          <div id="name" className="p-4">
                            <p className="p3 text-gray-500">ชื่อ - นามสกุล</p>
                            <p className="p2">{item.user.name}</p>
                          </div>
                          <div id="Tel" className="p-4">
                            <p className="p3 text-gray-500">เบอร์โทร</p>
                            <p className="p2">{item.user.phone}</p>
                          </div>
                          <div id="Email" className="p-4">
                            <p className="p3 text-gray-500">อีเมล</p>
                            <p className="p2">{item.user.email}</p>
                          </div>
                        </div>

                        <div id="Detail" className="p-4">
                          <div className="p3 text-gray-500">รายการ</div>

                          {item.service_order.map((service, index) => {
                            return (
                              <p className="p2" key={index}>
                                {service.sub_service.sub_service_name}{" "}
                                {service.amount} {service.sub_service.unit}
                              </p>
                            );
                          })}
                        </div>
                        <div
                          id="Container-2"
                          className="flex flex-row justify-start gap-4 w-full"
                        >
                          {" "}
                          <div id="Place" className="p-4 flex-1">
                            <p className="p3 text-gray-500">สถานที่</p>
                            <p className="p2">
                              {item.order_detail.address}{" "}
                              {item.order_detail.subdistrict}{" "}
                              {item.order_detail.district}{" "}
                              {item.order_detail.province}
                            </p>
                          </div>
                          <div id="Etc" className="p-4 flex-1">
                            <p className="p3 text-gray-500">ข้อมูลเพิ่มเติม</p>
                            <p className="p2">{item.order_detail.details}</p>
                          </div>
                          <div
                            id="btn-flex"
                            className="flex justify-end items-end flex-1"
                          >
                            {item.status.status === "รอดำเนินการ" ? (
                              <Button
                                variant={"secondary"}
                                onClick={() => clickToWork(item.order_id)}
                              >
                                เริ่มทำงาน
                              </Button>
                            ) : item.status.status === "กำลังดำเนินการ" ? (
                              <Button
                                variant={"secondary"}
                                onClick={() => clickToFinish(item.order_id)}
                              >
                                ทำงานเสร็จสิ้น
                              </Button>
                            ) : item.status.status ===
                              "ดำเนินการสำเร็จ" ? null : null}
                          </div>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default EmployeeDetail;
