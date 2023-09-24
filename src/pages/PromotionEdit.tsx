import Topbar_edit from "@/components/Topbar/TopbarEdit";
import usePromotion from "@/hooks/usePromotion";
import { useEffect } from "react";
import { useParams } from "react-router-dom";


function PromotionEdit() {
  const { getPromotionById } = usePromotion();
  const params: any = useParams();

  useEffect(() => {
    async function fetchData() {
      await getPromotionById(params.id)
    }
    fetchData()
  }, [])

	return (
    <div className="w-full">
      <Topbar_edit title='Promotion Code' path="/promotions" />

    </div>
  );
}

export default PromotionEdit