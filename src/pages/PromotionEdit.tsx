import Topbar_edit from "@/components/Topbar/TopbarEdit";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useProduct } from "@/contexts/productsContext";
import usePromotion from "@/hooks/usePromotion";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import baht from "../assets/icon/baht.svg"
import percent from "../assets/icon/percent.svg"
import garbage from "../assets/icon/garbage.svg"

import DatePicker from "@/components/DatePicker";
import { useNavigate } from "react-router";
import TimePicker from "@/components/TimePicker";
import useTimePicker from "@/hooks/useTimePicker";
import useDateVal from "@/hooks/useDateVal";
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import Alert from "@/components/Alert/Alert";


function PromotionEdit() {
  const { getPromotionById, updatePromotion, getPromotions } = usePromotion();
  const { currentPromotion }: any = useProduct();
  const navigate = useNavigate();
  const params: any = useParams();

  const [trigger, setTrigger] = useState<boolean>(false)

  const [promotionEdit, setPromotionEdit] = useState<object | null>(null);
  const [codeEdit, setCodeEdit] = useState<string>('')
  const [typeEdit, setTypeEdit] = useState<string>('')
  const [fixedEdit, setFixedEdit] = useState<number>()
  const [percentEdit, setPercentEdit] = useState<number>()
  const [quotaEdit, setQuotaEdit] = useState<number>()
  const [dateEdit, setDateEdit] = useState<Date | null>(null)
  const [selectedEditDateTime, setSelectedEditDateTime] = useState<Date>()

  const [validateCode, setValidateCode] = useState<boolean>(true)
	const [validateType, setValidateType] = useState<boolean>(true)
	const [validateFixed, setValidateFixed] = useState<boolean>(true)
	const [validatePercent, setValidatePercent] = useState<boolean>(true)
	const [validateQuota, setValidateQuota] = useState<boolean>(true)
	const [validateDate, setValidateDate] = useState<boolean>(true)
  const [validateData, setValidateData] = useState<boolean>(true)

  const { formatDateTime, getDateTime, StringToDate, formatTime } = useDateVal();

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

  function validatePromotion(promotionEdit: any) {

		if (codeEdit === undefined || codeEdit === '') {
			setValidateCode(false)
			setTrigger(false)
      setValidateData(false)
		} else {
			setValidateCode(true)
      setValidateData(true)
		}

		if (typeEdit === undefined || typeEdit === '') {
			setValidateType(false)
			setTrigger(false)
      setValidateData(false)
		} else {
			setValidateType(true)
      setValidateData(true)
		}

		if (typeEdit === "Fixed" && (!fixedEdit || fixedEdit == 0)) {
			setValidateFixed(false)
			setTrigger(false)
      setValidateData(false)
		} else {
			setValidateFixed(true)
      setValidateData(true)
		}

		if (typeEdit === "Percent" && (!percentEdit || percentEdit == 0)) {
			setValidatePercent(false)
			setTrigger(false)
      setValidateData(false)
      console.log("percenEdit: ", percentEdit)
		} else {
			setValidatePercent(true)
      setValidateData(true)
		}

		if (!quotaEdit || String(quotaEdit) === "0") {
			setValidateQuota(false)
			setTrigger(false)
      setValidateData(false)
		} else {
			setValidateQuota(true)
      setValidateData(true)
		}

		if (selectedEditDateTime === undefined) {
			setValidateDate(false)
			setTrigger(false)
      setValidateData(false)
		} else {
			setValidateDate(true)
      setValidateData(true)
		}


    if (validateData) {

      console.log("promotionEdit: ", promotionEdit)
      console.log(trigger)
      updatePromotion(params.id, promotionEdit)
      getPromotions("")
      navigate("/promotions")
      setTrigger(false)
    }
		
	}

  function handleFixedValue(e: any) {
    setFixedEdit(e.target.value)
    setPercentEdit(0)
  }

  function handlePercentValue(e: any) {
    setPercentEdit(e.target.value)
    setFixedEdit(0)
  }

  const handleRadioChange = (value: string) => {
		setTypeEdit(value);
	};

  function setDefaultPromotion(currentPromotion: any) {
    setCodeEdit(currentPromotion?.promotion_code)
    setTypeEdit(currentPromotion?.type)

    if (currentPromotion?.type === "Fixed") {
      setFixedEdit(currentPromotion?.discount_amount)
    } else {
      setPercentEdit(currentPromotion?.discount_amount)
    }
    setQuotaEdit(currentPromotion?.quota)

    if (currentPromotion?.expired_time) {
      setDateEdit(new Date(currentPromotion?.expired_time))
      const timeForm = formatTime(String(currentPromotion?.expired_time))
      setSelectedTime(timeForm)
    }

  }

  useEffect(() => {
    if (dateEdit && selectedTime) {
      const formatTime = getDateTime(dateEdit)
      const newFormatDateTime = `${formatTime}, ${selectedTime}`
      const stringDateTime = StringToDate(newFormatDateTime)
      setSelectedEditDateTime(stringDateTime)
    }
  }, [selectedTime, dateEdit])

  useEffect(() => {
    setPromotionEdit((prev) => ({
      ...prev,
      promotion_code: codeEdit,
      type: typeEdit,
      fixedEdit: fixedEdit,
      percentEdit: percentEdit,
      quota: quotaEdit,
      expired_time: selectedEditDateTime,
    }))
    if (trigger) {
      console.log("promotionEdit", promotionEdit)
      validatePromotion(promotionEdit)
    }
  }, [
    codeEdit, typeEdit, quotaEdit, selectedEditDateTime, trigger, fixedEdit, percentEdit,
    validateCode, validateType, validateFixed, validatePercent, validateQuota, validateDate,
  ])

  useEffect(() => {
    async function fetchData() {
      await getPromotionById(params.id)
    }
    fetchData()
    setDefaultPromotion(currentPromotion)
  }, [params.id])   

  return (
    <div className="w-full">
      <Topbar_edit title='Promotion Code' path="/promotions" trigger={trigger} setTrigger={setTrigger} />
      <div className="mx-auto w-[90%] max-w-[1440px] mt-14 border rounded-lg bg-white">
        <div className="py-10 px-6 text-base font-medium leading-normal">
          <div className="mb-10 px-6 flex">
            <label className="text-gray-700 w-52 inline-block mr-6">
              Promotion Code<span className="text-rose-700">*</span>
            </label>
            <Input
              type="text"
              value={codeEdit}
              // className={`border-rose-700 focus:border-rose-700`}
              // style={{borderColor:  "#C82438" }}
              onChange={(e) => setCodeEdit(e.target.value)}
            />
						<p className={`${validateCode ? "hidden" : "text-rose-700"} ml-6`}>กรุณากรอกโค้ด</p>
          </div>

          <div className="mb-10 px-6 flex">
            <label className="text-gray-700 w-52 inline-block mr-6">
              ประเภท<span className="text-rose-700">*</span>
            </label>
						<div>
							<RadioGroup defaultValue="Fixed">
								<div className="relative flex items-center space-x-2">
									<label>
										<input
											type="radio"
											value="Fixed"
											checked={typeEdit === 'Fixed'}
											onClick={() => handleRadioChange('Fixed')}
											className="h-4 w-4 fill-current text-current text-white mr-2"
											
										/>
										Fixed
										<Input
											type="number"
											value={fixedEdit}
											className={`ml-14 w-36`}
											onChange={(e) => handleFixedValue(e)}
											disabled={typeEdit !== 'Fixed'}
										/>
										<img src={baht} alt="" className="absolute inset-y-3 right-4" />
									</label>
									<p className={`${validateFixed ? "hidden" : "text-rose-700"} ml-6`}>กรุณากรอกส่วนลด</p>
								</div>

								<div className="relative flex items-center space-x-2">
									<label>
										<input
											type="radio"
											value="Percent"
											checked={typeEdit === 'Percent'}
											onClick={() => handleRadioChange('Percent')}
											className="h-4 w-4 fill-current text-current text-white mr-2"
										/>
										Percent
										<Input
											type="number"
											value={percentEdit}
											className={`ml-10 w-36`}
											onChange={(e) => handlePercentValue(e)}
											disabled={typeEdit !== 'Percent'}
										/>
										<img src={percent} alt="" className="absolute inset-y-3 right-4" />
									</label>
									<p className={`${validatePercent ? "hidden" : "text-rose-700"} ml-6`}>กรุณากรอกส่วนลด</p>
								</div>
							</RadioGroup>
							<p className={`${validateType ? "hidden" : "text-rose-700"}`}>กรุณาเลือกประเภทและกรอกส่วนลด</p>
						</div>
          </div>

          <div className="mb-10 px-6 flex">
            <label className="text-gray-700 w-52 inline-block mr-6">
              โควต้าการใช้<span className="text-rose-700">*</span>
            </label>
            <div className="relative">
              <Input
                type="number"
                value={quotaEdit}
                className=""
                // className={`border-rose-700 focus:border-rose-700`}
                // style={{borderColor:  "#C82438" }}
                onChange={(e: any) => setQuotaEdit(e.target.value)}
              />
              <div className="absolute inset-y-2 right-4 text-gray-700">ครั้ง</div>
            </div>
						<p className={`${validateQuota ? "hidden" : "text-rose-700"} ml-6`}>กรุณากรอกโควต้าการใช้โดยจำนวนครั้งต้องมากกว่า 0</p>
          </div>

          <div className="mb-10 px-6 flex">
            <label className="text-gray-700 w-52 inline-block mr-6">
              วันหมดอายุ<span className="text-rose-700">*</span>
            </label>
            <div className="flex gap-6">
              <DatePicker date={dateEdit} setDate={setDateEdit} />
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

          <div className="w-[96%] mx-auto border border-gray-300"></div>

          <div className="py-10 px-6 text-gray-700 text-base font-medium leading-normal">
            <div>
              <span className="w-52 mr-6 py-6 inline-block">สร้างเมื่อ</span><span>{formatDateTime(String(currentPromotion?.created_at))}</span>
            </div>
            <div>
              <span className="w-52 mr-6 py-6 inline-block">แก้ไขล่าสุด</span><span>{formatDateTime(String(Date()))}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="w-[90%] max-w-[1440px] mx-auto flex gap-2 justify-end my-6">
        <img src={garbage} alt="garbage" className="" />
        <AlertDialog>
          <AlertDialogTrigger>
            <p className="text-gray-700 font-semibold underline hover:cursor-pointer hover:scale-110">ลบบริการ</p>
          </AlertDialogTrigger>
          <Alert name={currentPromotion?.promotion_code} id={currentPromotion?.promotion_id} title='Promotion Code' />
        </AlertDialog>
      </div>
    </div>
  );
}

export default PromotionEdit