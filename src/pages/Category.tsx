import { useRoutes, RouteObject } from 'react-router-dom';
import { Topbar_add, Topbar_detail, Topbar_edit, Topbar_search } from "@/components/Topbar/Topbar";

const categoryRoutes: RouteObject[] = [
  {
    path: '',
    children: [
      { path: '', element: <Topbar_search title='หมวดหมู่' /> },
      { path: 'add', element: <Topbar_add title='หมวดหมู่' /> },
      { path: 'edit', element: <Topbar_edit title='หมวดหมู่' /> },
      { path: 'detail', element: <Topbar_detail title='หมวดหมู่' /> },
    ],
  },
];

function Category() {
  const element = useRoutes(categoryRoutes);

  return (
    <div className="w-full">
      {element}
    </div>
  );
}

export default Category;