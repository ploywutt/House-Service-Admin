
import Topbar_add from "@/components/Topbar/TopbarAdd"
import { Input } from "@/components/ui/input"

import { useProduct } from "@/contexts/productsContext"

function CategoryAdd() {

	const {
		currentCategory, setCurrentCategory
	}: any = useProduct()


	function handleAddCategory(event: any) {
		event.preventDefault();
		setCurrentCategory(event.target.value)
	}

	return (
		<div className="w-full">
			<Topbar_add title='หมวดหมู่' path="/categories/edit" />
			<div className="mx-auto w-[90%] max-w-[1440px] mt-14 border rounded-lg bg-white">
				<form onSubmit={handleAddCategory} className="py-10 px-6 text-base font-medium leading-normal">
					<label htmlFor="" className="text-gray-700 w-52 inline-block mr-6">
						ชื่อหมวดหมู่<span className="text-rose-700">*</span>
					</label>
					<Input
						required
						type="text"
						value={currentCategory}
						onChange={(e) => { setCurrentCategory(e.target.value) }}
					/>
				</form>
			</div>
		</div>
	)
}

export default CategoryAdd