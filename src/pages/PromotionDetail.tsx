import Topbar_detail from "@/components/Topbar/TopbarDetail";
import usePromotion from "@/hooks/usePromotion";
import { useEffect } from "react";
import { useParams } from "react-router-dom";


function PromotionDetail() {
  const params: any = useParams();
  const { getPromotionById } = usePromotion();

  useEffect(() => {
    async function fectData() {
      await getPromotionById(params.id)
    }
    fectData()
  }, [])

	return (
    <div className="w-full">
      <Topbar_detail title='Promotion Code' path="" />

    </div>
  );
}

export default PromotionDetail