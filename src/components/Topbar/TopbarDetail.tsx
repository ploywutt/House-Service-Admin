import { useProduct } from "@/contexts/productsContext"
import { useNavigate } from "react-router-dom"
import { Button } from "../ui/button"
import { TopbarType } from "./TopbarType"
import back from '../../assets/icon/back_arrow.png'

function Topbar_detail(prop: TopbarType) {
	const navigate = useNavigate()

	const { newCategory, newService, currentPromotion }: any = useProduct()

	return (
		<nav className="flex items-center justify-between h-20 bg-white px-10 sticky top-0">
			<div className="flex gap-3.5">
				<img src={back} alt="arrow" onClick={() => navigate(-1)} className='hover:cursor-pointer hover:scale-110' />
				<div>
					<p className=".p4 text-gray-500">{prop.title}</p>
					<h3 className="text-zinc-800 text-xl font-medium">
						{prop.title ==="หมวดหมู่" && newCategory.category_name}
						{prop.title ==="บริการ" && newService?.service_name}
						{prop.title ==="Promotion Code" && currentPromotion?.promotion_code}
					</h3>
				</div>
			</div>
			<div className='flex items-center gap-6'>
				{prop.title === "หมวดหมู่" && 
					<Button className='h-11 py-2.5 px-6 gap-2' type='submit' onClick={() => navigate(`/categories/edit/${newCategory.id}`)}>แก้ไข</Button>
				}
				{prop.title === "บริการ" && 
					<Button className='h-11 py-2.5 px-6 gap-2' type='submit' onClick={() => navigate(`/services/edit/${newService?.id}`)}>แก้ไข</Button>
				}
				{prop.title === "Promotion Code" && 
					<Button className='h-11 py-2.5 px-6 gap-2' type='submit' onClick={() => navigate(`/promotions/edit/${currentPromotion?.promotion_id}`)}>แก้ไข</Button>
				}
			</div>
		</nav>
	)
}

export default Topbar_detail