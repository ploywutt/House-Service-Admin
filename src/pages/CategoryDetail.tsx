import { Topbar_detail } from "@/components/Topbar/Topbar"

function CategoryDetail() {
	
	return (
		<div className="w-full">
      <Topbar_detail title='หมวดหมู่' />
			<div className="mx-auto w-[90%] max-w-[1440px] mt-14 border rounded-lg bg-white">
				<div className="py-10 px-6 text-base text-gray-700 font-medium leading-normal flex">
					<div className="w-52 inline-block mr-6">
						ชื่อหมวดหมู่<span className="text-rose-700">*</span>
					</div>
					<p>บริการห้องครัว</p>
				</div>
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
    </div>
	)
}

export default CategoryDetail