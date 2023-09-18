import useCategory from "@/hooks/useCategory";

import Topbar_add from '@/components/Topbar/TopbarAdd';
import { useEffect } from "react";
import ServiceInput from "@/components/ServiceInput/ServiceInput";

function ServiceAdd() {
  const { getCategory }:any = useCategory();

  // const handleServiceSubmit = () => {
  //   console.log('Service form submitted testing 5', formData);
  //   // ทำสิ่งที่คุณต้องการเมื่อ form ใน ServiceInput ถูก submit
  // };

  useEffect(() => {
    getCategory('')
  }, [])

  return (
    <div className="w-full">
      <Topbar_add title='บริการ' path="/cservices/edit" />
      <div className="mx-auto w-[90%] max-w-[1440px] mt-14 border rounded-lg bg-white">
        <ServiceInput />
      </div>
    </div>
  );
}

export default ServiceAdd