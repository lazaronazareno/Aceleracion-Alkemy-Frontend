import React from 'react'
import * as yup from 'yup'
import { Formik } from 'formik'
import { Form, Col, Button, Card } from 'react-bootstrap'
import axios from 'axios'
import {useDispatch} from 'react-redux'
import actions from '../../redux/actions'

function FormLogin() {
	const schema = yup.object().shape({
		email: yup.string().required(),
		password: yup.string().required()
	})

	const dispatch = useDispatch()
	const {addUser, addAuth} = actions
	return (
		<div>
			<Formik
				validationSchema={schema}
				initialValues={{
					email: '',
					password: ''
				}}
				validate={values => {
					const errors = {}
					if (!values.email) {
						errors.email = 'Debes ingresar un email.'
					} else if (
						!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
					) {
						errors.email = 'Formato de email invalido.'
					}
					if (!values.password) {
						errors.password = 'Debes ingresar una contraseña.'
					}
					return errors
				}}
				onSubmit={ async (values, { setSubmitting }) => {
					setSubmitting(false)
					const response = await axios.post('http://localhost:4000/auth/login', values)
					/* 
					FYI: This should be replace with the axios instance after fix problems
					*/

					const {token, user} = response.data
					localStorage.setItem('token', `Bearer ${token}`)
					dispatch(addAuth(true))
					dispatch(addUser(user))
				}}
			>
				{({ handleSubmit, handleChange, values, touched, errors }) => (

					<Form noValidate onSubmit={handleSubmit}>
						<Card style={{ width: '24rem' }} className="mx-auto mt-5">
							<Card.Title className="mt-2">Iniciar sesión</Card.Title>
							<Card.Body>
								<Form.Group md="12" as={Col} controlId="validationEmail">
									<Form.Label>Email</Form.Label>
									<Form.Control
										type="text"
										name="email"
										placeholder="Email"
										value={values.email}
										onChange={handleChange}
										isValid={touched.email && !errors.email}
										isInvalid={!!errors.email}
									/>
									<Form.Control.Feedback type="invalid">
										{errors.email}
									</Form.Control.Feedback>
								</Form.Group>
								<Form.Group md="12" as={Col} controlId="validationPassword">
									<Form.Label>Password</Form.Label>
									<Form.Control
										type="text"
										name="password"
										placeholder="Contraseña"
										value={values.password}
										onChange={handleChange}
										isInvalid={!!errors.password}
										isValid={touched.password && !errors.password}
									/>

									<Form.Control.Feedback type="invalid">
										{errors.password}
									</Form.Control.Feedback>
								</Form.Group>
           
								<Button type="submit" className="mt-2">Ingresar</Button>
							</Card.Body>
						</Card>
					</Form>
				)}
			</Formik>
		</div>
	)
}

export default FormLogin