import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Municipalities from './Municipalities'
import { Container, Select } from '@chakra-ui/react'

export const ProvinceContext = React.createContext(1)

// Create array of value pairs of provinces to labels

const options = [
	{ value: 1, label: 'Eastern Cape' },
	{ value: 2, label: 'Free State' },
	{ value: 3, label: 'Gauteng' },
	{ value: 4, label: 'KwaZulu-Natal' },
	{ value: 5, label: 'Limpopo' },
	{ value: 6, label: 'Mpumalanga' },
	{ value: 7, label: 'North West' },
	{ value: 8, label: 'Northern Cape' },
	{ value: 9, label: 'Western Cape' },
]

/* Provinces component which returns a response containing data of each
   relevant municipality and passes it as a prop to the child components.
*/

function Provinces() {
	const [currentProvince, setCurrentProvince] = useState('1')
	const [response, setResponse] = useState([])
	const selectProvince = (e) => {
		e.preventDefault()
		const selection =
			options.findIndex((option) => option.label === e.target.value) + 1
		setCurrentProvince(String(selection))
	}

	useEffect(() => {
		fetch(
			`http://loadshedding.eskom.co.za/LoadShedding/GetMunicipalities/?id=${currentProvince}`
		)
			.then((data) => data.json())
			.then((json) => setResponse(json))
			.catch((err) => console.error(err))
	}, [currentProvince])

	return (
		<Container>
			<ProvinceContext.Provider value={Number(currentProvince)}>
				<Select onChange={selectProvince} placeholder="Select Province">
					{options.map((item) => (
						<option key={item.value}>{item.label}</option>
					))}
				</Select>
				<Municipalities data={response} />
			</ProvinceContext.Provider>
		</Container>
	)
}

export default Provinces

Provinces.propTypes = {
	response: PropTypes.array,
}
