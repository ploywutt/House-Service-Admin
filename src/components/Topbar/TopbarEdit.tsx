import { useNavigate } from "react-router-dom"
import { useProduct } from "@/contexts/productsContext"

import { TopbarType } from "./TopbarType"
import { Button } from '@/components/ui/button';

import back from '../../assets/icon/back_arrow.png'
import useCategory from "@/hooks/useCategory";

function Topbar_edit(prop: TopbarType) {
	const navigate = useNavigate()
	const {
		currentCategory, setCurrentCategory,
		newCategory, setNewCategory,
		newService, setNewService,
		submitServiceInput, setSubmitServiceInput,
		currentPromotion, setCurrentPromotion,
		setFileList,
		setBlobImage,
	}: any = useProduct()

	const {
		updateCategory
	} = useCategory()

	function handleAccept(id: number, categoryName: string, update: string) {
		updateCategory(id, categoryName, update)
	}

	function handleUpdate() {
		if (prop.title === "บริการ") {
			setSubmitServiceInput(true)
			console.log("เริ่มอัพโหลด....", submitServiceInput)
		}
 
	}
	function goback(path: string) {
		setCurrentCategory('')
		setNewCategory('')
		setNewService('')
		setCurrentPromotion('')
		setFileList(null)
		setBlobImage(null)
		navigate(path)
	}
	

	return (
		<nav className="flex items-center justify-between h-20 bg-white px-10 sticky top-0">
			<div className="flex gap-3.5">
				<img src={back} alt="arrow" onClick={() => navigate(-1)} className='hover:cursor-pointer hover:scale-110' />
				<div>
					<p className=".p4 text-gray-500">{prop.title}</p>
					<h3 className="text-zinc-800 text-xl font-medium">
						{newCategory && newCategory?.category_name}
						{newService && newService?.service_name}
						{currentPromotion && currentPromotion?.promotion_code}
					</h3>
				</div>
			</div>
			<div className='flex items-center gap-6'>
				<Button className='h-11 py-2.5 px-6 gap-2' variant="secondary" type='submit' onClick={() => { goback(prop.path) }}>ยกเลิก</Button>
				{
					prop.title === "หมวดหมู่" && (
					<Button
						className='h-11 py-2.5 px-6 gap-2' type='submit'
						onClick={() => { handleAccept(newCategory?.id, currentCategory, Date()) }}
					>
						ยืนยัน
					</Button>)
				}
				
				{
					prop.title === "บริการ" && (
						<Button
							className='h-11 py-2.5 px-6 gap-2' type='submit'
							onClick={() => { handleUpdate() }}
						>
							ยืนยัน
						</Button>)
				}

				{
					prop.title === "Promotion Code" && (
						<Button
							className='h-11 py-2.5 px-6 gap-2' type='submit'
							onClick={() => prop.setTrigger(true)}
						>
							ยืนยัน
						</Button>
					)
				}
			</div>
		</nav>
	)
}

export default Topbar_edit