import React, {useState} from 'react'
import { Container, Image, Button, ListGroup } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './styles.scss'
import { useSelector } from 'react-redux'
import Sweel from '../../shared/Alert/Alert'

function UserProfile() {
	const user = useSelector((state) => state.user)	

	const [show, setShow] = useState(false)
	const onClick = () => {
		setShow(true)
	}
	const onConfirm = () => {
		setShow(false)
	}

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
				<Button variant="danger" onClick={onClick}>Eliminar Cuenta</Button>
			</Container>
			<Sweel show={show}
				title={'Usuario Eliminado'}
				text={'Usuario eliminado correctamente'}
				type={'success'}
				onConfirm={onConfirm} />
		</Container>
	)
}

export default UserProfile
