import React from 'react'
import { Container, Image, Button, ListGroup } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './styles.scss'
import { useSelector } from 'react-redux'

function UserProfile() {
	const user = useSelector((state) => state.user)	
	return (
		<Container className="">
			<Container className="yellow p-0">
				<Image className="referenceSize blue translate" src='https://image.flaticon.com/icons/png/512/848/848043.png' roundedCircle />
			</Container>
			<ListGroup className="translate" variant="flush">
				<ListGroup.Item className="fs-1 text-break">Nombre: {user.firstName}</ListGroup.Item>
				<ListGroup.Item className="fs-1 text-break">Apellido: {user.lastName}</ListGroup.Item>
				<ListGroup.Item className="fs-1 text-break">Email: {user.email}</ListGroup.Item>
			</ListGroup>
			<Container className="translate buttons d-flex justify-content-evenly">
				<Button as={Link} to='/editUser' className="btn-info" size="lg">Editar Datos</Button>
				<Button variant="danger" onClick={() => alert('Cuenta Eliminada(añadir accion en el futuro)')} size="lg">Eliminar Cuenta</Button>
			</Container>
		</Container>
	)
}

export default UserProfile
