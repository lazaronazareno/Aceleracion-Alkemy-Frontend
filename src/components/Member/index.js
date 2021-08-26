import React from 'react'
import { Card } from 'react-bootstrap'
import PropTypes from 'prop-types'
import './styles.css'

const Member = ({image, name}) => {

	return (
		<Card className='memberCard'>
			<Card.Img variant='top' alt='#' src={image} />
			<Card.Body>
				<Card.Title>{name}</Card.Title>
			</Card.Body>
		</Card>
	)
}

Member.propTypes = {
	image: PropTypes.string,
	name: PropTypes.string
}

export default Member