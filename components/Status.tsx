import React from 'react'
import { Container } from '@chakra-ui/react'
import PropTypes from 'prop-types'
import Provinces from './Provinces'

export default function Status({status}) {
	return (
	<Container> Loadshedding Stage : {status} 
		<Provinces />
	</Container>)
}

Status.propTypes = {
	status: PropTypes.number,
}
