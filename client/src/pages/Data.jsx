import React from 'react'
import ListData from '../components/ListData'
import Status from '../components/Status'


export default function Dashboard() {
	return (
		<div className="flex flex-col gap-4">
	 <Status />
     <ListData />
		</div>
	)
}
