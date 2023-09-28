import axios from "axios";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import useDateVal from "../../hooks/useDateVal";

function EmployeeSuccess() {
  const [data, setData] = useState([]);

  const { formatDateTime } = useDateVal();

  useEffect(() => {
    async function fetchDataSuccess() {
      try {
        const order = await axios.get(
          "http://localhost:4000/v1/employee/success"
        );
        console.log(order.data.data);
        setData(order.data.data);
      } catch (error) {
        console.error("Error", error);
      }
    }
    fetchDataSuccess();
  }, []);

  return (
    <tbody className="bg-gray-300">
      {data.map((item, index) => {
        return (
          <div id="Accordion-flex" className="bg-white">
            <Accordion type="single" collapsible key={index} className="my-4">
              <AccordionItem value="item-1">
                <AccordionTrigger className="flex justify-evenly text-sm">
                  <td className="px-6 w-60 text-center">{item.order_id}</td>
                  <td className="px-6 w-60 text-center">
                    {formatDateTime(String(item?.order_detail.working_time))}
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
          </div>
        );
      })}
    </tbody>
  );
}

export default EmployeeSuccess;
