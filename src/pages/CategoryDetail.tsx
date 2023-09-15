import { useProduct } from "@/contexts/productsContext"
import { useEffect } from "react"
import { useParams } from "react-router-dom";
import useDateVal from "@/hooks/useDateVal";

import Topbar_detail from "@/components/Topbar/TopbarDetail"

function CategoryDetail() {
	const params = useParams()

	const {
		getCategoryById,
		newCategory

	}: any = useProduct()

	const { formatDateTime } = useDateVal()

	useEffect(() => {
		getCategoryById(params.id)
		console.log(newCategory.createAt)
	}, [])


	return (
		<div className="w-full">
			<Topbar_detail title='หมวดหมู่' path="" />
			<div className="mx-auto w-[90%] max-w-[1440px] mt-14 border rounded-lg bg-white">
				<div className="py-10 px-6 text-base text-gray-700 font-medium leading-normal flex">
					<div className="w-52 inline-block mr-6">
						ชื่อหมวดหมู่<span className="text-rose-700">*</span>
					</div>
					<p>{newCategory.category_name}</p>
				</div>
				<div className="w-[96%] mx-auto border border-gray-300"></div>
				<div className="py-10 px-6 text-gray-700 text-base font-medium leading-normal">
					<div>
						<span className="w-52 mr-6 py-6 inline-block">สร้างเมื่อ</span><span>{formatDateTime(String(newCategory.createAt))}</span>
					</div>
					<div>
						<span className="w-52 mr-6 py-6 inline-block">แก้ไขล่าสุด</span><span>{formatDateTime(String(newCategory.updateAt))}</span>
					</div>
				</div>
			</div>
    </div>
	)
}

export default CategoryDetail