import Alert from "@/components/Alert/Alert";
import Topbar_search from "@/components/Topbar/TopbarSearch";
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useProduct } from "@/contexts/productsContext";
import useDateVal from "@/hooks/useDateVal";
import usePromotion from "@/hooks/usePromotion";
import { useEffect } from "react";
// import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useNavigate } from "react-router-dom";

import garbage from "../assets/icon/garbage.svg"
import pen from "../assets/icon/pen.svg"

function PromotionSearch() {
  const navigate = useNavigate();
  const {
    loading,
    promotions, setPromotions,
    searchPromotion, setSearchPromotion,

  }: any = useProduct();

  const {
    getPromotions,
  } = usePromotion();

  const { formatDateTime } = useDateVal();

  // function handleDragEnd(result: any) {

  //   if (!result.destination) return; // ไม่ได้ลากและวางสิ่งของให้ตรงไหน
  //   let tempCategory: any[] = [...promotions]
  //   let [selectedRow] = tempCategory.splice(result.source.index, 1)
  //   tempCategory.splice(result.destination.index, 0, selectedRow)
  //   setPromotions(tempCategory)
  //   console.log(result)
  //   // ทำสิ่งที่คุณต้องการด้วยข้อมูลใหม่ที่จัดเรียงใหม่ในตัวแปร items
  //   // เช่นอัปเดตสถานะในฐานข้อมูลหรือส่งคำขอ API
  // }

  useEffect(() => {
    getPromotions(searchPromotion)
  }, [searchPromotion])
  return (
    <div className="w-full">
      <Topbar_search title='Promotion Code' path="/promotions/add" />
      {loading ? <h1>Loading ...</h1> : null}
      <div className="mx-auto w-[90%] max-w-[1440px] my-10 border rounded-lg">

        {/* <DragDropContext onDragEnd={(result) => handleDragEnd(result)}>
          <table className="table-auto w-full">
            <thead className="h-10 bg-gray-200 border-b">
              <tr className="text-left text-gray-700 .p3">
                <th className="w-40 px-6 py-2.5 rounded-tl-lg">Promotion Code</th>
                <th className="text-center px-6 w-28">ประเภท</th>
                <th className="w-36 px-6">โควต้าการใช้(ครั้ง)</th>
                <th className="w-36 px-6">ราคาที่ลด</th>
                <th className="w-52 px-6">สร้างเมื่อ</th>
                <th className="w-56 px-6">วันหมดอายุ</th>
                <th className="text-center w-28 rounded-tr-lg">Action</th>
              </tr>
            </thead>
            <Droppable droppableId="tbody">
              {(provided) => (
                <tbody ref={provided.innerRef} {...provided.droppableProps} className="bg-white">
                  {promotions && promotions.length !== 0 ?
                    promotions.map((promotion: any, index: number) => {
                      return (
                        <Draggable key={promotion.promotion_id} draggableId={promotion.promotion_id.toString()} index={index}>
                          {(provided) => (
                            <tr
                              key={promotions.id}
                              className="h-20"
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <td className={`px-6 ${index === promotions.length - 1 ? "rounded-bl-lg" : ""} `}>
                                {promotion.promotion_code}
                              </td>
                              <td className="px-6">{promotion.type}</td>
                              <td className="px-6">{promotion.quota}</td>
                              {
                                promotion.type === "Fixed" ?
                                <td className="px-6 text-rose-700">{`-${promotion.discount_amount}.00฿`}</td> :
                                <td className="px-6 text-rose-700">{`-${promotion.discount_amount}.00%`}</td>
                              }
                              <td className="px-6">{formatDateTime(promotion.created_at)}</td>
                              <td className="px-6">{formatDateTime(promotion.expired_time)}</td>
                              <td className={`text-center px-6 ${index === promotions.length - 1 ? "rounded-br-lg" : ""} `}>
                                <div className="flex justify-center gap-6">
                                  <AlertDialog>
                                    <AlertDialogTrigger>
                                      <img
                                        src={garbage}
                                        alt='garbage'
                                        className="hover:cursor-pointer hover:scale-110 min-w-[20px]"
                                      />
                                    </AlertDialogTrigger>
                                    <Alert name={promotion.promotion_code} id={promotion.promotion_id} title='บริการ' />
                                  </AlertDialog>
                                  <img src={pen} alt='pen' className="hover:cursor-pointer hover:scale-110" onClick={() => navigate(`/promotions/detail/${promotion.promotion_id}`)} />
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
                      <td></td>
                      <td className="rounded-br-lg"></td>
                    </>
                  }
                  {provided.placeholder}
                </tbody>
              )}
            </Droppable>
          </table>
        </DragDropContext> */}

        <table className="table-auto w-full">
          <thead className="h-10 bg-gray-200 border-b">
            <tr className="text-left text-gray-700 .p3">
              <th className="w-40 px-6 py-2.5 rounded-tl-lg">Promotion Code</th>
              <th className="text-center px-6 w-28">ประเภท</th>
              <th className="w-36 px-6">โควต้าการใช้(ครั้ง)</th>
              <th className="w-36 px-6">ราคาที่ลด</th>
              <th className="w-52 px-6">สร้างเมื่อ</th>
              <th className="w-56 px-6">วันหมดอายุ</th>
              <th className="text-center w-28 rounded-tr-lg">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {promotions && promotions.length !== 0 ?
              promotions.map((promotion: any, index: number) => {
                return (
                  <tr
                    key={index}
                    className="h-20"

                  >
                    <td className={`px-6 ${index === promotions.length - 1 ? "rounded-bl-lg" : ""} `}>
                      {promotion.promotion_code}
                    </td>
                    <td className="px-6">{promotion.type}</td>
                    <td className="px-6">{promotion.quota}</td>
                    {
                      promotion.type === "Fixed" ?
                        <td className="px-6 text-rose-700">{`-${promotion.discount_amount}.00฿`}</td> :
                        <td className="px-6 text-rose-700">{`-${promotion.discount_amount}.00%`}</td>
                    }
                    <td className="px-6">{formatDateTime(promotion.created_at)}</td>
                    <td className="px-6">{formatDateTime(promotion.expired_time)}</td>
                    <td className={`text-center px-6 ${index === promotions.length - 1 ? "rounded-br-lg" : ""} `}>
                      <div className="flex justify-center gap-6">
                        <AlertDialog>
                          <AlertDialogTrigger>
                            <img
                              src={garbage}
                              alt='garbage'
                              className="hover:cursor-pointer hover:scale-110 min-w-[20px]"
                            />
                          </AlertDialogTrigger>
                          <Alert name={promotion.promotion_code} id={promotion.promotion_id} title='Promotion Code' />
                        </AlertDialog>
                        <img src={pen} alt='pen' className="hover:cursor-pointer hover:scale-110" onClick={() => navigate(`/promotions/detail/${promotion.promotion_id}`)} />
                      </div>
                    </td>
                  </tr>
                )
              }) :
              <>
                <td className="rounded-bl-lg"></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td className="rounded-br-lg"></td>
              </>
            }
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PromotionSearch