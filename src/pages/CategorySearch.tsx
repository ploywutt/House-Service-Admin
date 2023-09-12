import { useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"

import { Topbar_search } from "@/components/Topbar/Topbar";
import useCategory from "@/hooks/useCategory";
import useDateVal from "@/hooks/useDateVal";

import dot from "../assets/icon/dot.png"
import garbage from "../assets/icon/garbage.svg"
import pen from "../assets/icon/pen.svg"

function CategorySearch() {

  const { getCategory, categories, loading, setCategories } = useCategory()
  const formatDate = useDateVal()

  function handleDragEnd(result: any) {
    if (!result.destination) return; // ไม่ได้ลากและวางสิ่งของให้ตรงไหน
    let tempCategory: [] = [...categories]
    let [selectedRow] = tempCategory.splice(result.source.index, 1)
    tempCategory.splice(result.destination.index, 0, selectedRow)
    setCategories(tempCategory)
    console.log(result)
    // ทำสิ่งที่คุณต้องการด้วยข้อมูลใหม่ที่จัดเรียงใหม่ในตัวแปร items
    // เช่นอัปเดตสถานะในฐานข้อมูลหรือส่งคำขอ API
  }

  useEffect(() => {
    getCategory()
  }, [])

  return (
    <div className="w-full">
      <Topbar_search title='หมวดหมู่' />
      {loading ? <h1>Loading ...</h1> : null}
      <div className="mx-auto w-[90%] mt-10 border rounded-lg">
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
                              <td className="px-6">{formatDate(category.createAt)}</td>
                              <td className="px-6">{formatDate(category.updateAt)}</td>
                              <td className={`text-center px-6 ${index === categories.length - 1 ? "rounded-br-lg" : ""} `}>
                                <div className="flex justify-center gap-6">
                                  <img src={garbage} alt='garbage' className="hover:cursor-pointer hover:scale-110" />
                                  <img src={pen} alt='pen' className="hover:cursor-pointer hover:scale-110" />
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
            {/* <tbody className="bg-white">
              {
                categories && categories.length !== 0 ?
                  categories.map((category: any, index: number) => {
                    return (
                      <tr key={category.id} className="h-20">
                        <td className={`text-center ${index === categories.length - 1 ? "rounded-bl-lg" : ""} `}>
                          <div className="flex justify-center gap-0.5 hover:cursor-move">
                            <img src={dot} alt='dot' />
                            <img src={dot} alt='dot' />
                          </div>
                        </td>
                        <td className="text-center px-6">{index + 1}</td>
                        <td className="px-6">{category.category_name}</td>
                        <td className="px-6">{formatDate(category.createAt)}</td>
                        <td className="px-6">{formatDate(category.updateAt)}</td>
                        <td className={`text-center px-6 ${index === categories.length - 1 ? "rounded-br-lg" : ""} `}>
                          <div className="flex justify-center gap-6">
                            <img src={garbage} alt='garbage' className="hover:cursor-pointer hover:scale-110" />
                            <img src={pen} alt='pen' className="hover:cursor-pointer hover:scale-110" />
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
                    <td className="rounded-br-lg"></td>
                  </>
              }
            </tbody> */}
          </table>
        </DragDropContext>
      </div>
    </div>
  );
}

export default CategorySearch;