import { useNavigate } from "react-router-dom"
import { useEffect } from "react"

import { TopbarType } from "./TopbarType"
import { useToast } from "../ui/use-toast"
import { useProduct } from "@/contexts/productsContext"
import { ToastAction } from "@/components/ui/toast"
import { Button } from "../ui/button"


function Topbar_add(prop: TopbarType) {
	const navigate = useNavigate()
	const { toast } = useToast()
	const {
		currentCategory, createCategory,
		errorMessage, setErrorMessage,
	}: any = useProduct()

	function handleAccept(categoryName: string) {
		createCategory(categoryName)
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
	}, [currentCategory, errorMessage])

	return (
		<nav className="flex items-center justify-between h-20 bg-white px-10 sticky top-0">
			<h3 className="text-black text-xl font-medium">
				เพิ่ม{`${prop.title}`}
			</h3>
			<div className='flex items-center gap-6'>
				<Button className='h-11 py-2.5 px-6 gap-2' type="button" variant="secondary" onClick={() => navigate("/categories")}>ยกเลิก</Button>
				<Button className='h-11 py-2.5 px-6 gap-2' type="submit" onClick={() => handleAccept(currentCategory)} >สร้าง</Button>
			</div>
		</nav>
	)
}

export default Topbar_add;