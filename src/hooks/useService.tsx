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
		formData, setFormData,
		fileList, setFileList,
		submitServiceInput, setSubmitServiceInput
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
			navigate("/services")
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

	async function createService(serviceData: any) {
		try {
			const requestData = {
				service_name: serviceData.serviceName,
				category_name: serviceData.category,
				pic_service: serviceData.imagePath,
			}
			setLoading(true)
			console.log("กำลังอัพโหลดข้อมูล", requestData)
			await axios.post("http://localhost:4000/v1/admin/services/", requestData)
			setLoading(false)
		} catch (error: any) {
			console.error(error)
			setErrorMessage(error.response.data.message)
			setFormData(null)
			setFileList(null)
			setSubmitServiceInput(false)
		}
		setLoading(false)
		
	}

	async function createSubService(subserviceData: any) {
		try {
			const requestData = {
				service_name: subserviceData.serviceName,
				items: subserviceData.items
			}
			console.log("ข้อมูลย่อยก่อนส่ง .......", requestData)
			setLoading(true)
			await axios.post("http://localhost:4000/v1/admin/services/subservices/", requestData)
			setLoading(false)
			navigate("/services")
		} catch (error: any) {
			setFormData(null)
			setFileList(null)
			setSubmitServiceInput(false)
			console.error(error)
		}
	}

	return {
		getServices,
		getServiceById,
		deleteService,
		createService,
		createSubService,
	}

}

export default useService;