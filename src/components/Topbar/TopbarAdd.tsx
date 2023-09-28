import { useNavigate } from "react-router-dom"
import { useEffect } from "react"

import { TopbarType } from "./TopbarType"
import { useProduct } from "@/contexts/productsContext"
import { useToast } from "../ui/use-toast"
import { ToastAction } from "@/components/ui/toast"
import { Button } from "../ui/button"
import useCategory from "@/hooks/useCategory"


function Topbar_add(prop: TopbarType) {
	const navigate = useNavigate()
	const { toast } = useToast()
	const {
		currentCategory,
		errorMessage, setErrorMessage,
		submitServiceInput, setSubmitServiceInput,
	}: any = useProduct()

	const { createCategory } = useCategory()

	function handleAccept(categoryName: string) {
			createCategory(categoryName)	
		}

	function handleCreate(){
		setSubmitServiceInput(true)
		console.log("Trigger create...", submitServiceInput)
	}

	useEffect(() => {
		if (errorMessage) {
			toast({
				variant: "destructive",
				title: "Uh oh! Something went wrong.",
				description: errorMessage,
				action: <ToastAction altText="Try again">Try again</ToastAction>,
			})
		}
		setErrorMessage("");
    // console.log('Data from ..... in Service :', formData);
	}, [currentCategory, errorMessage])



	return (
		<nav className="flex items-center justify-between h-20 bg-white px-10 sticky top-0">
			<h3 className="text-black text-xl font-medium">
				{
					prop.title === "Promotion Code" ?
					`เพิ่ม ${prop.title}` :
					`เพิ่ม${prop.title}`
				}
			</h3>
			<div className='flex items-center gap-6'>
				<Button className='h-11 py-2.5 px-6 gap-2' type="button" variant="secondary" onClick={() => navigate(-1)}>ยกเลิก</Button>
				{
					prop.title === "หมวดหมู่" && (
						<Button className='h-11 py-2.5 px-6 gap-2' type="submit" onClick={() => handleAccept(currentCategory)} >สร้าง</Button>
					)
				}
				{
					prop.title === "บริการ" && (
						<Button className='h-11 py-2.5 px-6 gap-2' type="submit" onClick={() => handleCreate()} >สร้าง</Button>
					)
				}
				{
					prop.title === "Promotion Code" && (
						<Button className='h-11 py-2.5 px-6 gap-2' type="submit" onClick={() => prop.setTrigger(true)} >สร้าง</Button>
					)
				}
			</div>
		</nav>
	)
}

export default Topbar_add;