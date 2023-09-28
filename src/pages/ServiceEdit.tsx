import Topbar_edit from '@/components/Topbar/TopbarEdit';
import { useProduct } from '@/contexts/productsContext';
import useDateVal from '@/hooks/useDateVal';
import useService from '@/hooks/useService';
import { useForm, useFieldArray } from "react-hook-form";
import type {
  SubmitHandler,
  DefaultValues
} from "react-hook-form";

import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import ImageInput from '@/components/ServiceInput/ImageInput';
import { Button } from '@/components/ui/button';

import dot from "../assets/icon/dot.png"
import garbage from "../assets/icon/garbage.svg"
import plus from "../assets/icon/plus.svg"
import baht from "../assets/icon/baht.svg"

import { AlertDialog, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import Alert from '@/components/Alert/Alert';
import useCategory from '@/hooks/useCategory';

function ServiceEdit() {
  const params: any = useParams()
  const navigate = useNavigate()

  const [trigger, setTrigger] = useState<boolean | null>(null)

  const [validateServiceName, setValidateServiceName] = useState<string>()
  const [validateCategory, setValidateCategory] = useState<string>()
  const [validateItems, setValidateItems] = useState<any[]>([]);


  const [isServiceValidate, setIsServiceValidate] = useState<boolean | null>(true)
  const [isCategoryValidate, setIsCategoryValidate] = useState<boolean | null>(true)
  const [isItemsValidate, setIsItemsValidate] = useState<boolean | null>(true)

  const {
    newService,
    fileList, setFileList,
    categories,
    submitServiceInput, setSubmitServiceInput,
    formData, setFormData,

  }: any = useProduct()

  const { getCategory }: any = useCategory();

  const {
    downloadFile,
    getServiceById,
    updateService,
  } = useService()

  const { formatDateTime } = useDateVal()

  type FormValues = {
    serviceName: string,
    category: string,
    image: File, // <====== รอเปลี่ยน
    subService: {
      sub_service_name: string;
      price_per_unit: number;
      unit: string;
    }[];
  }

  const defaultValues: DefaultValues<FormValues> = {
    serviceName: newService?.service_name,
    category: newService?.category,
    image: newService?.pic_service,
    subService: newService?.subServices.map((subService: any) => ({
      sub_service_name: subService?.sub_service_name,
      price_per_unit: subService?.price_per_unit,
      unit: subService?.unit,
    }))
  }
  const {
    handleSubmit,
    control,
  } = useForm<FormValues>({
    defaultValues
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => alert(JSON.stringify(data));

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'subService',
  });

  function validateFormData() {
    if (validateServiceName) {
      setIsServiceValidate(true)
    } else {
      setIsServiceValidate(false)
    }

    if (validateCategory) {
      setIsCategoryValidate(true)
    } else {
      setIsCategoryValidate(false)
    }

    if (validateItems && validateItems.length > 0) {
      const isValid = validateItems.every((item: any) => {
        return (
          item.sub_service_name && item.sub_service_name.trim() !== '' &&
          !isNaN(item.price_per_unit) && item.price_per_unit > 0 &&
          item.unit && item.unit.trim() !== ''
        );
      });

      // ตั้งค่า isItemsValidate ตามค่า isValid หลังจากตรวจสอบข้อมูลทั้งหมด
      setIsItemsValidate(isValid);

    } else {
      setIsItemsValidate(false);
    }
  }

  function deleteItems(index: number) {
    // คัดลอกค่า validateItems มาเพื่ออัปเดต
    const updatedValidateItems = [...validateItems];
  
    // กำหนดค่าใน index ที่ต้องการลบเป็น null
    // updatedValidateItems[index] = null;
    updatedValidateItems.splice(index, 1); // ลบอ็อบเจ็กต์ใน index ที่ต้องการ

    // อัปเดต state ด้วยค่าใหม่
    setValidateItems(updatedValidateItems.filter(Boolean)); // กรองออกเพื่อลบค่า null
    console.log(`new validateItems: ${validateItems}`);
    remove(index)
  }


  useEffect(() => {
    async function fectData() {
      await getServiceById(params.id)
    }
    fectData()
    getCategory('')
    setValidateServiceName(newService?.service_name)
    setValidateCategory(newService?.category)
    setValidateItems(newService?.subServices)
    if (newService?.subServices) {
      async function fectData() {
        await downloadFile()
      }
      fectData()
  
    }
    console.log("รับข้อมูลมา ......", newService)
  }, [])

  useEffect(() => {
    if (submitServiceInput) {
      validateFormData()
    }
    if (formData?.imagePath !== undefined && submitServiceInput) {
      // console.log("Lastest dataform beform put to database ----", formData)
      updateService(formData)
      // console.log("เริ่มการโหลดเข้ารายการย่อย ----- ", formData)
      setSubmitServiceInput(false)
      setFileList(null)
      console.log("Finished")
      navigate("/services")

    }
  }, [submitServiceInput, , validateServiceName, validateCategory, validateItems, formData])

  useEffect(() => {
    if (fileList) {
      setFormData({
        ...newService,
        ...formData,
        serviceId: params.id,
        serviceName: validateServiceName,
        category: validateCategory,
        items: validateItems,
        image: fileList[0],
        createAt: newService?.createAt,
      })
      // console.log("เมื่อมี fileList edit", formData)
    } else {
      setFormData({
        ...newService,
        serviceId: params.id,
        serviceName: validateServiceName,
        category: validateCategory,
        items: validateItems,
        createAt: newService?.createAt,
      })
    }
    console.log("เมื่อไม่มี fileList edit", formData)

  }, [fileList, validateServiceName, validateCategory, validateItems, submitServiceInput])

  return (
    <div className="w-full">
      <Topbar_edit title='บริการ' path="/services" trigger={trigger} setTrigger={setTrigger} />
      <div className="mx-auto w-[90%] max-w-[1440px] mt-14 border rounded-lg bg-white">
        <form onSubmit={handleSubmit(onSubmit)} className="py-10 px-6 text-base font-medium leading-normal">
          <div className="mb-10">

            <label className="text-gray-700 w-52 inline-block mr-6">
              ชื่อบริการ<span className="text-rose-700">*</span>
            </label>
            {/* <Controller
              name="serviceName"
              control={control}
              render={({ field }) => (
                )}
            /> */}
            <Input
              // {...field}
              type="text"
              defaultValue={newService?.service_name}
                  value={validateServiceName}
                  className={`${!isServiceValidate ? "border-rose-700 focus:border-rose-700" : null}`}
                  style={{ borderColor: !isServiceValidate ? "#C82438" : "" }}
                  onChange={(e) => setValidateServiceName(e.target.value)}
            />
            {!isServiceValidate ? (
              <span className="ml-4 text-rose-700 text-sm font-medium">กรุณากรอกข้อมูลชื่อบริการ</span>
            ) : null}
          </div>

          <div className="mb-10">
            <label className="text-gray-700 w-52 inline-block mr-6">
              หมวดหมู่<span className="text-rose-700">*</span>
            </label>
            {/* <Controller
              name="category"
              control={control}
              render={({ field }) => (
              )}
            /> */}
                <select
                  className={`w-96 h-11 px-4 py-2.5 text-gray-700 bg-white rounded-lg border border-gray-300 focus:ring-1 focus:ring-blue-600 disabled:cursor-not-allowed disabled:opacity-50 ${!isCategoryValidate ? "border-rose-700 focus:border-rose-700" : null}`}
              // {...field}
                  value={validateCategory}
                  onChange={(e) => setValidateCategory(e.target.value)}
                >
                  <option value="" disabled>เลือกหมวดหมู่</option>
                  {
                    categories.map((category: any, index: number) => {
                      return (
                        <option key={index} value={`${category.category_name}`}>{category.category_name}</option>
                      )
                    })
                  }
            </select>
            {!isCategoryValidate ? (
              <span className="ml-4 text-rose-700 text-sm font-medium">กรุณาเลือกหมวดหมู่</span>
            ) : null}
          </div>

          <div className='mb-10 flex'>
            <label className="text-gray-700 w-52 inline-block mr-6">
              รูปภาพ<span className="text-rose-700">*</span>
            </label>
            <ImageInput />

          </div>

          <div className="w-full h-px border border-gray-300 mb-10"></div>

          {/* รายการย่อย */}
          <div>
            <label className="text-gray-700">
              รายการบริการย่อย
            </label>
            {!isItemsValidate ? (
              <p className="text-rose-700 text-sm font-medium">กรุณาเพิ่มรายการย่อยอย่างน้อยหนึ่งรายการ</p>
            ) : null}
            <div className="my-10 text-gray-500 text-sm font-normal leading-tight">
              {fields.map((item, index) => (
                <div key={item.id} className="flex justify-items-start items-center gap-3 mb-10">
                  <div className="flex gap-0.5 mr-3">
                    <img src={dot} alt='dot' />
                    <img src={dot} alt='dot' />
                  </div>

                  <div className='flex w-[90%] gap-3'>
                    {/* <Controller
                      name={`items[${index}].itemName`}
                      control={control}
                      render={({ field }) => (
                      )}
                    /> */}
                        <div className='flex flex-col gap-1 w-[50%]'>
                          <div className='flex justify-between'>
                            <label>ชื่อรายการ</label>
                            {!isItemsValidate ? (
                              <span className="text-rose-700 text-xs font-normal">{`ชื่อรายการที่ ${index + 1} ต้องไม่ว่าง`}</span>
                              ) : null}
                          </div>
                          <Input
                            defaultValue={item?.sub_service_name}
                        // {...field}
                            type="text"
                            className={`w-[100%] h-9 px-3 py-2 ${!isItemsValidate ? "border-rose-700 focus:border-rose-700" : null}`}
                            style={{ borderColor: !isItemsValidate ? "#C82438" : "" }}
                            value={validateItems[index]?.sub_service_name || ''} // กำหนดค่า value จาก validateItems
                            onChange={(e) => {
                              // อัปเดตค่า validateItems โดยคัดลอกค่าเดิมและอัปเดตเฉพาะ item ที่เปลี่ยนแปลง
                              const updatedValidateItems = [...validateItems];
                              updatedValidateItems[index] = {
                                ...updatedValidateItems[index],
                                sub_service_name: e.target.value,
                              };
                              setValidateItems(updatedValidateItems);
                            }}
                          />
                    </div>

                    {/* <Controller
                      name={`items[${index}].itemPrice`}
                      control={control}
                      render={({ field }) => (
                      )}
                    /> */}
                        <div className='flex flex-col gap-1 relative w-[25%] '>
                          <div className='flex justify-between'>
                            <label>ค่าบริการ / 1 หน่วย</label>
                            {!isItemsValidate ? (
                              <span className="text-rose-700 text-xs font-normal">{`ค่าบริการต้องเป็นตัวเลข`}</span>
                              ) : null}
                          </div>
                          <Input
                            defaultValue={item.price_per_unit}
                        // {...field}
                            type="number"
                            className={`w-[100%] h-9 px-3 py-2 ${!isItemsValidate ? "border-rose-700 focus:border-rose-700" : null}`}
                            style={{ borderColor: !isItemsValidate ? "#C82438" : "" }}
                            value={validateItems[index]?.price_per_unit || ''} // กำหนดค่า value จาก validateItems
                            onChange={(e) => {
                              // อัปเดตค่า validateItems โดยคัดลอกค่าเดิมและอัปเดตเฉพาะ item ที่เปลี่ยนแปลง
                              const updatedValidateItems = [...validateItems];
                              updatedValidateItems[index] = {
                                ...updatedValidateItems[index],
                                price_per_unit: +(e.target.value),
                              };
                              setValidateItems(updatedValidateItems);
                            }}
                          />
                      <img src={baht} alt="baht" className='w-[9px] h-[15px] absolute top-8 right-4' />

                        </div>
                    {/*
                    <Controller
                      name={`items[${index}].itemUnit`}
                      control={control}
                      render={({ field }) => (
                      )}
                    /> */}
                        <div className='flex flex-col gap-1 w-[25%]'>
                          <div className='flex justify-between'>
                            <label>หน่วยบริการ</label>
                            {!isItemsValidate ? (
                              <span className="text-rose-700 text-xs font-normal">{`หน่วยบริการที่ ${index + 1} ต้องไม่ว่าง`}</span>
                              ) : null}
                          </div>
                          <Input
                            defaultValue={item.unit}
                        // {...field}
                            type="text"
                            className={`w-[100%] h-9 px-3 py-2 ${!isItemsValidate ? "border-rose-700 focus:border-rose-700" : null}`}
                            style={{ borderColor: !isItemsValidate ? "#C82438" : "" }}
                            value={validateItems[index]?.unit || ''} // กำหนดค่า value จาก validateItems
                            onChange={(e) => {
                              // อัปเดตค่า validateItems โดยคัดลอกค่าเดิมและอัปเดตเฉพาะ item ที่เปลี่ยนแปลง
                              const updatedValidateItems = [...validateItems];
                              updatedValidateItems[index] = {
                                ...updatedValidateItems[index],
                                unit: e.target.value,
                              };
                              setValidateItems(updatedValidateItems);
                            }}
                          />
                    </div>

                  </div>
                  {fields.length > 1 ? (
                    <button type="button" className="duration-300 text-blue-600 text-base font-semibold underline leading-normal" onClick={() => deleteItems(index)}>
                      ลบรายการ
                    </button>
                  ) : (
                    <button type="button">
                      ลบรายการ
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <Button
            type="button"
            onClick={() =>
              append({
                sub_service_name: '',
                price_per_unit: 0,
                unit: '',
              })

            }
            variant="secondary"
          >
            เพิ่มรายการ
            <img src={plus} alt="plus" />

          </Button>
          <div className="w-full h-px border border-gray-300 my-10"></div>

          <div className="pb-10 px-6 text-gray-700 text-base font-medium leading-normal">
            <div>
              <span className="w-52 mr-6 py-6 inline-block">สร้างเมื่อ</span><span>{formatDateTime(String(newService?.createAt))}</span>
            </div>
            <div>
              <span className="w-52 mr-6 py-6 inline-block">แก้ไขล่าสุด</span><span>{formatDateTime(Date())}</span>
            </div>
          </div>
        </form>
      </div>
      <div className="w-[90%] max-w-[1440px] mx-auto flex gap-2 justify-end my-6">
        <img src={garbage} alt="garbage" className="" />
        <AlertDialog>
          <AlertDialogTrigger>
            <p className="text-gray-700 font-semibold underline hover:cursor-pointer hover:scale-110">ลบบริการ</p>
          </AlertDialogTrigger>
          <Alert name={newService?.service_name} id={newService ? newService?.id : 0} title='บริการ' />
        </AlertDialog>
      </div>
    </div>
  );
}

export default ServiceEdit