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
    <div className="bg-gray-100">
      {data.map((item, index) => {
        return (
          <div
            id="Accordion-flex"
            className="bg-white rounded-lg drop-shadow-md"
          >
            <Accordion type="single" collapsible key={index} className="my-4">
              <AccordionItem value="item-1">
                <AccordionTrigger className="flex justify-evenly p2">
                  <div className="w-[240px] text-start">{item.order_id}</div>
                  <div className="w-[240px] text-start">
                    {formatDateTime(String(item?.order_detail.working_time))}
                  </div>
                  <div className="w-32 text-center text-green-900 bg-green-100 rounded-xl">
                    {item.status.status}
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
                        <p className="p2">{item.user.name}</p>
                      </div>
                      <div id="Tel" className="p-4 w-[240px]">
                        <p className="p3 text-gray-500">เบอร์โทร</p>
                        <p className="p2">{item.user.phone}</p>
                      </div>
                      <div id="Email" className="p-4 w-[240px]">
                        <p className="p3 text-gray-500">อีเมล</p>
                        <p className="p2">{item.user.email}</p>
                      </div>
                    </div>

                    <div id="Detail" className="p-4 w-fit">
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
                      className="flex flex-row justify-between items-center"
                    >
                      <div id="Place" className="p-4 w-[240px]">
                        <p className="p3 text-gray-500">สถานที่</p>
                        <p className="p2">
                          {item.order_detail.address}
                          {item.order_detail.subdistrict}
                          {item.order_detail.district}
                          {item.order_detail.province}
                        </p>
                      </div>
                      <div id="Etc" className="p-4 w-[240px]">
                        <p className="p3 text-gray-500">ข้อมูลเพิ่มเติม</p>
                        <p className="p2">{item.order_detail.details}</p>
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

export default EmployeeSuccess;
