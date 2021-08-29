import React, { useEffect } from 'react'
import * as yup from 'yup'
import { useFormik } from 'formik'
import { Form, Col, Button, Card } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import actions from '../../redux/actions'
import { useHistory } from 'react-router-dom'
import { addAuth } from '../../redux/actions/authAction'
import useAxios from '../../libs/axiosInstance'

const FormRegister = () => {
	const { addUser } = actions
	const history = useHistory()
	const dispatch = useDispatch()
	const { response, error, loading, fetchData } = useAxios()
	const validationSchema = yup.object({
		firstName: yup.string().required('Debe ingresar su nombre'),
		lastName: yup.string().required('Debe ingresar su apellido'),
		email: yup.string().email('Formato de mail incorrecto').required('Debe ingresar un email'),
		password: yup.string().min(8, 'Debe tener un minimo de 8 caracters').required('Debe ingresar una contraseña'),
	})
  
	const handleSubmit = (body) => {
		fetchData({url:'/users/register', method:'post', body})
	}
    
	useEffect(() => {
		if(!loading && response) {
			const {token, data} = response
			console.log(response)
			console.log(data)
			localStorage.setItem('token', `Bearer ${token}`)
			dispatch(addAuth(true))
			dispatch(addUser(data))
			history.push('/')
		}
	}, [response, error, loading])

	const formik = useFormik({
		validationSchema: validationSchema, 
		initialValues: {
			lastName: '',
			firstName: '',
			email: '',
			password: '',
		},
		onSubmit: (values) => handleSubmit(values)
	})

	return (
		<Form onSubmit={formik.handleSubmit} className="container d-flex flex-column text-center">
			<Card style={{ width: '24rem' }} className="mx-auto mt-5">
				<Card.Title className="mt-2">Registro.</Card.Title>
				<Card.Body>
					<Form.Group md="12" as={Col} controlId="validationName">
						<Form.Label>Nombre</Form.Label>
						<Form.Control
							type="text"
							name="firstName"
							placeholder="Nombre"
							value={formik.values.firstName}
							onChange={formik.handleChange}
							isValid={formik.values.firstName && !formik.errors.firstName}
							isInvalid={formik.errors.firstName}
						/>
						<Form.Control.Feedback type="invalid">{formik.errors.firstName}</Form.Control.Feedback>
					</Form.Group>

					<Form.Group md="12" as={Col} controlId="validationlastname">
						<Form.Label>Apellido</Form.Label>
						<Form.Control
							type="text"
							name="lastName"
							placeholder="Apellido"
							value={formik.values.lastName}
							onChange={formik.handleChange}
							isValid={formik.values.lastName && !formik.errors.lastName}
							isInvalid={formik.errors.lastName}
						/>
						<Form.Control.Feedback type="invalid">{formik.errors.lastName}</Form.Control.Feedback>
					</Form.Group>

					<Form.Label>Email</Form.Label>
					<Form.Control
						type="email"
						name="email"
						placeholder="Email"
						value={formik.values.email}
						onChange={formik.handleChange}
						isValid={formik.values.email && !formik.errors.email}
						isInvalid={formik.errors.email}
					/>
					<Form.Control.Feedback type="invalid">{formik.errors.email}</Form.Control.Feedback>

					<Form.Group md="12" as={Col} controlId="validationPassword">
						<Form.Label>Contraseña</Form.Label>
						<Form.Control
							type="password"
							name="password"
							placeholder="Contraseña"
							value={formik.values.password}
							onChange={formik.handleChange}
							isValid={formik.values.password && !formik.errors.password}
							isInvalid={formik.errors.password}
						/>
						<Form.Control.Feedback type="invalid">{formik.errors.password}</Form.Control.Feedback>
					</Form.Group>

					<Button type="submit" className="mt-2">
                  Registrarme
					</Button>
				</Card.Body>
			</Card>
		</Form>
	)
}

export default FormRegister
