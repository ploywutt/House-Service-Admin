import { useProduct } from '@/contexts/productsContext'
import { useEffect, useState } from 'react'
import { secretKey } from "../../lib/supabase.ts";

function ImageInput() {
	// #
	const [shouldHighlight, setShouldHighlight] = useState<boolean>(false)
	// const [isPreviewReady, setIsPreviewReady] = useState(false);
	const {
		fileList, setFileList,
		submitServiceInput, setSubmitServiceInput,
		formData, setFormData,
		blobImage, setBlobImage,
		newService,
		isFormDataValidate, 
	}: any = useProduct()

	const [progress, setProgress] = useState<number>(0)
	const [isValidate, setIsValidate] = useState<boolean | null>(true)
	const [errorImage, setErrorImage] = useState<boolean | null>(false)

	const preventDefaultHandler = (e: React.DragEvent<HTMLElement>) => {
		e.preventDefault()
		e.stopPropagation()
	}

	async function uploadFile(file: any) {
		try {
			const { data, error } = await secretKey.storage.from('testing').upload(`HomeService/${file.name}`, file)
			// console.log("name of image ระหว่างอัพโหลด upload ..... === ", file.name)
			if (error) {
				// console.error("ผิดตรงนี้.....", error)
				setErrorImage(true)
				setSubmitServiceInput(false)
			} else {
				// console.log("Success to up load...", data)
				setErrorImage(false)
				setFormData({
					...formData,
					imagePath: data.path
				})
				// console.log("ข้อมูลรวมที่ต้องส่ง หลังเพิ่ม image path", formData)
			}
		} catch (error) {
			// console.error("ผิดตรงสุดท้าย....", error)
			setSubmitServiceInput(false)
		}
	}

	async function deleteFile(file: any) {
		await secretKey
			.storage
			.from('testing')
			.remove([file])
	}

	function displayPreview(file: any | null) {
		if (!file) {
			return;
		}
		const files = Array.from(file);
		setFileList(files)
		setIsValidate(true)
		const reader = new FileReader();
		reader.readAsDataURL(file[0]);
		reader.onload = () => {
			const preview: any = document.getElementById('preview');
			preview.src = reader.result as string;
			preview.classList.remove('hidden');
		};
	}

	const handleUploadNewImage = () => {
		if (blobImage) {
			const newImageFile = new File([blobImage], newService.pic_service); // สร้าง File ใหม่จาก blobImage
			setFileList([newImageFile]); // อัพโหลดรูปภาพใหม่โดยใช้ blobImage
			displayPreview(fileList)
			setBlobImage(null)
		}
	};

	useEffect(() => {
		handleUploadNewImage();
	}, [blobImage]);

	useEffect(() => {
		if (
			formData?.image !== undefined &&
			submitServiceInput &&
			formData?.items.length > 0 &&
			(Object.values(formData).every(value => value !== null && value !== undefined && value !== "")) &&
			isFormDataValidate
		) {
			console.log(`formData for upload image: ${formData}`)
			console.log("isFormData", isFormDataValidate)
			if (newService?.pic_service.includes("HomeService") && formData?.image.name.includes(newService?.pic_service)) {
				// กรณีแก้ไขข้อมูล และใช้รูปเดิม
				console.log("fileList in old pic: ", formData)
				setIsValidate(true)
				setFormData({
					...formData,
					imagePath: formData?.pic_service
				})
				setSubmitServiceInput(true)

			} else {

				setSubmitServiceInput(false)
			}
		}
	}, [formData, submitServiceInput, fileList, isFormDataValidate])

	useEffect(() => {
		if (
			formData?.image !== undefined &&
			submitServiceInput &&
			formData?.items.length > 0 &&
			(Object.values(formData).every(value => value !== null && value !== undefined && value !== "")) &&
			isFormDataValidate
		) {
			console.log(`formData for upload image: ${formData}`)
			console.log("isFormData", isFormDataValidate)
			if (!formData?.image.name.includes(newService?.pic_service)) {
				// กรณีแก้ไขข้อมูล และใช้รูปใหม่
				console.log("fileList in new pic: ", formData)
				setIsValidate(true)
				uploadFile(formData.image)
				deleteFile(newService.pic_service)
				
			} else if (submitServiceInput && !fileList) {
				setIsValidate(false)
				console.log("add image .......")
				setSubmitServiceInput(false)

			} else if (submitServiceInput && isFormDataValidate && fileList) {
				// ข้อมูลใหม่
				console.log("New data: ", formData)
				setIsValidate(true)
				uploadFile(fileList[0])
				setSubmitServiceInput(true)

			} else {
				setIsValidate(false)
				setSubmitServiceInput(false)
			}

		} else if (submitServiceInput && !formData?.image && !formData?.pic_service) {

			setIsValidate(false)
			console.log("add image .......")
			setSubmitServiceInput(false)

		} else {

			setSubmitServiceInput(false)
		}
	}, [submitServiceInput, fileList, isFormDataValidate])

	return (
		<div>
			<div
				className="relative w-96 min-h-36 px-6 pt-6 pb-7 rounded-md border border-gray-300  place-content-center border-dashed transition-colors hover:bg-blue-100"
				// #
				onDragOver={(e) => {
					preventDefaultHandler(e);
					setShouldHighlight(true)
				}}
				onDragEnter={(e) => {
					preventDefaultHandler(e);
					setShouldHighlight(true)
				}}
				onDragLeave={(e) => {
					preventDefaultHandler(e);
					setShouldHighlight(false)
				}}
				onDrop={(e) => {
					preventDefaultHandler(e);
					const files = Array.from(e.dataTransfer.files);
					setFileList(files);
					setShouldHighlight(false);
					setIsValidate(true)
					// Display preview for the first dropped image
					if (files.length > 0) {
						displayPreview(files);
						setIsValidate(true)
					}
				}}
			>
				<div className="flex flex-col items-center gap-1">
					{!fileList ? (
						<>
							<svg width="49" height="48" viewBox="0 0 49 48" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M28.5 8H12.5C11.4391 8 10.4217 8.42143 9.67157 9.17157C8.92143 9.92172 8.5 10.9391 8.5 12V32M8.5 32V36C8.5 37.0609 8.92143 38.0783 9.67157 38.8284C10.4217 39.5786 11.4391 40 12.5 40H36.5C37.5609 40 38.5783 39.5786 39.3284 38.8284C40.0786 38.0783 40.5 37.0609 40.5 36V28M8.5 32L17.672 22.828C18.4221 22.0781 19.4393 21.6569 20.5 21.6569C21.5607 21.6569 22.5779 22.0781 23.328 22.828L28.5 28M40.5 20V28M40.5 28L37.328 24.828C36.5779 24.0781 35.5607 23.6569 34.5 23.6569C33.4393 23.6569 32.4221 24.0781 31.672 24.828L28.5 28M28.5 28L32.5 32M36.5 8H44.5M40.5 4V12M28.5 16H28.52" stroke="#B3B8C4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
							</svg>
							<span className="text-gray-500 text-sm text-center font-normal leading-tight">
								<input
									className="absolute inset-0 w-full h-full opacity-0 hover:cursor-pointer"
									type="file"
									accept="image/*"
									onChange={(e) => displayPreview(e.target.files)}
									value={fileList}
								/>
								<span className="text-blue-600 text-sm font-normal leading-tight">อัพโหลดรูปภาพ</span> หรือ ลากและวางที่นี่ <br />
								<span>PNG, JPG ขนาดไม่เกิน 5MB</span>
							</span>
						</>
					) : (
							<>
							<p>File to Upload</p>
							{fileList.map((file: any, i: number) => {
								return (
									<>
										<img src="" className="mb-4 mx-4" id="preview"></img>
										<span key={i}>{file.name}</span>
									</>
								)
							})}
						</>
					)}
				</div>
			</div>
			<div className="flex justify-between">
				<div className="text-gray-500 text-xs font-normal leading-none mt-2">ขนาดภาพที่แนะนำ: 1440 x 225 PX</div>
				{fileList && (
					<button className="border border-violet-500 px-2 py-1 rounded-md border-none text-blue-600 text-base font-semibold underline leading-normal"
						onClick={() => {
							setFileList(null)
						}}
					>
						ลบรูปภาพ
					</button>
				)}
			</div>
			{!isValidate ? (
				<span className="text-rose-700 text-sm font-medium" >กรุณาใส่รูปภาพ</span>
			) : null}
			{errorImage && <span className="text-rose-700 text-sm font-medium" >รูปภาพซ้ำ/ชื่อรูปซ้ำ</span>}
		</div>
	)
}

export default ImageInput

{/*
# let's add the ability to drop files to our component and store them in a local state. There are 4 events that you have to override to transform our div into a "droppable" element. These events are onDragEnter, onDragLeave, onDragOver, and onDrop. Below is a table of when these events occur:

Event	Occurs when
onDragEnter	A dragged element enters the drop target
onDragLeave	A dragged element leaves the drop target
onDragOver	&nbsp;A dragged element is over the drop target
onDrop	&nbsp;A dragged element is dropped on the target
*/}