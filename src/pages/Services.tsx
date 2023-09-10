import { useRoutes, RouteObject } from 'react-router-dom';
import { Topbar_add, Topbar_detail, Topbar_edit, Topbar_search } from "@/components/Topbar/Topbar";

const serviceRoutes: RouteObject[] = [
  {
    path: '',
    children: [
      { path: '', element: <Topbar_search title='บริการ' /> },
      { path: 'add', element: <Topbar_add title='บริการ' /> },
      { path: 'edit', element: <Topbar_edit title='บริการ' /> },
      { path: 'detail', element: <Topbar_detail title='บริการ' /> },
    ],
  },
];

function Services() {
  const element = useRoutes(serviceRoutes);

  return (
    <div className="w-full">
      {element}
    </div>
  );
}

export default Services;