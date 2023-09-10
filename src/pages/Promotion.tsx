import { useRoutes, RouteObject } from 'react-router-dom';
import { Topbar_add, Topbar_detail, Topbar_edit, Topbar_search } from "@/components/Topbar/Topbar";

const promotionRoutes: RouteObject[] = [
	{
		path: '',
		children: [
			{ path: '', element: <Topbar_search title=' Promotion Code' /> },
			{ path: 'add', element: <Topbar_add title=' Promotion Code' /> },
			{ path: 'edit', element: <Topbar_edit title=' Promotion Code' /> },
			{ path: 'detail', element: <Topbar_detail title=' Promotion Code' /> },
		],
	},
];

function Promotions() {
	const element = useRoutes(promotionRoutes);

	return (
		<div className="w-full">
			{element}
		</div>
	);
}

export default Promotions;