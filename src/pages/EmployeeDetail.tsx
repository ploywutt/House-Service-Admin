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
          <thead className="h-10 bg-gray-200 border-b">
            <tr className="text-left text-gray-700 .p1">
              <th className="w-full px-6 py-2.5 rounded-tl-lg flex justify-evenly">
                <th className="text-center w-60 px-6">รหัส</th>
                <th className="text-center w-60 px-6">เวลาทำงาน</th>
                <th className="text-center w-60 rounded-tr-lg">สถานะ</th>
              </th>
            </tr>
          </thead>

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
                    <AccordionTrigger className=" flex justify-evenly">
                      <td className="px-6 w-60 text-center">{item.order_id}</td>
                      <td className="px-6 w-60 text-center">
                        {item.order_detail.working_time}
                      </td>
                      <td className="px-6 w-60 text-center">
                        {item.status.status}
                      </td>
                    </AccordionTrigger>
                    <AccordionContent className="w-full h-fit bg-slate-600"></AccordionContent>
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
