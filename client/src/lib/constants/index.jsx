import { IoBodySharp, IoSpeedometer, IoListSharp } from "react-icons/io5";

export const DASHBOARD_SIDEBAR_LINKS = [
	{
		key: 'dashboard',
		label: 'Dashboard',
		path: '/',
		icon: <IoSpeedometer />
	},
	{
		key: 'input',
		label: 'Input Data',
		path: '/input',
		icon: <IoBodySharp />
	},
	{
		key: 'data',
		label: 'List Data',
		path: '/data',
		icon: <IoListSharp />
	}
]
