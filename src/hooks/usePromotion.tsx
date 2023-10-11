import { useNavigate } from "react-router-dom";
import { useProduct } from "@/contexts/productsContext";
import axios from "axios";

function usePromotion() {
  const navigate = useNavigate();
  const {
    setLoading,
    setErrorMessage,
    promotions,
    setPromotions,
    currentPromotion,
    setCurrentPromotion,
  }: any = useProduct();

  async function getPromotions(search: string) {
    try {
      setLoading(true);
      const result = await axios.get(
        `https://home-service-server.onrender.com/v1/admin/promotions/?search=${search}`
      );
      console.log(result);
      setPromotions(result.data.data);
      setLoading(false);
    } catch (error) {
      setPromotions([]);
      console.error(error);
      navigate("/promotions");
    }
    console.log("All promotions : --->", promotions);
    setLoading(false);
  }

  async function getPromotionById(promotionId: number) {
    try {
      setLoading(true);
      const result = await axios.get(
        `https://home-service-server.onrender.com/v1/admin/promotions/${promotionId}`
      );
      console.log(result.data.data);
      setCurrentPromotion(result.data.data);
      setLoading(false);
    } catch (error) {
      setCurrentPromotion([]);
      console.error(error);
    }
    setLoading(false);
    console.log("Promotion from ID : --->", currentPromotion);
  }

  async function deletePromotion(promotionId: number) {
    try {
      setLoading(true);
      await axios.delete(
        `https://home-service-server.onrender.com/v1/admin/promotions/${promotionId}`
      );
      setCurrentPromotion([]);
      const newPromotion = promotions.filter(
        (promotion: { promotion_id: number }) => {
          return promotion.promotion_id !== promotionId;
        }
      );
      setPromotions(newPromotion);
      navigate("/promotions");
    } catch (error: any) {
      navigate("/promotions");
      setCurrentPromotion([]);
      console.error(error);
      setErrorMessage(error.error.message);
    }
    setLoading(false);
  }

  async function createPromotion(promotionCode: any) {
    if (promotionCode.newFixed !== 0) {
      promotionCode.discount_amount = promotionCode.newFixed;
    } else {
      promotionCode.discount_amount = promotionCode.newPercent;
    }
    const requestData = {
      ...promotionCode,
      discount_amount: promotionCode.discount_amount,
      expired_time: promotionCode.expired_time.toLocaleString(),
    };
    console.log("Data prepare ----->", requestData);
    try {
      setLoading(true);
      await axios.post(
        `https://home-service-server.onrender.com/v1/admin/promotions/`,
        requestData
      );
      setLoading(false);
      getPromotions("");
      navigate("/promotions");
    } catch (error: any) {
      console.error(error);
      setErrorMessage(error.error.message);
      navigate("/promotions/");
    }
    setLoading(false);
  }

  async function updatePromotion(promotionId: number, promotionCode: any) {
    if (promotionCode.fixedEdit) {
      promotionCode.discount_amount = promotionCode.fixedEdit;
    } else {
      promotionCode.discount_amount = promotionCode.percentEdit;
    }
    const requestData = {
      ...promotionCode,
      discount_amount: promotionCode.discount_amount,
      expired_time: promotionCode.expired_time.toLocaleString(),
    };
    console.log("Data prepare ----->", requestData);
    try {
      setLoading(true);
      await axios.put(
        `https://home-service-server.onrender.com/v1/admin/promotions/${promotionId}`,
        requestData
      );
      setLoading(false);
      getPromotions("");
    } catch (error: any) {
      console.error(error);
      setErrorMessage(error.error.message);
      navigate("/promotions/");
    }
    setLoading(false);
  }

  return {
    getPromotions,
    getPromotionById,
    deletePromotion,
    createPromotion,
    updatePromotion,
  };
}

export default usePromotion;
