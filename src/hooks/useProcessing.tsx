import { useProduct } from "@/contexts/productsContext"
import useCategory from "@/hooks/useCategory"
import useService from "@/hooks/useService" 

function useProcessing() {

	const {
		searchCategory, setSearchCategory,
		searchService, setSearchService,
	} = useProduct();
	
	const { deleteCategory } = useCategory();
	const { deleteService } = useService();

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
		]

		const processObj = processingCate.find((item) => {
			return title === item.title
		})
		return processObj

	}

	return { processing }

}

export default useProcessing;