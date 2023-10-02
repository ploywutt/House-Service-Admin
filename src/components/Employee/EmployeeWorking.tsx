import axios from "axios";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "../ui/badge";

import useDateVal from "../../hooks/useDateVal";
import useFetchEmail from "../../hooks/useFetchEmail";

function EmployeeWorking(props: { handleSuccess: () => void }) {
  const [data, setData] = useState([]);

  const { formatDateTime } = useDateVal();

  const currentLoginEmail = useFetchEmail();

  async function fetchDataComingWork() {
    try {
      const { data } = await axios.get(
        `http://localhost:4000/v2/employee/working?email=${currentLoginEmail}`
      );
      console.log(data.name[0].order_employee);
      setData(data.name[0].order_employee);
    } catch (error) {
      console.error("Error", error);
    }
  }

  useEffect(() => {
    fetchDataComingWork();
  }, [currentLoginEmail]);

  async function clickToFinish(orderId: number) {
    try {
      const putData = await axios.put(
        `http://localhost:4000/v2/employee/status/tofinish?orderId=${orderId}`
      );
      console.log("Finishing status updated successfully", putData);

      await fetchDataComingWork();
      props.handleSuccess();
    } catch (error) {
      console.log("Update Error:", error);
    }
  }

  return (
    <div className="bg-gray-100">
      {data.map((item, index) => {
        return (
          <div
            id="Accordion-flex"
            className="bg-white rounded-lg drop-shadow-md"
            key={index}
          >
            <Accordion type="single" collapsible className="my-4">
              <AccordionItem value="item-1">
                <AccordionTrigger className="flex justify-evenly p2">
                  <div className="w-[240px] text-start">
                    {item.order_detail.order?.order_id}
                  </div>
                  <div className="w-[240px] text-start">
                    {formatDateTime(String(item.order_detail.working_time))}
                  </div>
                  <div className="w-32 text-center text-yellow-900 bg-yellow-100 rounded-xl">
                    {item.order_detail.order?.status.status}
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div
                    id="Container-1 "
                    className=" bg-white flex flex-col justify-evenly pl-[170px] pr-[200px] gap-6"
                  >
                    <div className=" bg-white flex flex-row justify-between items-center">
                      <div id="name" className="p-4 w-[240px]">
                        <p className="p3 text-gray-500">ชื่อ - นามสกุล</p>
                        <p className="p2">
                          {item.order_detail.order?.user.name}
                        </p>
                      </div>
                      <div id="Tel" className="p-4 w-[240px]">
                        <p className="p3 text-gray-500">เบอร์โทร</p>
                        <p className="p2">
                          {item.order_detail.order?.user.phone}
                        </p>
                      </div>
                      <div id="Email" className="p-4 w-[240px]">
                        <p className="p3 text-gray-500">อีเมล</p>
                        <p className="p2">
                          {item.order_detail.order?.user.email}
                        </p>
                      </div>
                    </div>

                    <div id="Detail" className="p-4 w-fit">
                      <div className="p3 text-gray-500">รายการ</div>

                      {item.order_detail.order?.service_order.map(
                        (service, index) => {
                          return (
                            <p className="p2" key={index}>
                              {service.sub_service.sub_service_name}{" "}
                              {service.amount} {service.sub_service.unit}
                            </p>
                          );
                        }
                      )}
                    </div>
                    <div
                      id="Container-2"
                      className="flex flex-row justify-between items-center"
                    >
                      <div id="Place" className="p-4 w-[240px]">
                        <p className="p3 text-gray-500">สถานที่</p>
                        <p className="p2">
                          {item.order_detail.address}{" "}
                          {item.order_detail.subdistrict}{" "}
                          {item.order_detail.district}{" "}
                          {item.order_detail.province}
                        </p>
                      </div>
                      <div id="Etc" className="p-4 w-[240px]">
                        <p className="p3 text-gray-500">ข้อมูลเพิ่มเติม</p>
                        <p className="p2">{item.order_detail.details}</p>
                      </div>
                      <div id="btn-flex" className="flex justify-end items-end">
                        {item.order_detail.order?.status?.status ===
                        "รอดำเนินการ" ? (
                          <Button
                            variant={"secondary"}
                            className="w-[240px]"
                            onClick={() =>
                              clickToWork(item.order_detail.order.order_id)
                            }
                          >
                            เริ่มทำงาน
                          </Button>
                        ) : item.order_detail.order?.status?.status ===
                          "กำลังดำเนินการ" ? (
                          <Button
                            variant={"secondary"}
                            className="w-[240px]"
                            onClick={() =>
                              clickToFinish(item.order_detail.order.order_id)
                            }
                          >
                            ทำงานเสร็จสิ้น
                          </Button>
                        ) : item.order_detail.order?.status?.status ===
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
    </div>
  );
}

export default EmployeeWorking;
