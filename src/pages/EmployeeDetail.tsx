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
                        {/* {item.status.status} */}
                        {/* {status} */}
                      </td>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div
                        id="Container-1 "
                        className=" h-fit bg-white flex flex-col items-start px-[145px]"
                      >
                        {/* <div id="UpdateStatusBtn">
                          <Button onClick={() => handleIncrement(index)}>กำลัง</Button>
                        </div> */}

                        <div className=" bg-white flex flex-row justify-start gap-[180px]">
                          <div id="name" className="p-4">
                            <div className="p3 text-gray-500">
                              ชื่อ - นามสกุล
                            </div>
                            <div className="p2">{item.user.name}</div>
                          </div>
                          <div id="Tel" className="p-4">
                            <div className="p3 text-gray-500">เบอร์โทร</div>
                            <div className="p2">{item.user.phone}</div>
                          </div>
                          <div id="Email" className="p-4">
                            <div className="p3 text-gray-500">อีเมล</div>
                            <div className="p2">{item.user.email}</div>
                          </div>
                        </div>

                        <div id="Detail" className="p-4">
                          <div className="p3 text-gray-500">รายการ</div>

                          {item.service_order.map((service, index) => {
                            return (
                              <div className="p2" key={index}>
                                <p>
                                  {service.sub_service.sub_service_name}{" "}
                                  {service.amount} {service.sub_service.unit}
                                </p>
                              </div>
                            );
                          })}
                        </div>
                        <div
                          id="Container-2"
                          className="flex flex-row justify-start gap-4"
                        >
                          {" "}
                          <div id="Place" className="p-4">
                            <div className="p3 text-gray-500">สถานที่</div>
                            <div className="p2">
                              {item.order_detail.address}{" "}
                              {item.order_detail.subdistrict}{" "}
                              {item.order_detail.district}{" "}
                              {item.order_detail.province}
                            </div>
                          </div>
                          <div id="Etc" className="p-4">
                            <div className="p3 text-gray-500">
                              ข้อมูลเพิ่มเติม
                            </div>
                            <div className="p2">
                              {item.order_detail.details}
                            </div>
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
