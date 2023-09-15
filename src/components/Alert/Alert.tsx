import {
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog"


import alert from "../../assets/icon/alert.png"
import cancel from "../../assets/icon/close-line.png"
import { useProduct } from "@/contexts/productsContext"

function Alert(prop: any) {

	const { deleteCategory, currentCategory }: any = useProduct()

	return (
		<AlertDialogContent className="max-w-[360px] rounded-2xl">
			<AlertDialogHeader className="relative">
				<AlertDialogTitle className="flex justify-center mt-[2.25rem]">
					<img
						src={alert}
						alt="alert"
						className=""
					/>
				</AlertDialogTitle>
				<AlertDialogDescription className="px-5">
					<h2 className="text-center text-gray-950 my-2">ยืนยันการลบรายการ?</h2>
					{
						prop.id !== 0 ?
							<p className="text-center text-gray-750 font-light text-base">คุณต้องการลบรายการ ‘{`${prop.name}`}’ ใช่หรือไม่</p> :
							<p className="text-center text-gray-750 font-light text-base">ไม่พบรายการ ‘{`${prop.name}`}’ ที่คุณต้องการ</p>
					}
				</AlertDialogDescription>
			</AlertDialogHeader>
			<AlertDialogCancel>
				<img src={cancel} alt="cancel" className="absolute top-3 right-3" />
			</AlertDialogCancel>
			<AlertDialogFooter className="flex sm:justify-center items-center -mt-10 gap-4">
				{
					prop.id !== 0 ?
						<>
							<AlertDialogAction className="min-w-[112px]" onClick={() => deleteCategory(prop.id)}>ลบรายการ</AlertDialogAction>
							<AlertDialogCancel className="text-blue-600 border border-blue-600 min-w-[112px]">ยกเลิก</AlertDialogCancel>
						</> :
						<AlertDialogCancel className="text-blue-600 border border-blue-600 min-w-[112px]">ยกเลิก</AlertDialogCancel>
				}
			</AlertDialogFooter>
		</AlertDialogContent>
	)
}

export default Alert