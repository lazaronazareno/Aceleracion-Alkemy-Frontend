import React , { useEffect,useState }from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { Button, Container } from 'react-bootstrap'
import useAxios from '../../libs/axiosInstance'
import Loader from '../../shared/Loader/Loader'
import Alert from '../../shared/Alert/Alert'

function Contact() {
	
	const [showSucces, setShowSuccess] = useState(false)

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
	
	const httpConfig = {
		url: '/contacts',
		method: 'post'
	}

	const { response, error, loading, fetchData } = useAxios()

	const onSubmit = (values, onSubmitProps) => {
		const body = values
		fetchData({ url: httpConfig.url, method: httpConfig.method, body })
		onSubmitProps.resetForm()
	}
		
	useEffect(() => {
		if (!loading && response ) {
			setShowSuccess(true)
		}
	}, [loading, response, error])

	return (
		<Container>
			{loading ?
				<Loader /> :
				<Formik
					initialValues={initialValues}
					validationSchema={validationSchema}
					onSubmit={onSubmit}
				>
					<Form className="container d-flex flex-column text-dark border-blue mt-2 p-5">
						<span className="d-flex m-3 fs-1">Contactate con nosotros</span>
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
							<Button className="p-4 w-25 btn-info" size="lg" type="submit">
              Enviar
							</Button>
						</div>
					</Form>
				</Formik>
			}	
			<Alert 
				show={showSucces} 
				title={''} 
				text={'Usuario creado exitosamente'} 
				type={'success'} 
				onConfirm={()=>setShowSuccess(false)}
			/>
		</Container>
	)
}

export default Contact
