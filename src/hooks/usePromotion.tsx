import { useNavigate } from "react-router-dom";
import { useProduct } from "@/contexts/productsContext";
import axios from "axios";

function usePromotion() {
	const navigate = useNavigate()
	const {
		setLoading,
		setErrorMessage,
		promotions, setPromotions,
		currentPromotion, setCurrentPromotion,

	}: any = useProduct();

	async function getPromotions(search: string) {
		try {
			setLoading(true)
			const result = await axios.get(`http://localhost:4000/v1/admin/promotions/?search=${search}`)
			console.log(result)
			setPromotions(result.data.data)
			setLoading(false)

		} catch (error) {

			setPromotions([])
			console.error(error)
			navigate("/promotions")

		}
		console.log("All promotions : --->", promotions)
		setLoading(false)
	}

	async function getPromotionById(promotionId: number) {
		try {
			setLoading(true)
			const result = await axios.get(`http://localhost:4000/v1/admin/promotions/${promotionId}`)
			console.log(result.data.data)
			setCurrentPromotion(result.data.data)
			setLoading(false)
		} catch (error) {
			setCurrentPromotion([])
			console.error(error)
		}
		setLoading(false)
		console.log("Promotion from ID : --->", currentPromotion)
	}

	async function deletePromotion(promotionId: number) {
		try {
			setLoading(true)
			await axios.delete(`http://localhost:4000/v1/admin/promotions/${promotionId}`)
			setCurrentPromotion([])
			navigate("/promotions")

		} catch (error) {
			navigate("/promotions")
			setCurrentPromotion([])
			console.error(error)
		}
		setLoading(false)

	}

	return {
		getPromotions,
		getPromotionById,
		deletePromotion,
	}

}

export default usePromotion;