import { useProduct } from "@/contexts/productsContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function useCategory() {
	const navigate = useNavigate()
	const {
		setLoading,
		categories, setCategories,
		newCategory, setNewCategory,
		setErrorMessage,
		setCurrentCategory,

	}: any = useProduct();

	async function getCategory(search: string) {
		try {
			setLoading(true)
			const result = await axios.get(`http://localhost:4000/v1/admin/categories/?search=${search}`)
			console.log(result.data.data)
			setCategories(result.data.data)
		} catch (error) {
			setCategories([])
			console.error(error)
		}
		setLoading(false)
	}

	async function getCategoryById(categoryId: number) {
		try {
			setLoading(true)
			const result = await axios.get(`http://localhost:4000/v1/admin/categories/${categoryId}`)
			setNewCategory(result.data.data)
			console.log(result.data.data)
		} catch (error) {
			console.error(error)
		}
		console.log(newCategory)
	}
	
	async function deleteCategory(categoryId: number) {
		try {
			setLoading(true)
			await axios.delete(`http://localhost:4000/v1/admin/categories/${categoryId}`)
			const newCategories: any[] = categories.filter((category: { id: number; }) => {
				return category.id != categoryId
			})
			setCategories(newCategories)
			setLoading(false)
			navigate("/categories")
		} catch (error: any) {
			console.error(error.response.data.message)
			setErrorMessage(error.response.data.message)
		}
		setLoading(false)
	}
	
	async function createCategory(category_name: string) {
		try {
			const requestData = {
				category_name: category_name,
			};
			setLoading(true)
			await axios.post("http://localhost:4000/v1/admin/categories/", requestData)
			navigate("/categories/")
			setLoading(false)
			setCurrentCategory('')
		} catch (error: any) {
			console.error(error)
			setErrorMessage(error.response.data.message)
		}
		setLoading(false)
		setCurrentCategory('')
	}

	async function updateCategory(id: number, category_name: string, updateAt: string) {
		try {
			const requestData = {
				id: id,
				category_name: category_name,
				updateAt: new Date(updateAt).toLocaleString(),
			}
			console.log(requestData)
			setLoading(true)
			await axios.put(`http://localhost:4000/v1/admin/categories/${id}`, requestData)
			setLoading(false)
			setCurrentCategory('')
			navigate("/categories")
		} catch (error: any) {
			console.error(error)
		}
		setLoading(false)
		setCurrentCategory('')
	}

	async function updateRecommend(dataToUpdateServer: any) {
		try {
			const requestData = {
				newPosition: dataToUpdateServer
			}
			console.log(requestData)
			setLoading(true)
			await axios.put(`http://localhost:4000/v1/admin/categories/`, requestData)
			setLoading(false)
			navigate("/categories")
		} catch (error) {
			console.error(error)
		}
		setLoading(false)
	}

	return {
		getCategory,
		getCategoryById,
		deleteCategory,
		createCategory,
		updateCategory,
		updateRecommend,
	}

}

export default useCategory