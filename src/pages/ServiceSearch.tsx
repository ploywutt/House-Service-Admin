import { useProduct } from '@/contexts/productsContext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import Topbar_search from '@/components/Topbar/TopbarSearch';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { AlertDialog } from '@radix-ui/react-alert-dialog';
import { AlertDialogTrigger } from '@/components/ui/alert-dialog';
import Alert from '@/components/Alert/Alert';

import dot from "../assets/icon/dot.png"
import garbage from "../assets/icon/garbage.svg"
import pen from "../assets/icon/pen.svg"
import useDateVal from '@/hooks/useDateVal';
import useService from '@/hooks/useService';

function ServiceSearch() {


  const navigate = useNavigate()
  const { getServices } = useService();

  const {
    loading, setLoading,
    services, setServices,
    searchService, setSearchService,

  }: any = useProduct();

  const { formatDateTime } = useDateVal()

  function handleDragEnd(result: any) {

    if (!result.destination) return; // ไม่ได้ลากและวางสิ่งของให้ตรงไหน
    let tempCategory: any[] = [...services]
    let [selectedRow] = tempCategory.splice(result.source.index, 1)
    tempCategory.splice(result.destination.index, 0, selectedRow)
    setServices(tempCategory)
    console.log(result)
    // ทำสิ่งที่คุณต้องการด้วยข้อมูลใหม่ที่จัดเรียงใหม่ในตัวแปร items
    // เช่นอัปเดตสถานะในฐานข้อมูลหรือส่งคำขอ API
  }

  useEffect(() => {
    getServices(searchService)
  }, [searchService])

	return (
    <div className="w-full">
      <Topbar_search title='บริการ' path="/services/add" />
      {loading ? <h1>Loading ...</h1> : null}
      <div className="mx-auto w-[90%] max-w-[1440px] my-10 border rounded-lg">
        <DragDropContext onDragEnd={(result) => handleDragEnd(result)}>
          <table className="table-auto w-full">
            <thead className="h-10 bg-gray-200 border-b">
              <tr className="text-left text-gray-700 .p3">
                <th className="w-14 px-6 py-2.5 rounded-tl-lg"></th>
                <th className="text-center px-6 w-20">ลำดับ</th>
                <th className="w-60 px-6">ชื่อบริการ</th>
                <th className="w-60 px-6">หมวดหมู่</th>
                <th className="w-60 px-6">สร้างเมื่อ</th>
                <th className="w-96 px-6">แก้ไขล่าสุด</th>
                <th className="text-center w-28 rounded-tr-lg">Action</th>
              </tr>
            </thead>
            <Droppable droppableId="tbody">
              {(provided) => (
                <tbody ref={provided.innerRef} {...provided.droppableProps} className="bg-white">
                  {services && services.length !== 0 ?
                    services.map((service: any, index: number) => {
                      return (
                        <Draggable key={service.id} draggableId={service.id.toString()} index={index}>
                          {(provided) => (
                            <tr
                              key={services.id}
                              className="h-20"
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <td className={`text-center ${index === services.length - 1 ? "rounded-bl-lg" : ""} `}>
                                <div className="flex justify-center gap-0.5 hover:cursor-move">
                                  <img src={dot} alt='dot' />
                                  <img src={dot} alt='dot' />
                                </div>
                              </td>
                              <td className="text-center px-6">{index + 1}</td>
                              <td className="px-6">{service.service_name}</td>
                              <td className="px-6"><span className="px-2.5 py-1 bg-sky-100 rounded-lg text-sky-900">{service.category}</span></td>
                              <td className="px-6">{formatDateTime(service.createAt)}</td>
                              <td className="px-6">{formatDateTime(service.updateAt)}</td>
                              <td className={`text-center px-6 ${index === services.length - 1 ? "rounded-br-lg" : ""} `}>
                                <div className="flex justify-center gap-6">
                                  <AlertDialog>
                                    <AlertDialogTrigger>
                                      <img
                                        src={garbage}
                                        alt='garbage'
                                        className="hover:cursor-pointer hover:scale-110 min-w-[20px]"
                                      />
                                    </AlertDialogTrigger>
                                    <Alert name={service.service_name} id={service.id} title='บริการ' />
                                  </AlertDialog>
                                  <img src={pen} alt='pen' className="hover:cursor-pointer hover:scale-110" onClick={() => navigate(`/services/detail/${service.id}`)} />
                                </div>
                              </td>
                            </tr>
                          )}
                        </Draggable>
                      )
                    }) :
                    <>
                      <td className="rounded-bl-lg"></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td className="rounded-br-lg"></td>
                    </>
                  }
                  {provided.placeholder}
                </tbody>
              )}
            </Droppable>
          </table>
        </DragDropContext>
      </div>
    </div>
  );
}

export default ServiceSearch