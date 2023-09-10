import { useNavigate } from "react-router-dom";

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

import search from '../../assets/icon/search.png'
import add from '../../assets/icon/add_symbo.png'
import back from '../../assets/icon/back_arrow.png'

interface TopbarType {
	title: string
}

export function Topbar_search(prop: TopbarType) {
	const navigate = useNavigate()
	return (
		<nav className="flex items-center justify-between h-20 bg-white px-10">
			<h3 className="text-black text-xl font-medium">
				{prop.title}
			</h3>
			<form className='flex items-center gap-6'>
				<div className="relative text-gray-500 text-base font-light">
					<img src={search} alt="search" className='absolute left-3 top-2.5' />
					<Input
						type='text'
						id='search'
						placeholder={`ค้นหา${prop.title}...`}
						maxLength={20}
						className='pl-11'
					/>
				</div>
				<Button className='h-11 py-2.5 px-6 gap-2' onClick={() => { navigate('/categories/add') }}>เพิ่ม{`${prop.title}`} <span><img src={add} alt="add" /></span></Button>
			</form>
		</nav>
	)
}

export function Topbar_add(prop: TopbarType) {
	const navigate = useNavigate()
	return (
		<nav className="flex items-center justify-between h-20 bg-white px-10">
			<h3 className="text-black text-xl font-medium">
				เพิ่ม{`${prop.title}`}
			</h3>
			<div className='flex items-center gap-6'>
				<Button className='h-11 py-2.5 px-6 gap-2' variant="secondary" onClick={() => navigate(-1)}>ยกเลิก</Button>
				<Button className='h-11 py-2.5 px-6 gap-2' type='submit'>สร้าง</Button>
			</div>
		</nav>
	)
}

export function Topbar_edit(prop: TopbarType) {
	const navigate = useNavigate()
	return (
		<nav className="flex items-center justify-between h-20 bg-white px-10">
			<div className="flex gap-3.5">
				<img src={back} alt="arrow" onClick={() => navigate(-1)} className='hover:cursor-pointer hover:scale-110' />
				<div>
					<p className=".p4 text-gray-500">{prop.title}</p>
					<h3 className="text-zinc-800 text-xl font-medium">
						บริการห้องครัว
					</h3>
				</div>
			</div>
			<div className='flex items-center gap-6'>
				<Button className='h-11 py-2.5 px-6 gap-2' variant="secondary" type='submit' onClick={() => { navigate(-1) }}>ยกเลิก</Button>
				<Button className='h-11 py-2.5 px-6 gap-2' type='submit'>ยืนยัน</Button>
			</div>
		</nav>
	)
}

export function Topbar_detail(prop: TopbarType) {
	const navigate = useNavigate()
	return (
		<nav className="flex items-center justify-between h-20 bg-white px-10">
			<div className="flex gap-3.5">
				<img src={back} alt="arrow" onClick={() => navigate(-1)} className='hover:cursor-pointer hover:scale-110' />
				<div>
					<p className=".p4 text-gray-500">{prop.title}</p>
					<h3 className="text-zinc-800 text-xl font-medium">
						บริการห้องครัว
					</h3>
				</div>
			</div>
			<div className='flex items-center gap-6'>
				<Button className='h-11 py-2.5 px-6 gap-2' type='submit'>แก้ไข</Button>
			</div>
		</nav>
	)
}