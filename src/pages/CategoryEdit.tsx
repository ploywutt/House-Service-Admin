import { Topbar_edit } from "@/components/Topbar/Topbar"
import { Input } from "@/components/ui/input"
import garbage from '../assets/icon/garbage.svg'

function CategoryEdit() {

	return (
		<div className="w-full">
			<Topbar_edit title='หมวดหมู่' />
			<div className="mx-auto w-[90%] max-w-[1440px] mt-14 border rounded-lg bg-white">
				<form action="" className="py-10 px-6 text-base font-medium leading-normal">
					<label htmlFor="" className="text-gray-700 w-52 inline-block mr-6">
						ชื่อหมวดหมู่<span className="text-rose-700">*</span>
					</label>
					<Input

					/>
				</form>
				<div className="w-[96%] mx-auto border border-gray-300"></div>
				<div className="py-10 px-6 text-gray-700 text-base font-medium leading-normal">
					<div>
						<span className="w-52 mr-6 py-6 inline-block">สร้างเมื่อ</span><span>12/02/2022 10:30PM</span>
					</div>
					<div>
						<span className="w-52 mr-6 py-6 inline-block">แก้ไขล่าสุด</span><span>12/02/2022 10:30PM</span>
					</div>
				</div>
			</div>
			<div className="w-[90%] max-w-[1440px] mx-auto flex gap-2 justify-end mt-6">
				<img src={garbage} alt="garbage" className="hover:cursor-pointer scale-110" />
				<p className="text-gray-700 font-semibold underline">ลบหมวดหมู่</p>
			</div>
		</div>
	)
}

export default CategoryEdit