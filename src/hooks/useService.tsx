import { useProduct } from "@/contexts/productsContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { secretKey } from "../lib/supabase.ts";

function useService() {
	const navigate = useNavigate()
	const {
		setLoading,
		services, setServices,
		newService, setNewService,
		setErrorMessage,
		setFormData,
		setFileList,
		setSubmitServiceInput,
		imagePath, setImagePath,
		setBlobImage,
	}: any = useProduct();

	async function getServices(search: string) {
		try {
			setLoading(true)
			const result = await axios.get(`http://localhost:4000/v1/admin/services/?search=${search}`)
			console.log(result.data.data)
			setServices(result.data.data)

			setNewService(null)
			setFormData(null)
			setSubmitServiceInput(false)
			setImagePath(null)
			setBlobImage(null)

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
		} catch (error) {
			console.error(error)
		}
		console.log("หลังจากดึงข้อมูลมา------", newService)

	}

	async function deleteService(serviceId: number) {
		try {
			setLoading(true)
			const deleteImage = services.find((service: { id: number }) => service.id === serviceId)
			// console.log("deleteImage --->", deleteImage)
			await secretKey
				.storage
				.from('testing')
				.remove([deleteImage.pic_service])

			await axios.delete(`http://localhost:4000/v1/admin/services/${serviceId}`)
			const newServices: any[] = services.filter((service: { id: number; }) => {
				return service.id != serviceId
			})
			setServices(newServices)

			setLoading(false)
			setFormData(null)
			setFileList(null)
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
				items: serviceData.items
			}
			setLoading(true)
			console.log("กำลังอัพโหลดข้อมูล", requestData)
			await axios.post("http://localhost:4000/v1/admin/services/", requestData)
			setLoading(false)
			setFormData(null)
			setFileList(null)
		} catch (error: any) {
			console.error(error)
			setErrorMessage(error.response.data.message)
			setFormData(null)
			setFileList(null)
			setSubmitServiceInput(false)
			navigate("/services")
		}
		setLoading(false)

	}

	async function createSubService(subserviceData: any) {
		try {
			const requestData = {
				service_name: subserviceData.serviceName,
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

	async function updateService(serviceData: any) {
		try {
			const requestData = {
				id: serviceData.serviceId,
				service_name: serviceData.serviceName,
				category_name: serviceData.category,
				pic_service: serviceData.imagePath,
				items: serviceData.items,
				createAt: serviceData.createAt,
			}
			setLoading(true)
			console.log("Uploading PUT method...", requestData)
			await axios.put("http://localhost:4000/v1/admin/services/", requestData)
			setLoading(false)
		} catch (error: any) {
			console.error(error)
			setErrorMessage(error.response.data.message)
			setFormData(null)
			setFileList(null)
			setSubmitServiceInput(false)
			navigate("/services")
		}
	}

	async function downloadFile() {
		console.log("เส้นทาง.....", newService.pic_service)
		try {
			setLoading(true)
			const { data, error } = await secretKey.storage.from('testing').download(newService.pic_service)
			// const urlSupabase = secretKey.storage.from('testing').getPublicUrl(newService.pic_service)
			if (error) {
				setLoading(false)
				console.error("ขณะโหลด......", error)
			} else {
				console.log("สิ่งที่โฟลดมา...", data)
				const blob = new Blob([data]);
				setBlobImage(data)
				const imageUrl = URL.createObjectURL(blob);
				setImagePath(imageUrl);
				setLoading(false)
			}
			// console.log(`urlSupabase: ${urlSupabase.data.publicUrl}`)
			// setImagePath(urlSupabase.data.publicUrl)
			// setLoading(false)
		} catch (error) {
			setLoading(false)
			console.log(error)
		}
		console.log("แสดงเส้นทางภาพ -----", imagePath)
	}

	return {
		getServices,
		getServiceById,
		deleteService,
		createService,
		createSubService,
		downloadFile,
		updateService,
	}

}

export default useService;