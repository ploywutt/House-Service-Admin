import Topbar_edit from '@/components/Topbar/TopbarEdit';
import { useProduct } from '@/contexts/productsContext';
import useDateVal from '@/hooks/useDateVal';
import useService from '@/hooks/useService';
import { useForm, Controller, useFieldArray } from "react-hook-form";
import type {
  NestedValue,
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
import { AlertDialog, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import Alert from '@/components/Alert/Alert';
import useCategory from '@/hooks/useCategory';

function ServiceEdit() {
  const params: any = useParams()
  const navigate = useNavigate()

  const [validateServiceName, setValidateServiceName] = useState<string>()
  const [validateCategory, setValidateCategory] = useState<string>()
  const [validateItems, setValidateItems] = useState<any>([])

  const [isServiceValidate, setIsServiceValidate] = useState<boolean | null>(true)
  const [isCategoryValidate, setIsCategoryValidate] = useState<boolean | null>(true)
  const [isItemsValidate, setIsItemsValidate] = useState<boolean | null>(true)

  const {
    loading, setLoading,
    imagePath, setImagePath,
    newService, setNewService,
    fileList, setFileList,
    blobImage, setBlobImage,
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
      subServiceName: string;
      pricePerUnit: number;
      unit: string;
    }[];
  }

  const defaultValues: DefaultValues<FormValues> = {
    serviceName: newService?.service_name,
    category: newService?.category,
    image: newService?.pic_service,
    subService: newService?.subServices.map((subService: any) => ({
      subServiceName: subService?.sub_service_name,
      pricePerUnit: subService?.price_per_unit,
      unit: subService?.unit,
    }))
  }
  const {
    handleSubmit,
    register,
    reset,
    control,
    formState: { errors }
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

  useEffect(() => {
    async function fectData() {
      await getServiceById(params.id)
    }
    fectData()
    getCategory('')
    setValidateServiceName(newService?.service_name)
    setValidateCategory(newService?.category)
    setValidateItems(newService?.subServices)
  }, [])

  useEffect(() => {
    if (newService?.subServices) {
      async function fectData() {
        await downloadFile()
      }
      fectData()
      reset(newService)
    }
    console.log("รับข้อมูลมา ......", newService)
  }, [newService])

  useEffect(() => {
    if (submitServiceInput) {
      validateFormData()
    }
    if (formData?.imagePath !== undefined && submitServiceInput) {
      console.log("Lastest dataform beform put to database ----", formData)
      updateService(formData)
      console.log("เริ่มการโหลดเข้ารายการย่อย ----- ", formData)
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
      console.log("เมื่อมี fileList edit", formData)
    } else {
      setFormData({
        ...newService,
        serviceId: params.id,
        serviceName: validateServiceName,
        category: validateCategory,
        items: validateItems,
        createAt: newService?.createAt,
      })
      console.log("เมื่อไม่มี fileList edit", formData)
    } 

  }, [fileList, validateServiceName, validateCategory, validateItems, submitServiceInput])

  return (
    <div className="w-full">
      <Topbar_edit title='บริการ' path="/services" />
      <div className="mx-auto w-[90%] max-w-[1440px] mt-14 border rounded-lg bg-white">
        <form onSubmit={handleSubmit(onSubmit)} className="py-10 px-6 text-base font-medium leading-normal">
          <div className="mb-10">

            <label className="text-gray-700 w-52 inline-block mr-6">
              ชื่อบริการ<span className="text-rose-700">*</span>
            </label>
            <Controller
              name="serviceName"
              defaultValue={newService?.service_name}
              control={control}
              render={({ field }) => (
                <Input {...field}
                  type="text"
                  value={validateServiceName}
                  className={`${!isServiceValidate ? "border-rose-700 focus:border-rose-700" : null}`}
                  style={{ borderColor: !isServiceValidate ? "#C82438" : "" }}
                  onChange={(e) => setValidateServiceName(e.target.value)}
                />
              )}
            />
            {!isServiceValidate ? (
              <span className="ml-4 text-rose-700 text-sm font-medium">กรุณากรอกข้อมูลชื่อบริการ</span>
            ) : null}
          </div>

          <div className="mb-10">
            <label className="text-gray-700 w-52 inline-block mr-6">
              หมวดหมู่<span className="text-rose-700">*</span>
            </label>
            <Controller
              name="category"
              control={control}
              render={({ field }) => (
                <select
                  className={`w-96 h-11 px-4 py-2.5 text-gray-700 bg-white rounded-lg border border-gray-300 focus:ring-1 focus:ring-blue-600 disabled:cursor-not-allowed disabled:opacity-50 ${!isCategoryValidate ? "border-rose-700 focus:border-rose-700" : null}`}
                  {...field}
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
              )}
            />
            {!isCategoryValidate ? (
              <span className="ml-4 text-rose-700 text-sm font-medium">กรุณาเลือกหมวดหมู่</span>
            ) : null}
          </div>

          <div className='mb-10 flex'>
            <label className="text-gray-700 w-52 inline-block mr-6">
              รูปภาพ<span className="text-rose-700">*</span>
            </label>
            <Controller
              name="image"
              control={control}
              render={({ field }) => (
                <ImageInput

                  
                />
              )}
            />
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
                    <Controller
                      name={`items[${index}].itemName`}
                      control={control}
                      defaultValue={item?.subServiceName}
                      render={({ field }) => (
                        <div className='flex flex-col gap-1 w-[50%]'>
                          <div className='flex justify-between'>
                            <label>ชื่อรายการ</label>
                            {!isItemsValidate ? (
                              <span className="text-rose-700 text-xs font-normal">{`ชื่อรายการที่ ${index + 1} ต้องไม่ว่าง`}</span>
                            ) : null}
                          </div>
                          <Input
                            {...field}
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
                      )}
                    />

                    <Controller
                      name={`items[${index}].itemPrice`}
                      control={control}
                      defaultValue={item.pricePerUnit}
                      render={({ field }) => (
                        <div className='flex flex-col gap-1 relative w-[25%] '>
                          <div className='flex justify-between'>
                            <label>ค่าบริการ / 1 หน่วย</label>
                            {!isItemsValidate ? (
                              <span className="text-rose-700 text-xs font-normal">{`ค่าบริการต้องเป็นตัวเลข`}</span>
                            ) : null}
                          </div>
                          <Input
                            {...field}
                            type="number"
                            className={`w-[100%] h-9 px-3 py-2 ${!isItemsValidate ? "border-rose-700 focus:border-rose-700" : null}`}
                            style={{ borderColor: !isItemsValidate ? "#C82438" : "" }}
                            value={validateItems[index]?.price_per_unit || ''} // กำหนดค่า value จาก validateItems
                            onChange={(e) => {
                              // อัปเดตค่า validateItems โดยคัดลอกค่าเดิมและอัปเดตเฉพาะ item ที่เปลี่ยนแปลง
                              const updatedValidateItems = [...validateItems];
                              updatedValidateItems[index] = {
                                ...updatedValidateItems[index],
                                price_per_unit: e.target.value,
                              };
                              setValidateItems(updatedValidateItems);
                            }}
                          />
                          <svg className="absolute bottom-3 right-3" width="9" height="15" viewBox="0 0 9 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3.176 13.0001H0.0400001V1.81612H3.176V0.168121H4.6V1.81612H5.176C6.168 1.81612 6.936 2.07212 7.48 2.58412C8.024 3.09612 8.296 3.84279 8.296 4.82412C8.296 5.37879 8.16267 5.86946 7.896 6.29612C7.64 6.71212 7.29867 7.02145 6.872 7.22412C8.06667 7.57612 8.664 8.44546 8.664 9.83212C8.664 10.4828 8.52 11.0481 8.232 11.5281C7.95467 11.9975 7.57067 12.3601 7.08 12.6161C6.58933 12.8721 6.04533 13.0001 5.448 13.0001H4.6V14.6481H3.176V13.0001ZM3.176 6.61612V3.14412H1.672V6.61612H3.176ZM4.968 6.61612C5.49067 6.61612 5.90133 6.47212 6.2 6.18412C6.49867 5.89612 6.648 5.46946 6.648 4.90412C6.648 4.25345 6.49867 3.80012 6.2 3.54412C5.912 3.27745 5.464 3.14412 4.856 3.14412H4.6V6.61612H4.968ZM3.176 11.6721V7.96012H1.672V11.6721H3.176ZM5.08 11.6721C5.70933 11.6721 6.18933 11.5335 6.52 11.2561C6.85067 10.9788 7.016 10.5041 7.016 9.83212C7.016 9.16012 6.84 8.68012 6.488 8.39212C6.14667 8.10412 5.62933 7.96012 4.936 7.96012H4.6V11.6721H5.08Z" fill="#9AA1B0" />
                          </svg>
                        </div>
                      )}
                    />

                    <Controller
                      name={`items[${index}].itemUnit`}
                      control={control}
                      defaultValue={item.unit}
                      render={({ field }) => (
                        <div className='flex flex-col gap-1 w-[25%]'>
                          <div className='flex justify-between'>
                            <label>หน่วยบริการ</label>
                            {!isItemsValidate ? (
                              <span className="text-rose-700 text-xs font-normal">{`หน่วยบริการที่ ${index + 1} ต้องไม่ว่าง`}</span>
                            ) : null}
                          </div>
                          <Input
                            {...field}
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
                      )}
                    />

                  </div>
                  {fields.length > 1 ? (
                    <button type="button" className="duration-300 text-blue-600 text-base font-semibold underline leading-normal" onClick={() => remove(index)}>
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
                price_per_unit: '',
                unit: '',
              })
            }
            variant="secondary"
          >
            เพิ่มรายการ
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M10 5.00012C10.2652 5.00012 10.5196 5.10548 10.7071 5.29302C10.8946 5.48055 11 5.73491 11 6.00012V9.00012H14C14.2652 9.00012 14.5196 9.10548 14.7071 9.29302C14.8946 9.48055 15 9.73491 15 10.0001C15 10.2653 14.8946 10.5197 14.7071 10.7072C14.5196 10.8948 14.2652 11.0001 14 11.0001H11V14.0001C11 14.2653 10.8946 14.5197 10.7071 14.7072C10.5196 14.8948 10.2652 15.0001 10 15.0001C9.73478 15.0001 9.48043 14.8948 9.29289 14.7072C9.10536 14.5197 9 14.2653 9 14.0001V11.0001H6C5.73478 11.0001 5.48043 10.8948 5.29289 10.7072C5.10536 10.5197 5 10.2653 5 10.0001C5 9.73491 5.10536 9.48055 5.29289 9.29302C5.48043 9.10548 5.73478 9.00012 6 9.00012H9V6.00012C9 5.73491 9.10536 5.48055 9.29289 5.29302C9.48043 5.10548 9.73478 5.00012 10 5.00012Z" fill="#336DF2" />
            </svg>
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