import React, { useState } from 'react'
import { Container, Select } from '@chakra-ui/react'
import PropTypes from 'prop-types'
import Search from '../components/Search'

// List Municipalities for a selected province

export default function Municipalities({ data }) {
	const [currentMunicipality, changeMunicipality] = useState(null)

	const selectMunicipality = (e) => {
		const selectedMunicipality = e.target.options[e.target.selectedIndex].id
		changeMunicipality(selectedMunicipality)
	}

	if (data.length === 0) {
		return <div>No Data</div>
	} else
		return (
			<Container>
				<Select onChange={selectMunicipality} placeholder="Select Municipality">
					{data.map((item) => (
						<option key={item.Value} id={item.Value}>
							{' '}
							{item.Text}{' '}
						</option>
					))}
				</Select>

				<Search id={currentMunicipality} />
			</Container>
		)
}

Municipalities.propTypes = {
	data: PropTypes.array,
}
