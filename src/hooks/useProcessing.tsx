import { useProduct } from "@/contexts/productsContext"
import useCategory from "@/hooks/useCategory"
import useService from "@/hooks/useService" 
import usePromotion from "@/hooks/usePromotion"

function useProcessing() {

	const {
		searchCategory, setSearchCategory,
		searchService, setSearchService,
		searchPromotion, setSearchPromotion,
	}: any = useProduct();
	
	const { deleteCategory } = useCategory();
	const { deleteService } = useService();
	const { deletePromotion } = usePromotion();

	function processing(title: string) {

		const processingCate = [
			{
				title: "หมวดหมู่",
				search: searchCategory,
				setSearch: setSearchCategory,
				delete: deleteCategory,
			},
			{
				title: "บริการ",
				search: searchService,
				setSearch: setSearchService,
				delete: deleteService,
			},
			{
				title: "Promotion Code",
				search: searchPromotion,
				setSearch: setSearchPromotion,
				delete: deletePromotion,
			},
		]

		const processObj = processingCate.find((item) => {
			return title === item.title
		})
		return processObj

	}

	return { processing }

}

export default useProcessing;