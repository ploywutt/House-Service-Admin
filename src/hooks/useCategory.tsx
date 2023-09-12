import axios from "axios";
import { useState } from "react";
// import { useNavigate } from "react-router-dom";

function useCategory() {
	// const navigate = useNavigate()

	const [categories, setCategories] = useState<[]>([])
	const [loading, setLoading] = useState<boolean>(false);


	async function getCategory() {
		setLoading(true)
		try {
			const result = await axios.get("http://localhost:4000/v1/admin/categories/")
			console.log(result.data.data)
			setCategories(result.data.data)
		} catch (error) {
			setCategories([])
			console.log(categories)
			console.error(error)
		}
		setLoading(false)
	}

	return {
		getCategory,
		categories,
		setCategories,
		loading,
	}
}

export default useCategory