import { useNavigate } from "react-router-dom";
import { useEffect } from "react"
import { TopbarType } from "./TopbarType";

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useProduct } from "@/contexts/productsContext";
import useCategory from "@/hooks/useCategory";
import useProcessing from "@/hooks/useProcessing";

import search from '../../assets/icon/search.png'
import add from '../../assets/icon/add_symbo.png'
import useService from "@/hooks/useService";


function Topbar_search(prop: TopbarType) {
	const navigate = useNavigate();
	const { getCategory } = useCategory();
	const { getServices } = useService();
	const {
		searchCategory,
		searchService
	}: any = useProduct();

	const { processing }: any = useProcessing();
	const processingObj = processing(prop.title)

	useEffect(() => {
		if (prop.title === "หมวดหมู่"){
			getCategory(searchCategory)
		} else if (prop.title === "บริการ") {
			getServices(searchService)
		} else if (prop.title === " Promotion Code") {
			null
		}
	}, [searchCategory, searchService]);

	return (
		<nav className="flex items-center justify-between h-20 bg-white px-10 sticky top-0">
			<h3 className="text-black text-xl font-medium">
				{prop.title}
			</h3>
			<form className='flex items-center gap-6'>
				<div className="relative text-gray-500 text-base font-light">
					<img src={search} alt="search" className='absolute left-3 top-2.5' />
					<Input
						type='text'
						id='search'
						value={processingObj.search}
						placeholder={`ค้นหา${prop.title}...`}
						maxLength={20}
						className='pl-11'
						onChange={(e) => processingObj.setSearch(e.target.value)}
					/>
				</div>
				<Button className='h-11 py-2.5 px-6 gap-2' onClick={() => { navigate(prop.path) }}>เพิ่ม{`${prop.title}`} <span><img src={add} alt="add" /></span></Button>
			</form>
		</nav>
	)
}

export default Topbar_search