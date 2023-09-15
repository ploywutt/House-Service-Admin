import { useProduct } from "@/contexts/productsContext"
import { useNavigate } from "react-router-dom"

import { Button } from "../ui/button"

import { TopbarType } from "./TopbarType"

import back from '../../assets/icon/back_arrow.png'

function Topbar_detail(prop: TopbarType) {
	const navigate = useNavigate()

	const { newCategory }: any = useProduct()

	return (
		<nav className="flex items-center justify-between h-20 bg-white px-10 sticky top-0">
			<div className="flex gap-3.5">
				<img src={back} alt="arrow" onClick={() => navigate("/categories")} className='hover:cursor-pointer hover:scale-110' />
				<div>
					<p className=".p4 text-gray-500">{prop.title}</p>
					<h3 className="text-zinc-800 text-xl font-medium">
						{newCategory.category_name}
					</h3>
				</div>
			</div>
			<div className='flex items-center gap-6'>
				<Button className='h-11 py-2.5 px-6 gap-2' type='submit' onClick={() => navigate(`/categories/edit/${newCategory.id}`)}>แก้ไข</Button>
			</div>
		</nav>
	)
}

export default Topbar_detail