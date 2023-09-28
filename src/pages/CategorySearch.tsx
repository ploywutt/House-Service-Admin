import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"

import Topbar_search from "@/components/Topbar/TopbarSearch";
import useDateVal from "@/hooks/useDateVal";
import {
  AlertDialog,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import Alert from "@/components/Alert/Alert";
import { useProduct } from "@/contexts/productsContext";
import useCategory from "@/hooks/useCategory";

import dot from "../assets/icon/dot.png"
import garbage from "../assets/icon/garbage.svg"
import pen from "../assets/icon/pen.svg"

function CategorySearch() {

  const navigate = useNavigate()
  const { getCategory, updateRecommend } = useCategory()
  const [trigger, setTrigger] = useState<boolean | null>(null)

  const {
    searchCategory,
    categories, setCategories,
    loading,
  }: any = useProduct()

  const { formatDateTime } = useDateVal()

  function handleDragEnd(result: any) {
    if (!result.destination) return; // ไม่ได้ลากและวางสิ่งของให้ตรงไหน
    let tempCategory: any[] = [...categories]
    let [selectedRow] = tempCategory.splice(result.source.index, 1)
    tempCategory.splice(result.destination.index, 0, selectedRow)
    setCategories(tempCategory)
    // console.log(tempCategory)
    // สร้างข้อมูลที่ต้องการส่งไปยังเซิร์ฟเวอร์
    const dataToUpdateServer = tempCategory.map((category, index) => ({
      id: category.id,
      position: index + 1, // ตำแหน่งใหม่ของรายการหมวดหมู่
    }));
    // console.log("ตำแหน่งใหม่ของรายการหมวดหมู่ ---->", dataToUpdateServer)
    updateRecommend(dataToUpdateServer)
  }

  useEffect(() => {
    getCategory(searchCategory)
  }, [searchCategory])


  return (
    <div className="w-full">
      <Topbar_search title='หมวดหมู่' path="/categories/add" trigger={trigger} setTrigger={setTrigger} />
      {loading ? <h1>Loading ...</h1> : null}
      <div className="mx-auto w-[90%] max-w-[1440px] my-10 border rounded-lg">
        <DragDropContext onDragEnd={(result) => handleDragEnd(result)}>
          <table className="table-auto w-full">
            <thead className="h-10 bg-gray-200 border-b">
              <tr className="text-left text-gray-700 .p3">
                <th className="w-14 px-6 py-2.5 rounded-tl-lg"></th>
                <th className="text-center px-6 w-20">ลำดับ</th>
                <th className="w-60 px-6">ชื่อหมวดหมู่</th>
                <th className="w-60 px-6">สร้างเมื่อ</th>
                <th className="w-96 px-6">แก้ไขล่าสุด</th>
                <th className="text-center w-28 rounded-tr-lg">Action</th>
              </tr>
            </thead>
            <Droppable droppableId="tbody">
              {(provided) => (
                <tbody ref={provided.innerRef} {...provided.droppableProps} className="bg-white">
                  {categories && categories.length !== 0 ?
                    categories.map((category: any, index: number) => {
                      return (
                        <Draggable key={category.id} draggableId={category.id.toString()} index={index}>
                          {(provided) => (
                            <tr
                              key={category.id}
                              className="h-20"
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <td className={`text-center ${index === categories.length - 1 ? "rounded-bl-lg" : ""} `}>
                                <div className="flex justify-center gap-0.5 hover:cursor-move">
                                  <img src={dot} alt='dot' />
                                  <img src={dot} alt='dot' />
                                </div>
                              </td>
                              <td className="text-center px-6">{index + 1}</td>
                              <td className="px-6">{category.category_name}</td>
                              <td className="px-6">{formatDateTime(category.createAt)}</td>
                              <td className="px-6">{formatDateTime(category.updateAt)}</td>
                              <td className={`text-center px-6 ${index === categories.length - 1 ? "rounded-br-lg" : ""} `}>
                                <div className="flex justify-center gap-6">
                                  <AlertDialog>
                                    <AlertDialogTrigger>
                                      <img
                                        src={garbage}
                                        alt='garbage'
                                        className="hover:cursor-pointer hover:scale-110 min-w-[20px]"
                                      />
                                    </AlertDialogTrigger>
                                    <Alert name={category.category_name} id={category.id} title='หมวดหมู่' />
                                  </AlertDialog>
                                  <img src={pen} alt='pen' className="hover:cursor-pointer hover:scale-110" onClick={() => navigate(`/categories/detail/${category.id}`)} />
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

export default CategorySearch;