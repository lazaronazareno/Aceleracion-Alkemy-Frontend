import React from 'react'
import * as yup from 'yup'
import { Formik } from 'formik'
import { Form, Col, Button, Card } from 'react-bootstrap'
//import axios from 'axios'

const FormCategories = (/* {incomingCategory} */) => {
   
	const schema = yup.object().shape({
		name: yup.string().required(),   
		description:yup.string().required()
	}
	) 

	//FYI: Por ahora paso el objeto que debería venir en la petición por acá. 
	//Cuando se conecte con el botón de editar/crear categoría esto deberá pasarse como prop

	
	//FYI: dejo un objeto vacío para probar el POST
	const incomingCategory={
		name:'',
		description: '',
		id:''}
		
	//FYI: Dejo un objeto con data para porbar el PATCH
	/* const incomingCategory={
			name:'CATEGORY',
			description: 'Descripción de incomingCategory',
			id:'89'} */
	return (
			
		<div>
			<Formik
				validationSchema={schema}
				initialValues={{
					name: incomingCategory.name,
					description:incomingCategory.description
				}}
				validate={values => {
					const errors = {}
					if (!values.name) {
						errors.name = 'Debes ingresar un nombre para la categoría.'
						if (!values.description) {
							errors.description = 'Debes ingresar una descripción.'
						}
						return errors
					}
				}}

				onSubmit={ async (values, { setSubmitting }) => {
					setSubmitting(false)
					if((incomingCategory.name && incomingCategory.description) === '') { 
						console.log('Valores ingresados para enviar en POST request:',values)
						console.log('Realiza una peticion de tipo POST a http://localhost:4000/categories')
						// FYI: aun no existe el endpoint para POST/categories.
						//await axios.post('http://localhost:4000/categories', values)	
					} else{
						console.log('Valores ingresados para enviar en PATCH request:',values)
						console.log(`Realiza una peticion de tipo PATCH a http://localhost:4000/categories/${incomingCategory.id}`)
						// FYI: aun no existe el endpoint para PATCH/categories.						
						//await axios.patch(`http://localhost:4000/categories/${incomingObject.id}`, values)						
					}
				}}>
				{({ handleSubmit, handleChange, values, touched, errors }) => (

					<Form noValidate onSubmit={handleSubmit}>
						<Card style={{ width: '24rem' }} className="mx-auto mt-5">
							<Card.Title className="mt-2">Categorías</Card.Title>
							<Card.Body>
								<Form.Group md="12" as={Col} controlId="validationName"> 
									<Form.Label>Nombre</Form.Label>
									<Form.Control
										type="text"
										name="name"
										placeholder="Nombre"
										value={values.name}
										onChange={handleChange}
										isValid={touched.name && !errors.name}
										isInvalid={!!errors.name}
									/>
									<Form.Control.Feedback type="invalid">
										{errors.name}
									</Form.Control.Feedback>
								</Form.Group>
								<Form.Group md="12" as={Col} controlId="validationDescription">
									<Form.Label>Descripción</Form.Label>
									<Form.Control
										type="text"
										name="description"
										placeholder="Descripción"
										value={values.description}
										onChange={handleChange}
										isInvalid={!!errors.description}
										isValid={touched.description && !errors.description}
									/>

									<Form.Control.Feedback type="invalid">
										{errors.description}
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


export default FormCategories