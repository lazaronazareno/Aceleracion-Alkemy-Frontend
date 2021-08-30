import React from 'react'
import { Container, Alert, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './testStyles.scss'

function Contribuye() {
	return (
		<Container>
			<Alert className="d-flex flex-column yellow align-items-center fs-1">
        ¿Querés colaborar con Somos Más?
				<p style={{fontSize:20}}> Dale click al botón CONTRIBUIR y ponete en contacto con nosotros </p>
				<Link to="/contacto">
					<Button className="red" variant="danger" size="lg">
          CONTRIBUIR
					</Button>
				</Link>
			</Alert>
		</Container>
	)
}

export default Contribuye