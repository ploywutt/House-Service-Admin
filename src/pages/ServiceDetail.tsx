import Topbar_detail from '@/components/Topbar/TopbarDetail';
import { useProduct } from '@/contexts/productsContext';
import useDateVal from '@/hooks/useDateVal';
import useService from '@/hooks/useService';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function ServiceDetail() {
  const params: any = useParams()
  const [trigger, setTrigger] = useState<boolean | null>(null)

  const { 
    loading, 
    imagePath, 
    newService,
  }: any = useProduct()

  const {
    downloadFile,
    getServiceById
  } = useService()

  const { formatDateTime } = useDateVal()
  
  useEffect(() => {
    async function fectData() {
      await getServiceById(params.id)
    }
    fectData()
  }, [])

  useEffect(() => {
    if (newService?.subServices) {
      async function fectData() {
        await downloadFile()
      }
      fectData()
    }
  }, [newService])


  return (
    <div className="w-full">
      <Topbar_detail title='บริการ' path="" trigger={trigger} setTrigger={setTrigger}/>
      <div className="mx-auto w-[90%] max-w-[1440px] my-14 border rounded-lg bg-white">
        <div className="py-6 px-6 text-base text-gray-700 font-medium leading-normal flex">
          <div className="w-52 inline-block mr-6">
            ชื่อบริการ
          </div>
          <div className='text-black text-base font-normal leading-normal'>{newService?.service_name}</div>
        </div>
        <div className="py-6 px-6 text-base text-gray-700 font-medium leading-normal flex">
          <div className="w-52 inline-block mr-6">
            หมวดหมู่
          </div>
          <div className='text-black text-base font-normal leading-normal'>{newService?.category}</div>
        </div>
        <div className="py-10 px-6 text-base text-gray-700 font-medium leading-normal flex ">
          <div className="w-52 mr-6">
            รูปภาพ
          </div>
          {
            loading ?
              (<div className='w-96 h-36 rounded-lg border flex justify-center items-center'>
                <h1>Loading....</h1>
              </div>) :
              (<img src={imagePath} alt={newService?.pic_service} className="w-96 min-h-36 rounded-lg border" />)
          }
        </div>

        <div className="w-[96%] mx-auto border border-gray-300"></div>

        <div className="my-10 px-6">
          <div className="w-52 mb-10 inline-block mr-6 text-base text-gray-700 font-medium leading-normal">
            รายการบริการย่อย
          </div>
          {
            newService && (
              newService?.subServices.map((subService: any, index: number) => {
                return (
                  <div key={index} className='flex gap-6 mb-8'>
                    <div className='w-[50%] space-y-1'>
                      <div className='text-gray-500 text-sm font-normal leading-tight'>ชื่อรายการ</div>
                      <div className='text-black text-base font-normal leading-normal'>{subService?.sub_service_name}</div>
                    </div>

                    <div className='w-[25%] space-y-1'>
                      <div className='text-gray-500 text-sm font-normal leading-tight'>หน่วยบริการ</div>
                      <div className='text-black text-base font-normal leading-normal'>{subService?.unit}</div>
                    </div>

                    <div className='w-[25%] space-y-1'>
                      <div className='text-gray-500 text-sm font-normal leading-tight'>ค่าบริการ / 1 หน่วย</div>
                      <div className='text-black text-base font-normal leading-normal'>{subService?.price_per_unit}
                      </div>
                    </div>
                  </div>
                )
              })
            )
          }
        </div>

        <div className="w-[96%] mx-auto border border-gray-300"></div>

        <div className="py-10 px-6 text-gray-700 text-base font-medium leading-normal">
          <div>
            <span className="w-52 mr-6 py-6 inline-block">สร้างเมื่อ</span><span>{formatDateTime(String(newService?.createAt))}</span>
          </div>
          <div>
            <span className="w-52 mr-6 py-6 inline-block">แก้ไขล่าสุด</span><span>{formatDateTime(String(newService?.updateAt))}</span>
          </div>
        </div>
      </div>

    </div>
  );
}

export default ServiceDetail