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

function PromotionAdd() {
	const navigate = useNavigate();
	const [trigger, setTrigger] = useState<boolean>(false)

	const [newPromotionCode, setNewPromotionCode] = useState<string>('');
	const [newType, setNewType] = useState<string>('Fixed')
	const [newFixed, setNewFixed] = useState<number>(0)
	const [newPercent, setNewPercent] = useState<number>(0)
	const [quota, setQuota] = useState<number>(0)
	const [date, setDate] = useState<Date>()

	const [promotion, setPromotion] = useState<object[] | null>()

	const { createPromotion } = usePromotion();

	function hanndleFixedValue(e: any) {
		setNewFixed(e.target.value)
		setNewPercent(0)
	}

	function handlePercentValue(e: any) {
		setNewPercent(e.target.value)
		setNewFixed(0)
	}

	useEffect(() => {
		setPromotion((prev: any) => ({
			...prev,
			promotion_code: newPromotionCode,
			type: newType,
			newFixed: newFixed,
			newPercent: newPercent,
			quota: quota,
			expired_time: date
		}))

		if (trigger) {
			createPromotion(promotion)
			setTrigger(false)
			setPromotion(null)
			navigate("/promotions/")

		}
		console.log(promotion)
	}, [newFixed, newPercent, trigger, newPromotionCode, newType, quota, date])

	return (
		<div className="w-full">
			<Topbar_add title='Promotion Code' path="" trigger={trigger} setTrigger={setTrigger} />
			<div className="mx-auto w-[90%] max-w-[1440px] mt-14 border rounded-lg bg-white">
				<div className="py-10 px-6 text-base font-medium leading-normal">
					<div className="mb-10">
						<label className="text-gray-700 w-52 inline-block mr-6">
							Promotion Code<span className="text-rose-700">*</span>
						</label>
						<Input
							type="text"
							value={newPromotionCode}
							// className={`border-rose-700 focus:border-rose-700`}
							// style={{borderColor:  "#C82438" }}
							onChange={(e) => setNewPromotionCode(e.target.value)}
						/>
					</div>

					<div className="mb-10 flex">
						<label className="text-gray-700 w-52 inline-block mr-6">
							ประเภท<span className="text-rose-700">*</span>
						</label>
						<div>
							<RadioGroup defaultValue="Fixed">
								<div className="flex items-center space-x-2">
									<RadioGroupItem value="Fixed" id="r1" onClick={(e: any) => setNewType(e.target.value)} />
									<div className="relative flex">
										<Label htmlFor="r1" >Fixed
											<Input
												type="number"
												value={newFixed}
												className={`ml-14 w-36`}
												onChange={(e) => hanndleFixedValue(e)}
												disabled={newType !== 'Fixed'}
											/>
										</Label>
										<img src={baht} alt="" className="absolute inset-y-3 right-4" />
									</div>
								</div>

								<div className="flex items-center space-x-2">
									<RadioGroupItem value="Percent" id="r2" onClick={(e: any) => setNewType(e.target.value)} />
									<div className="relative flex">
										<Label htmlFor="r2">Percent
											<Input
												type="number"
												value={newPercent}
												className={`ml-10 w-36`}
												onChange={(e: any) => handlePercentValue(e)}
												disabled={newType !== 'Percent'} // ปิดการใช้งาน Input ถ้าไม่เลือก Fixed
											/>
										</Label>
										<img src={percent} alt="" className="absolute inset-y-3 right-4" />
									</div>
								</div>
							</RadioGroup>
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
								// className={`border-rose-700 focus:border-rose-700`}
								// style={{borderColor:  "#C82438" }}
								onChange={(e: any) => setQuota(e.target.value)}
							/>
							<div className="absolute inset-y-2 right-4 text-gray-700">ครั้ง</div>
						</div>
					</div>

					<div className="mb-10 flex">
						<label className="text-gray-700 w-52 inline-block mr-6">
							วันหมดอายุ<span className="text-rose-700">*</span>
						</label>
						<DatePicker date={date} setDate={setDate} />
					</div>
				</div>
			</div>
		</div>
	);
}

export default PromotionAdd