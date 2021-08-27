import React from 'react'
import WelcomeTextEdit from './WelcomeTextEdit'
import SlidesEdit from './SlidesEdit'
import { Container } from 'react-bootstrap'

function BackofficeHome() {
	return (
		<Container className="d-flex flex-column text-dark border-blue p-0">
			<WelcomeTextEdit />
			<SlidesEdit />
		</Container>
	)
}

export default BackofficeHome
