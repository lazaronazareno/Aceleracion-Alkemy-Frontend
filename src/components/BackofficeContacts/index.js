import React, { useState, useEffect } from 'react'
import useAxios from '../../libs/axiosInstance'
import { Table, Container } from 'react-bootstrap'
import Loader from '../../shared/Loader/Loader'

const httpConfig = {
	url: '/contacts',
	method: 'get'
}

function BackofficeContacts() {
	const { response, error, loading, fetchData } = useAxios()
	const [contacts, setContacts] = useState([])

	useEffect(() => {
		if (!loading && response) {
			setContacts(response.data)
		}
	}, [loading, response, error])

	useEffect(() => {
		fetchData({ url: httpConfig.url, method: httpConfig.method })
	}, [])

	if (error) {
		return (
			<Container>
				<h1>Hubo un error al traer los datos desde el servidor...</h1>
			</Container>
		)
	}
	return (
		<Container>
			{loading ?
				<Loader /> :
				<Table striped bordered hover>
					<thead>
						<tr>
							<th>Nombre</th>
							<th>Teléfono</th>
							<th>Email</th>
							<th>Mensaje</th>
						</tr>
					</thead>
					<tbody>
						{
							contacts.map(({ id, name, phone, email, message }) => {
								return (
									<tr key={id}>
										<td>{name}</td>
										<td>{phone}</td>
										<td>{email}</td>
										<td>{message}</td>
									</tr>
								)
							})
						}
					</tbody>
				</Table>
			}
		</Container>
	)
}

export default BackofficeContacts
