import React from 'react'
import * as yup from 'yup'
import { Formik } from 'formik'
import { Form, Col, Button, Card } from 'react-bootstrap'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import actions from '../../redux/actions'
import { useHistory } from 'react-router-dom'
import { addAuth } from '../../redux/actions/authAction'

/* eslint indent:"off" */
const FormRegister = () => {
  const { addUser } = actions
  const history = useHistory()
  const dispatch = useDispatch()
  const schema = yup.object().shape({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    email: yup.string().email('Invalid email format').required(),
    password: yup.string().min(8, 'Debe tener un minimo de 8 caracters').required(),
  })

  return (
    <div>
      <Formik
        validationSchema={schema}
        initialValues={{
          lastName: '',
          firstName: '',
          email: '',
          password: '',
        }}
        validate={(values) => {
          const errors = {}

          if (!values.firstName) {
            errors.firstName = 'Debes ingresar su nombre.'
          }

          if (!values.lastName) {
            errors.lastName = 'Debes ingresar su apellido.'
          }

          if (!values.email) {
            errors.email = 'Debes ingresar un email.'
          } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
            errors.email = 'Formato de email invalido.'
          }

          if (!values.password) {
            errors.password = 'Debes ingresar una contraseña.'
          } else if (values.password.length < 6) {
            errors.password = 'La contraseña debe tener un minimo de 6 digitos.'
          }
          return errors
        }}
        onSubmit={async(values, { setSubmitting }) => {
          setSubmitting(false)
          const response = await axios.post('http://localhost:4000/users/register', values)
          dispatch(addUser(response.data.data))
          localStorage.setItem('token', response.data.token)
          dispatch(addAuth(true))
          history.push('/')
        }}
      >
        {({ handleSubmit, handleChange, values, touched, errors }) => (
          <Form noValidate onSubmit={handleSubmit}>
            <Card style={{ width: '24rem' }} className="mx-auto mt-5">
              <Card.Title className="mt-2">Registro.</Card.Title>
              <Card.Body>
                <Form.Group md="12" as={Col} controlId="validationName">
                  <Form.Label>Nombre</Form.Label>
                  <Form.Control
                    type="text"
                    name="firstName"
                    placeholder="Nombre"
                    value={values.firstName}
                    onChange={handleChange}
                    isValid={touched.firstName && !errors.firstName}
                    isInvalid={!!errors.firstName}
                  />
                  <Form.Control.Feedback type="invalid">{errors.firstName}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group md="12" as={Col} controlId="validationlastname">
                  <Form.Label>Apellido</Form.Label>
                  <Form.Control
                    type="text"
                    name="lastName"
                    placeholder="Apellido"
                    value={values.lastName}
                    onChange={handleChange}
                    isValid={touched.lastName && !errors.lastName}
                    isInvalid={!!errors.lastName}
                  />
                  <Form.Control.Feedback type="invalid">{errors.lastName}</Form.Control.Feedback>
                </Form.Group>

                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={values.email}
                  onChange={handleChange}
                  isValid={touched.email && !errors.email}
                  isInvalid={!!errors.email}
                />
                <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>

                <Form.Group md="12" as={Col} controlId="validationPassword">
                  <Form.Label>Contraseña</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder="Contraseña"
                    value={values.password}
                    onChange={handleChange}
                    isInvalid={!!errors.password}
                    isValid={touched.password && !errors.password}
                  />
                  <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                </Form.Group>

                <Button type="submit" className="mt-2">
                  Registrarme
                </Button>
              </Card.Body>
            </Card>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default FormRegister
