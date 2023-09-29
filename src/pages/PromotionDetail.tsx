import Topbar_detail from "@/components/Topbar/TopbarDetail";
import { useProduct } from "@/contexts/productsContext";
import useDateVal from "@/hooks/useDateVal";
import usePromotion from "@/hooks/usePromotion";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


function PromotionDetail() {
  const params: any = useParams();
  const [trigger, setTrigger] = useState<boolean | null>(null)

  const {
    currentPromotion
  }: any = useProduct();

  const { getPromotionById } = usePromotion();
  const { formatDateTime } = useDateVal();

  useEffect(() => {
    async function fectData() {
      await getPromotionById(params.id)
    }
    fectData()
  }, [params.id])

	return (
    <div className="w-full">
      <Topbar_detail title='Promotion Code' path="" trigger={trigger} setTrigger={setTrigger} />
      <div className="mx-auto w-[90%] max-w-[1440px] mt-14 border rounded-lg bg-white">
        <div className="py-10 px-6 text-base text-gray-700 font-medium leading-normal flex">
          <div className="w-52 inline-block mr-6">
            Promotion Code
          </div>
          <p className="text-gray-900">{currentPromotion?.promotion_code}</p>
        </div>

        <div className="py-10 px-6 text-base text-gray-700 font-medium leading-normal flex">
          <div className="w-52 inline-block mr-6">
            ประเภท
          </div>
          <p className="text-gray-900">{currentPromotion?.type}</p>
        </div>

        <div className="py-10 px-6 text-base text-gray-700 font-medium leading-normal flex">
          <div className="w-52 inline-block mr-6">
            ราคาที่ลด
          </div>
          {
            currentPromotion?.type === "Fixed" ?
              <p className="text-rose-700">{`-${currentPromotion?.discount_amount}.00฿`}</p> :
              <p className="text-rose-700">{`-${currentPromotion?.discount_amount}.00%`}</p>
          }
        </div>

        <div className="py-10 px-6 text-base text-gray-700 font-medium leading-normal flex">
          <div className="w-52 inline-block mr-6">
            โควต้าการใช้
          </div>
          <p className="text-gray-900">{`${currentPromotion?.quota - currentPromotion?.use_count}/${currentPromotion?.quota}`}</p>
        </div>

        <div className="py-10 px-6 text-base text-gray-700 font-medium leading-normal flex">
          <div className="w-52 inline-block mr-6">
            วันหมดอายุ
          </div>
          <p className="text-gray-900">{formatDateTime(String(currentPromotion?.expired_time))}</p>
        </div>

        <div className="w-[96%] mx-auto border border-gray-300"></div>
        <div className="py-10 px-6 text-gray-700 text-base font-medium leading-normal">
          <div>
            <span className="w-52 mr-6 py-6 inline-block">สร้างเมื่อ</span><span>{formatDateTime(String(currentPromotion?.created_at))}</span>
          </div>
          <div>
            <span className="w-52 mr-6 py-6 inline-block">แก้ไขล่าสุด</span><span>{formatDateTime(String(currentPromotion?.updated_at))}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PromotionDetail