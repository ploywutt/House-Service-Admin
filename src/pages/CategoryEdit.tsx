import { useEffect } from "react"
import { useParams } from "react-router-dom"
import Topbar_edit from "@/components/Topbar/TopbarEdit"
import { Input } from "@/components/ui/input"
import {
	AlertDialog,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog"


import { useProduct } from "@/contexts/productsContext"

import garbage from '../assets/icon/garbage.svg'
import Alert from "@/components/Alert/Alert"
import useDateVal from "@/hooks/useDateVal"
import useCategory from "@/hooks/useCategory"

function CategoryEdit() {
	const params:any = useParams()

	const {
		newCategory,
		currentCategory, setCurrentCategory,

	}: any = useProduct()

	const {
		getCategoryById
	} = useCategory()

	const { formatDateTime } = useDateVal()

	useEffect(() => {
		getCategoryById(params.id)
		setCurrentCategory(newCategory.category_name)
	}, [])

	return (
		<div className="w-full">
			<Topbar_edit title='หมวดหมู่' path="/categories" />
			<div className="mx-auto w-[90%] max-w-[1440px] mt-14 border rounded-lg bg-white">
				<form action="" className="py-10 px-6 text-base font-medium leading-normal">
					<label htmlFor="" className="text-gray-700 w-52 inline-block mr-6">
						ชื่อหมวดหมู่<span className="text-rose-700">*</span>
					</label>
					<Input
						required
						value={currentCategory}
						onChange={(e) => { setCurrentCategory(e.target.value) }}
					/>
				</form>
				<div className="w-[96%] mx-auto border border-gray-300"></div>
				<div className="py-10 px-6 text-gray-700 text-base font-medium leading-normal">
					<div>
						<span className="w-52 mr-6 py-6 inline-block">สร้างเมื่อ</span><span>{formatDateTime(String(newCategory.createAt))}</span>
					</div>
					<div>
						<span className="w-52 mr-6 py-6 inline-block">แก้ไขล่าสุด</span><span>{formatDateTime(Date())}</span>
					</div>
				</div>
			</div>
			<div className="w-[90%] max-w-[1440px] mx-auto flex gap-2 justify-end my-6">
				<img src={garbage} alt="garbage" className="" />
				<AlertDialog>
					<AlertDialogTrigger>
						<p className="text-gray-700 font-semibold underline hover:cursor-pointer hover:scale-110">ลบหมวดหมู่</p>
					</AlertDialogTrigger>
					<Alert name={currentCategory} id={newCategory ? newCategory.id : 0} title='หมวดหมู่' />
				</AlertDialog>
			</div>
		</div>
	)
}

export default CategoryEdit