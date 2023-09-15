import { useProduct } from "@/contexts/productsContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function useService() {
	const navigate = useNavigate()
	const {
		setLoading,
		services, setServices,
		newService, setNewService,
		setErrorMessage,
	}: any = useProduct();

	async function getServices(search: string) {
		try {
			setLoading(true)
			const result = await axios.get(`http://localhost:4000/v1/admin/services/?search=${search}`)
			console.log(result.data.data)
			setServices(result.data.data)
		} catch (error) {
			setServices([])
			console.error(error)
		}
		setLoading(false)
	}

	async function getServiceById(serviceId: number) {
		try {
			setLoading(true)
			const result = await axios.get(`http://localhost:4000/v1/admin/services/${serviceId}`)
			setNewService(result.data.data)
			console.log(result.data.data)
		} catch (error) {
			console.error(error)
		}
		console.log(newService)
	}

	async function deleteService(serviceId: number) {
		try {
			setLoading(true)
			await axios.delete(`http://localhost:4000/v1/admin/services/${serviceId}`)
			const newServices: any[] = services.filter((service: { id: number; }) => {
				return service.id != serviceId
			})
			setServices(newServices)
			setLoading(false)
			navigate("/services")
		} catch (error: any) {
			console.error(error.response.data.message)
			setErrorMessage(error.response.data.message)
		}
		setLoading(false)
	}

	return {
		getServices,
		getServiceById,
		deleteService,
	}

}

export default useService;