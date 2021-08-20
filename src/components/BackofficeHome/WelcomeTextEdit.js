import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { Button } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import actions from '../../redux/actions'

function WelcomeTextEdit() {
	const dispatch = useDispatch()
	const { welcomeTextAction } = actions
	const initialValues = {
		welcomeText: '',
	}

	const validationSchema = Yup.object({
		welcomeText: Yup.string().required('Requerido'),
	})

	const onSubmit = (values, onSubmitProps) => {
		console.log(values.welcomeText)
		dispatch(welcomeTextAction(values.welcomeText))
		onSubmitProps.resetForm()
	}
	return (
		<Formik
			initialValues={initialValues}
			validationSchema={validationSchema}
			onSubmit={onSubmit}
		>
			<Form className="container">
				<h2 className="d-flex m-3">Modificar texto de bienvenida</h2>
				<div className="form-floating m-3">
					<Field
						type="text"
						className="form-control"
						id="floatingWelcomeText"
						name="welcomeText"
						placeholder="welcomeText"
					/>
					<label htmlFor="floatingWelcomeText">Texto de Bienvenida</label>
					<span className="text-danger d-flex fs-4">
						<ErrorMessage name="welcomeText" />
					</span>
				</div>
				<Button type="submit">
              Modificar
				</Button>
			</Form>
		</Formik>
	)
}

export default WelcomeTextEdit
