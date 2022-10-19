import React from 'react'
import Status from '../components/Status'
import Provinces from '../components/Provinces'
import { GetServerSideProps } from 'next'
import { number } from 'prop-types'

const statusEndpoint = 'https://loadshedding.eskom.co.za/LoadShedding/GetStatus'

export const getServerSideProps: GetServerSideProps = async () => {
	const res = await fetch(statusEndpoint)
	const status = await res.json()

	return {
		props: {
			status,
		},
	}
}
export const StatusContext = React.createContext(1)

export default function index(props) {
	return (
		<div>
			<StatusContext.Provider value={props.status}>
				<Status status={props.status} />
			</StatusContext.Provider>
		</div>
	)
}

index.propTypes = {
	data: number,
}
