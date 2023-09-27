import Topbar_add from "@/components/Topbar/TopbarAdd";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label";

import baht from "../assets/icon/baht.svg"
import percent from "../assets/icon/percent.svg"
import DatePicker from "@/components/DatePicker";
import usePromotion from "@/hooks/usePromotion";
import { useNavigate } from "react-router";
import TimePicker from "@/components/TimePicker";
import useTimePicker from "@/hooks/useTimePicker";
import useDateVal from "@/hooks/useDateVal";

function PromotionAdd() {
	const navigate = useNavigate();
	const { getDateTime, StringToDate } = useDateVal();
	const [trigger, setTrigger] = useState<boolean>(false)

	const [newPromotionCode, setNewPromotionCode] = useState<string>();
	const [newType, setNewType] = useState<string>()
	const [newFixed, setNewFixed] = useState<number>()
	const [newPercent, setNewPercent] = useState<number>()
	const [quota, setQuota] = useState<number>()
	const [date, setDate] = useState<Date>()
	const [selectedDateTime, setSelectedDateTime] = useState<Date>()
	const [promotion, setPromotion] = useState<object[] | null>()

	const [validateCode, setValidateCode] = useState<boolean>(true)
	const [validateType, setValidateType] = useState<boolean>(true)
	const [validateFixed, setValidateFixed] = useState<boolean>(true)
	const [validatePercent, setValidatePercent] = useState<boolean>(true)
	const [validateQuota, setValidateQuota] = useState<boolean>(true)
	const [validateDate, setValidateDate] = useState<boolean>(true)

	const { createPromotion, getPromotions } = usePromotion();

	const {
		hour,
		minute,
		handleHour,
		handleMinute,
		clickHour,
		clickMinute,
		selectedTime,
		setSelectedTime,
	} = useTimePicker();

	function validatePromotion() {

		if (newPromotionCode === undefined || newPromotionCode === '') {
			setValidateCode(false)
			setTrigger(false)
		} else {
			setValidateCode(true)
		}

		if (newType === undefined || newType === '') {
			setValidateType(false)
			setTrigger(false)
		} else {
			setValidateType(true)
		}

		if (newType === "Fixed" && newFixed === undefined || newFixed === "" || newFixed === "0") {
			setValidateFixed(false)
			setTrigger(false)
		} else {
			setValidateFixed(true)
		}

		if (newType === "Percent" && newPercent === undefined || newPercent === "" || newPercent === "0") {
			setValidatePercent(false)
			setTrigger(false)
		} else {
			setValidatePercent(true)
		}

		if (quota === undefined || quota === 0 || quota === "") {
			setValidateQuota(false)
			setTrigger(false)
		} else {
			setValidateQuota(true)
		}

		if (selectedDateTime === undefined) {
			setValidateDate(false)
			setTrigger(false)
		} else {
			setValidateDate(true)
		}

		for (const key in promotion) {
			if (promotion[key] === undefined || promotion[key] === "") {
				break;
			} else {
				createPromotion(promotion)
				setTrigger(false)
				setPromotion(null)
				getPromotions("")
				navigate("/promotions/")
			}
		}
	}

	function hanndleFixedValue(e: any) {
		setNewFixed(e.target.value)
		setNewPercent(0)
	}

	function handlePercentValue(e: any) {
		setNewPercent(e.target.value)
		setNewFixed(0)
	}

	useEffect(() => {
		if (date && selectedTime) {
			const formatTime = getDateTime(date)
			const newFormatDateTime = `${formatTime}, ${selectedTime}`
			const stringDateTime = StringToDate(newFormatDateTime)

			setSelectedDateTime(stringDateTime)
		}
		// console.log("selectedDateTime: ", selectedDateTime)
	}, [date, selectedTime])

	useEffect(() => {
		setPromotion((prev: any) => ({
			...prev,
			promotion_code: newPromotionCode,
			type: newType,
			newFixed: newFixed,
			newPercent: newPercent,
			quota: quota,
			expired_time: selectedDateTime,
		}))

		if (trigger) {
			validatePromotion()
		}
		console.log("promotion: ", promotion)
	}, [
		newFixed, newPercent, trigger, newPromotionCode, newType, quota, selectedDateTime,
		validateCode, validateType, validateFixed, validatePercent, validateQuota, validateDate,
	])

	return (
		<div className="w-full">
			<Topbar_add title='Promotion Code' path="" trigger={trigger} setTrigger={setTrigger} />
			<div className="mx-auto w-[90%] max-w-[1440px] mt-14 border rounded-lg bg-white">
				<div className="py-10 px-6 text-base font-medium leading-normal">
					<div className="mb-10 flex">
						<label className="text-gray-700 w-52 inline-block mr-6">
							Promotion Code<span className="text-rose-700">*</span>
						</label>
						<Input
							type="text"
							value={newPromotionCode}
							// className={validateCode ? "" : `border-rose-700 focus:border-rose-700`}
							onChange={(e) => setNewPromotionCode(e.target.value)}
						/>
						<p className={`${validateCode ? "hidden" : "text-rose-700"} ml-6`}>กรุณากรอกโค้ด</p>
					</div>

					<div className="mb-10 flex">
						<label className="text-gray-700 w-52 inline-block mr-6">
							ประเภท<span className="text-rose-700">*</span>
						</label>
						<div>
							<RadioGroup defaultValue="Fixed">
								<div className="flex items-center space-x-2">
									<RadioGroupItem value="Fixed" id="r1" onClick={(e: any) => setNewType(e.target.value)} checked />
									<div className="relative flex">
										<Label htmlFor="r1" >
											Fixed
											<Input
												id="r1"
												type="number"
												value={newFixed}
												className={`ml-14 w-36`}
												onChange={(e) => hanndleFixedValue(e)}
												disabled={newType !== 'Fixed'} // ปิดการใช้งาน Input ถ้าไม่เลือก Fixed
											/>
											<img src={baht} alt="" className="absolute inset-y-3 right-4" />
										</Label>
									</div>
									<p className={`${validateFixed ? "hidden" : "text-rose-700"} ml-6`}>กรุณากรอกส่วนลด</p>
								</div>

								<div className="flex items-center space-x-2">
									<RadioGroupItem value="Percent" id="r2" onClick={(e: any) => setNewType(e.target.value)} />
									<div className="relative flex">
										<Label htmlFor="r2">
											Percent
											<Input
												id="r2"
												type="number"
												value={newPercent}
												className={`ml-10 w-36`}
												onChange={(e: any) => handlePercentValue(e)}
												disabled={newType !== 'Percent'} // ปิดการใช้งาน Input ถ้าไม่เลือก Percent
											/>
										</Label>
										<img src={percent} alt="" className="absolute inset-y-3 right-4" />
									</div>
									<p className={`${validatePercent ? "hidden" : "text-rose-700"} ml-6`}>กรุณากรอกส่วนลด</p>
								</div>
							</RadioGroup>
							<p className={`${validateType ? "hidden" : "text-rose-700"}`}>กรุณาเลือกประเภทและกรอกส่วนลด</p>
						</div>
					</div>

					<div className="mb-10 flex">
						<label className="text-gray-700 w-52 inline-block mr-6">
							โควต้าการใช้<span className="text-rose-700">*</span>
						</label>
						<div className="relative">
							<Input
								type="text"
								value={quota}
								className=""
								// className={`border-rose-700 focus:border-rose-700`}
								// style={{borderColor:  "#C82438" }}
								onChange={(e: any) => setQuota(e.target.value)}
							/>
							<div className="absolute inset-y-2 right-4 text-gray-700">ครั้ง</div>
						</div>
						<p className={`${validateQuota ? "hidden" : "text-rose-700"} ml-6`}>กรุณากรอกโควต้าการใช้</p>
					</div>

					<div className="mb-10 flex">
						<label className="text-gray-700 w-52 inline-block mr-6">
							วันหมดอายุ<span className="text-rose-700">*</span>
						</label>
						<div className="flex gap-6">
							<DatePicker date={date} setDate={setDate} />
							<TimePicker
								hour={hour}
								minute={minute}
								handleHour={handleHour}
								handleMinute={handleMinute}
								clickHour={clickHour}
								clickMinute={clickMinute}
								selectedTime={selectedTime}
								setSelectedTime={setSelectedTime}
							/>

						</div>
						<p className={`${validateDate ? "hidden" : "text-rose-700"} ml-6`}>กรุณาเลือกวันที่และเวลาให้ครบถ้วน</p>
					</div>
				</div>
			</div>
		</div>
	);
}

export default PromotionAdd