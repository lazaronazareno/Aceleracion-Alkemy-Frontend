import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { Button } from 'react-bootstrap'
import { useSelector } from 'react-redux'

function EditUser() {
	const userLogged = useSelector((state) => state.user)
	const initialValues = {
		name: '',
		lastName: '',
		email: '',
		roleId: '',
	}

	const validationSchema = Yup.object({
		name: Yup.string().required('Requerido'),
		lastName: Yup.string().required('Requerido'),
		email: Yup.string().email('Formato invalido').required('Requerido'),
		roleId: Yup.string().required('Requerido'),
	})

	const onSubmit = (values, onSubmitProps) => {
		console.log(values)
		//FYI agregar el endpoint de modificar usuario
		onSubmitProps.resetForm()
	}
	return (
		<Formik
			initialValues={initialValues}
			validationSchema={validationSchema}
			onSubmit={onSubmit}
		>
			<Form className="container d-flex flex-column text-dark border border-dark mt-2 p-5">
				{userLogged.roleId === 1 ? <h1>Editar Usuario Administrador</h1> : <h1>Editar Usuario</h1> }
				<div className="form-floating m-3">
					<Field
						type="text"
						className="form-control"
						id="floatingName"
						name="name"
						placeholder="nombre"
					/>
					<label htmlFor="floatingName">{userLogged.firstName === '' ? 'Nombre'  : (userLogged.name)}</label>
					<span className="text-danger d-flex fs-4">
						<ErrorMessage name="name" />
					</span>
				</div>
				<div className="form-floating m-3">
					<Field
						type="text"
						className="form-control"
						id="floatingLastName"
						name="lastName"
						placeholder="lastName"
					/>
					<label htmlFor="floatingLastName">{userLogged.lastName === '' ? 'Apellido'  : (userLogged.lastName)}</label>
					<span className="text-danger d-flex fs-4">
						<ErrorMessage name="lastName" />
					</span>
				</div>
				<div className="form-floating m-3">
					<Field
						type="text"
						className="form-control"
						id="floatingEmail"
						name="email"
						placeholder="email"
					/>
					<label htmlFor="floatingEmail">{userLogged.email === '' ? 'Email'  : (userLogged.email)}</label>
					<span className="text-danger d-flex fs-4">
						<ErrorMessage name="email" />
					</span>
				</div>
				{ userLogged.roleId === 1 && (
					<div className="form-floating m-3">
						<Field
							type="text"
							className="form-control"
							id="floatingRoleId"
							name="roleId"
							placeholder="roleId"
						/>
						<label htmlFor="floatingRoleId">{userLogged.roleId === '' ? 'RoleID' : (userLogged.roleId)}</label>
						<span className="text-danger d-flex fs-4">
							<ErrorMessage name="roleId" />
						</span>
					</div>
				)}
				<Button size="lg" type="submit">
              Enviar
				</Button>
			</Form>
		</Formik>
	)
}

export default EditUser