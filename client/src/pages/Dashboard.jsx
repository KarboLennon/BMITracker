import React from 'react'
import Status from '../components/Status'
import Grafik from '../components/Grafik'
import TipsDiet from '../components/TipsDiet'

export default function Dashboard() {
	return (
		<div className="flex flex-col gap-4">
			<Status />
			<div className="flex flex-row gap-4 w-full">
				<Grafik />
			</div>
			<div className="flex flex-row gap-4 w-full">
				<TipsDiet />
			</div>
		</div>
	)
}
