import { Input } from '@/components/ui/input';
import { useProduct } from '@/contexts/productsContext';
import { useEffect, useState } from 'react';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import ImageInput from './ImageInput';

import dot from "../../assets/icon/dot.png";
import plus from "../../assets/icon/plus.svg"
import baht from "../../assets/icon/baht.svg"
import { Button } from '../ui/button';
import useService from '@/hooks/useService';

function ServiceInput() {
  const navigate = useNavigate()
  const {
    categories,
    fileList, setFileList,
    formData, setFormData,
    submitServiceInput, setSubmitServiceInput,
  }: any = useProduct();

  const { createService, getServices } = useService()

  const [validateServiceName, setValidateServiceName] = useState<string>('')
  const [validateCategory, setValidateCategory] = useState<string>('')
  const [validateItems, setValidateItems] = useState<any>([])

  const [isServiceValidate, setIsServiceValidate] = useState<boolean | null>(true)
  const [isCategoryValidate, setIsCategoryValidate] = useState<boolean | null>(true)
  const [isItemsValidate, setIsItemsValidate] = useState<boolean | null>(true)

  type FormData = {
    serviceName: string;
    category: string;
    image: FileList;
    items: {
      itemName: string;
      itemPrice: number;
      itemUnit: string;
    }[];
  };

  const { control } = useForm<FormData>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'items',
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
      const isValid = validateItems.every((item:any) => {
        return (
          item.itemName && item.itemName.trim() !== '' &&
          !isNaN(item.itemPrice) && item.itemPrice > 0 &&
          item.itemUnit && item.itemUnit.trim() !== ''
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
    updatedValidateItems[index] = null;
  
    // อัปเดต state ด้วยค่าใหม่
    setValidateItems(updatedValidateItems.filter(Boolean)); // กรองออกเพื่อลบค่า null
    console.log(`new validateItems: ${validateItems}`);
    remove(index)
  }


  useEffect(() => {
    if (fileList) {
      setFormData({
        ...formData,
        serviceName: validateServiceName,
        category: validateCategory,
        items: validateItems,
        image: fileList[0]
      })
      console.log("เมื่อมี fileList input .....", formData)
    }
  }, [fileList, validateServiceName, validateCategory, validateItems])

  useEffect(() => {
    
    if (submitServiceInput) {
      validateFormData()
      if (formData?.imagePath !== undefined) {

        createService(formData)
        setSubmitServiceInput(false)
        setFileList(null)
        console.log("Finished")
        getServices('')
			  navigate("/services")

      }

    } 
    
  }, [submitServiceInput, validateServiceName, validateCategory, validateItems, formData]);

  return (
    <form className="py-10 px-6 text-base font-medium leading-normal">
      {/* Service name */}
      <div className="mb-10">
        <label className="text-gray-700 w-52 inline-block mr-6">
          ชื่อบริการ<span className="text-rose-700">*</span>
        </label>
        <Controller
          name="serviceName"
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

      {/* Category */}
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

      {/* Image */}
      <div className="mb-10 flex">
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
          {fields.map((_, index) => (
            <div key={index} className="flex justify-items-start items-center gap-3 mb-10">
              <div className="flex gap-0.5 mr-3">
                <img src={dot} alt='dot' />
                <img src={dot} alt='dot' />
              </div>

              <div className='flex w-[90%] gap-3'>
                    <div className='flex flex-col gap-1 w-[50%]'>
                      <div className='flex justify-between'>
                        <label>ชื่อรายการ</label>
                        {!isItemsValidate ? (
                          <span className="text-rose-700 text-xs font-normal">{`ชื่อรายการที่ ${index + 1} ต้องไม่ว่าง`}</span>
                        ) : null}

                      </div>
                      <Input
                        type="text"
                        className={`w-[100%] h-9 px-3 py-2 ${!isItemsValidate ? "border-rose-700 focus:border-rose-700" : null}`}
                        style={{ borderColor: !isItemsValidate ? "#C82438" : "" }}
                        value={validateItems[index]?.itemName || ''} // กำหนดค่า value จาก validateItems
                        onChange={(e) => {
                          // อัปเดตค่า validateItems โดยคัดลอกค่าเดิมและอัปเดตเฉพาะ item ที่เปลี่ยนแปลง
                          const updatedValidateItems = [...validateItems];
                          updatedValidateItems[index] = {
                            ...updatedValidateItems[index],
                            itemName: e.target.value,
                          };
                          setValidateItems(updatedValidateItems);
                        }}
                      />
                </div>
                <div className='relative flex flex-col gap-1 w-[25%] '>
                      <div className='flex justify-between'>
                        <label>ค่าบริการ / 1 หน่วย</label>
                        {!isItemsValidate ? (
                          <span className="text-rose-700 text-xs font-normal">{`ค่าบริการต้องเป็นตัวเลข`}</span>
                        ) : null}

                      </div>
                      <Input
                        type="number"
                        className={`w-[100%] h-9 px-3 py-2 ${!isItemsValidate ? "border-rose-700 focus:border-rose-700" : null}`}
                        style={{ borderColor: !isItemsValidate ? "#C82438" : "" }}
                        value={validateItems[index]?.itemPrice || ''} // กำหนดค่า value จาก validateItems
                        onChange={(e) => {
                          // อัปเดตค่า validateItems โดยคัดลอกค่าเดิมและอัปเดตเฉพาะ item ที่เปลี่ยนแปลง
                          const updatedValidateItems = [...validateItems];
                          updatedValidateItems[index] = {
                            ...updatedValidateItems[index],
                            itemPrice: e.target.value,
                          };
                          setValidateItems(updatedValidateItems);
                        }}
                      />
                  <img src={baht} alt="baht" className='w-[9px] h-[15px] absolute top-8 right-4' />
                </div>
                    <div className='flex flex-col gap-1 w-[25%]'>
                      <div className='flex justify-between'>
                        <label>หน่วยบริการ</label>
                        {!isItemsValidate ? (
                          <span className="text-rose-700 text-xs font-normal">{`หน่วยบริการที่ ${index + 1} ต้องไม่ว่าง`}</span>
                        ) : null}

                      </div>
                      <Input
                        type="text"
                        className={`w-[100%] h-9 px-3 py-2 ${!isItemsValidate ? "border-rose-700 focus:border-rose-700" : null}`}
                        style={{ borderColor: !isItemsValidate ? "#C82438" : "" }}
                        value={validateItems[index]?.itemUnit || ''} // กำหนดค่า value จาก validateItems
                        onChange={(e) => {
                          // อัปเดตค่า validateItems โดยคัดลอกค่าเดิมและอัปเดตเฉพาะ item ที่เปลี่ยนแปลง
                          const updatedValidateItems = [...validateItems];
                          updatedValidateItems[index] = {
                            ...updatedValidateItems[index],
                            itemUnit: e.target.value,
                          };
                          setValidateItems(updatedValidateItems);
                        }}
                      />
                </div>

              </div>
              {fields.length > 1 ? (
                <button type="button" className="duration-300 text-blue-600 text-base font-semibold underline leading-normal" onClick={() => { deleteItems(index) }}>
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
            itemName: '',
            itemPrice: 0,
            itemUnit: '',
          })
        }
        variant="secondary"
      >
        เพิ่มรายการ
        <img src={plus} alt="plus" />
      </Button>
    </form>
  );

}

export default ServiceInput
