// import { useProduct } from "@/contexts/productsContext";
// import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
// import { Badge } from "lucide-react";
import EmployeeTopbar_search from "@/components/Employee/EmployeeTopbarSearch";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// import useDateVal from "@/hooks/useDateVal";
// import useService from "@/hooks/useService";

function EmployeeDetail() {
  // // const navigate = useNavigate();
  // const { getServices } = useService();

  // const {
  //   loading,
  //   setLoading,
  //   services,
  //   setServices,
  //   searchService,
  //   setSearchService,
  // }: any = useProduct();

  // const { formatDateTime } = useDateVal();

  // useEffect(() => {
  //   getServices(searchService);
  // }, [searchService]);

  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const order = await axios.get("http://localhost:4000/v1/employee");
      console.log(order.data.data);
      setData(order.data.data);
    }
    fetchData();
  }, []);

  return (
    <div className="w-full">
      <EmployeeTopbar_search title="บริการ" path="/services/add" />
      {/* {loading ? <h1>Loading ...</h1> : null} */}
      <div className="mx-auto w-[90%] max-w-[1440px] mt-10 border rounded-lg">
        <table className="table-auto w-full">
          {/* <thead className=""> */}
          <tr className="text-left text-gray-700 p1 h-10 bg-gray-200 border-b">
            <th className="w-full px-6 py-2.5 rounded-t-lg">
              <td className="text-center w-60 px-6">รหัส</td>
              <td className="text-center w-60 px-6">เวลาทำงาน</td>
              <td className="text-center w-60 ">สถานะ</td>
            </th>
          </tr>
          {/* </thead> */}

          <tbody className="bg-white">
            {data.map((item, index) => {
              return (
                <Accordion
                  type="single"
                  collapsible
                  className="w-full"
                  key={index}
                >
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
                      <div className="w-full h-fit bg-white flex flex-row justify-evenly">
                        <div id="name" className="p-4">
                          <div className="p3 text-gray-500">ชื่อ - นามสกุล</div>
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
                      <div className="w-full h-fit bg-white flex flex-col items-start px-[125px]">
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
                          <div className="p2">{item.order_detail.details}</div>
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
