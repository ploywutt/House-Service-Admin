import { Topbar_add } from "@/components/Topbar/Topbar"
import { Input } from "@/components/ui/input"

function CategoryAdd() {
	
	return (
		<div className="w-full">
      <Topbar_add title='หมวดหมู่' />
			<div className="mx-auto w-[90%] max-w-[1440px] mt-14 border rounded-lg bg-white">
				<form action="" className="py-10 px-6 text-base font-medium leading-normal">
					<label htmlFor="" className="text-gray-700 w-52 inline-block mr-6">
						ชื่อหมวดหมู่<span className="text-rose-700">*</span>
					</label>
					<Input 

					/>
				</form>
			</div>
    </div>
	)
}

export default CategoryAdd