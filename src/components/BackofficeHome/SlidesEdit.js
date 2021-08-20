import React from 'react'
import { useFormik } from 'formik'
import { Button, Form } from 'react-bootstrap'
import './styles.scss'

function SlidesEdit() {
	const formik = useFormik({
		initialValues: {
			photo1: '',
			photo2: '',
			photo3: '',
		}, 
		onSubmit: (values) => handleSubmit(values)
	})

	const handleSubmit = (values) => {
		console.log(values)
		//CONFIGURAR AMAZON SDK S3
	}
	return (
		<Form onSubmit={formik.handleSubmit} className="d-flex flex-column align-items-center text-light bg-secondary">
			<h2 className="d-flex m-3">Subir Imagenes</h2>
			<Form.Group className="d-flex flex-column">
				<Form.Label>Imagen 1:</Form.Label>
				<Button
					as="input"
					className="btn btn-info"
					type="file"
					name="photo1"
					onChange={(event) => formik.setFieldValue('photo1', event.target.files[0])}
				/>
			</Form.Group>
			<Form.Group className="d-flex flex-column">
				<Form.Label>Imagen 2:</Form.Label>
				<Button
					as="input"
					className="btn btn-warning"
					type="file"
					name="photo2"
					onChange={(event) => formik.setFieldValue('photo2', event.target.files[0])}
				/>
			</Form.Group>
			<Form.Group className="d-flex flex-column">
				<Form.Label>Imagen 3:</Form.Label>
				<Button
					as="input"
					className="btn btn-danger"
					type="file"
					name="photo3"
					onChange={(event) => formik.setFieldValue('photo3', event.target.files[0])}
				/>
			</Form.Group>
			<Button className="mt-2" type="submit">
              Enviar
			</Button>
		</Form>
	)
}

export default SlidesEdit
