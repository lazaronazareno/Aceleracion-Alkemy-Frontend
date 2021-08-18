import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { Button } from 'react-bootstrap'

function Contact() {
	const initialValues = {
		name: '',
		lastName: '',
		email: '',
		message: '',
	}

	const validationSchema = Yup.object({
		name: Yup.string().required('Requerido'),
		lastName: Yup.string().required('Requerido'),
		email: Yup.string().email('Formato invalido').required('Requerido'),
		message: Yup.string().required('Requerido'),
	})

	const onSubmit = (values, onSubmitProps) => {
		console.log(values)
		//FYI agregar el endpoint de contacto
		onSubmitProps.resetForm()
	}
	return (
		<Formik
			initialValues={initialValues}
			validationSchema={validationSchema}
			onSubmit={onSubmit}
		>
			<Form className="container d-flex flex-column text-dark border border-dark mt-2 p-5">
				<h1 className="d-flex m-3">Contactate con nosotros</h1>
				<div className="d-flex">
					<div className="form-floating m-3 w-50">
						<Field
							type="text"
							className="form-control"
							id="floatingName"
							name="name"
							placeholder="nombre"
						/>
						<label htmlFor="floatingName">Nombre</label>
						<span className="text-danger d-flex fs-4">
							<ErrorMessage name="name" />
						</span>
					</div>
					<div className="form-floating m-3 w-50">
						<Field
							type="text"
							className="form-control"
							id="floatingLastName"
							name="lastName"
							placeholder="lastName"
						/>
						<label htmlFor="floatingLastName">Apellido</label>
						<span className="text-danger d-flex fs-4">
							<ErrorMessage name="lastName" />
						</span>
					</div>
				</div>
				<div className="form-floating m-3">
					<Field
						type="text"
						className="form-control"
						id="floatingEmail"
						name="email"
						placeholder="email"
					/>
					<label htmlFor="floatingEmail">Email</label>
					<span className="text-danger d-flex fs-4">
						<ErrorMessage name="email" />
					</span>
				</div>
				<div className="form-floating m-3">
					<Field
						component="textarea"
						type="text"
						className="form-control h-75 py-5"
						id="floatingMessage"
						name="message"
						placeholder="message"
					/>
					<label htmlFor="floatingMessage">Escribe tu consulta...</label>
					<span className="text-danger d-flex fs-4">
						<ErrorMessage name="message" />
					</span>
				</div>
				<div className="d-flex m-3">
					<Button className="p-4 w-25" size="lg" type="submit">
              Enviar
					</Button>
				</div>
			</Form>
		</Formik>
	)
}

export default Contact
